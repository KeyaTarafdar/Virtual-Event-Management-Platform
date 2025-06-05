import React, { } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";

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

  return (
    <>
      <div className="App">
        {/* Header Section */}
        <Navbar menuItems={headerMenuItems} />
        <section className="text-center my-8 px-4 sm:px-6 md:px-12 lg:px-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-800 font-bold font-serif">
            ITC ROYAL BENGAL
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">Kolkata</p>

          <div className="flex flex-col md:flex-row md:h-72 items-center md:items-start mt-6 gap-4">
            <div className="text-slate-500 text-base sm:text-lg lg:text-xl mt-4 md:mt-6 text-center md:text-left font-serif md:w-2/3 w-full md:pl-16">
              <p><strong>Owner Name:</strong> Mr. Gopal Bhar</p>
              <p><strong>Address:</strong> Sector 1, Salt Lake, Kolkata 700010</p>
              <p><strong>Maximum Head:</strong> 400</p>
              <p>
                <strong>Email ID:</strong>{" "}
                <a
                  href="mailto:itcroyalbengal@gmail.com"
                  className="text-blue-500 break-words"
                >
                  itcroyalbengal@gmail.com
                </a>
              </p>
              <p><strong>Contact:</strong> 6789045362</p>
            </div>

            <div className="md:w-1/3 w-full flex justify-center md:justify-end px-4 md:px-0">
              <img
                className="h-52 sm:h-60 md:h-72 w-auto object-cover"
                src="https://media.istockphoto.com/id/1344107024/photo/a-beautiful-cityscape-of-kolkata-showing-maa-flyover-and-itc-royal-bengal-hotel.jpg?s=1024x1024&w=is&k=20&c=OpHe6wBIW3a-LajbSkTkcTKNcn6gZyvEDu0yK-aH_5E="
                alt="venuedetails"
              />
            </div>
          </div>
        </section>

        {/* Hotel Description */}
        <section className="bg-white rounded-md p-6 mx-4 sm:mx-auto max-w-4xl w-full mt-6">
          <h2 className="text-lg sm:text-xl font-semibold">About the Hotel</h2>
          <p className="mt-2 text-gray-700 text-sm sm:text-base">
            Our hotel is one of the premium hotels and boasts luxury and comfort for all our guests. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non libero vitae nisi tincidunt facilisis.
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
