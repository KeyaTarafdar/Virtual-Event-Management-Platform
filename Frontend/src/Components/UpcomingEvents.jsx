import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents({
  eventId,
  name,
  des,
  time,
  date,
  platform,
  venue,
  poster,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-slate-900 h-[40rem] md:h-[25rem] lg:h-[30rem] sm:px-32 py-20"></div>
      <div className="w-[80%] h-auto m-auto mt-[-35rem] md:mt-[-20rem] lg:mt-[-25rem] grid-cols-1 md:grid-cols-2 ">
        <div className="bg-gradient-to-r from-[#011936] to-[#243b55] h-[20%] py-10 text-white flex items-center md:justify-end justify-center md:pr-5 font-serif">
          <div
            className="lg:px-5 md:px-5 md:text-2xl text-right text-lg hover:text-blue-200 hover:cursor-pointer hover:text-[25px]"
            onClick={() => navigate(`/eventpage/${eventId}`)}
          >
            Explore Now
          </div>
          <div className="md:px-5 pl-4 hover:text-blue-200 hover:cursor-pointer text-white">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="hover:text-xl"
              onClick={() => navigate(`/eventpage/${eventId}`)}
            />
          </div>
        </div>
        <div className="bg-slate-200 grid grid-cols-1 md:grid-cols-2 md:px-5 px-5 py-5 items-center text-center md:h-[20rem] lg:h-[22rem] xl:h-[27rem] 2xl:h-[30rem]">
          <div className="mt-[-3.5rem] md:mt-[-6rem] lg:mt-[-7.5rem]">
            <img
              src={poster}
              alt={name}
              className="2xl:h-[75%] 2xl:w-[75%] xl:h-[80%] xl:w-[80%] lg:h-[85%] lg:w-[85%] md:h-[95%] md:w-[95%] sm:h-[95%] sm:w-[80%] h-[100%] w-[100%] m-auto  duration-500 hover:scale-105"
            ></img>
          </div>
          <div className="pt-5">
            <div className="h-full w-full pb-2">
              <span className="text-xl font-serif font-semibold ">Event:</span>{" "}
              {name}
              <br></br>
            </div>
            <div className="h-full w-full pb-2">
              <span className="text-xl font-serif font-semibold ">
                Description:
              </span>{" "}
              {des}
              <br></br>
            </div>
            <div className="h-full w-full pb-2">
              <span className="text-xl font-serif font-semibold ">Date:</span>{" "}
              {new Date(date).getDate().toString().padStart(2, "0") +
                "-" +
                (new Date(date).getMonth() + 1).toString().padStart(2, "0") +
                "-" +
                new Date(date).getFullYear()}
              <br></br>
            </div>
            <div className="h-full w-full pb-2">
              <span className="text-xl font-serif font-semibold ">Time:</span>{" "}
              {time}
              <br></br>
            </div>
            {venue ? (
              <div className="h-full w-full pb-2">
                <span className="text-xl font-serif font-semibold ">
                  Venue:
                </span>{" "}
                {venue}
                <br></br>
              </div>
            ) : null}

            {platform ? (
              <div className="h-full w-full pb-2">
                <span className="text-xl font-serif font-semibold ">
                  Platform:
                </span>{" "}
                {platform}
                <br></br>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
