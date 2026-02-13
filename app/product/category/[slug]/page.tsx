"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {

    // get slug and create a title wise
    const params = useParams();
    const slugParam = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;
    const formattedSlug = slugParam
        ? slugParam
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";

    // Define Variable for our product and other
    const [products, setProducts] = React.useState<any[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const productsPerPage = 10;

    //  Fetch products when slug changes
    React.useEffect(() => {
        if (!slugParam) return;

        setLoading(true);

        fetch(`https://dummyjson.com/products/category/${slugParam}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

    }, [slugParam]);

    // here code of sort the item two types 1. searching 2. price and rating
    const filteredProducts = products
        .filter((product: any) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product: any) =>
            selectedCategory
                ? product.category.toLowerCase() === selectedCategory
                : true
        )
        .slice()
        .sort((a: any, b: any) => {
            if (sortOrder === "low") return a.price - b.price;
            if (sortOrder === "high") return b.price - a.price;
            if (sortOrder === "rating") return b.rating - a.rating;
            return 0;
        });

    //  Pagination for our product
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Reset page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortOrder, selectedCategory]);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            {/* Title */}
            <h1 className="text-3xl font-bold text-center">
                {formattedSlug} Products
            </h1>

            <p className="text-center mb-10">
                Delivering smart products that support business growth
            </p>

            {/* Filters */}
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 sm:col-span-6">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border rounded mb-2"
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <select
                        className="w-full p-2 border rounded mb-2"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Default</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center mt-10">Loading products...</p>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-12 gap-6 mt-5">
                {paginatedProducts.map((product: any) => (
                    <div
                        key={product.id}
                        className="col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <img
                            src={product.thumbnail}
                            width={300}
                            height={300}
                            alt={product.title}
                            className="w-full h-60 object-cover rounded"
                        />

                        <h2 className="text-xl font-semibold mb-2 mt-2">
                            {product.title} (
                            <small>{product.category}</small>)
                        </h2>

                        <Link href={`/product/${product.id}`}>
                            <p className="text-gray-600 line-clamp-3">
                                {product.description}
                            </p>

                            <p className="text-gray-800 font-bold mt-2">
                                ${product.price}
                            </p>
                        </Link>

                        <p className="text-yellow-500 mt-2">
                            Rating: {product.rating} ⭐
                        </p>
                    </div>
                ))}
            </div>

            {/* Showing Range */}
            <div className="text-center mt-10">
                <p className="text-gray-600">
                    Showing{" "}
                    {filteredProducts.length > 0
                        ? `${(currentPage - 1) * productsPerPage + 1} - ${Math.min(
                            currentPage * productsPerPage,
                            filteredProducts.length
                        )}`
                        : "0"}{" "}
                    of {filteredProducts.length} products
                </p>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </section>
    );
}
