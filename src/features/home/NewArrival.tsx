import { useCallback, useEffect, useRef, useState } from "react";

export interface NewArrivalProduct {
  id: number;
  name: string;
  price?: number;
  points?: number;
  appOnly?: boolean;
  image: string;
}

export interface NewArrivalGroup {
  time: string;
  products: NewArrivalProduct[];
}

interface NewArrivalProps {
  groups?: NewArrivalGroup[];
}

const GROUPS: NewArrivalGroup[] = [
  {
    time: "10.23 10:00",
    products: [
      {
        id: 1,
        name: "CRYBABY Crying Round n Round Series Commemorative Coin",
        points: 170,
        appOnly: true,
        image: "https://placehold.co/684x920/8fc3ea/ffffff?text=Coin",
      },
      {
        id: 2,
        name: "POP BEAN Sanrio characters Fried Shrimp Series",
        price: 160,
        image: "https://placehold.co/684x920/7a4a2b/ffffff?text=Pop+Bean",
      },
      {
        id: 3,
        name: "Hirono x Kodak Click Figure",
        price: 1700,
        image: "https://placehold.co/684x920/d9a521/ffffff?text=Hirono",
      },
      {
        id: 4,
        name: "Hirono Snowman Figurine",
        price: 6000,
        image: "https://placehold.co/684x920/3b6ea5/ffffff?text=Snowman",
      },
      {
        id: 5,
        name: "Identity V Rare Treasure Figure",
        price: 700,
        image: "https://placehold.co/684x920/8a3a4a/ffffff?text=Identity+V",
      },
      {
        id: 6,
        name: "SKULLPANDA Warmth Series",
        price: 650,
        image: "https://placehold.co/684x920/c9b6e4/ffffff?text=Skullpanda",
      },
    ],
  },
];

const peso = (value: number): string =>
  "₱" +
  value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
  </svg>
);

function ProductCard({ product }: { product: NewArrivalProduct }) {
  return (
    <a
      href="#"
      className="block w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-96px)/5)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {product.appOnly && (
          <span className="absolute left-2 top-2 bg-black px-3 py-1 text-[11px] uppercase leading-none text-white">
            App only
          </span>
        )}
      </div>
      <p className="mt-6 line-clamp-2 min-h-[2.75rem] text-sm leading-snug">
        {product.name}
      </p>
      <p className="mt-3 text-lg font-medium">
        {product.points != null
          ? `${product.points} Points`
          : peso(product.price ?? 0)}
      </p>
    </a>
  );
}

function LaunchRow({ group }: { group: NewArrivalGroup }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow = (disabled: boolean) =>
    `flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors ${
      disabled ? "bg-neutral-200" : "bg-neutral-400 hover:bg-neutral-500"
    }`;

  return (
    <div className="mt-14 first:mt-10">
      <div className="flex items-center gap-6">
        <h3 className="text-3xl font-semibold">{group.time}</h3>
        <div className="h-px flex-1 bg-neutral-200" />
        <div className="hidden gap-2 sm:flex">
          <button
            aria-label="Scroll left"
            disabled={atStart}
            onClick={() => scroll(-1)}
            className={arrow(atStart)}
          >
            <Chevron dir="left" />
          </button>
          <button
            aria-label="Scroll right"
            disabled={atEnd}
            onClick={() => scroll(1)}
            className={arrow(atEnd)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {group.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function NewArrival({ groups = GROUPS }: NewArrivalProps) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 py-14 font-['Barlow',sans-serif] text-black md:px-[5%]">
      <div className="text-center">
        <h2 className="text-4xl font-bold uppercase tracking-tight">
          New Arrivals
        </h2>
        <a
          href="#"
          className="mt-3 inline-block border-b border-black text-sm leading-tight"
        >
          Launch Calendar &gt;
        </a>
      </div>

      {groups.map((group) => (
        <LaunchRow key={group.time} group={group} />
      ))}
    </section>
  );
}
