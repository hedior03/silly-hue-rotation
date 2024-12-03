import { useEffect } from "react";
import HueRotationDemo from "./pages/hue-rotation-demo";
import { ModeToggle } from "./components/mode-toggle";
import { themeStore, setTheme } from "./stores/theme-store";
import { useStore } from "@nanostores/react";

function App() {
  const theme = useStore(themeStore);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        setTheme("system");
      }
    };

    setTheme(theme); // Initialize theme
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <>
      <main className="py-12 flex flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <HueRotationDemo />
      </main>
    </>
  );
}

export default App;
