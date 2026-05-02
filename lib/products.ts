export type ProductCategory =
  | "skincare"
  | "lips"
  | "eyes"
  | "face"
  | "cheeks"
  | "clothes";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  shade?: string;
  swatch: string; // CSS color for the preview chip
  emoji: string; // Visual icon for the product card
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
    emoji: "💋",
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
    emoji: "🌸",
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
    emoji: "🍇",
    description: "Rich berry liquid lipstick with a soft satin finish.",
    prompt:
      "Apply a satin-finish berry liquid lipstick (#7C2D52) to the lips. Maintain the natural lip line; no changes elsewhere on the face.",
  },
  {
    id: "lip-gloss-clear",
    name: "Mirror Shine Gloss",
    brand: "Atelier Bloom",
    category: "lips",
    shade: "Crystal Clear",
    swatch: "#F5E6D8",
    emoji: "✨",
    description: "Glassy clear gloss with a wet shine.",
    prompt:
      "Apply a clear mirror-shine lip gloss to the lips for a wet, glassy finish. Keep natural lip color; don't change any other feature.",
  },

  // Eyes
  {
    id: "eye-smoky",
    name: "Smoky Eye Palette",
    brand: "Noir Studio",
    category: "eyes",
    shade: "Midnight Smoke",
    swatch: "#3B3A40",
    emoji: "🌙",
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
    emoji: "🔆",
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
    emoji: "🖤",
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
    emoji: "🍑",
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
    emoji: "🥂",
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
    emoji: "🧴",
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
    emoji: "🏖️",
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
    emoji: "🍊",
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
    emoji: "🌙",
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
    emoji: "💧",
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
    emoji: "🌿",
    description: "Calmer, clearer-looking skin.",
    prompt:
      "Simulate a realistic 'after 1 week' result of a salicylic acid acne treatment: visible blemishes and redness reduced, skin looks calmer and clearer. Maintain natural pores and texture; no makeup; keep identity unchanged.",
  },

  // Clothes
  {
    id: "clothes-white-tshirt",
    name: "Classic White Tee",
    brand: "Everyday Co.",
    category: "clothes",
    shade: "Cotton White",
    swatch: "#F8F8F6",
    emoji: "👕",
    description: "Soft cotton crew-neck T-shirt.",
    prompt:
      "Replace the visible upper-body clothing with a clean, well-fitting white cotton crew-neck T-shirt. Realistic fabric folds and natural shadows. Keep the face, hair, body shape, pose, lighting and background exactly the same.",
  },
  {
    id: "clothes-denim-jacket",
    name: "Classic Denim Jacket",
    brand: "Westwood",
    category: "clothes",
    shade: "Mid Wash Blue",
    swatch: "#5A7BA5",
    emoji: "🧥",
    description: "Mid-wash denim trucker jacket.",
    prompt:
      "Replace the visible upper-body clothing with a classic mid-wash blue denim trucker jacket worn open over a plain white tee. Realistic denim texture, button details and natural fabric folds. Preserve face, hair, body, pose, lighting and background.",
  },
  {
    id: "clothes-black-hoodie",
    name: "Oversized Hoodie",
    brand: "Streetline",
    category: "clothes",
    shade: "Jet Black",
    swatch: "#0F0F12",
    emoji: "🧢",
    description: "Cozy oversized black hoodie.",
    prompt:
      "Replace the visible upper-body clothing with an oversized black cotton hoodie with a relaxed fit, drawstrings and a kangaroo pocket. Soft natural fabric texture and realistic folds. Keep the face, hair, body, pose, lighting and background unchanged.",
  },
  {
    id: "clothes-floral-dress",
    name: "Floral Summer Dress",
    brand: "Atelier Bloom",
    category: "clothes",
    shade: "Pink Garden",
    swatch: "#E89AB6",
    emoji: "🌷",
    description: "Light midi dress with a floral print.",
    prompt:
      "Replace the visible clothing with a light flowy midi dress in a soft pink floral print, with thin straps and a relaxed silhouette. Realistic fabric movement. Preserve face, hair, body, pose, lighting and background.",
  },
  {
    id: "clothes-suit-navy",
    name: "Tailored Navy Suit",
    brand: "Brooks & Co.",
    category: "clothes",
    shade: "Midnight Navy",
    swatch: "#1F2A44",
    emoji: "🤵",
    description: "Sharp, modern-fit navy two-piece.",
    prompt:
      "Replace the visible upper-body clothing with a tailored modern-fit navy suit jacket over a crisp white dress shirt and a thin navy tie. Realistic wool texture, natural shoulder line and lapels. Preserve face, hair, body, pose, lighting and background.",
  },
  {
    id: "clothes-leather-jacket",
    name: "Biker Leather Jacket",
    brand: "Westwood",
    category: "clothes",
    shade: "Espresso Black",
    swatch: "#1A1110",
    emoji: "🏍️",
    description: "Asymmetric zip moto jacket.",
    prompt:
      "Replace the visible upper-body clothing with a fitted black biker leather jacket with an asymmetric zip and silver hardware. Realistic leather sheen and creasing. Keep the face, hair, body, pose, lighting and background identical.",
  },
  {
    id: "clothes-knit-sweater",
    name: "Cable Knit Sweater",
    brand: "Cottage Lane",
    category: "clothes",
    shade: "Cream",
    swatch: "#EFE2C8",
    emoji: "🧶",
    description: "Cozy cream cable-knit sweater.",
    prompt:
      "Replace the visible upper-body clothing with a cozy cream cable-knit sweater with a relaxed fit and a crew neckline. Realistic chunky knit texture and natural folds. Preserve face, hair, body, pose, lighting and background.",
  },
  {
    id: "clothes-saree",
    name: "Silk Saree",
    brand: "Banaras Atelier",
    category: "clothes",
    shade: "Royal Magenta",
    swatch: "#9D2461",
    emoji: "🥻",
    description: "Handwoven silk saree with gold zari border.",
    prompt:
      "Replace the visible clothing with a draped royal magenta handwoven silk saree with a gold zari border, worn over a matching short blouse. Realistic silk sheen, pleats and pallu over the shoulder. Keep the face, hair, body, pose, lighting and background unchanged.",
  },
];

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  skincare: "Skincare",
  face: "Face",
  cheeks: "Cheeks",
  eyes: "Eyes",
  lips: "Lips",
  clothes: "Clothes",
};

export const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  skincare: "💆",
  face: "🧴",
  cheeks: "🌷",
  eyes: "👁️",
  lips: "💄",
  clothes: "👗",
};

export const CATEGORY_ORDER: ProductCategory[] = [
  "skincare",
  "face",
  "cheeks",
  "eyes",
  "lips",
  "clothes",
];
