"use client";

import React from "react";
import {
    FaWhatsapp,
} from 'react-icons/fa';

export default function WhatsappIcon() {
  const [visible, setVisible] = React.useState(false);

  // 👇 Show button after scrolling down
  React.useEffect(() => {
    const toggleVisibility = () => {
        setVisible(true);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 👇 Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <a href="https://wa.me/919999999999">
    <button
      onClick={scrollToTop}
      className="fixed bottom-17 right-1 bg-green-600 text-white p-1 rounded-full shadow-lg hover:bg-white transition hover:text-green-500 text-3xl font-bold" 
    >
      <FaWhatsapp/>
    </button>
    </a>
  );
}
