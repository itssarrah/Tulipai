import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center shadow-md p-6 w-screen z-20">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 scale-[1.8] pl-8" />
      </div>

      {/* Hamburger Menu Button */}
      <div className="md:hidden z-30">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:space-x-[6rem] xl:space-x-[15rem] text-dark-blue font-medium text-xl">
        <li>
          <a href="/" className="hover:text-mint-green transition duration-300">
            Home
          </a>
        </li>
        <li>
          <a
            href="/pricing"
            className="hover:text-mint-green transition duration-300"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="hover:text-mint-green transition duration-300"
          >
            About Us
          </a>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-[75%] shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-20 md:hidden`}
      >
        <ul className="flex flex-col items-start p-6 space-y-6 mt-12">
          <li>
            <a
              href="/"
              className="text-dark-blue font-medium text-xl hover:text-mint-green transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/pricing"
              className="text-dark-blue font-medium text-xl hover:text-mint-green transition duration-300"
              onClick={toggleMenu}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-dark-blue font-medium text-xl hover:text-mint-green transition duration-300"
              onClick={toggleMenu}
            >
              About Us
            </a>
          </li>

          <li>
            <Link to="/signup">
              <button
                className="px-4 py-2 bg-dark-blue text-white rounded-xl hover:bg-medium-blue transition duration-300"
                onClick={toggleMenu}
              >
                Sign Up
              </button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button
                className="underline px-4 py-2 text-dark-blue rounded-xl hover:bg-sky-blue hover:text-black transition duration-300"
                onClick={toggleMenu}
              >
                Log In
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex space-x-8">
        <Link to="/login">
          <button className="underline px-4 py-2 text-dark-blue rounded-xl hover:bg-sky-blue hover:text-black transition duration-300">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-dark-blue text-white rounded-xl hover:bg-medium-blue transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
