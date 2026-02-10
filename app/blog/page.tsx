"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import BlogCards from "@/app/components/BlogCards";
import ServiceModal from "../services/ServiceModal";
import { blogData } from "./blogData";
export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("https://shrimo.com/fake-api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs); // IMPORTANT
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  return (
       <section className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Our Blogs
          </h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {blogs.map((blog,) => (
                <BlogCards
                  key={blog._id}
                  title={blog.title}
                  description={blog.content}
                  onClick={() => setSelectedService(blog)}
                />
              ))}
          </div>
           <ServiceModal
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            title={selectedService?.title}
            description={selectedService?.content}
            icon={selectedService?.icon}
            fullDescription={selectedService?.fullDescription}
          />
        </section>
  );
}
