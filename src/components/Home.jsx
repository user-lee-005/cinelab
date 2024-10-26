import { useInView } from "react-intersection-observer";
import React from "react";
import DownloadButton from "./DownloadButton";

const Home = () => {
  const { ref: homeRef, inView: isHomeVisible } = useInView({
    threshold: 0.1,
  });

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-around min-h-screen bg-gray-900 text-white overflow-hidden px-4 md:px-8"
    >
      <div
        ref={homeRef}
        className="relative z-10 flex flex-col items-center md:items-start justify-center max-w-2xl w-full space-y-4 md:space-y-6 order-2 md:order-1 md:mt-24"
      >
        <h1
          className={`text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 leading-tight ${
            isHomeVisible ? "animate-fade-in-title" : "opacity-0"
          } text-center md:text-left`}
        >
          Welcome to Cinelab!
        </h1>
        <p
          className={`text-base md:text-xl leading-relaxed ${
            isHomeVisible ? "animate-fade-in-para" : "opacity-0"
          } text-center md:text-left px-2 md:px-0`}
        >
          At Cinelab, we bring your visual storytelling to life with our
          state-of-the-art color grading and editing services. Whether you're
          working on a film, commercial, or social media content, our team is
          dedicated to enhancing the look and feel of your project to make it
          truly stand out. Discover how we can transform your footage into a
          captivating masterpiece.
        </p>
        <div className="flex justify-center md:justify-start w-full">
          <DownloadButton
            link={
              "https://drive.google.com/file/d/1zxuahVcD-KAmtztvKAGzZnSIjdT_JMyp/view?usp=drive_link"
            }
            content={"View Brochure"}
            displayIcon={"book"}
          />
        </div>
      </div>

      <img
        src="/Cinelab Logo.png"
        alt="Cinelab Logo"
        className={`w-64 md:w-96 mb-6 md:mb-0 mt-10 md:mt-0 order-1 md:order-2 ${
          isHomeVisible
            ? "animate-slide-up transform transition-transform duration-1000"
            : "opacity-0"
        } hover:scale-110`}
      />
    </section>
  );
};

export default Home;
