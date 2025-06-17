import { useState,useEffect } from "react";
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

  // const venues = [
  //   { id: 1, name: 'ITC Royal Bengal', location: 'Kolkata' },
  //   { id: 2, name: 'The Grand Oberoi', location: 'Kolkata' },
  //   { id: 3, name: 'JW Marriott', location: 'Kolkata' },
  //   { id: 4, name: 'The Leela Palace', location: 'Bangalore' },
  //   { id: 5, name: 'Taj West End', location: 'Bangalore' },
  //   { id: 6, name: 'Conrad Pune', location: 'Pune' },
  //   { id: 7, name: 'Shantai Hotel', location: 'Pune' },
  //   { id: 8, name: 'Lemon Tree Hotel', location: 'Pune' },
  //   { id: 9, name: 'NovotelHyderabad', location: 'Hyderabad' },
  //   { id: 10, name: 'Amrutha Castle', location: 'Hyderabad' },
  // ];

  const [allVenues, setallVenues] = useState([]);

  useEffect(() => {
    fetchAllVenues().then((response) => {
      setallVenues(response.data);
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
          <div className="text-7xl text-orange-950 font-bold font-serif flex items-center justify-center h-[40vh]">
            Venue Details!!
          </div>
        </div>
      </div>

      { /* Venue Details */}
      <div className="py-3 flex flex-col items-center justify-center pb-10">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 text-center text-black pt-6 pb-2">
          DETAILS OF THE VENUE!!
          <div className="w-[100%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-4 mb-4"></div>
        </h1>

        <div className="h-auto px-8 rounded-[2rem] text-center mt-8 lg:mt-0 ml-12 mr-12">
          <div className="flex flex-wrap justify-center items-center gap-5">
            {Array.isArray(allVenues) && 
            allVenues.map((venue) => (
              <Venue_card
                key={venue._id} name={venue.name} location={venue.city} />
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
