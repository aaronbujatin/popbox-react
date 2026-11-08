import { Link } from "react-router-dom";
import popboxNotFound from "../assets/popbox-not-found.png";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12 font-['Barlow',sans-serif]">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <img
          src={popboxNotFound}
          alt="Page not found illustration"
          className="mb-8 w-full max-w-sm select-none"
          draggable={false}
        />
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Error 404
        </p>
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-base text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have
          been moved or no longer exists.
        </p>
        <Link
          to="/"
          className="inline-flex h-12 w-full items-center justify-center bg-black text-sm uppercase text-white hover:bg-neutral-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
