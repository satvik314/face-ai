"use client";

import { useRef } from "react";

type Props = {
  imageDataUrl: string | null;
  onImage: (dataUrl: string, mimeType: string) => void;
};

export default function ImageUploader({ imageDataUrl, onImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (JPG or PNG).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("Please choose an image smaller than 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImage(result, file.type);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="rounded-2xl border border-rose-100 bg-white/70 p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-600">
        Step 1 · Your photo
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Use a clear, well-lit photo. Selfies work great for makeup &amp; skincare;
        for clothing try-on, a half- or full-body shot works best.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className="mt-4 flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/50 text-center transition hover:border-rose-400 hover:bg-rose-50"
      >
        {imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt="Uploaded"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="px-6">
            <div className="text-3xl">📸</div>
            <p className="mt-2 font-medium text-rose-700">
              Click to upload or drop a photo
            </p>
            <p className="mt-1 text-xs text-neutral-500">JPG or PNG, up to 8 MB</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {imageDataUrl && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 w-full rounded-lg border border-neutral-200 bg-white py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Change photo
        </button>
      )}
    </div>
  );
}
