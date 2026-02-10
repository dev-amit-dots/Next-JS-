"use client";
import { useState } from "react";
import { servicesData } from "./servicesData";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [search, setSearch] = useState("");
  const filteredServices = servicesData.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Our Services
      </h1>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-4 text-lg rounded-xl border border-gray-300 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500
               placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              slug={service.slug}
              mode="modal"
              onClick={() => setSelectedService(service)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No services found.
          </p>
        )}

      </div>
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        description={selectedService?.description}
        icon={selectedService?.icon}
        fullDescription={selectedService?.fulldescription}
      />
    </section>
  );
}
