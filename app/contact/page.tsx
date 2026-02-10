"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  validateEmail,
  validatePhone,
  validateName,
} from "@/app/lib/validators";

export default function Home() {
  /* ------------------ STATE ------------------ */
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  /* ------------------ EFFECT ------------------ */
  // Auto-hide success message
  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }

    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    }

    if (name === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const nameError = validateName(formData.name);

    setErrors({
      email: emailError,
      phone: phoneError,
      name: nameError,
    });

    if (emailError || phoneError || nameError) return;

    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || result.status === false) {
        setErrors({
          email: result.errors?.email?.[0],
          message: result.errors?.message?.[0],
        });
        return;
      }

      // ✅ SUCCESS
      setSuccessMessage("Contact Saved successfully ");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Clear errors
      setErrors({});
    } catch (error) {
      console.error("Network error:", error);
      alert("Server not reachable");
    }
  };

  /* ------------------ UI HELPERS ------------------ */
  const inputBorder = (value: string, error?: string) => {
    if (!value) return "border-gray-300";
    if (error) return "border-red-500 focus:ring-red-500";
    return "border-green-500 focus:ring-green-500";
  };

  /* ------------------ JSX ------------------ */
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-center mb-10 font-semibold text-gray-600">
        Fill out the form and our experts will contact you within 24 Hrs.
      </p>

      {successMessage && (
        <div className="mb-6 text-center text-green-700 bg-green-100 p-3 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Image */}
        <div className="col-span-12 sm:col-span-4 p-6 bg-white rounded-xl shadow">
          <Image
            src="/images/dp.PNG"
            alt="Contact Us"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
        </div>

        {/* Form */}
        <div className="col-span-12 sm:col-span-8 p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Book a Free Consultation!
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2
                  ${inputBorder(formData.name, errors.name)}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2
                  ${inputBorder(formData.email, errors.email)}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onInput={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.replace(
                    /\D/g,
                    ""
                  ))
                }
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2
                  ${inputBorder(formData.phone, errors.phone)}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2
                  ${inputBorder(formData.message, errors.message)}`}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!!successMessage}
              className="w-full bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
