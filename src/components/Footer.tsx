import { useState } from "react";

/* ---------- Data ---------- */
const LINK_COLUMNS = [
    { title: "Shop", links: ["All Blind Box", "Trending", "Accessories"] },
    {
        title: "Customer Service",
        links: ["FAQs", "Shipping Policies", "Return & Refunds", "Track Your Order", "Order Status", "Contact Us"],
    },
    {
        title: "Information",
        links: ["Store", "About Us", "News", "Global Ambassador", "Terms & Conditions", "Privacy Policy", "Investor Relations"],
    },
];

/* ---------- Icons ---------- */
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" />
    </svg>
);
const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
);
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M3 2.5v19l10-9.5L3 2.5Z" fill="#00c3ff" />
        <path d="m13 12 3.5-3.5L5 2l8 10Z" fill="#00f076" />
        <path d="M13 12 5 22l11.5-6.5L13 12Z" fill="#ff3a44" />
        <path d="m16.5 8.5-3.5 3.5 3.5 3.5 4-2.2c1-.6 1-1.9 0-2.5l-4-2.3Z" fill="#ffd400" />
    </svg>
);
const PhFlag = () => (
    <svg viewBox="0 0 16 11" className="h-[11px] w-4">
        <rect width="16" height="5.5" fill="#0038a8" />
        <rect y="5.5" width="16" height="5.5" fill="#ce1126" />
        <path d="M0 0v11l8-5.5Z" fill="#fff" />
    </svg>
);

/* ---------- Pieces ---------- */
function StoreBadge({ href = "#", icon, small, big }) {
    return (
        <a
            href={href}
            className="flex h-9 w-[120px] items-center gap-2 rounded-[4px] border border-neutral-600 bg-black px-2 text-white"
        >
            {icon}
            <span className="leading-none">
        <span className="block text-[8px]">{small}</span>
        <span className="block text-[14px] font-medium">{big}</span>
      </span>
        </a>
    );
}

function ContactBox({ title, sub, action, href = "#" }) {
    return (
        <div className="relative border border-neutral-500 px-[10px] py-[11px]">
            <p className="text-xs font-bold uppercase">{title}</p>
            <p className="mt-3 text-xs font-semibold text-neutral-600">{sub}</p>
            <a href={href} className="absolute right-[10px] top-[19px] text-xs text-neutral-500 underline underline-offset-2 hover:text-white">
                {action}
            </a>
        </div>
    );
}

/* ---------- Footer ---------- */
export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | done

    const onSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: send `email` to your API
        setStatus("done");
        setEmail("");
    };

    return (
        <footer className="font-['Barlow',sans-serif]">
            {/* Follow us strip */}
            <div className="border-t border-neutral-300 bg-white text-black">
                <div className="mx-auto flex h-[74px] max-w-[1152px] items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <h2 className="text-xl font-bold uppercase">Follow us</h2>
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                        </div>
                    </div>
                    <div className="hidden items-center gap-3.5 sm:flex">
                        <StoreBadge icon={<PlayIcon />} small="GET IT ON" big="Google Play" />
                        <StoreBadge icon={<AppleIcon />} small="Download on the" big="App Store" />
                    </div>
                </div>
            </div>

            {/* Main black area */}
            <div className="bg-black text-white">
                <div className="mx-auto grid max-w-[1152px] gap-12 px-4 pb-16 pt-[46px] lg:grid-cols-[360px_1fr] lg:gap-8">
                    {/* Left column */}
                    <div>
                        <h3 className="text-xs font-bold uppercase">Join the community</h3>
                        <p className="mt-4 text-xs text-neutral-600">
                            Be the first to catch our new releases, exclusive offers, and more.
                        </p>

                        <form onSubmit={onSubscribe} className="mt-3 flex h-[30px] items-center bg-white px-[9px]">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                                placeholder="Enter your email address"
                                aria-label="Email address"
                                className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-neutral-500"
                            />
                            <button type="submit" className="ml-2 text-xs text-black underline underline-offset-2">
                                Subscribe
                            </button>
                        </form>
                        {status === "done" && (
                            <p className="mt-2 text-xs text-green-400" role="status">Thanks for subscribing!</p>
                        )}

                        <h3 className="mt-[22px] text-xs font-bold uppercase">Contact us</h3>
                        <div className="mt-[10px] space-y-3">
                            <ContactBox title="Online customer service" sub="Mon-Sun 00:00-24:00" action="Contact Us" />
                            <ContactBox title="Email" sub="PH.service@popmart.com" action="Email us" href="mailto:PH.service@popmart.com" />
                        </div>

                        <a href="#" className="mt-4 inline-block text-xs uppercase text-neutral-500 underline underline-offset-2 hover:text-white">
                            Visit help center (FAQs)
                        </a>

                        <div className="mt-4">
                            <button className="flex h-[26px] items-center gap-2 border border-neutral-500 px-3 text-[10px] uppercase">
                                <span className="text-neutral-500">Country</span>
                                <span className="h-3 w-px bg-neutral-500" />
                                <PhFlag />
                                <span className="font-bold">PH</span>
                            </button>
                        </div>
                    </div>

                    {/* Right link columns */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:ml-auto lg:w-[465px]">
                        {LINK_COLUMNS.map((col) => (
                            <nav key={col.title} aria-label={col.title}>
                                <h3 className="text-xs font-bold uppercase">{col.title}</h3>
                                <ul className="mt-[18px] space-y-[19px]">
                                    {col.links.map((l) => (
                                        <li key={l}>
                                            <a href="#" className="text-xs uppercase hover:underline">
                                                {l}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}