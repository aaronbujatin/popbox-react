import { useState, type SVGProps } from "react";
import { Link } from "react-router-dom";

const stroke: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

type IconProps = SVGProps<SVGSVGElement>;

const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const SupportIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke} {...props}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="2" />
    <rect x="17" y="13" width="4" height="6" rx="2" />
    <path d="M19 19c0 1.5-1.5 2.5-4 2.5h-1" />
  </svg>
);

const UserIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke} {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const HeartIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke} {...props}>
    <path d="M12 20.5s-8-4.8-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.2-8 11-8 11Z" />
  </svg>
);

const BagIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke} {...props}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

const Chevron = ({ open = false }: { open?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
    {...stroke}
    strokeWidth={2}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface NavItem {
  label: string;
  href?: string;
  children?: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "New & Featured",
    children: ["New Arrivals", "Featured", "Best Sellers"],
  },
  { label: "POP NOW", children: ["Drops", "Raffles", "Calendar"] },
  { label: "IP", children: ["Labubu", "Skullpanda", "Molly", "Crybaby"] },
  { label: "Event", children: ["Roadshows", "Pop-up Stores", "Exhibitions"] },
  { label: "Collabs", children: ["Anime", "Games", "Fashion"] },
  {
    label: "Category",
    children: ["Blind Boxes", "Figures", "Accessories", "Bags"],
  },
  { label: "Vinyl Plush", href: "#" },
  {
    label: "MEGA",
    children: [
      "Mega Collection 100%",
      "Mega Collection 400%",
      "Mega Collection 1000%",
    ],
  },
  { label: "About Us", children: ["Our Story", "Stores", "Careers"] },
];

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 4 }: NavbarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white font-['Roboto',sans-serif] text-black">
      <div className="relative flex h-[73px] items-center justify-between border-b border-neutral-200 px-4 md:px-10">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" {...stroke}>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="hidden h-[32px] w-[164px] items-center rounded-full border border-black pl-4 pr-2 sm:flex"
          >
            <input
              type="text"
              defaultValue="VALORANT"
              aria-label="Search"
              className="w-full bg-transparent text-sm text-neutral-500 outline-none placeholder:text-neutral-500"
            />
            <button type="submit" aria-label="Search" className="shrink-0">
              <SearchIcon />
            </button>
          </form>
        </div>

        <a
          href="/"
          aria-label="Pop Mart home"
          className="absolute left-1/2 -translate-x-1/2 bg-[#e60012] px-1.5 py-[2px] font-['Roboto_Condensed','Roboto',sans-serif] text-[28px] font-bold uppercase leading-none tracking-tight text-white"
        >
          Pop Mart
        </a>

        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Support" className="hidden sm:block">
            <SupportIcon />
          </button>
          <Link to="/auth" aria-label="Account">
            <UserIcon />
          </Link>
          <button aria-label="Wishlist" className="hidden sm:block">
            <HeartIcon />
          </button>
          <Link to="/cart" aria-label="Cart" className="flex items-center gap-1.5">
            <BagIcon />
            <span className="text-sm">{cartCount}</span>
          </Link>
        </div>
      </div>

      <nav
        className="hidden h-[48px] items-center justify-center border-b border-neutral-200 lg:flex"
        onMouseLeave={() => setOpenIndex(null)}
      >
        <ul className="flex items-center gap-10">
          {NAV_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenIndex(item.children ? index : null)}
              >
                {item.children ? (
                  <button
                    className="flex h-[48px] items-center gap-1.5 text-xs uppercase tracking-wide hover:text-[#e60012]"
                    aria-expanded={isOpen}
                    onFocus={() => setOpenIndex(index)}
                  >
                    {item.label}
                    <Chevron open={isOpen} />
                  </button>
                ) : (
                  <a
                    href={item.href ?? "#"}
                    className="flex h-[48px] items-center text-xs tracking-wide hover:text-[#e60012]"
                  >
                    {item.label}
                  </a>
                )}

                {item.children && isOpen && (
                  <ul className="absolute left-1/2 top-full min-w-[180px] -translate-x-1/2 border border-neutral-200 bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child}>
                        <a
                          href="#"
                          className="block px-5 py-2 text-xs hover:bg-neutral-100 hover:text-[#e60012]"
                        >
                          {child}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {mobileOpen && (
        <nav className="max-h-[calc(100vh-73px)] overflow-y-auto border-b border-neutral-200 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <details
              key={item.label}
              className="border-b border-neutral-100 px-4"
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between py-3 text-sm ${
                  item.children ? "uppercase" : ""
                }`}
              >
                {item.label}
                {item.children && <Chevron />}
              </summary>
              {item.children && (
                <ul className="pb-3 pl-3">
                  {item.children.map((child) => (
                    <li key={child}>
                      <a
                        href="#"
                        className="block py-1.5 text-sm text-neutral-600"
                      >
                        {child}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </nav>
      )}
    </header>
  );
}
