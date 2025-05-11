import { useEffect, useState } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && savedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    document.documentElement.className = theme;
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleThemeChange}
      className="min-w-[80px] px-4 py-2 cursor-pointer rounded-md bg-neutral-600 text-white"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
