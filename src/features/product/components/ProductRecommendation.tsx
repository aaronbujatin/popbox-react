import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface RecommendationProduct {
  id: number;
  name: string;
  price: number;
  globalExpress: boolean;
  badge: "NEW" | "HOT" | null;
  image: string;
}

interface ProductRecommendationsProps {
  title?: string;
  items?: RecommendationProduct[];
}

const ITEMS: RecommendationProduct[] = [
  {
    id: 1,
    name: "Hirono Echo Series - Phone Case - for iPhone 16 Pro",
    price: 1150,
    globalExpress: true,
    badge: null,
    image: "https://placehold.co/600x600/f5f5f5/333333?text=Phone+Case",
  },
  {
    id: 2,
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    globalExpress: true,
    badge: "NEW",
    image: "https://placehold.co/600x600/f5f5f5/aa5522?text=Blister",
  },
  {
    id: 3,
    name: "Hirono After Dark Series Fridge Magnet Blind Box",
    price: 550,
    globalExpress: true,
    badge: "HOT",
    image: "https://placehold.co/600x600/f5f5f5/dd7722?text=Magnet",
  },
  {
    id: 4,
    name: "Hirono Mist-Walker Series - Plush Doll Pendant",
    price: 1150,
    globalExpress: true,
    badge: "HOT",
    image: "https://placehold.co/600x600/f5f5f5/555555?text=Pendant",
  },
  {
    id: 5,
    name: "Hirono Road Journal Series Figures",
    price: 650,
    globalExpress: true,
    badge: "NEW",
    image: "https://placehold.co/600x600/f5f5f5/3a7a4a?text=Journal",
  },
  {
    id: 6,
    name: "Hirono Snowman Figurine",
    price: 6000,
    globalExpress: true,
    badge: null,
    image: "https://placehold.co/600x600/f5f5f5/6688aa?text=Snowman",
  },
  {
    id: 7,
    name: "Hirono x Kodak Click Figure",
    price: 1700,
    globalExpress: false,
    badge: "HOT",
    image: "https://placehold.co/600x600/f5f5f5/cc3333?text=Kodak",
  },
  {
    id: 8,
    name: "Hirono Le Petit Prince Series Figures",
    price: 600,
    globalExpress: true,
    badge: null,
    image: "https://placehold.co/600x600/f5f5f5/997733?text=Prince",
  },
  {
    id: 9,
    name: "Hirono Reshape Series Figures",
    price: 650,
    globalExpress: true,
    badge: "NEW",
    image: "https://placehold.co/600x600/f5f5f5/7755aa?text=Reshape",
  },
  {
    id: 10,
    name: "Hirono Little Mischief Series",
    price: 600,
    globalExpress: true,
    badge: null,
    image: "https://placehold.co/600x600/f5f5f5/aa3377?text=Mischief",
  },
  {
    id: 11,
    name: "Hirono City of Mercy Series",
    price: 650,
    globalExpress: true,
    badge: null,
    image: "https://placehold.co/600x600/f5f5f5/339988?text=Mercy",
  },
  {
    id: 12,
    name: "Hirono Shelter Series",
    price: 600,
    globalExpress: true,
    badge: "HOT",
    image: "https://placehold.co/600x600/f5f5f5/776655?text=Shelter",
  },
];

const GAP = 10;
const BADGE_STYLES: Record<NonNullable<RecommendationProduct["badge"]>, string> = {
  NEW: "text-sky-200",
  HOT: "text-amber-400",
};

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={dir === "left" ? "m15 4-8 8 8 8" : "m9 4 8 8-8 8"} />
  </svg>
);

function Card({ product }: { product: RecommendationProduct }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block w-[calc((100%-10px)/2)] shrink-0 snap-start md:w-[calc((100%-20px)/3)] lg:w-[calc((100%-30px)/4)]"
    >
      <div className="relative aspect-square bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-[8%]"
        />
        {product.badge && (
          <span
            className={`absolute left-2 top-2 bg-black px-2 py-[3px] text-[11px] leading-none ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
      </div>
      {product.globalExpress && (
        <p className="mt-2 text-[11px] uppercase leading-4">Global Express</p>
      )}
      <p
        className={`line-clamp-2 min-h-8 text-xs leading-4 ${product.globalExpress ? "" : "mt-2"}`}
      >
        {product.name}
      </p>
      <p className="mt-2 text-sm font-bold">
        ₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
      </p>
    </Link>
  );
}

export default function ProductRecommendations({
  title = "You may also like",
  items = ITEMS,
}: ProductRecommendationsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth + GAP;
    const totalPages = Math.max(1, Math.ceil((el.scrollWidth + GAP - 1) / step));
    setPages(totalPages);
    setPage(Math.min(Math.round(el.scrollLeft / step) + 1, totalPages));
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, items]);

  const go = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth + GAP), behavior: "smooth" });
  };

  const arrowClassName = (disabled: boolean) =>
    `absolute top-[calc(50%-40px)] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border bg-white transition-opacity ${
      disabled
        ? "pointer-events-none border-neutral-200 text-neutral-300"
        : "border-neutral-300 text-neutral-700 hover:bg-neutral-50"
    }`;

  return (
    <section
      className="mx-auto w-full max-w-[1000px] px-4 py-12 font-['Barlow',sans-serif] text-[#1a1a1a]"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold uppercase tracking-tight">{title}</h2>
        <span className="text-sm font-medium" aria-live="polite">
          {page}/{pages}
        </span>
      </div>

      <div className="relative mt-5">
        <button
          aria-label="Previous products"
          disabled={page <= 1}
          onClick={() => go(-1)}
          className={`${arrowClassName(page <= 1)} left-1 lg:-left-[19px]`}
        >
          <Arrow dir="left" />
        </button>

        <div
          ref={trackRef}
          onScroll={update}
          className="flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <button
          aria-label="Next products"
          disabled={page >= pages}
          onClick={() => go(1)}
          className={`${arrowClassName(page >= pages)} right-1 lg:-right-[19px]`}
        >
          <Arrow dir="right" />
        </button>
      </div>
    </section>
  );
}
