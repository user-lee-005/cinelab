import React from "react";
import Slider from "react-slick";

const TeamCarousel = ({ teamMembers, isAboutUsVisible }) => {
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
    <div
      className={`relative w-full max-w-xl mx-auto ${
        isAboutUsVisible ? "animate-slide-up" : "opacity-0"
      }`}
    >
      <h2 className="text-4xl font-extrabold mb-4 text-center">
        Meet Our Team
      </h2>
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={`member-${index}`} className="text-center p-4">
            <div
              className="mx-auto"
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeamCarousel;
