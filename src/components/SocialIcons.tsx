import type { SVGProps } from "react";

/**
 * A lucide-react 1.x-ből kikerültek a márkaikonok, ezért az Instagram és a
 * Facebook glifát itt tartjuk — a lucide vonalvastagságához igazítva,
 * hogy egységes maradjon a többi ikonnal.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

const base = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function InstagramIcon({ size = 20, strokeWidth = 1.2, ...props }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, strokeWidth = 1.2, ...props }: IconProps) {
  return (
    <svg {...base(size, strokeWidth)} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
