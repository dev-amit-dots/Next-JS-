"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Review = {
    rating: number;
    comment: string;
    reviewerName: string;
};


export default function ProductPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { slug } = useParams(); // ✅ FIX 1
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    // Check Auth
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        else{
            router.push("/login");
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("storage-update", handleStorageChange);
        return () => window.removeEventListener("storage-update", handleStorageChange);
    }, []);


    useEffect(() => {
        if (!slug) return;

        fetch(`https://dummyjson.com/products/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]); // ✅ FIX 2

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-semibold">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center text-red-500">
                Failed to load product
            </div>
        );
    }

    const discountedPrice = (
        product.price -
        (product.price * product.discountPercentage) / 100
    ).toFixed(2);

    const addToCart = async () => {
        try {
            setAddingToCart(true);

            const res = await fetch("https://dummyjson.com/carts/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId:user.id, // demo user
                    products: [
                        {
                            id: product.id,
                            quantity: quantity,
                        },
                    ],
                }),
            });

            const data = await res.json();
            console.log("Cart response:", data);

            alert("Product added to cart successfully ✅");
        } catch (error) {
            console.error("Add to cart failed:", error);
            alert("Failed to add product ❌");
        } finally {
            setAddingToCart(false);
        }
    };


    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="bg-white rounded-xl shadow p-6 flex justify-center">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-[350px] h-auto object-contain"
                    />
                </div>

                {/* Info */}
                <div>
                    <span className="text-sm uppercase text-gray-500">
                        {product.category}
                    </span>

                    <h1 className="text-3xl font-bold mt-2">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 mt-1">
                        Brand: {product.brand}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-2xl font-bold text-green-600">
                            ₹{discountedPrice}
                        </span>
                        <span className="line-through text-gray-400">
                            ₹{product.price}
                        </span>
                        <span className="text-sm text-red-500">
                            {product.discountPercentage}% OFF
                        </span>
                    </div>

                    <p className="mt-3 text-yellow-500">
                        ⭐ {product.rating} / 5
                    </p>

                    <p className="mt-4 text-gray-700">
                        {product.description}
                    </p>

                    <div className="mt-6 text-sm text-gray-600 space-y-2">
                        <p>🚚 {product.shippingInformation}</p>
                        <p>🛡 {product.warrantyInformation}</p>
                        <p>📦 Weight: {product.weight}kg</p>
                        <p>
                            📐 {product.dimensions?.width} ×{" "}
                            {product.dimensions?.height} ×{" "}
                            {product.dimensions?.depth} cm
                        </p>
                    </div>
                    {/* here we add a input for quantity */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number" min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 px-3 py-2 border rounded-md" />


                        {/* now we want add a button to card small button with cart icon */}
                        <button
                            onClick={addToCart}
                            disabled={addingToCart}
                            className={`mt-6 px-5 py-3 rounded-lg transition flex items-center gap-2
    ${addingToCart
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>

                            {addingToCart ? "Adding..." : "Add to Cart"}
                        </button>

                    </div>

                </div>
            </div>
            <div className="mt-12"> <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2> <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.reviews.map((review: Review, index: number) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 shadow-sm hover:shadow transition"
                    >
                        <p className="text-yellow-500 mb-1">
                            {/* we create a loop for show real star */}
                            {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                    <span key={i}>⭐</span>
                                )
                            )}
                        </p>
                        <p className="text-gray-700 italic">
                            “{review.comment}”
                        </p>
                        <p className="mt-2 text-sm font-semibold text-gray-500">
                            — {review.reviewerName}
                        </p>
                    </div>
                ))}

            </div>
            </div>
            <Link href="/product" className="inline-block mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Back to Products
            </Link>
        </section>
    );
}
