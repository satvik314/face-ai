"use client";

import {
  CATEGORY_EMOJI,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  PRODUCTS,
  Product,
  ProductCategory,
} from "@/lib/products";
import { useState } from "react";

type Props = {
  selectedId: string | null;
  onSelect: (p: Product) => void;
};

export default function ProductPicker({ selectedId, onSelect }: Props) {
  const [active, setActive] = useState<ProductCategory>("skincare");
  const items = PRODUCTS.filter((p) => p.category === active);

  return (
    <div className="rounded-2xl border border-rose-100 bg-white/70 p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-600">
        Step 2 · Pick a product
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Browse the catalog and tap one to apply.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORY_ORDER.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-rose-600 text-white shadow-md scale-105"
                  : "bg-rose-50 text-rose-700 hover:bg-rose-100 hover:scale-105"
              }`}
            >
              <span className="text-base leading-none transition-transform duration-200 group-hover:scale-125">
                {CATEGORY_EMOJI[c]}
              </span>
              {CATEGORY_LABEL[c]}
            </button>
          );
        })}
      </div>

      {active === "clothes" && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          👗 Tip: clothing try-on works best with a half- or full-body photo.
          Headshot crops will only swap whatever clothing is visible.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((p) => {
          const selected = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className={`group relative flex items-start gap-3 overflow-hidden rounded-xl border p-3 text-left transition-all duration-200 ${
                selected
                  ? "border-rose-500 bg-gradient-to-br from-rose-50 to-rose-100 shadow-md ring-2 ring-rose-300/50"
                  : "border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md"
              }`}
            >
              <span className="relative mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full border border-black/5 shadow-inner transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.swatch }}
                />
                <span className="relative text-2xl drop-shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
                  {p.emoji}
                </span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                  {p.brand}
                </span>
                <span className="block truncate text-sm font-semibold text-neutral-900">
                  {p.name}
                </span>
                {p.shade && (
                  <span className="block text-xs font-medium text-rose-700">
                    {p.shade}
                  </span>
                )}
                <span className="mt-1 block text-xs text-neutral-500">
                  {p.description}
                </span>
              </span>
              {selected && (
                <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
