import { faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <nav className="bg-custom-gradient w-full fixed top-0 left-0 z-50 animate-fade-in-nav">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home">
          <img src="/Cinelab Logo.png" alt="Logo" className="w-20" />
        </a>
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={showMenu ? faX : faBars}
            onClick={toggleMenu}
            className="text-3xl cursor-pointer"
            data-testid="fontAwesomIcon"
          />
        </div>
        <div className="hidden md:flex space-x-8 text-custom-gray">
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about-us" className="hover:text-gray-400">
            About Us
          </a>
          <a
            href="#our-work"
            className="hover:text-gray-400"
            onClick={toggleMenu}
          >
            Our Work
          </a>
          <a href="#client-testimonials" className="hover:text-gray-400">
            Client Testimonials
          </a>
          <a href="#contact-us" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
      </div>

      {showMenu && (
        <div className="md:hidden bg-gray-700">
          <a
            href="#home"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#about-us"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={toggleMenu}
          >
            About Us
          </a>
          <a
            href="#our-work"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Our Work
          </a>
          <a
            href="#client-testimonials"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Client Testimonials
          </a>
          <a
            href="#contact-us"
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
