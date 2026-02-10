import Image from "next/image";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center">
      Our Mission

      </h1>
      <p className="text-center mb-10">Building technology that moves businesses forward</p>

      <div className="grid grid-cols-12 gap-6">

        {/* Image Section → col-sm-4 */}
        <div className="col-span-12 sm:col-span-4 p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <Image
            src="/images/dp.PNG"
            alt="Our Mission"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
        </div>

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
