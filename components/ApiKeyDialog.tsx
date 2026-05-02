"use client";

import { useEffect, useState } from "react";

type Props = {
  apiKey: string;
  onChange: (k: string) => void;
};

export default function ApiKeyDialog({ apiKey, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(apiKey);
  const [show, setShow] = useState(false);

  useEffect(() => setDraft(apiKey), [apiKey]);

  const masked = apiKey ? `${apiKey.slice(0, 4)}…${apiKey.slice(-4)}` : "Not set";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-rose-600 shadow-sm hover:bg-rose-50"
      >
        <span
          className={`inline-block h-2 w-2 rounded-full ${apiKey ? "bg-emerald-500" : "bg-rose-400"}`}
        />
        API key: {masked}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Enter your Gemini API key</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Your key is used only for your session and sent to Google&apos;s Gemini API
              (<code className="rounded bg-neutral-100 px-1">gemini-3-pro-image-preview</code>,
              a.k.a. Nano Banana Pro). Get one at{" "}
              <a
                className="text-rose-600 underline"
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
              >
                Google AI Studio
              </a>
              .
            </p>

            <div className="mt-4 flex gap-2">
              <input
                type={show ? "text" : "password"}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="AIza..."
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="h-4 w-4 rounded border-neutral-300"
              />
              Remember on this device (saved in localStorage)
            </label>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const remember = (
                    document.getElementById("remember") as HTMLInputElement | null
                  )?.checked;
                  onChange(draft.trim());
                  if (remember && typeof window !== "undefined") {
                    window.localStorage.setItem("gemini_api_key", draft.trim());
                  } else if (typeof window !== "undefined") {
                    window.localStorage.removeItem("gemini_api_key");
                  }
                  setOpen(false);
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
