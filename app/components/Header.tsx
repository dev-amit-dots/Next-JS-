"use client";
import Link from 'next/link';
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
    FaPinterestP,
} from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/auth";


const socialIcons = [
    { icon: FaInstagram, url: 'https://instagram.com', color: 'hover:text-pink-500' },
    { icon: FaFacebookF, url: 'https://facebook.com', color: 'hover:text-blue-600' },
    { icon: FaTwitter, url: 'https://twitter.com', color: 'hover:text-sky-500' },
    { icon: FaYoutube, url: 'https://youtube.com', color: 'hover:text-red-600' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', color: 'hover:text-blue-700' },
    { icon: FaWhatsapp, url: 'https://wa.me/919999999999', color: 'hover:text-green-500' },
    { icon: FaTelegramPlane, url: 'https://t.me/username', color: 'hover:text-sky-400' },
    { icon: FaGithub, url: 'https://github.com', color: 'hover:text-white' },
];


const headerMenu = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Our Vission / Mission', href: '/vission' },

    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    // { name: 'Register Now', href: '/register' },

]

export default function Header() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("storage-update", handleStorageChange);
        return () => window.removeEventListener("storage-update", handleStorageChange);
    }, []);
    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push("/login");
    };


    return (
        <div>
            <header className="w-full bg-black text-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

                    {/* Logo */}
                    <div className="text-xl font-bold">
                        <Link href="/">MyFirstApp</Link>
                    </div>
                    <div className="text-xl font-bold">
                        <Link href="/">Just Test Next JS</Link>
                    </div>
                    <div className="text-xl font-bold flex gap-4 text-gray-600 text-lg">
                        {socialIcons.map(({ icon: Icon, url, color }, index) => (
                            <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transition ${color} text-white`}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>

                </div>
            </header>
            <header className="w-full bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center ">

                    {/* Logo */}
                    <div className="w-1/4 text-xl font-bold text-gray-800">
                        <Link href="/">MyFirstApp</Link>
                    </div>

                    {/* Menu */}
                    <nav className="w-full flex gap-10 text-gray-700 font-medium">
                        {headerMenu.map((item) => (
                            <Link key={item.name} href={item.href} className="transition hover:text-blue-600">
                                {item.name}
                            </Link>
                        ))}

                        {!user ? (
                            <>
                                <Link href="/register" className="hover:text-blue-600">
                                    Register Now
                                </Link>
                                <Link href="/login" className="hover:text-blue-600">
                                    Login
                                </Link>
                            </>
                        ) : (
                            <div className="ml-auto flex items-center gap-4">
                                <span className="font-semibold text-gray-800">
                                    <Link href="/profile">Hi, {user.name}</Link>
                                </span>

                                <button
                                 onClick={handleLogout}
                                    className="text-red-600 hover:underline"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    </nav>
                </div>
            </header>
        </div>
    );
}
