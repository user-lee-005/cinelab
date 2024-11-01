import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Logo and Description
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold">Cinelab</h1>
          <p className="text-sm mt-2">
            Bringing your visual stories to life with expert color grading and
            editing.
          </p>
        </div> */}

        {/* Navigation Links
        <nav className="mb-6 md:mb-0">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:underline">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav> */}

        {/* Contact Information */}
        <div className="flex flex-col items-start space-y-2 text-center md:text-left">
          <p className="text-sm flex items-center justify-center md:justify-start mt-2">
            <FontAwesomeIcon icon={faHouse} className="mr-2 mb-2 pb-3 md:mb-0 md:pb-0" />
            Kuniamuthur, Coimbatore, Tamil Nadu - 641008
          </p>
          <div className="flex flex-col space-y-1 md:space-x-4 md:flex-row">
            <p className="text-sm flex items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <a
                href="mailto:info.cinelab05@gmail.com"
                className="hover:underline ml-2"
              >
                info.cinelab05@gmail.com
              </a>
            </p>
            <p className="text-sm flex items-center">
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+1234567890" className="hover:underline ml-2">
                +91-9080675237
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-center order-last md:order-none">
          &copy; 2024 Cinelab. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 lg:ml-48">
          {/* <div className="relative group border-2 rounded-md">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 relative"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                className="relative z-10"
              />
              <span className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md"></span>
            </a>
          </div>
          <div className="relative group border-2 rounded-md">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 relative"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="relative z-10"
              />
              <span className="absolute inset-0 bg-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md"></span>
            </a>
          </div> */}
          <div className="relative group border-2 rounded-md m-4">
            <a
              href="https://www.instagram.com/_.cinelab._/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 relative"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className="relative z-10"
              />
              <span className="absolute inset-0 bg-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-md"></span>
            </a>
          </div>
        </div>
      </div>
      {/* 
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
      </div> */}
    </footer>
  );
};

export default Footer;
