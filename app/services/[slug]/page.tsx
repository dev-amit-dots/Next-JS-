import { servicesData } from "@/app/services/servicesData";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ServiceDetails({ params }: Props) {
  const { slug } = await params; // ✅ safely unwrap

  const service = servicesData.find(
    (item) => item.slug === slug
  );

  if (!service) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="text-5xl mb-4">{service.icon}</div>
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 leading-relaxed">
        {service.description}
      </p>
      <p className="mt-6 text-gray-700 leading-relaxed text-justify">
        <strong className="flex">Description :</strong>
        {service.fulldescription}
      </p>

      <Link href="/" className="inline-flex mx-5 my-5 items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
      <Link href="/services" className="inline-flex mx-5 items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        All Services
      </Link>
    </div>
  );
}
