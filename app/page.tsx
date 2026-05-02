"use client";

import ApiKeyDialog from "@/components/ApiKeyDialog";
import ImageUploader from "@/components/ImageUploader";
import ProductPicker from "@/components/ProductPicker";
import ResultViewer from "@/components/ResultViewer";
import { Product } from "@/lib/products";
import { useEffect, useState } from "react";

type ImageState = {
  dataUrl: string;
  base64: string;
  mimeType: string;
};

function splitDataUrl(dataUrl: string): { mimeType: string; base64: string } {
  const match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl);
  if (!match) throw new Error("Invalid data URL");
  return { mimeType: match[1], base64: match[2] };
}

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [image, setImage] = useState<ImageState | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("gemini_api_key");
    if (saved) setApiKey(saved);
  }, []);

  function handleImage(dataUrl: string, mimeType: string) {
    const { base64 } = splitDataUrl(dataUrl);
    setImage({ dataUrl, base64, mimeType });
    setResult(null);
    setError(null);
  }

  async function applyProduct() {
    if (!image || !product) return;
    if (!apiKey) {
      setError("Please add your Gemini API key first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          imageBase64: image.base64,
          imageMimeType: image.mimeType,
          productPrompt: product.prompt,
          productName: `${product.brand} ${product.name}${product.shade ? ` — ${product.shade}` : ""}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Something went wrong");
      }
      setResult(`data:${json.mimeType};base64,${json.imageBase64}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const ctaEnabled = !!image && !!product && !loading && !!apiKey;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-rose-600">Mirror</span> · AI Skincare &amp; Makeup Try-On
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600">
            Upload a selfie, pick a product, and see a photorealistic result powered by
            Google&apos;s <strong>Nano Banana Pro</strong> (Gemini 3 Pro Image). Bring
            your own API key.
          </p>
        </div>
        <ApiKeyDialog apiKey={apiKey} onChange={setApiKey} />
      </header>

      <main className="mt-8 grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-4">
          <ImageUploader imageDataUrl={image?.dataUrl ?? null} onImage={handleImage} />
        </section>

        <section className="lg:col-span-4">
          <ProductPicker
            selectedId={product?.id ?? null}
            onSelect={(p) => {
              setProduct(p);
              setError(null);
            }}
          />
        </section>

        <section className="space-y-4 lg:col-span-4">
          <ResultViewer
            before={image?.dataUrl ?? null}
            after={result}
            loading={loading}
            error={error}
            productName={product?.name}
          />

          <button
            type="button"
            disabled={!ctaEnabled}
            onClick={applyProduct}
            className="w-full rounded-2xl bg-rose-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
          >
            {loading
              ? "Generating…"
              : product
                ? `Try on ${product.name}`
                : "Pick a product to try on"}
          </button>

          {!apiKey && (
            <p className="text-center text-xs text-rose-700">
              Add your Gemini API key in the top-right to enable try-on.
            </p>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-rose-100 pt-6 text-xs text-neutral-500">
        <p>
          Generated images may not perfectly represent how a real product looks on real
          skin. Always patch-test before using new skincare. Built with Next.js +
          Gemini <code>gemini-3-pro-image-preview</code>.
        </p>
      </footer>
    </div>
  );
}
