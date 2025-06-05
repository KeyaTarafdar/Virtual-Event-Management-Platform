import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { findUser } from "../utils/utils";

export default function Header({ isLoggedIn, scrollToServices }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    findUser().then((response) => {
      setUser(response.username ? response.username.split(" ")[0] : null);
    });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const firstName = parsedUser?.username?.split(" ")[0];
        setUser(firstName || null);
      } catch (err) {
        console.error("Invalid user in localStorage", err);
        setUser(null);
      }
    }
  }, []);
  

  const handleSignUpClick = () => {
    if (user) {
      navigate("/createform");
    } else {
      navigate("/login");
    }
  };

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleShowEventsClick = () => {
    if (isLoggedIn) {
      scrollToServices();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Hero  panel---------------------------------------------------------------------------------------------------------------------------------- */}
      <div className="hero flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[42rem] p-4 bg-gradient-to-b from-cyan-300 to-white  lg:bg-none lg:mb-[-4rem]">
        {/* hero-left */}
        <div className="lg:ml-12 hero-left lg:w-[55rem] lg:mt-0 mt-[5rem] pl-4 lg:pl-6 flex flex-col items-center lg:items-start lg:text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl mb-6 text-center lg:text-left font-serif">
            Crafting your experience
          </h1>
          <h1 className="font-bold font-serif text-center lg:text-left">
            <p
              className="text-gradient1 text-4xl xs:text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold h-32 pt-2"
              style={{ fontFamily: '"quick"' }}
            >
              Ready to get started&nbsp;?
            </p>
          </h1>
          <br />
          <h1 className="text-sm font-serif font-bold sm:font-normal sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-center lg:text-left mt-[-4rem] md:mt-[-3rem] lg:mt-[-3rem] xl:mt-[1px]">
            We make&nbsp;
            <TypeAnimation
              sequence={[
                "In-person meeting",
                3000,
                "Virtual meeting",
                3000,
                "Hybrid meeting",
                3000,
              ]}
              wrapper="span"
              speed={150}
              style={{
                fontSize: "1.5em",
                color: "#3d8cf2",
                display: "inline-block",
              }}
              repeat={Infinity}
            />
            &nbsp;for you
          </h1>
          <div className="text-slate-500 lg:text-xl mt-4 lg:mt-6 text-center lg:text-left font-serif">
            We specialize in organizing exquisite events, whether in-person,
            virtual, or hybrid mode, with flawless execution and attention to
            detail for upto 500 people.
          </div>
          <div className="flex justify-center gap-4 lg:gap-0 flex-col sm:flex-row w-full lg:w-[85%] mt-6 lg:mt-8 space-y-4 lg:space-y-0 lg:space-x-4 items-center lg:items-start">
            <div
              className="flex items-center justify-center w-[12rem] lg:w-[13rem] h-[3rem]"
              style={{ color: "#ffffff" }}
            >
              <button
                onClick={handleSignUpClick}
                className="flex btn1 justify-center items-center h-full w-full  p-4 rounded-full "
              >
                Create Events
              </button>
            </div>
            <div
              className="flex items-center justify-center w-[12rem] lg:w-[12rem] h-[3rem]"
              style={{ color: "#ffffff" }}
            >
              <button
                onClick={handleShowEventsClick}
                className="flex btn1 justify-center items-center h-full w-full p-4 rounded-full -mt-4 lg:mt-0"
              >
                Show Events
              </button>
            </div>
            <div
              className="flex items-center justify-center w-[80%] md:w-[40%] lg:w-[18rem] h-[3rem]"
              style={{ color: "#ffffff" }}
            >
              <button
                className="flex btn1 justify-center items-center h-full w-full p-4 rounded-full -mt-4 lg:mt-0"
                onClick={() => {
                  navigate("/venueregistering");
                }}
              >
                Register Your Venue
              </button>
            </div>
          </div>
        </div>

        {/* hero-right */}
        <div className=" hero-right lg:w-[45rem] hidden lg:block ">
          <img
            src="hero.png"
            alt="Hero"
            className="w-[600px] h-[400px] 2xl:w-[630px] xl:w-[600px] lg:w-[500px] 2xl:h-[500px] xl:h-[400px] lg:h-[350px] object-cover"
          />
        </div>
      </div>
    </>
  );
}