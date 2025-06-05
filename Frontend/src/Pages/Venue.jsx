import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";
import Venue_card from "../Components/Venue_card";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function Venue() {
  const headerMenuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Contact", href: "contact" },
  ];

  const venues = [
    { id: 1, name: 'ITC Royal Bengal', location: 'Kolkata' },
    { id: 2, name: 'The Grand Oberoi', location: 'Kolkata' },
    { id: 3, name: 'JW Marriott', location: 'Kolkata' },
    { id: 4, name: 'The Leela Palace', location: 'Bangalore' },
    { id: 5, name: 'Taj West End', location: 'Bangalore' },
    { id: 6, name: 'Conrad Pune', location: 'Pune' },
    { id: 7, name: 'Shantai Hotel', location: 'Pune' },
    { id: 8, name: 'Lemon Tree Hotel', location: 'Pune' },
    { id: 9, name: 'NovotelHyderabad', location: 'Hyderabad' },
    { id: 10, name: 'Amrutha Castle', location: 'Hyderabad' },
  ];

  return (
    <>
      <div className="App">
        {/* Header Section */}
        <Navbar menuItems={headerMenuItems} />
        <div
          style={{
            backgroundImage:
              "url(https://media.istockphoto.com/id/910193030/photo/modern-minimalist-villa.jpg?s=612x612&w=0&k=20&c=xDSV332OhNpQaBGRTSExfjSgJJ5Lmdgh9p479mQ4fkw=)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "40vh",
            width: "100%",
          }}
        >
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-950 font-bold font-serif flex items-center justify-center h-[40vh] text-center px-2">
            Venue Details!!
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="py-3 flex flex-col items-center justify-center pb-10 px-4 sm:px-6 md:px-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-black pt-6 pb-2">
          DETAILS OF THE VENUE!!
          <div className="w-full h-1 border-b-4 border-yellow-400 mt-2 mb-4 rounded-2xl"></div>
        </h1>

        <div className="w-full rounded-[2rem] text-center mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-2 sm:px-4">
            {venues.map((Venue) => (
              <Venue_card
                key={Venue.id}
                name={Venue.name}
                location={Venue.location}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}
export default Venue;
