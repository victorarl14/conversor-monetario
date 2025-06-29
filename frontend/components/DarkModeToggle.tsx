"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-800 shadow z-50"
      aria-label="Alternar modo oscuro"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
} 