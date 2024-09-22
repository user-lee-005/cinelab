import {
  faArrowRightArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Testimonials = () => {
  const { ref: testimonialsRef, inView: isTestimonialsVisible } = useInView({
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "John Doe",
      role: "Filmmaker",
      quote:
        "Cinelab transformed my footage into a breathtaking masterpiece! Their attention to detail and color grading expertise brought my vision to life.",
      image: "/client1.jpg",
    },
    {
      name: "Sarah Brown",
      role: "Content Creator",
      quote:
        "The editing services were beyond my expectations. My video now looks polished and professional, ready for the world to see!",
      image: "/client2.jpg",
    },
    {
      name: "David Wilson",
      role: "Director",
      quote:
        "I've worked with many colorists, but Cinelab stands out with their creativity and technical skills. Highly recommend!",
      image: "/client3.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Slide changes every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section
      id="client-testimonials"
      ref={testimonialsRef}
      className="relative flex flex-col items-center justify-around min-h-fit bg-gray-900 text-white py-28"
    >
      <h2
        className={`text-4xl font-extrabold mb-2 leading-tight pb-6 ${
          isTestimonialsVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        Client Testimonials
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${
              currentSlide * (100 / testimonials.length)
            }%)`,
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-3 sm:p-4"
            >
              <div className="relative flex flex-col items-center bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3 sm:mb-4 object-cover border-4 border-blue-700"
                />
                <blockquote className="text-sm sm:text-lg italic mb-3 sm:mb-4">{`"${testimonial.quote}"`}</blockquote>
                <h3 className="text-base sm:text-xl font-semibold">
                  {testimonial.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={prevSlide}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Optional: Pagination or Navigation */}
      <div className="absolute bottom-8 flex space-x-2">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-blue-700" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
