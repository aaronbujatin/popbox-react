import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export interface ProductListItem {
  id: number;
  name: string;
  category: string;
  price: number;
  popNow: boolean;
  globalExpress: boolean;
  outOfStock: boolean;
  badge: "NEW" | "HOT" | null;
  image: string;
}

type SortKey = "recommend" | "newest" | "price-asc" | "price-desc";

interface ProductListProps {
  title?: string;
  description?: string;
  products?: ProductListItem[];
}

const PRODUCTS: ProductListItem[] = [
  {
    id: 1,
    name: "Hirono x Kodak Click Figure",
    category: "Figure",
    price: 1700,
    popNow: true,
    globalExpress: true,
    outOfStock: true,
    badge: "NEW",
    image: "https://placehold.co/684x840/f5f5f5/cc3333?text=Kodak",
  },
  {
    id: 2,
    name: "Hirono Snowman Figurine",
    category: "Large Size Figures",
    price: 6000,
    popNow: true,
    globalExpress: true,
    outOfStock: true,
    badge: "NEW",
    image: "https://placehold.co/684x840/f5f5f5/999999?text=Snowman",
  },
  {
    id: 3,
    name: "Hirono×Le Petit Prince Series Figures",
    category: "Figure",
    price: 2400,
    popNow: false,
    globalExpress: true,
    outOfStock: true,
    badge: "HOT",
    image: "https://placehold.co/684x840/f5f5f5/3a7a4a?text=Petit+Prince",
  },
  {
    id: 4,
    name: "Hirono Road Journal Series-Plush Doll Pendant Blind Box",
    category: "Pendant Blind Box",
    price: 650,
    popNow: false,
    globalExpress: true,
    outOfStock: false,
    badge: "HOT",
    image: "https://placehold.co/684x840/f5f5f5/222222?text=Pendant",
  },
  {
    id: 5,
    name: "Hirono Fridge Magnet Series",
    category: "Fridge Magnet",
    price: 380,
    popNow: true,
    globalExpress: false,
    outOfStock: false,
    badge: null,
    image: "https://placehold.co/684x840/f5f5f5/6688aa?text=Magnet",
  },
  {
    id: 6,
    name: "Hirono Blister Card Collection",
    category: "Blister Card",
    price: 450,
    popNow: false,
    globalExpress: false,
    outOfStock: false,
    badge: "NEW",
    image: "https://placehold.co/684x840/f5f5f5/aa7744?text=Blister",
  },
];

const CATEGORIES = [
  "Fridge Magnet",
  "Pendant Blind Box",
  "Large Size Figures",
  "Figure",
  "Blister Card",
] as const;

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "recommend", label: "Recommend" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  bold?: boolean;
}

function Checkbox({ checked, onChange, label, bold = false }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center border border-neutral-800 bg-white text-white peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2">
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 5 5 9-10" />
          </svg>
        )}
      </span>
      <span
        className={bold ? "text-[15px] font-semibold uppercase" : "text-[15px]"}
      >
        {label}
      </span>
    </label>
  );
}

interface SortMenuProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

function SortMenu({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const current = SORTS.find((sort) => sort.key === value) ?? SORTS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 text-[15px] underline underline-offset-2"
      >
        Sort - {current.label}
        <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 fill-neutral-500">
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-52 border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {SORTS.map((sort) => (
            <li key={sort.key}>
              <button
                role="option"
                aria-selected={sort.key === value}
                onClick={() => {
                  onChange(sort.key);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 ${sort.key === value ? "font-semibold" : ""}`}
              >
                {sort.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative aspect-[342/420] bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-[6%]"
        />
        <div className="absolute left-2 top-2 flex text-[11px] uppercase leading-none">
          {product.outOfStock && (
            <span className="bg-neutral-200 px-3 py-[7px] text-neutral-600">
              Out of stock
            </span>
          )}
          {product.badge && (
            <span className="bg-black px-3 py-[7px] text-white">
              {product.badge}
            </span>
          )}
        </div>
      </div>
      {product.globalExpress && (
        <p className="mt-4 text-[15px] uppercase">Global Express</p>
      )}
      <p
        className={`text-[15px] leading-snug ${product.globalExpress ? "mt-1" : "mt-4"}`}
      >
        {product.name}
      </p>
      <p className="mt-2 text-base font-medium">
        ₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
      </p>
    </Link>
  );
}

export default function ProductList({
  title = "Hirono",
  description = "Created by contemporary artist Lang, Hirono is a complex character. Through Hirono Lang aims to highlight the subtle fluctuations of life, its ups and downs, and attempts to freeze in time the elusive feelings that reveal our true character – love, joy, sadness, fear, kindness, cowardice and others. Hirono is the epitome of growth, and a personification of profound human emotions.",
  products = PRODUCTS,
}: ProductListProps) {
  const [popNow, setPopNow] = useState(false);
  const [globalExpress, setGlobalExpress] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("recommend");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (category: string) =>
    setCategories((previous) =>
      previous.includes(category)
        ? previous.filter((value) => value !== category)
        : [...previous, category],
    );

  const visible = useMemo(() => {
    let list = products.filter(
      (product) =>
        (!popNow || product.popNow) &&
        (!globalExpress || product.globalExpress) &&
        (categories.length === 0 || categories.includes(product.category)),
    );

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    if (sort === "newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    }

    return list;
  }, [products, popNow, globalExpress, categories, sort]);

  const filters = (
    <div>
      <div className="space-y-8">
        <Checkbox
          label="Pop Now"
          bold
          checked={popNow}
          onChange={() => setPopNow((value) => !value)}
        />
        <Checkbox
          label="Global Express"
          bold
          checked={globalExpress}
          onChange={() => setGlobalExpress((value) => !value)}
        />
      </div>
      <div className="mt-8 border-t border-neutral-200 pt-8">
        <h3 className="text-lg font-semibold">Category</h3>
        <div className="mt-8 space-y-8">
          {CATEGORIES.map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 pb-20 pt-12 font-['Barlow',sans-serif] text-[#1a1a1a] md:px-[3%]">
      <div className="mx-auto max-w-[1000px] text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tight">{title}</h1>
        <p className="mt-5 text-[15px] leading-6">{description}</p>
      </div>

      <div className="mt-12 flex items-center justify-between lg:justify-end">
        <button
          className="border border-black px-4 py-2 text-sm uppercase lg:hidden"
          onClick={() => setFiltersOpen((value) => !value)}
          aria-expanded={filtersOpen}
        >
          Filters
        </button>
        <SortMenu value={sort} onChange={setSort} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-[90px]">
        <aside
          className={`${filtersOpen ? "block" : "hidden"} lg:block lg:pt-6`}
        >
          {filters}
        </aside>

        <div>
          {visible.length === 0 ? (
            <p className="py-20 text-center text-neutral-500">
              No products match these filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
