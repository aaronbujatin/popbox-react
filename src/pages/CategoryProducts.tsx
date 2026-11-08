import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductsByCategory } from "../features/product/hooks/useProduct";
import ProductList, {
  type ProductListItem,
} from "../features/product/components/ProductList";
import NotFound from "./NotFound";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { Product } from "../features/product/type";

function toListItem(product: Product): ProductListItem {
  const units = Array.isArray(product.productUnits) ? product.productUnits : [];
  const price = units[0]?.price ?? 0;
  const outOfStock = units.length === 0 || units.every((unit) => unit.stockQty <= 0);
  const image = product.images?.[0] ?? "";

  return {
    id: product.id,
    name: product.name,
    category: `Category ${product.categoryId}`,
    price,
    popNow: false,
    globalExpress: false,
    outOfStock,
    badge: null,
    image,
  };
}

export default function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const parsedId = categoryId ? Number(categoryId) : NaN;
  const id = Number.isFinite(parsedId) ? parsedId : undefined;

  const { data, isLoading, isPending, isError, error, refetch } =
    useProductsByCategory(id);

  const products = useMemo(
    () => (Array.isArray(data) ? data.map(toListItem) : []),
    [data],
  );

  if (id === undefined) {
    return (
      <div className="px-4 py-10 text-center">
        <h2 className="text-lg font-semibold">Invalid category</h2>
        <p className="mt-2 text-sm text-neutral-600">
          The category ID in the URL is missing or invalid.
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
    if (status === 400 || status === 404) {
      return <NotFound />;
    }

    return (
      <div className="px-4 py-10 text-center">
        <h2 className="text-lg font-semibold">Couldn&apos;t load products</h2>
        <p className="mt-2 text-sm text-neutral-600">{getErrorMessage(error)}</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              void (refetch as () => Promise<unknown>)();
            }}
            className="border border-black px-4 py-2 text-sm uppercase"
          >
            Try again
          </button>
          <Link to="/" className="text-sm underline underline-offset-2">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProductList
      title={`Category ${id}`}
      description="Browse products in this category."
      products={products}
    />
  );
}
