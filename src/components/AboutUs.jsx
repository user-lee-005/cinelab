import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const { ref: aboutUsRef, inView: isAboutUsVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: whyUsRef, inView: isWhyUsVisible } = useInView({
    threshold: 0.1,
  });

  const teamMembersList = [
    {
      name: "Leela Venkatesh V",
      role: "Founder, Cheif Colorist",
      image: "Leela.jpg",
    },
  ];

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // setTeamMembers(getTeamMembersList());
    setTeamMembers(teamMembersList);
  }, []);

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-around min-h-screen bg-indigo-50 text-gray-900 overflow-hidden pb-20 pt-20"
      id="about-us"
    >
      {/* Team Members Section */}
      <div className="flex flex-col items-center md:items-start">
        <h2
          className={`text-4xl font-extrabold leading-tight transition-opacity duration-1000 ${
            isAboutUsVisible ? "opacity-100 animate-slide-in-left" : "opacity-0"
          }`}
        >
          Our Team
        </h2>
        {teamMembers.map((member, index) => (
          <div
            key={`member-${index + 1}`}
            className="flex flex-col items-center text-center mt-8 md:mt-12"
          >
            <div className="relative inline-block">
              <img
                src={`/${member.image}`}
                alt={member.name}
                className={`w-48 sm:w-64 md:w-80 transition-transform duration-1000 hover:scale-105 ${
                  isAboutUsVisible ? "animate-slide-up" : "opacity-0"
                }`}
              />
              <div className="absolute inset-0 bg-white bg-opacity-0"></div>
            </div>
            <p className="mt-4 text-lg font-semibold">{member.name}</p>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>

      {/* About Us and Why Us Section */}
      <div className="flex flex-col md:w-1/2 space-y-12">
        <div
          ref={aboutUsRef}
          className={`relative z-10 flex flex-col items-start justify-center px-8 max-w-2xl w-full transition-opacity duration-1000 ${
            isAboutUsVisible ? "opacity-100 animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className={`text-4xl font-extrabold mb-4 leading-tight ${
              isAboutUsVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            About Us
          </h2>
          <ul className="list-disc list-inside text-lg leading-relaxed space-y-3">
            <li>Experts in cinematic color grading and video editing</li>
            <li>Transforming raw footage into breathtaking visual stories</li>
            <li>Enhancing your content with state-of-the-art techniques</li>
            <li>Dedicated to making your projects stand out and inspire</li>
            <li>Your vision, brought to life with unmatched creativity</li>
          </ul>
        </div>

        <div
          ref={whyUsRef}
          className={`relative z-10 flex flex-col items-start justify-center px-8 max-w-2xl w-full transition-opacity duration-1000 ${
            isWhyUsVisible ? "opacity-100 animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className={`text-4xl font-extrabold mb-4 leading-tight ${
              isWhyUsVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            Why Us
          </h2>
          <ul className="list-disc list-inside text-lg leading-relaxed space-y-3">
            <li>Industry-leading expertise in color grading and editing</li>
            <li>Collaborative approach to ensure your vision is achieved</li>
            <li>
              Seamless integration of visual effects to elevate your content
            </li>
            <li>Tailored solutions to match your project’s unique needs</li>
            <li>Timely delivery with uncompromising quality</li>
            <li>Trusted by professionals in film, TV, and digital media</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
