"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
import { validateEmail, validatePhone, validateName,validatePassword } from "@/app/lib/validators";
import { API_BASE_URL } from "@/app/lib/config";

export default function Home() {
     const [successMessage, setSuccessMessage] = useState("");


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    password: "",

  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    password?: string;
    
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }
    if (name == "name") {
      setErrors((prev) => ({
        ...prev,
        name: validateName(value),
      }));
    }

    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(value),
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };


    useEffect(() => {
      if (!successMessage) return;
  
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [successMessage]);
  

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);

    console.log({ emailError, phoneError, nameError });

    setErrors({
      email: emailError,
      phone: phoneError,
      name: nameError,
      password:passwordError,
    });

    if (emailError || phoneError || nameError || passwordError) return;
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json", },
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
      setSuccessMessage("User created successfully ");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        password:"",
      });

      // Clear errors
      setErrors({});
    } catch (error) {
      console.error("Network error:", error);
      alert("Server not reachable");
    }
  }
  const inputBorder = (
    value: string,
    error?: string
  ) => {
    if (!value) return "border-gray-300";
    if (error) return "border-red-500 focus:ring-red-500";
    return "border-green-500 focus:ring-green-500";
  };
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center">Register Now</h1>
      <p className="text-center mb-10 font-semibold text-gray-600">
       
      </p>

          {successMessage && (
        <div className="mb-6 text-center text-green-700 bg-green-100 p-3 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Image Section */}
        {/* <div className="col-span-12 sm:col-span-4 p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <Image
            src="/images/dp.PNG"
            alt="Contact Us"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
        </div> */}

        {/* Form Section */}
        <div className="col-span-12 sm:col-span-12 p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
           Register Self
          </h2>

          <p className="text-gray-600 mb-6">
            Whether you need a website, mobile app, or custom software, just
            drop us a message and we’ll take it from there.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit} >
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
                placeholder="Enter your name"
                className={`mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${inputBorder(formData.name, errors.name)}
                  `}

              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Emai  l */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2
    ${inputBorder(formData.email, errors.email)}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                placeholder="Enter your phone number"
                name="phone"
                onInput={(e) =>
                (e.currentTarget.value =
                  e.currentTarget.value.replace(/\D/g, ""))
                }
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2
    ${inputBorder(formData.phone, errors.phone)}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                placeholder="Enter local address"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2
    ${inputBorder(formData.message, errors.message)}`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2
    ${inputBorder(formData.password, errors.password)}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
