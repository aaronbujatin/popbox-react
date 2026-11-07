import type { ReactNode, SVGProps } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  isSeries: boolean;
  images: string[];
  imageContents: string[];
  categoryId: number;
  productUnits: ProductUnit[];
}

export interface ProductUnit {
  id: number;
  type: string;
  price: number;
  stockQty: number;
}

export interface AccordionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export interface GalleryProps {
  images: string[];
  alt: string;
}

export interface ChevronProps {
  dir?: "up" | "down";
  className?: string;
}

export const sv: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
