import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";
import Venue_card from "../Components/Venue_card";
import { fetchAllVenues } from "../utils/utils";

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

  const [allVenues, setallVenues] = useState([]);

  useEffect(() => {
    fetchAllVenues().then((response) => {
      if (response.success) setallVenues(response.data);
    });
  }, []);

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
            {Array.isArray(allVenues) &&
              allVenues.map((venue) => (
                <Venue_card
                  key={venue._id}
                  id={venue._id}
                  name={venue.name}
                  location={venue.city}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}
export default Venue;
