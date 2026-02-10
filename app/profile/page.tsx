"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/app/lib/config";
import Image from "next/image";
import { validateName, validatePhone } from '@/app/lib/validators';

type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
  profile_photo?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          profile_photo: userData.profile_photo || undefined,
        });
        if (userData.profile_photo) {
          setPhotoPreview(`http://localhost:8000/${userData.profile_photo}`);
        }
      }
    } catch (err) {
      console.error("Invalid user data in localStorage");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      setErrors((prev:object) => ({ ...prev, name: validateName(value) }));
    }
    if (name === "phone") {
      setErrors((prev:object) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const nameError = validateName(user.name);
    const phoneError = validatePhone(user.phone);

    setErrors({
      name: nameError,
      phone: phoneError,
    });

    if (nameError || phoneError) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", user.name || "");
    formData.append("phone", user.phone || "");
    formData.append("address", user.address || "");
    
    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || result.status === false) {
        setErrors(result.errors || {});
        return;
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Network error:", error);
      alert("Server not reachable");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

      {successMessage && (
        <div className="mb-6 text-center text-green-700 bg-green-100 p-3 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo {!user.profile_photo && <span className="text-red-500">*</span>}
            </label>
            {photoPreview && (
              <div className="mb-3">
                <Image
                  src={photoPreview}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.profile_photo && (
              <p className="text-red-500 text-sm mt-1">{errors.profile_photo[0]}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={user.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </section>
  );
}
