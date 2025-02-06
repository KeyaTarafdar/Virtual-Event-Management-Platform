import  { useEffect, useState } from "react";
import VirtualCard from "../Components/VirtualCard";
import { useNavigate } from "react-router-dom";
import { fetchHybridEvents } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function HybridEvent() {
  const navigate = useNavigate();

  const [hybridEvents, sethybridEvents] = useState([]);

  useEffect(() => {
    fetchHybridEvents().then((events) => {
      sethybridEvents(
        events.filter((event) => {
          const today = new Date();
          const currentDate = today.toISOString().split("T")[0];
         //const currentTime = today.toTimeString().split(" ")[0];
          const eventDate = new Date(event.date).toISOString().split("T")[0];
          const registrationLastDate = new Date(event.lastDateOfRegistration)
            .toISOString()
            .split("T")[0];

          return registrationLastDate >= currentDate && eventDate > currentDate;
        })
      );
    });
  }, []);

  const headerMenuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Upcoming  Events", href: "upcoming" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      <div className="App">
        {/* Header Section */}

        <Navbar menuItems={headerMenuItems} />

        {/* Hybrid Meeting Section */}
        <section className="text-center my-8 p-8">
          <h1
            className="text-7xl text-blue-600 font-bold font-serif "
            style={{ fontFamily: '"quick"' }}
          >
            Hybrid Events
          </h1>
          <div className="flex h-72 items-center">
            <p className="text-slate-500 lg:text-xl mt-4 lg:mt-6 text-center lg:text-left font-serif w-[66%] pl-16">
              Join us for our hybrid events that combine the best of in-person
              and virtual experiences. Engage with industry experts and fellow
              participants from anywhere, whether you&apos;re at the venue or joining
              remotely.
              <br />
              <br /> Enjoy interactive sessions, valuable discussions, and ample
              networking opportunities that connect you to insights and
              innovations across the globe. Embrace the flexibility of hybrid
              events and be part of the future of gatherings!
            </p>
            <div className="w-[30%] ml-auto flex justify-end pr-15">
              <img
                className="h-72 w-96"
                src="https://media.istockphoto.com/id/1306175866/vector/video-conference-theme.jpg?s=612x612&w=0&k=20&c=vtlB4uJdl3Cut5bx9BZRl5bJsBhhxJ9ivTUPgtB49NY="
                alt="hybridevent"
              />
            </div>
          </div>
          {/* search div for md and sm screen------------------------- */}
          <div className="max-w-lg relative m-auto mt-[0rem] flex flex-col lg:hidden h-16 md:h-16 sm:h-16 xs:h-16">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for product reviews, FAQs and More..."
                className="w-full h-full p-4 rounded-full text-sm sm:text-md text-zinc-700 font-mono focus:outline-none md:p-3 sm:p-3 xs:p-3 shadow-2xl border-2 border-black "
              />
              <button className="absolute right-[2px] top-1/2 transform -translate-y-1/2 bg-slate-900 rounded-full w-[4rem] h-[2.67rem]">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#ffffff" }}
                  className="text-xl  md:text-lg sm:text-base xs:text-sm"
                />
              </button>
            </div>
          </div>

          <div className="mt-[2%]">
            <p className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to- to-blue-950">
              WANT TO CREATE A HYBRID MEETING?
            </p>
            <button
              className="btn1 justify-center items-center p-4 rounded-md mt-7"
              onClick={() => navigate("/CreateForm/hybrid")}
            >
              Create Meeting
            </button>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="text-center mb-8" id="upcoming">
          <h2 className="text-3xl font-serif font-semibold">
            Our upcoming events
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8">
            {Array.isArray(hybridEvents) &&
              hybridEvents.map((item) => (
                <VirtualCard
                  key={item._id}
                  eventId={item._id}
                  name={item.eventName}
                  date={item.date}
                  organizer={item.ownerId ? item.ownerId.username : null}
                  platform={item.platform ? item.platform : null}
                  venue={item.venue ? item.venue : null}
                  posterImage={item.posterImage ? item.posterImage.url : null}
                />
              ))}
          </div>
        </section>
      </div>
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}

export default HybridEvent;
