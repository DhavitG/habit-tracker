import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      <Sun
        className={`h-5 w-5 absolute transition-all duration-300 ${
          isDark
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100 text-amber-500"
        }`}
      />
      <Moon
        className={`h-5 w-5 absolute transition-all duration-300 ${
          isDark
            ? "opacity-100 rotate-0 scale-100 text-blue-400"
            : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
