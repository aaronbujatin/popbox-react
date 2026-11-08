import { useEffect, useRef, useState, type ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProduct } from "../hooks/useProduct";
import { useIncrementCartItem } from "../../cart/hooks/useCartMutations";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import NotFound from "../../../pages/NotFound";
import type { AccordionProps, ChevronProps, GalleryProps } from "../type";
import { sv } from "../type";

const Chevron = ({ dir = "down", className = "h-4 w-4" }: ChevronProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sv} strokeWidth={2}>
    <path d={dir === "down" ? "m6 9 6 6 6-6" : "m6 15 6-6 6 6"} />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...sv}>
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    <path d="M14 4h6v6M20 4l-9 9" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    {...sv}
    fill={filled ? "currentColor" : "none"}
  >
    <path d="M12 20.5s-8-4.8-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11Z" />
  </svg>
);

const PlanetIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...sv}>
    <circle cx="12" cy="12" r="5" />
    <path d="M3 15c-1-2 3-6 9-8s10-2 9 0-3 6-9 8-9 2-9 0Z" />
  </svg>
);

function Accordion({ title, open, onToggle, children }: AccordionProps) {
  return (
    <div className="border-t border-neutral-300 last:border-b">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-sm"
      >
        {title}
        <Chevron dir={open ? "up" : "down"} className="h-3.5 w-3.5" />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

function Gallery({ images, alt }: GalleryProps) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const safeImages = images.length > 0 ? images : [];
  const activeIndex = Math.min(active, Math.max(0, safeImages.length - 1));

  const scrollList = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ top: dir * 160, left: dir * 160, behavior: "smooth" });
  };

  if (safeImages.length === 0) {
    return (
      <div className="flex aspect-square min-w-0 flex-1 items-center justify-center bg-neutral-100 text-sm text-neutral-500">
        No images available
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col-reverse gap-2 self-start md:flex-row">
      <div className="relative h-[72px] shrink-0 md:h-auto md:w-[72px]">
        <div className="absolute inset-0 flex flex-row md:flex-col">
          <div
            ref={listRef}
            className="flex flex-1 flex-row gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-col md:overflow-x-hidden md:overflow-y-auto"
          >
            {safeImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === activeIndex}
                className={`aspect-square w-[72px] shrink-0 overflow-hidden border ${
                  i === activeIndex
                    ? "border-[#d4002a]"
                    : "border-transparent hover:border-neutral-400"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="mt-2 hidden flex-col gap-1 md:flex">
            <button
              aria-label="Scroll thumbnails up"
              onClick={() => scrollList(-1)}
              className="flex h-[34px] items-center justify-center border border-neutral-200 text-neutral-400 hover:text-black"
            >
              <Chevron dir="up" />
            </button>
            <button
              aria-label="Scroll thumbnails down"
              onClick={() => scrollList(1)}
              className="flex h-[34px] items-center justify-center border border-neutral-300 hover:bg-neutral-50"
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>

      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden">
        <img
          src={safeImages[activeIndex]}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default function ProductDetails(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? Number(id) : NaN;
  const productId = Number.isFinite(parsedId) ? parsedId : undefined;
  const {
    data: product,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  } = useProduct(productId);

  const retry = () => {
    void (refetch as () => Promise<unknown>)();
  };

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [sizeId, setSizeId] = useState<number | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const incrementCartItem = useIncrementCartItem();
  const units = Array.isArray(product?.productUnits) ? product.productUnits : [];
  const images = Array.isArray(product?.images) ? product.images : [];

  useEffect(() => {
    if (units.length) {
      setSizeId(units[0].id);
      setQty(1);
    }
  }, [product?.id, units.length]);

  const toggle = (key: string) =>
    setOpenSection((current) => (current === key ? null : key));

  if (productId === undefined) {
    return (
      <div className="px-4 py-10 text-center">
        <h2 className="text-lg font-semibold">Invalid product</h2>
        <p className="mt-2 text-sm text-neutral-600">
          The product ID in the URL is missing or invalid.
        </p>
        <Link to="/" className="mt-4 inline-block text-sm underline underline-offset-2">
          Back to home
        </Link>
      </div>
    );
  }

  if (isLoading || (isPending && !isError)) {
    return <p className="px-4 py-10 text-center text-sm">Loading...</p>;
  }

  if (isError) {
    const status = error?.response?.status;
    const notFound = status === 400 || status === 404;
    return (
      <div>
        {notFound ? (
            <NotFound/>
        ): (
            <div className="px-4 py-10 text-center">
              <p className="mt-2 text-sm text-neutral-600">{getErrorMessage(error)}</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                {!notFound && (
                    <button
                        onClick={retry}
                        className="border border-black px-4 py-2 text-sm uppercase"
                    >
                      Try again
                    </button>
                )}
                <Link to="/" className="text-sm underline underline-offset-2">
                  Back to home
                </Link>
              </div>
            </div>
        )}
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  const selectedUnit = units.find((unit) => unit.id === sizeId) ?? units[0];
  const soldOut = !selectedUnit || selectedUnit.stockQty <= 0;
  const shownQty = soldOut ? 0 : qty;
  const badge = "HOT";
  const globalExpress = true;
  const details = [
    `Brand: POP MART`,
    product.description ? `Description: ${product.description}` : null,
    "Size: Height about 8cm-12cm",
    "Material: PVC/ABS/Hardware/Magnet",
    product.isSeries ? "A whole set contains multiple blind boxes" : null,
  ].filter((item): item is string => Boolean(item));
  const shipping =
    "Orders ship within 3–5 business days. Blind box items are non-returnable unless damaged on arrival.";
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blind Box", href: "#" },
    { label: product.name ?? "Product", href: "#" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1000px] px-4 pb-20 pt-6 font-['Barlow',sans-serif] text-[#1a1a1a]">
      <nav aria-label="Breadcrumb" className="text-xs">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index < breadcrumb.length - 1 ? (
                <>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                  <span className="text-neutral-400">/</span>
                </>
              ) : (
                <span className="text-[#d4002a]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_364px] md:gap-[41px]">
        <Gallery images={images} alt={product.name ?? "Product"} />

        <div>
          {globalExpress && (
            <div className="flex h-[29px] items-center justify-center gap-1.5 bg-[#dff0fc] text-xs font-semibold uppercase text-[#2b7fc9]">
              <PlanetIcon /> Global Express
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            {badge ? (
              <span className="bg-black px-2 py-[3px] text-xs font-medium leading-none text-white">
                {badge}
              </span>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              <button
                aria-label="Share"
                onClick={() => {
                  void navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  });
                }}
              >
                <ShareIcon />
              </button>
              <button
                aria-label="Add to wishlist"
                aria-pressed={liked}
                onClick={() => setLiked((value) => !value)}
                className={liked ? "text-[#d4002a]" : ""}
              >
                <HeartIcon filled={liked} />
              </button>
            </div>
          </div>

          <h1 className="mt-4 text-xl font-semibold leading-snug">
            {product.name}
          </h1>
          {selectedUnit && (
            <p className="mt-5 text-xl font-medium text-[#d4002a]">
              ₱
              {selectedUnit.price.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </p>
          )}

          <p className="mt-6 text-sm uppercase">Size</p>
          <div
            className="mt-3 grid grid-cols-2 gap-1.5"
            role="radiogroup"
            aria-label="Size"
          >
            {units.length === 0 ? (
              <p className="col-span-2 text-sm text-neutral-500">
                No variants available.
              </p>
            ) : (
              units.map((unit) => {
                const isOutOfStock = unit.stockQty <= 0;
                const selected = unit.id === (selectedUnit?.id ?? null);
                return (
                  <button
                    key={unit.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      setSizeId(unit.id);
                      setQty(1);
                    }}
                    className={`flex h-10 items-center justify-center gap-3 px-2 text-xs font-medium ${
                      selected
                        ? "border border-black bg-white"
                        : "border border-transparent bg-[#f5f5f5] text-neutral-500"
                    }`}
                  >
                    <span className={isOutOfStock ? "line-through" : ""}>
                      {unit.type}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <p className="mt-6 text-sm font-semibold">Quantity</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              aria-label="Decrease quantity"
              disabled={soldOut || qty <= 1}
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              className="flex h-6 w-6 items-center justify-center border border-neutral-300 text-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              −
            </button>
            <span
              className="w-4 text-center text-xs font-semibold"
              aria-live="polite"
            >
              {shownQty}
            </span>
            <button
              aria-label="Increase quantity"
              disabled={soldOut}
              onClick={() => setQty((current) => current + 1)}
              className="flex h-6 w-6 items-center justify-center border border-neutral-300 text-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              +
            </button>
          </div>

          <div className="mt-8">
            {soldOut ? (
              <button className="h-12 w-full border border-black text-sm uppercase hover:bg-black hover:text-white">
                Notify me when available
              </button>
            ) : (
              <div className="grid gap-2">
                <button
                  className="h-12 w-full border border-black text-sm uppercase hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={incrementCartItem.isPending || !selectedUnit}
                  onClick={() => {
                    if (!selectedUnit || !product) return;
                    setCartError(null);
                    const storedUserId = Number(localStorage.getItem("userId"));
                    const userId = Number.isFinite(storedUserId) && storedUserId > 0 ? storedUserId : 1;
                    incrementCartItem.mutate(
                      {
                        userId,
                        productId: product.id,
                        productUnitId: selectedUnit.id,
                        quantity: qty,
                      },
                      {
                        onSuccess: () => {
                          toast.success("Added to cart successfully.");
                        },
                        onError: (mutationError) => {
                          setCartError(getErrorMessage(mutationError));
                        },
                      },
                    );
                  }}
                >
                  {incrementCartItem.isPending ? "Adding..." : "Add to bag"}
                </button>
                {cartError && (
                  <p className="text-sm text-red-600" role="alert">
                    {cartError}
                  </p>
                )}
                <button className="h-12 w-full bg-black text-sm uppercase text-white hover:bg-neutral-800">
                  Buy now
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Accordion
              title="Details"
              open={openSection === "details"}
              onToggle={() => toggle("details")}
            >
              <ul className="mt-2 space-y-0.5 text-xs leading-4 text-neutral-700">
                {details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="mt-5 text-right">
                <a
                  href="#"
                  className="text-xs uppercase underline underline-offset-2"
                >
                  What’s a blind box
                </a>
              </div>
            </Accordion>
            <Accordion
              title="Shipping & After-sale Service"
              open={openSection === "shipping"}
              onToggle={() => toggle("shipping")}
            >
              <p className="text-xs leading-5 text-neutral-700">{shipping}</p>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
