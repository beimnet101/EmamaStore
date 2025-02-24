"use client";

import { Billboard as BillboardType } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import tinycolor from "tinycolor2";
import { FaVolumeUp, FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const [textColor, setTextColor] = useState<string>("#FFFFFF");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!data?.imageUrl) return;

    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = data?.imageUrl;

    img.onload = () => {
      const color = fac.getColor(img);
      const bgColor = tinycolor(color.hex);
      setTextColor(bgColor.isDark() ? "#FFFFFF" : "#000000");
    };
  }, [data?.imageUrl]);

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
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: !isVideo ? `url(${data?.imageUrl})` : undefined }}
      >
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onCanPlay={handleVideoLoad}
            >
              <source src={data?.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-3 sm:bottom-4 right-6 sm:right-12 bg-transparent text-white border-none cursor-pointer"
              style={{ fontSize: "0.75rem" }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Sound Icon */}
            <button
              onClick={toggleMute}
              className="absolute bottom-3 sm:bottom-4 right-2 sm:right-4 bg-transparent text-white border-none cursor-pointer"
              style={{ fontSize: "0.75rem" }}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            {/* Billboard Label */}
            {isLoaded && (
              <div className="absolute bottom-6 left-4 w-full max-w-xs sm:max-w-lg px-2 sm:px-4">
                <div
                  className="text-xs sm:text-sm lg:text-base font-normal text-white opacity-90"
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
              className="font-bold text-2xl sm:text-5xl lg:text-6xl max-w-xs sm:max-w-xl"
              style={{ color: textColor }}
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

