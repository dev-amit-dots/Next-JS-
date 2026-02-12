"use client";
import Image from "next/image";
import Mission from "./../mission/page"

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold  text-center">
        Our Vission
      </h1>
      <p className="mb-10 text-center">Shaping the future through technology.</p>

      <div className="grid grid-cols-12 gap-6">
   {/* Content Section → col-sm-8 */}
        <div className="col-span-12 sm:col-span-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Leading the Way in Digital Innovation
          </h2>

          <p className="text-gray-600 leading-relaxed text-base">
            Our vision is to become a trusted global technology partner, recognized for delivering innovative and impactful digital solutions. We aspire to help businesses of all sizes adapt, scale, and succeed in an ever-changing digital landscape.<br /><br />

            We envision a future where technology simplifies complexity, accelerates growth, and creates meaningful connections between businesses and their customers. By continuously evolving, embracing emerging technologies, and fostering a culture of innovation, we aim to set new standards in quality, performance, and customer satisfaction. Our goal is to create long-lasting value for our clients, our team, and the communities we serve.   </p>
        </div>
        
        {/* Image Section → col-sm-4 */}
        <div className="col-span-12 sm:col-span-4 p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
         {/* here we want add a confirm box to open images popup when user click ok then image will be shown otherwise not */}
          <Image
            src="/images/dp.PNG"
            alt="Our Mission"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
            onClick={() => confirm('Are Your Sure you want see images')}

          />
        </div>

     

      </div>

      <Mission/>
    </section>
  );
}
