import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { findSingleVenue } from "../utils/utils";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function Venue_Details() {
  const headerMenuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Contact", href: "contact" },
  ];

  const { venueId } = useParams();
  const [venue, setvenue] = useState(null);

  useEffect(() => {
    findSingleVenue(venueId).then((response) => {
      if (response.success) setvenue(response.data);
    });
  }, []);

  return (
    <>
      <div className="App">
        {/* Header Section */}
        <Navbar menuItems={headerMenuItems} />
        <section className="text-center my-8 px-4 sm:px-6 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-800 font-bold font-serif">
            {venue?.name}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
            {venue?.city}
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start mt-6 gap-4">
            <div className="text-slate-500 text-base sm:text-lg lg:text-xl mt-4 md:mt-6 text-center md:text-left font-serif md:w-2/3 w-full md:pl-16 flex flex-col gap-4">
              <p>
                <strong>Owner Name:</strong> {venue?.ownerName}
              </p>
              <p>
                <strong>Address:</strong> {venue?.address}
              </p>
              <p>
                <strong>Maximum Capacity:</strong> {venue?.maxCapacity}
              </p>
              <p>
                <strong>Email ID:</strong>{" "}
                <a
                  href={`mailto:${venue?.email}`}
                  className="text-blue-500 break-words"
                >
                  {venue?.email}
                </a>
              </p>
              <p>
                <strong>Contact:</strong> {venue?.contact}
              </p>
              <p>
                <strong>Multi-day Hall Booking Facility:</strong> {venue?.canOrganizeMultidayEvent ? "Yes" : "No"}
              </p>
              <div className="flex gap-20"><p>
                <strong>Projector:</strong> {venue?.projector ? "Yes" : "No"}
              </p>
                <p>
                  <strong>Broadband:</strong> {venue?.broadband ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-20"><p>
                <strong>1st Half Timing:</strong> {venue?.time_1stHalf[0]} to {venue?.time_1stHalf[1]}
              </p>
                <p>
                  <strong>1st Half Booking Price:</strong> {venue?.bookingPrice_1stHalf}
                </p>
              </div>
              <div className="flex gap-20"><p>
                <strong>2nd Half Timing:</strong> {venue?.time_2ndHalf[0]} to {venue?.time_2ndHalf[1]}
              </p>
                <p>
                  <strong>2nd Half Booking Price:</strong> {venue?.bookingPrice_2ndHalf}
                </p>
              </div>
              <div className="flex gap-20"><p>
                <strong>Fullday Timing:</strong> {venue?.time_fullDay[0]} to {venue?.time_fullDay[1]}
              </p>
                <p>
                  <strong>Fullday Booking Price:</strong> {venue?.bookingPrice_fullDay}
                </p>
              </div>
              <div className="flex gap-20"><p>
                <strong>Opening Time:</strong> {venue?.openingtime}
              </p>
                <p>
                  <strong>Closing Time:</strong> {venue?.closingtime}
                </p>
              </div>
            </div>

            <div className="md:w-1/3 w-full flex justify-center md:justify-end px-4 md:px-0">
              <img
                className="h-52 sm:h-60 md:h-72 w-auto object-cover"
                src={venue?.profilepicture?.url}
                alt="venuedetails"
              />
            </div>
          </div>
        </section>

        {/* Hotel Description */}
        <section className="bg-white rounded-md pt-3 pb-10 sm:mx-auto w-[84%]">
          <h2 className="text-lg sm:text-xl font-semibold">About the Hall</h2>
          <p className="mt-2 text-gray-700 text-sm sm:text-base">
            {venue?.description}
          </p>
        </section>
      </div>

      {/* Gallery Section */}
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}

export default Venue_Details;
