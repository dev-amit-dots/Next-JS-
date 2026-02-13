// we use a api for get product details
// api  is : https://dummyjson.com/products
//  then we show only title and some details of product
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
    // CALL API and set data
    const [products, setProducts] = React.useState([]);
    // Now we use filter to filter data
    const [searchTerm, setSearchTerm] = React.useState("");
    // here code for high to low price
    const [sortOrder, setSortOrder] = React.useState(" ");
    // Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const productsPerPage = 30;



    // here code for sort by category
    const [selectedCategory, setSelectedCategory] = React.useState("");


    React.useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then((res) => res.json())
            .then(
                (data) => {
                    setProducts(data.products)
                    // console all data
                    console.log(data.products, "products")
                }
            )
            .catch((err) => console.error(err));
    }, []);

    const filteredProducts = products
        .filter((product: any) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).filter((product: any) =>
            selectedCategory
                ? product.category.toLowerCase() === selectedCategory
                : true
        )

        .slice() // ✅ important: clone array before sorting
        .sort((a: any, b: any) => {
            if (sortOrder === "low") {
                return a.price - b.price; // Low → High
            }

            if (sortOrder === "high") {
                return b.price - a.price; // High → Low
            }

            if (sortOrder === "rating") {
                return b.rating - a.rating; // Best rating first
            }

            return 0;
        });

    //  here code for check filter
    const uniqueCategories = Array.from(
        new Set(products.map((product: any) => product.category))
    );

    // data convert into ucfirst case
    const formatCategory = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    // Total pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Slice products for current page
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortOrder, selectedCategory]);


    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center">
                Product
            </h1>
            <p className="text-center mb-10">Delivering smart products that support business growth</p>
            <div className="grid grid-cols-12 gap-6 mt-5">

                <div className="col-span-12 sm:col-span-6 lg:col-span-4 ">
                    {/* Here we add filter for price , sort , etc create filter inputs */}
                    <input value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="w-full p-2 border rounded mb-2" /></div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 ">
                    <select className="w-full p-2 border rounded mb-2" value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="">Default</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                {/* Show All category must unqiue */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 ">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    // defaultValue=""
                    >
                        <option value="" >
                            Default Category
                        </option>

                        {uniqueCategories.map((category: string) => (
                            <option key={category} value={category}>
                                {formatCategory(category)}
                            </option>
                        ))}
                    </select>
                </div>


            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">


                {/* here show products with title and image */}
                {paginatedProducts.map((product: any) => (
                    <div key={product.id} className="col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow hover:shadow-lg transition">
                        {/* {console.log(product.images[0],"product12")}; */}
                        <img
                            src={product.thumbnail}
                            width={300}
                            alt={product.title}
                            height={300}
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.title} ( <small>{product.category}</small> )</h2>
                        <Link href={`/product/${product.id}`} className="">
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-800 font-bold mt-2">${product.price}</p>


                        </Link>
                        {/* Here we show rating */}
                        <p className="text-yellow-500 mt-2">Rating: {product.rating} ⭐</p>
                    </div>
                ))}





            </div>

                {/* we want show total item and showign item then user can see how many item hold here with range  like 30 to 60 like that */}
            <div className="text-center mt-10">
                <p className="text-gray-600">
                    Showing {filteredProducts.length > 0 ? `${(currentPage - 1) * productsPerPage + 1} - ${Math.min(currentPage * productsPerPage, filteredProducts.length)}` : "0"} of {filteredProducts.length} products
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
                        className={`px-4 py-2 rounded ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </section>
    );
}
