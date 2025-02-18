"use client";  
import { Billboard as BillboardType } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import tinycolor from "tinycolor2";
import { FaVolumeUp, FaVolumeMute,FaPlay, FaPause } from "react-icons/fa"; // Importing React Icons

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const [textColor, setTextColor] = useState<string>("#FFFFFF");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Initially muted
  const [isLoaded, setIsLoaded] = useState(false); // Track if the video is loaded
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!data?.imageUrl) return;

    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "anonymous"; // Ensures the image is loaded with CORS support if it's from a different domain
    img.src = data?.imageUrl;

    img.onload = () => {
      const color = fac.getColor(img); // Get the average color of the image
      const bgColor = tinycolor(color.hex); // Convert to tinycolor object
      setTextColor(bgColor.isDark() ? "#FFFFFF" : "#000000"); // Adjust text color based on background color
    };
  }, [data?.imageUrl]); // Re-run the effect when the image URL changes

  const isVideo = data?.imageUrl?.endsWith(".mp4");

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted); // Toggle mute state
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true); // Mark video as loaded
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: !isVideo ? `url(${data?.imageUrl})` : undefined }} // Set background image only if it's not a video
      >
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted={isMuted} // Muted based on state
              playsInline
              onCanPlay={handleVideoLoad} // Trigger when the video is ready
            >
              <source src={data?.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-4 right-12 bg-transparent text-white border-none cursor-pointer"
              style={{ fontSize: "0.75rem" }} // Smaller play/pause button
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            {/* Sound Icon for Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-transparent text-white border-none cursor-pointer"
              style={{ fontSize: "0.75rem" }} // Smaller sound icon
            >
              {isMuted ?<FaVolumeMute /> : <FaVolumeUp />} {/* Same icon for mute/unmute */}
            </button>
            {/* "use client" label */}
            {isLoaded && (
  <div className="absolute bottom-4 left-4 top-2/3 w-full max-w-lg px-4">
    <div
      className="absolute bottom-4 left-4 top-10 text-xs sm:text-sm lg:text-base font-normal text-white opacity-90"
      style={{ color: textColor }}
    >
      {data.label && (() => {
        const match = data.label.match(/^(.*?[.?!])\s*(.+)/);
        return match ? (
          <>
            <strong>{match[1]}</strong>
            <br />
            <span className="mt-1 block">{match[2]}</span>
          </>
        ) : (
          <>{data.label}</>
        );
      })()}
    </div>
  </div>
)}

          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
            <div
              className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
              style={{ color: textColor }} // Apply dynamic text color
            >
              {data.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billboard;
