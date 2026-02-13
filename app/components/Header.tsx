"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaGithub,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/app/lib/auth";

const socialIcons = [
  { icon: FaInstagram, url: "https://instagram.com", color: "hover:text-pink-500" },
  { icon: FaFacebookF, url: "https://facebook.com", color: "hover:text-blue-600" },
  { icon: FaTwitter, url: "https://twitter.com", color: "hover:text-sky-500" },
  { icon: FaYoutube, url: "https://youtube.com", color: "hover:text-red-600" },
  { icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:text-blue-700" },
  { icon: FaWhatsapp, url: "https://wa.me/919999999999", color: "hover:text-green-500" },
  { icon: FaTelegramPlane, url: "https://t.me/username", color: "hover:text-sky-400" },
  { icon: FaGithub, url: "https://github.com", color: "hover:text-gray-400" },
];

const headerMenu = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Vision / Mission", href: "/vission" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Product", href: "/product" },
];

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      {/* ===== Top Black Social Bar ===== */}
      <div className="w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

          <div className="text-sm font-semibold hidden md:block">
            Just Test Next JS
          </div>

          <div className="flex gap-4 text-lg">
            {socialIcons.map(({ icon: Icon, url, color }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${color}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Main Sticky Header ===== */}
      <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            MyFirstApp
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            {headerMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition hover:text-blue-600 ${
                  pathname === item.href
                    ? "text-blue-600 underline"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Section */}
            {!user ? (
              <>
                <Link href="/register" className="hover:text-blue-600">
                  Register
                </Link>
                <Link href="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="font-semibold text-gray-800"
                >
                  Hi, {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-md">
            <div className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">

              {headerMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`transition hover:text-blue-600 ${
                    pathname === item.href
                      ? "text-blue-600 underline"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {!user ? (
                <>
                  <Link href="/register">Register</Link>
                  <Link href="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link href="/profile">Hi, {user.name}</Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
