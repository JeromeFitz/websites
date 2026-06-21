import { useCallback } from "react";

// @todo(types) any
function useThemeToggle({ setTheme, theme }: { setTheme: any; theme: any }) {
  return useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.style.setProperty("color-scheme", newTheme);
    setTheme(newTheme);
  }, [setTheme, theme]);
}

export { useThemeToggle };
