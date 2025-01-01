import React from "react";
import { useNavigate } from "react-router-dom";
//import Venue from "../Pages/Venue";

const Ven = ({ Venue, city, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <div className="pb-1 bg-gradient-to-br from-blue-400 to-blue-900 overflow-hidden">
      <div className="p-3">
        <h2 className="text-2xl font-medium justify-normal items-start text-center font-serif">
          {Venue}
        </h2>
        <p className="mt-4 text-xl text-black-700 font-medium text-center">
          {city}
        </p>
      </div>
      <div className="pt-2 pb-2">
        <button className="btn2" onClick={() => navigate(navigateTo)}>
          Show
          <svg viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Venue_card() {
  return (
    <div className="py-3 flex flex-col items-center justify-center pb-10">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 text-center text-black pt-6 pb-2">
        "DETAILS OF THE VENUE"!!
        <div className="w-[100%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-4 mb-4"></div>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
        {/* Venue1 */}
        <div className="w-full h-full">
          <Ven Venue="ITC Royal Bengal" city="Kolkata" navigateTo="/" />
        </div>

        {/* Venue2 */}
        <div className="w-full h-full">
          <Ven Venue="The Grand Oberoi" city="Kolkata" navigateTo="/" />
        </div>

        {/* Venue3 */}
        <div className="w-full h-full">
          <Ven Venue="JW Marriott" city="Kolkata" navigateTo="/" />
        </div>

        {/* Venue4 */}
        <div className="w-full h-full">
          <Ven Venue="The Leela Palace" city="Bangalore" navigateTo="/" />
        </div>

        {/* Venue5 */}
        <div className="w-full h-full">
          <Ven Venue="Taj West End" city="Bangalore" navigateTo="/" />
        </div>

        {/* Venue6 */}
        <div className="w-full h-full">
          <Ven Venue="Conrad Pune" city="Pune" navigateTo="/" />
        </div>

        {/* Venue7 */}
        <div className="w-full h-full">
          <Ven Venue="Shantai Hotel" city="Pune" navigateTo="/" />
        </div>

        {/* Venue8 */}
        <div className="w-full h-full">
          <Ven Venue="Lemon Tree Hotel" city="Pune" navigateTo="/" />
        </div>

        {/* Venue9 */}
        <div className="w-full h-full">
          <Ven Venue="NovotelHyderabad" city="Hyderabad" navigateTo="/" />
        </div>

        {/* Venue10 */}
        <div className="w-full h-full">
          <Ven Venue="Amrutha Castle" city="Hyderabad" navigateTo="/" />
        </div>
      </div>
    </div>
  );
}
