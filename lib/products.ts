export type ProductCategory = "skincare" | "lips" | "eyes" | "face" | "cheeks";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  shade?: string;
  swatch: string; // CSS color for the preview chip
  description: string;
  prompt: string; // Specific instruction sent to the image model
};

export const PRODUCTS: Product[] = [
  // Lips
  {
    id: "lip-classic-red",
    name: "Velvet Matte Lipstick",
    brand: "Maison Rouge",
    category: "lips",
    shade: "Classic Red",
    swatch: "#B91C1C",
    description: "A timeless, full-coverage matte red.",
    prompt:
      "Apply a classic velvet matte red lipstick (#B91C1C) to the lips. Keep the lip shape natural, with a soft matte finish and crisp edges. Do not change any other part of the face.",
  },
  {
    id: "lip-nude-rose",
    name: "Sheer Lip Tint",
    brand: "Maison Rouge",
    category: "lips",
    shade: "Nude Rose",
    swatch: "#C98C8C",
    description: "Your-lips-but-better sheer tint.",
    prompt:
      "Apply a sheer nude-rose lip tint (#C98C8C) to the lips with a soft, glossy finish. Keep texture realistic; do not alter any other facial feature.",
  },
  {
    id: "lip-berry",
    name: "Plush Liquid Lip",
    brand: "Atelier Bloom",
    category: "lips",
    shade: "Berry Crush",
    swatch: "#7C2D52",
    description: "Rich berry liquid lipstick with a soft satin finish.",
    prompt:
      "Apply a satin-finish berry liquid lipstick (#7C2D52) to the lips. Maintain the natural lip line; no changes elsewhere on the face.",
  },

  // Eyes
  {
    id: "eye-smoky",
    name: "Smoky Eye Palette",
    brand: "Noir Studio",
    category: "eyes",
    shade: "Midnight Smoke",
    swatch: "#3B3A40",
    description: "Smoldering charcoal smoky eye look.",
    prompt:
      "Apply a soft smoky eye using charcoal and warm-brown shadow blended into the crease, with a thin black eyeliner along the upper lash line and lightly mascara'd lashes. Keep the look wearable and natural; do not change skin tone, lips, or face shape.",
  },
  {
    id: "eye-warm-bronze",
    name: "Bronze Shimmer Shadow",
    brand: "Noir Studio",
    category: "eyes",
    shade: "Sunlit Bronze",
    swatch: "#A0673B",
    description: "Warm bronze shimmer for a soft glow.",
    prompt:
      "Apply a warm bronze shimmer eyeshadow across the lid with subtle blending into the crease. Add light mascara. Do not alter the rest of the face.",
  },
  {
    id: "eye-liner-wing",
    name: "Liquid Eyeliner",
    brand: "Inkline",
    category: "eyes",
    shade: "Jet Black Wing",
    swatch: "#0B0B0B",
    description: "Precise winged liner.",
    prompt:
      "Add a clean, thin black winged liquid eyeliner along the upper lash line, with a small flick at the outer corner. Keep everything else natural and unchanged.",
  },

  // Cheeks
  {
    id: "cheek-peach-blush",
    name: "Powder Blush",
    brand: "Atelier Bloom",
    category: "cheeks",
    shade: "Peach Bellini",
    swatch: "#F2A48C",
    description: "Sun-kissed peach flush.",
    prompt:
      "Apply a soft peach powder blush to the apples of the cheeks, blending outward toward the temples. Keep the finish matte and natural. Do not modify other features.",
  },
  {
    id: "cheek-highlighter",
    name: "Liquid Highlighter",
    brand: "Glow Lab",
    category: "cheeks",
    shade: "Champagne Glow",
    swatch: "#E8D6B3",
    description: "Champagne glow on cheekbones.",
    prompt:
      "Add a subtle champagne liquid highlighter on the high points of the cheekbones, brow bone, and tip of the nose. Keep skin texture realistic.",
  },

  // Face / Foundation
  {
    id: "face-foundation",
    name: "Second-Skin Foundation",
    brand: "Glow Lab",
    category: "face",
    shade: "Even Tone",
    swatch: "#D9B79A",
    description: "Lightweight foundation that evens skin tone.",
    prompt:
      "Apply a lightweight second-skin foundation that evens out skin tone, lightly conceals redness and small blemishes, and keeps natural skin texture (pores still visible). Do not change facial structure, lips, or eye color.",
  },
  {
    id: "face-bronzer",
    name: "Sculpting Bronzer",
    brand: "Glow Lab",
    category: "face",
    shade: "Warm Sand",
    swatch: "#9B6B4A",
    description: "Soft contour and warmth.",
    prompt:
      "Apply a soft warm bronzer along the cheekbones, temples, and jawline for a subtle sculpted look. Keep the result natural and not muddy.",
  },

  // Skincare (effects after use)
  {
    id: "skin-vitc-serum",
    name: "10% Vitamin C Serum",
    brand: "Lumière Skin",
    category: "skincare",
    shade: "After 2 weeks",
    swatch: "#F6CB5B",
    description: "Brightening vitamin C serum simulated result.",
    prompt:
      "Simulate a realistic 'after 2 weeks of consistent use' result of a 10% vitamin C brightening serum: skin appears slightly more even-toned, dark spots faded, a subtle healthy glow. Keep pores, freckles and skin texture realistic. Do not apply makeup. Do not change facial structure.",
  },
  {
    id: "skin-retinol",
    name: "0.3% Retinol Night Cream",
    brand: "Lumière Skin",
    category: "skincare",
    shade: "After 8 weeks",
    swatch: "#E9C7A9",
    description: "Smoother texture, fewer fine lines.",
    prompt:
      "Simulate a realistic 'after 8 weeks of consistent use' result of a 0.3% retinol night cream: fine lines softened, skin texture appears smoother and more refined, with a healthy natural finish. No makeup. Preserve identity, pores, freckles and bone structure.",
  },
  {
    id: "skin-hydrating",
    name: "Hyaluronic Hydra Mask",
    brand: "Lumière Skin",
    category: "skincare",
    shade: "Immediate",
    swatch: "#A8D8E8",
    description: "Plumped, dewy, hydrated skin.",
    prompt:
      "Simulate the immediate result of a hyaluronic acid hydrating mask: skin looks plump, dewy and hydrated, with a soft natural glow. No makeup applied. Keep identity, pores and skin tone faithful.",
  },
  {
    id: "skin-acne",
    name: "Salicylic Acid Spot Treatment",
    brand: "Lumière Skin",
    category: "skincare",
    shade: "After 1 week",
    swatch: "#B8E0B8",
    description: "Calmer, clearer-looking skin.",
    prompt:
      "Simulate a realistic 'after 1 week' result of a salicylic acid acne treatment: visible blemishes and redness reduced, skin looks calmer and clearer. Maintain natural pores and texture; no makeup; keep identity unchanged.",
  },
];

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  skincare: "Skincare",
  face: "Foundation & Face",
  cheeks: "Cheeks",
  eyes: "Eyes",
  lips: "Lips",
};

export const CATEGORY_ORDER: ProductCategory[] = [
  "skincare",
  "face",
  "cheeks",
  "eyes",
  "lips",
];
