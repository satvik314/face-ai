import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const MODEL = "gemini-3-pro-image-preview";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type TryOnBody = {
  apiKey?: string;
  imageBase64: string;
  imageMimeType: string;
  productPrompt: string;
  productName?: string;
};

function buildInstruction(productPrompt: string, productName?: string) {
  const labelLine = productName ? `Product: ${productName}\n` : "";
  return [
    "You are a virtual try-on artist. The reference image shows a real person's face.",
    "Render a single photorealistic image of THE SAME PERSON with the requested change applied.",
    "Strict requirements:",
    "- Preserve identity exactly: same face shape, bone structure, eye color, skin tone undertone, hair, freckles, moles and pose.",
    "- Keep the original lighting, background, framing and camera angle.",
    "- Keep the result photographic and realistic — visible pores, natural skin texture, no plastic or airbrushed look.",
    "- Output only the resulting image, no text overlays.",
    "",
    `${labelLine}Change to apply: ${productPrompt}`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  let body: TryOnBody;
  try {
    body = (await req.json()) as TryOnBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { apiKey, imageBase64, imageMimeType, productPrompt, productName } = body;

  const key = apiKey?.trim() || process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing Gemini API key. Add it in the app or set GEMINI_API_KEY." },
      { status: 401 },
    );
  }
  if (!imageBase64 || !imageMimeType) {
    return NextResponse.json({ error: "Missing image data" }, { status: 400 });
  }
  if (!productPrompt) {
    return NextResponse.json({ error: "Missing product prompt" }, { status: 400 });
  }

  const instruction = buildInstruction(productPrompt, productName);

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: imageMimeType, data: imageBase64 } },
          { text: instruction },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
    },
  };

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Network error contacting Gemini: ${(err as Error).message}` },
      { status: 502 },
    );
  }

  const raw = await upstream.text();
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: `Unexpected response from Gemini: ${raw.slice(0, 400)}` },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const message =
      (data as { error?: { message?: string } })?.error?.message ||
      `Gemini API error (${upstream.status})`;
    return NextResponse.json({ error: message }, { status: upstream.status });
  }

  const candidates = (data as {
    candidates?: { content?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string }; text?: string }> } }[];
  }).candidates;

  const parts = candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart?.inlineData?.data) {
    const textPart = parts.find((p) => p.text)?.text;
    return NextResponse.json(
      {
        error:
          textPart ||
          "Gemini did not return an image. Try a different photo or product, or check that your API key has access to gemini-3-pro-image-preview.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    imageBase64: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || "image/png",
  });
}
