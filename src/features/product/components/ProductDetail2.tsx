import {useProduct} from "../hooks/useProduct.ts";
import {Link, useParams} from "react-router-dom";
import {getErrorMessage} from "../../../utils/getErrorMessage.ts";

export default function ProductDetail2() {

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
            <div className="px-4 py-10 text-center">
                <h2 className="text-lg font-semibold">
                    {notFound ? "Product not found" : "Unable to load product"}
                </h2>
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
        );
    }

    return (
        <div>
            {product.name}
        </div>
    )
}