"use client";
import Image from "next/image";
import { useState } from "react";
import { validateEmail, validatePhone, validateName, validatePassword } from "@/app/lib/validators";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/lib/config";

export default function Home() {
    const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    password:"",
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
   
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };
const [alertError, setAlertError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    console.log({ emailError, passwordError });

    setErrors({
      email: emailError,
      password: passwordError,
    
    });

    if (emailError || passwordError) return;
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json", },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok || result.status === false) {
          setAlertError(result.message || "Login failed");

        setErrors({
          email: result.errors?.email?.[0],
          password: result.errors?.password?.[0],
        });
        return;

      }
       localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setAlertError(null);

        window.dispatchEvent(new Event("storage-update"));
        router.push("/");


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
      <h1 className="text-3xl font-bold text-center">Login Now</h1>
      <p className="text-center mb-10 font-semibold text-gray-600">
        Fill out the form and Login Now.
      </p>

      <div className="grid grid-cols-12 gap-6">
        {/* Image Section */}
      
        {/* Form Section */}
        <div className="col-span-12 sm:col-span-12 p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
         Login Now 
          </h2>
{/* 
          <p className="text-gray-600 mb-6">
            Whether you need a website, mobile app, or custom software, just
            drop us a message and we’ll take it from there.
          </p> */}
    {alertError && (
  <div className="mb-4 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-red-700">
    {alertError}
  </div>
)}

          <form className="space-y-4" onSubmit={handleSubmit} >
            {/* Name */}
           

            {/* Emai  l */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="text"
                name="email"
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
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                onInput={(e) =>
                (e.currentTarget.value =
                  e.currentTarget.value.replace(/\D/g, ""))
                }
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

            {/* Message */}
          

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
             Login Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
