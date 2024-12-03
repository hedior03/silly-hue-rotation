import { atom } from "nanostores";

type Theme = "light" | "dark" | "system";

// Initialize with system or stored value
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) || "system";
};

export const themeStore = atom<Theme>(getInitialTheme());

export const setTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
  themeStore.set(theme);
  updateThemeClass(theme);
};

const updateThemeClass = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
};
