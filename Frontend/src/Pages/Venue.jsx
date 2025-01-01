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
    { label: "Venues", href: "venuecard" },
    { label: "Contact", href: "contact" },
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
          <div className="text-7xl text-orange-950 font-bold font-serif flex items-center justify-center h-[40vh]">
            Venue Details!!
          </div>
        </div>
      </div>

      <div className="h-auto px-8 rounded-[2rem] text-center mt-8 lg:mt-0 ml-12 mr-12">
        <Venue_card />
      </div>
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}
export default Venue;
