import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getTeamMembersList } from "../service/Service";

const AboutUs = () => {
  const { ref: aboutUsRef, inView: isAboutUsVisible } = useInView({
    threshold: 0.1,
  });
  const { ref: whyUsRef, inView: isWhyUsVisible } = useInView({
    threshold: 0.1,
  });

  // const teamMembersList = [
  //   {
  //     name: "Leela Venkatesh V",
  //     role: "Founder, Cheif Colorist",
  //     image: "Leela.jpg",
  //   },
  // ];

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamMembersList = await getTeamMembersList();
        console.log(teamMembers);
        setTeamMembers(teamMembersList || []);
      } catch (error) {
        console.error("Error fetching team members", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section
      className="relative flex flex-col lg:flex-row items-center justify-around min-h-screen bg-gray-900 text-white overflow-hidden pb-20 pt-20"
      id="about-us"
    >
      <div>
        <h2
          className={`text-4xl text-center font-extrabold leading-tight ${
            isAboutUsVisible ? "animate-slide-in-left" : "opacity-0"
          }`}
        >
          Our Team
        </h2>
        {teamMembers?.length > 0 &&
          teamMembers?.map((member, index) => (
            <div key={`member-${index + 1}`}>
              <div className="relative inline-block">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-96 mt-12 transform transition-transform block duration-1000 hover:scale-105 ${
                    isAboutUsVisible ? "animate-slide-up" : "opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-white bg-opacity-0"></div>
              </div>
              <p>{member.name}</p>
              <p>{member.role}</p>
            </div>
          ))}
      </div>
      <div className="flex flex-col mt-8 lg:mt-0">
        <div
          ref={aboutUsRef}
          className={`relative z-10 flex flex-col items-start justify-center px-8 max-w-2xl w-full mb-12 ${
            isAboutUsVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className={`text-2xl lg:text-4xl font-extrabold mb-4 leading-tight ${
              isAboutUsVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            About Us
          </h2>
          <ul
            className={`list-disc list-inside text-sm lg:text-lg leading-relaxed space-y-3 ${
              isAboutUsVisible ? "animate-fade-in-para" : "opacity-0"
            }`}
          >
            <li>Experts in cinematic color grading and video editing</li>
            <li>Transforming raw footage into breathtaking visual stories</li>
            <li>Enhancing your content with state-of-the-art techniques</li>
            <li>Dedicated to making your projects stand out and inspire</li>
            <li>Your vision, brought to life with unmatched creativity</li>
          </ul>
        </div>

        <div
          ref={whyUsRef}
          className={`relative z-10 flex flex-col items-start justify-center px-8 max-w-2xl w-full ${
            isWhyUsVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className={`text-2xl lg:text-4xl font-extrabold mb-4 leading-tight ${
              isWhyUsVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            Why Us
          </h2>
          <ul
            className={`list-disc list-inside text-sm lg:text-lg leading-relaxed space-y-3 ${
              isWhyUsVisible ? "animate-fade-in-para" : "opacity-0"
            }`}
          >
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
