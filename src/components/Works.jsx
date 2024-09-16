import React from "react";
import VideoCarousel from "./VideoCarousel";

const editedVideos = [
  {
    src: "/Videos/story.mp4",
    title: "Short Films",
    description:
      "This scene, crafted from stock footage, showcases cinematic standard edits, reflecting the exceptional quality and professionalism that can elevate your short films.",
  },
  {
    src: "/Videos/Untitled.mov",
    title: "Content Creation and Promo Videos",
    description:
      "At Cinelab, our promo videos are crafted to captivate and impress. With expert editing and precise color grading, we bring your brand’s vision to life, making every project visually stunning and impactful.",
  },
  // Add more videos as needed
];

const gradedVideos = [
  {
    src: "/Videos/FeinWithWatermark.mp4",
    title: "Log to Grade",
    description:
      "This is a drone shot that we changed from the log footage to a graded one elevating the feel of the scene and the scenary",
  },
  // {
  //   src: "/path/to/graded-video2.mp4",
  //   title: "Graded Video 2",
  //   description: "Description of Graded Video 2",
  // },
  // Add more videos as needed
];

const Works = () => {
  return (
    <div id="our-work">
      <VideoCarousel
        videos={editedVideos}
        title="Edited Videos"
        bgColor="bg-gray-900"
        cardColor="bg-gray-800"
        textColor="text-white"
      />
      <VideoCarousel
        videos={gradedVideos}
        title="Graded Videos"
        bgColor="bg-gray-800"
        cardColor="bg-gray-900"
        textColor="text-white"
      />
    </div>
  );
};

export default Works;
