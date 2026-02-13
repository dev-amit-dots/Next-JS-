"use client";

import React from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  // 👇 Show button after scrolling down
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
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
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-1 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 transition" style={{height:35, width:35}}
    >
      ↑
    </button>
  );
}
