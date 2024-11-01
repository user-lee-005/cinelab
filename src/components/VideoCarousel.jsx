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
  const [isLoaded, setIsLoaded] = useState(false); // Track if videos are loaded
  const timerRef = useRef(null);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const carouselRef = useRef(null); // Reference to carousel for lazy loading

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

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true); // Set videos as loaded once visible
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(nextSlide, videoDuration);

    return () => clearInterval(timerRef.current);
  }, [videoDuration]);

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          setCurrentTime(currentTime);
          setProgress((currentTime / duration) * 100);
        }
      }, 1000);
    } else {
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
    position: "relative",
  };

  return (
    <section
      ref={carouselRef} // Ref for Intersection Observer
      className={`relative flex flex-col items-center justify-center min-h-fit ${bgColor} ${textColor} py-14 sm:py-28`}
    >
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 leading-tight pb-4 sm:pb-6">
        {title}
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="relative flex justify-center">
          <div
            className={`flex-shrink-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2 sm:p-4 ${cardColor} p-8 rounded-lg shadow-lg transition-transform duration-1000`}
          >
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isLoaded && (
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
              )}

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

            <div className="relative w-full mt-2 sm:mt-4">
              <div className="w-full h-2 bg-gray-300 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(playerRef.current?.getDuration() || 0)}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-xl font-semibold mt-2 sm:mt-4">
              {videos[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {videos[currentSlide].description}
            </p>
          </div>
        </div>

        <button
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-blue-700 text-white p-1 sm:p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={prevSlide}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-blue-700 text-white p-1 sm:p-2 rounded-md bg-opacity-20 hover:bg-opacity-100 shadow-lg hover:bg-blue-900 transition-transform duration-300 transform hover:scale-110 hover:opacity-100"
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 flex space-x-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              currentSlide === index ? "bg-blue-700" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default VideoCarousel;
