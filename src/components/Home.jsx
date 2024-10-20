import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import DownloadButton from "./DownloadButton";

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
      className="relative flex items-center justify-around min-h-screen bg-gray-900 text-white overflow-hidden"
    >
      <div
        ref={homeRef}
        className="relative z-10 flex flex-col items-start justify-center px-8 max-w-2xl w-full"
      >
        <h1
          className={`text-5xl font-extrabold mb-4 leading-tight ${
            isHomeVisible ? "animate-fade-in-title" : "opactiy-0"
          }`}
        >
          Welcome to Cinelab!
        </h1>
        <p
          className={`text-xl leading-relaxed ${
            isHomeVisible ? "animate-fade-in-para" : "opacity-0"
          }`}
        >
          At Cinelab, we bring your visual storytelling to life with our
          state-of-the-art color grading and editing services. Whether you're
          working on a film, commercial, or social media content, our team is
          dedicated to enhancing the look and feel of your project to make it
          truly stand out. Discover how we can transform your footage into a
          captivating masterpiece.
        </p>
        <div>
          <DownloadButton link={"https://drive.google.com/file/d/1zxuahVcD-KAmtztvKAGzZnSIjdT_JMyp/view?usp=drive_link"} content={"View Brouchre"} displayIcon={"book"}/>
        </div>
      </div>

      <img
        src="/Cinelab Logo.png"
        alt="Cinelab Logo"
        className={`w-96 mb-6 ${
          isHomeVisible
            ? "animate-slide-up transform transition-transform duration-1000"
            : "opacity-0"
        } hover:scale-110`}
      />
    </section>
  );
};

export default Home;
