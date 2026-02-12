"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isImageLarge, setIsImageLarge] = useState(false);
  const handleClick= () =>{
    const confirmResult = confirm('Are Your Sure you want see images');
    if(confirmResult){
      setIsImageLarge(true);
    }
  }
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center">
      Our Mission

      </h1>
      <p className="text-center mb-10">Building technology that moves businesses forward</p>

      <div className="grid grid-cols-12 gap-6">

        {/* Image Section → col-sm-4 */}
        <div className="col-span-12 sm:col-span-4 p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          {/* here we write a code for onclick when we click then open a alert box */}
          <Image
            src="/images/dp.PNG"
            alt="Our Mission"
            width={400}
            height={300} 
            className="rounded-lg object-cover w-full"
            onClick={handleClick}
          />
        </div>

          {/* Large Image Popup */}
      {isImageLarge && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="">
            <button
              className="absolute top-2 right-2 bg-white px-3 py-1 rounded"
              onClick={() => setIsImageLarge(false)}
            >
              X
            </button>

            <Image
              src="/images/dp.PNG"
              alt="Large Image"
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      )}

        {/* Content Section → col-sm-8 */}
        <div className="col-span-12 sm:col-span-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Empowering Businesses Through Technology
          </h2>

          <p className="text-gray-600 leading-relaxed text-base">

            Our mission is to empower businesses through innovative, reliable, and scalable technology solutions. We aim to help our clients grow by transforming their ideas into high-quality digital products that are secure, efficient, and future-ready.

            We are committed to delivering excellence in software development, web and mobile applications, and IT services by using modern technologies and best industry practices. Our focus is on understanding real business challenges and providing solutions that create measurable value.

            We strive to build long-term partnerships with our clients by offering transparent communication, timely delivery, and continuous support. Through teamwork, creativity, and a customer-first mindset, we work to exceed expectations and contribute to our clients’ success in a fast-evolving digital world.
          </p>
        </div>

      </div>


    </section>
  );
}
