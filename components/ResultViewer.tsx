"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  before: string | null;
  after: string | null;
  loading: boolean;
  error: string | null;
  productName?: string;
};

export default function ResultViewer({
  before,
  after,
  loading,
  error,
  productName,
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    setPos(50);
  }, [after]);

  function move(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }

  return (
    <div className="rounded-2xl border border-rose-100 bg-white/70 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-600">
          Step 3 · Result
        </h2>
        {after && (
          <a
            href={after}
            download={`mirror-${productName?.replace(/\s+/g, "-").toLowerCase() || "result"}.png`}
            className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
          >
            Download
          </a>
        )}
      </div>

      <div
        ref={ref}
        className="relative mt-4 aspect-square w-full overflow-hidden rounded-xl border border-rose-100 bg-neutral-100 select-none"
        onMouseMove={(e) => dragging.current && move(e.clientX)}
        onMouseDown={(e) => {
          dragging.current = true;
          move(e.clientX);
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        {before ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={before} alt="Original" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-neutral-500">
            Upload a photo to begin
          </div>
        )}

        {after && (
          <>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={after} alt="Try-on result" className="h-full w-full object-cover" />
            </div>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md grid place-items-center text-rose-600">
                ⇆
              </div>
            </div>
            <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
              Before
            </div>
            <div className="absolute right-3 top-3 rounded-full bg-rose-600 px-2 py-0.5 text-xs text-white">
              After
            </div>
          </>
        )}

        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
              <p className="mt-3 text-sm font-medium text-rose-700">
                Applying {productName ?? "product"}…
              </p>
              <p className="text-xs text-neutral-500">
                Nano Banana Pro is thinking. This usually takes 15–40s.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      {after && !loading && (
        <p className="mt-3 text-xs text-neutral-500">
          Drag the divider to compare before vs. after.
        </p>
      )}
    </div>
  );
}
