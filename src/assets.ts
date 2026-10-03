/**
 * Image manifest and local-file resolver.
 *
 * THIS CONCEPT IS PHOTOGRAPHY-FREE BY DESIGN. Typography, mono data, hairlines
 * and the SVG flow carry the whole identity, so there are no placeholder blocks
 * anywhere and nothing is waiting on a photo shoot.
 *
 * The resolver is kept for later: drop a file into `src/assets/images/` named
 * after its key and it is picked up at build time with no code change. Add the
 * key here first.
 */

export type AssetEntry = {
  src: string | null;
  alt: string;
  ratio: string;
  w: number;
  h: number;
  note: string;
};

export const ASSETS = {
  "og-image": {
    src: null,
    alt: "",
    ratio: "1.91 / 1",
    w: 1200,
    h: 630,
    note:
      "Karta społecznościowa: wordmark HYDROCZAR na grafitowym tle z cyjanową linią. Nie jest renderowana na stronie — po dostarczeniu dodać do <meta property=\"og:image\">.",
  },
} as const satisfies Record<string, AssetEntry>;

export type AssetKey = keyof typeof ASSETS;

const LOCAL_IMAGES = import.meta.glob<string>(
  "./assets/images/*.{jpg,jpeg,png,webp,avif,svg}",
  { eager: true, import: "default", query: "?url" },
);

const LOCAL_BY_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(LOCAL_IMAGES).map(([path, url]) => {
    const file = path.slice(path.lastIndexOf("/") + 1);
    return [file.slice(0, file.lastIndexOf(".")), url];
  }),
);

/** A local file beats whatever `src` says. `null` means "not supplied". */
export function resolveSrc(k: AssetKey): string | null {
  return LOCAL_BY_NAME[k] ?? ASSETS[k].src;
}

export function hasImage(k: AssetKey): boolean {
  return resolveSrc(k) !== null;
}
