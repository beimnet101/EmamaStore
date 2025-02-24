"use client";
import { Tab } from '@headlessui/react';
import { useSwipeable } from 'react-swipeable';
import Image from "next/image";
import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";
import { useState } from "react";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle swipe gestures (only for mobile)
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length),
    touchEventOptions: { passive: false },
    trackMouse: false,
  });

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">

      {/* Mobile: Swipeable View */}
      <div {...handlers} className="sm:hidden relative w-full aspect-square">
        <Image
          src={images[currentIndex].url}
          alt="Swipeable Image"
          fill
          className="object-cover object-center"
        />

        {/* Swipe Indicators (Circles) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <span
              key={index}
              className={`transition-transform duration-300 rounded-full shadow-md ${
                currentIndex === index
                  ? "h-2 w-2 bg-gray-900 scale-125" // Active: Larger, dark gray for all contrasts
                  : "h-1 w-1 bg-gray-600" // Inactive: Dark gray and slightly smaller
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid Thumbnails */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>

      {/* Main Image (for Desktop) */}
      <Tab.Panels className="aspect-square w-full hidden sm:block">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>

    </Tab.Group>
  );
};

export default Gallery;
