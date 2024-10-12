import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

const VideoCarousel = ({ videos, title, bgColor, cardColor, textColor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoDuration, setVideoDuration] = useState(30000); // Default duration of 30 seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef(null);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === videos.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? videos.length - 1 : prevSlide - 1
    );
  };

  const handleVideoEnd = () => {
    nextSlide();
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration * 1000); // Convert to milliseconds
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    // Clear existing timer if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set up a new timer
    timerRef.current = setInterval(nextSlide, videoDuration);

    // Clean up timer on component unmount
    return () => clearInterval(timerRef.current);
  }, [videoDuration]);

  useEffect(() => {
    // Set up progress interval when video is playing
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          setCurrentTime(currentTime);
          setProgress((currentTime / duration) * 100);
        }
      }, 1000); // Update progress every second
    } else {
      // Clear progress interval when video is paused
      clearInterval(progressIntervalRef.current);
    }

    return () => clearInterval(progressIntervalRef.current);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const playerStyles = {
    width: videos[currentSlide]?.isVerticalVideo ? "50%" : "100%",
    height: videos[currentSlide]?.isVerticalVideo ? "90vh" : "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "relative", // Ensure overlay positions relative to this
  };

  return (
    <section
      className={`relative flex flex-col items-center justify-center min-h-fit ${bgColor} ${textColor} py-28`}
    >
      <h2 className="text-4xl font-extrabold mb-2 leading-tight pb-6">
        {title}
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="relative flex justify-center">
          <div
            className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 ${cardColor} p-8 rounded-lg shadow-lg transition-transform duration-1000`}
          >
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ReactPlayer
                ref={playerRef}
                url={videos[currentSlide].src}
                playing={isPlaying}
                controls={false}
                style={playerStyles}
                className="rounded-lg mb-4"
                onEnded={handleVideoEnd}
                onDuration={handleDuration}
              />

              {/* Overlay */}
              {hovered && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <button onClick={handlePlayPause} className="text-white">
                    <FontAwesomeIcon
                      icon={isPlaying ? faPause : faPlay}
                      size="2x"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Progress Bar with Timings */}
            <div className="relative w-full mt-4">
              <div className="w-full h-2 bg-gray-300 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className=" flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(playerRef.current?.getDuration() || 0)}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-4">
              {videos[currentSlide].title}
            </h3>
            <p className="text-sm text-gray-400">
              {videos[currentSlide].description}
            </p>
          </div>
        </div>

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
      </div>

      <div className="absolute bottom-8 flex space-x-2">
        {videos.map((_, index) => (
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

export default VideoCarousel;
