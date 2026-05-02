"use client";

import {
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
        Browse the curated catalog and tap one to apply.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORY_ORDER.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              active === c
                ? "bg-rose-600 text-white shadow"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100"
            }`}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((p) => {
          const selected = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className={`group flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                selected
                  ? "border-rose-500 bg-rose-50 shadow"
                  : "border-neutral-200 bg-white hover:border-rose-300"
              }`}
            >
              <span
                className="mt-0.5 inline-block h-10 w-10 flex-shrink-0 rounded-full border border-black/5 shadow-inner"
                style={{ background: p.swatch }}
              />
              <span className="flex-1">
                <span className="block text-xs uppercase tracking-wide text-neutral-500">
                  {p.brand}
                </span>
                <span className="block text-sm font-semibold text-neutral-900">
                  {p.name}
                </span>
                {p.shade && (
                  <span className="block text-xs text-neutral-600">{p.shade}</span>
                )}
                <span className="mt-1 block text-xs text-neutral-500">
                  {p.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
