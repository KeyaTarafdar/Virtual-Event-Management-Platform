import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Gallery_Card() {
  const slides = [
    {
      type: "image",
      src: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/4427553/pexels-photo-4427553.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/7491312/7491312-sd_640_360_30fps.mp4",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3183159/pexels-photo-3183159.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/7617182/7617182-sd_640_360_24fps.mp4",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/7643888/pexels-photo-7643888.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/2977547/pexels-photo-2977547.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/1181360/pexels-photo-1181360.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/7652967/7652967-sd_640_360_25fps.mp4",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      type: "image",
      src: "https://images.pexels.com/photos/1181625/pexels-photo-1181625.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full" id="gallery">
      <div className="px-4 bg-slate-900 items-center sm:m-auto w-full flex-wrap">
        <div className="h-auto w-100 flex flex-wrap flex-col items-center text-center px-10 pt-8">
          {/* Gallery header */}
          <div className="w-full h-auto flex flex-wrap flex-col items-center">
            <p className="text-indigo-400 font-bold text-3xl md:text-4xl text-center">
              "Our Gallery"
            </p>
            <div className="w-36 h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-4 mb-12"></div>
            <div className="text-indigo-200 font-bold text-2xl md:text-3xl text-center italic">
              Meet our clients from all over the world!
            </div>
          </div>
          {/* End gallery header */}

          <div className="max-w-[1500px] h-auto w-full m-auto py-20 px-2 sm:px-4 relative group">
            <div className="slider flex overflow-hidden items-center justify-center gap-4">
              {slides
                .slice(currentIndex, currentIndex + 3)
                .map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="slider flex-shrink-0 justify-center items-center border-white border-2 rounded-xl p-4 w-[280px] sm:w-[380px] md:w-[380px] 2xl:w-[400px] h-[230px] "
                  >
                    {slide.type === "image" ? (
                      <img
                        src={slide.src}
                        alt={`Slide ${slideIndex}`}
                        className="w-full h-48 object-cover hover:scale-105 duration-300 animate-fade-in"
                      />
                    ) : (
                      <video
                        src={slide.src}
                        controls
                        className="w-full h-48 object-cover hover:scale-105 duration-300 animate-fade-in"
                      ></video>
                    )}
                  </div>
                ))}
            </div>

            {/* Left Arrow */}
            <div
              className=" absolute top-[32%] transform translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-white/60 text-black cursor-pointer z-10"
              onClick={prevSlide}
            >
              <BsChevronCompactLeft size={30} />
            </div>

            {/* Right Arrow */}
            <div
              className="absolute top-[32%] transform translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-white/60 text-black  cursor-pointer z-10"
              onClick={nextSlide}
            >
              <BsChevronCompactRight size={30} />
            </div>

            <div className="flex top-4 mt-4 justify-center py-2 text-white">
              {slides.map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="xl:text-2xl sm:text-xl xs:text-md text-sm cursor-pointer"
                >
                  <RxDotFilled
                    className={`hover:text-yellow-200 ${
                      slideIndex === currentIndex ? "text-yellow-400" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}