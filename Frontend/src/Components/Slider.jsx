import React, { useState, useEffect } from "react";

const images = [
    "https://www.shutterstock.com/image-photo/busy-diverse-professional-business-team-600nw-2380776443.jpg",
    "https://www.shutterstock.com/image-photo/young-team-manager-woman-talking-600nw-2414833253.jpg",  
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      style={{
        maxWidth: "100%",
        borderRadius: "1rem",
        overflow: "hidden",
        margin: "auto",
      }}
      className="2xl:w-[80%] 2xl:h-[75%] xl:h-[80%] lg:w-[70%] lg:h-[90%] md:w-[85%] md:h-[100%]"
    >
      <img
        src={images[currentIndex]}
        alt="Slide"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "1rem",
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default Slider;