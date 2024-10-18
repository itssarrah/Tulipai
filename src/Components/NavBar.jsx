import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-between items-center  shadow-md p-6 w-screen">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 scale-[1.8] pl-8" />
      </div>
      <ul className="flex space-x-[15rem] text-dark-blue font-medium text-xl ">
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
      <div className="flex space-x-8">
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
