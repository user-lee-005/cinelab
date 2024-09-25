import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full p-4 flex flex-col items-center"
            >
              <div className="relative flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-1000 hover:scale-105">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-700"
                />
                <blockquote className="text-lg italic mb-4">{`"${testimonial.quote}"`}</blockquote>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </Slider>

        {/* Optional: You can keep the manual navigation buttons if desired */}
        {/* Uncomment below if you want to include manual navigation */}
        {/* 
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={prevSlide}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-700 text-white p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        */}
      </div>

      {/* Pagination indicators */}
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
