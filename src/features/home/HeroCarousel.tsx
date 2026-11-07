import { useCallback, useEffect, useState } from "react";

export interface HeroSlide {
  title: string;
  href: string;
  image: string;
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

const SLIDES: HeroSlide[] = [
  {
    title: "LABUBU Exciting Macaron Series",
    href: "#",
    image: "https://placehold.co/1900x800/c9b6e4/ffffff?text=Slide+1",
  },
  {
    title: "SKULLPANDA Warmth Series",
    href: "#",
    image: "https://placehold.co/1900x800/f4c7a1/ffffff?text=Slide+2",
  },
  {
    title: "CRYBABY Crying Round n Round Series",
    href: "#",
    image: "https://placehold.co/1900x800/9db7ea/ffffff?text=Slide+3",
  },
  {
    title: "Hirono x Kodak Click Figure",
    href: "#",
    image: "https://placehold.co/1900x800/e8c15a/ffffff?text=Slide+4",
  },
  {
    title: "POP BEAN Sanrio Characters",
    href: "#",
    image: "https://placehold.co/1900x800/c98d5a/ffffff?text=Slide+5",
  },
  {
    title: "Identity V Rare Treasure",
    href: "#",
    image: "https://placehold.co/1900x800/b33a4a/ffffff?text=Slide+6",
  },
];

const AUTOPLAY_MS = 5000;

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
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

export default function HeroCarousel({ slides = SLIDES }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused || count === 0) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-200 font-['Barlow',sans-serif]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div
        className="flex aspect-[4/3] transition-transform duration-700 ease-out sm:aspect-[19/8]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className="relative h-full w-full shrink-0"
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 px-6 text-center text-white sm:bottom-16">
              <h2 className="text-2xl font-medium sm:text-3xl">{slide.title}</h2>
              <a
                href={slide.href}
                tabIndex={i === index ? 0 : -1}
                className="border-b border-white text-sm uppercase leading-tight"
              >
                Check now
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-500/70 text-white hover:bg-slate-500"
      >
        <Arrow dir="left" />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-500/70 text-white hover:bg-slate-500"
      >
        <Arrow dir="right" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className="group py-2"
          >
            <span
              className={`block h-[2px] w-16 sm:w-24 ${
                i === index ? "bg-white" : "bg-white/50 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
