import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";

const Carousal = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
      name: "1.AMBIENTEBELEUCHTUNG INKL.EINBAU ",
      p: "1.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      name: "2.AMBIENTEBELEUCHTUNG INKL.EINBAU",
      p: "2.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
      name: "3.AMBIENTEBELEUCHTUNG INKL.EINBAU",
      p: "3.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
      name: "4.AMBIENTEBELEUCHTUNG INKL.EINBAU",
      p: "4.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
      name: "4.AMBIENTEBELEUCHTUNG INKL.EINBAU",
      p: "4.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 1;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[550px] w-full m-auto  relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-bl-[100px] bg-center  bg-cover text-white duration-500"
      >
         <div
      className="absolute inset-0 bg-gradient-to-b from-black to-white opacity-20 -z-[1]"
    ></div>
        <div className="pl-10 pt-36 z-10">
          <div className="flex flex-col w-[500px] h-42 ">
            <h1 className=" leading-tight  max-w-lg font-bebas-neue text-4xl">
              <span className="block">{slides[currentIndex].name}</span>
            </h1>
            <p>{slides[currentIndex].p}</p>
          </div>

          <div className="flex flex-row space-x-8 mt-8">
            <button className="border-2 border-white rounded-[25px] p-2">
              {" "}
              Learn More
            </button>
            <button className="bg-blue-700 rounded-full p-1">
              <BiPlay size={40} />
            </button>
            <p className="mt-3">Watch Video</p>
          </div>
        </div>
        <div className="flex flex-row mt-[9rem] pl-[40px] pr-[20px] top-[80%]">
          0{currentIndex}
          <div className="w-1/4 ml-[20px]">
            <div className="h-2 mt-[10px] relative max-w-xl rounded-full overflow-hidden">
              <div className="w-full h-full bg-gray-500 opacity-90 absolute"></div>
              <div
                className="h-full bg-white absolute"
                style={{
                  width: `${((currentIndex + 1) * 100) / slides.length}%`,
                }}
              ></div>
            </div>
          </div>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentIndex ? "text-blue-500" : "text-gray-500"
              }`}
            ></div>
          ))}
          {/* Left Arrow */}
      <div className=" group-hover:block hover:bg-blue-700 hover:text-white absolute -translate-x-0 translate-y-[-50%] left-[77.25rem] text-2xl  p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className=" group-hover:block absolute hover:bg-blue-700 hover:text-white  -translate-x-0 translate-y-[-50%] right-5 text-2xl  p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
        </div>
      </div>

      

    </div>
  );
};

export default Carousal;
