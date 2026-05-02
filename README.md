# Mirror — AI Skincare & Makeup Try-On

A small Next.js app that lets users upload a selfie, pick a skincare or makeup
product, and see a photorealistic result rendered by Google's
**Nano Banana Pro** (`gemini-3-pro-image-preview`).

Users provide their own Gemini API key in the UI (stored in `localStorage`),
or you can set `GEMINI_API_KEY` server-side as a fallback.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>, paste your key from
[Google AI Studio](https://aistudio.google.com/app/apikey), upload a photo
and pick a product.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS
- Server route at `app/api/tryon/route.ts` calls
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent`
  with the user's photo as inline image data plus a curated product prompt.
- Before/after slider in `components/ResultViewer.tsx`.

## Notes

- Generated images are illustrative; real product results vary.
- Total request payload (photo + prompt) must stay under Gemini's 20 MB inline
  limit — the uploader caps photos at 8 MB.
