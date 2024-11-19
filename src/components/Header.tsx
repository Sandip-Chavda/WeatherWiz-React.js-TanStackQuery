import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60 shadow-md dark:shadow-gray-700 dark:shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to={"/"}
          className="flex items-center gap-3 hover:scale-90 transition-all duration-500"
        >
          <img
            src="./assets/weatherlogo.png"
            alt="weatherapp logo"
            className="h-14"
          />
          <p className="text-3xl font-bold">
            Wetaher <span className="text-yellow-600">Wiz</span>
          </p>
        </Link>

        <div className="flex gap-4">
          <CitySearch />

          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-700 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all duration-300 hover:scale-110" />
            ) : (
              <Moon className="h-6 w-6 text-green-600 rotate-0 transition-all duration-300 hover:scale-110" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
