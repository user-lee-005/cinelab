import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { ref: homeRef, inView: isHomeVisible } = useInView({
    threshold: 0.1,
  });

  return (
    <section
      id="home"
      className="relative flex flex-col-reverse md:flex-row items-center justify-around min-h-screen bg-gray-100 text-gray-800 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div
        ref={homeRef}
        className="relative z-10 flex flex-col items-center md:items-start justify-center px-4 sm:px-6 lg:px-8 max-w-2xl w-full mb-6 md:mb-0"
      >
        <h1
          className={`text-4xl sm:text-5xl font-extrabold mb-4 leading-tight transition-opacity duration-1000 ${
            isHomeVisible ? "opacity-100 animate-fade-in-title" : "opacity-0"
          }`}
        >
          Welcome to Cinelab!
        </h1>
        <p
          className={`text-base sm:text-xl leading-relaxed transition-opacity duration-1000 ${
            isHomeVisible ? "opacity-100 animate-fade-in-para" : "opacity-0"
          }`}
        >
          At Cinelab, we bring your visual storytelling to life with our
          state-of-the-art color grading and editing services. Whether you're
          working on a film, commercial, or social media content, our team is
          dedicated to enhancing the look and feel of your project to make it
          truly stand out. Discover how we can transform your footage into a
          captivating masterpiece.
        </p>
      </div>

      <img
        src="/Cinelab Logo.png"
        alt="Cinelab Logo"
        className={`w-64 sm:w-96 transition-transform duration-1000 ${
          isHomeVisible
            ? "transform translate-y-0 opacity-100 animate-slide-up"
            : "opacity-0 translate-y-4"
        } hover:scale-110`}
      />
    </section>
  );
};

export default Home;
