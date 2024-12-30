import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const navigation = [
  { name: "Sign In", to: "/signIn" },
  { name: "Sign Up", to: "/signUp" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the login status from the Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // If the user is logged in, do not display the header
  if (isLoggedIn) {
    return null; // This will hide the header if the user is logged in
  }

  return (
    <nav className="bg-blue-950 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-white font-bold text-4xl">LEAPX</h1>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  "text-white hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={classNames(
                    "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-400 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
