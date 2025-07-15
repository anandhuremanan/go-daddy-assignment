import { Link } from "react-router";
import { DarkMode } from "~/landing/components/darkMode";

export function Navbar() {
  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-20 lg:px-40">
      <Link to={"/"}>
        <img
          src="GoDaddy_logo.svg"
          alt="GoDaddy logo"
          className="w-30 h-10"
          loading="lazy"
        />
      </Link>
      <DarkMode />
    </header>
  );
}
