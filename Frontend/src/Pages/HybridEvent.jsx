import { useEffect, useState } from "react";
import VirtualCard from "../Components/VirtualCard";
import { useNavigate } from "react-router-dom";
import { fetchHybridEvents } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  AiFillHome,
  AiOutlineAppstore,
  AiFillContacts,
} from "react-icons/ai";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function HybridEvent() {
  const navigate = useNavigate();
  const [hybridEvents, setHybridEvents] = useState([]);

  useEffect(() => {
    fetchHybridEvents().then((events) => {
      setHybridEvents(
        events.filter((event) => {
          const today = new Date();
          const currentDate = today.toISOString().split("T")[0];
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
    { label: "Upcoming Events", href: "upcoming" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      <div className="App">
        <Navbar menuItems={headerMenuItems} />

        {/* Hybrid Event Section */}
        <section className="text-center my-8 px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl text-blue-600 font-bold font-serif mb-6"
            style={{ fontFamily: "quick" }}
          >
            Hybrid Events
          </h1>

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0 lg:items-start lg:h-72">
            <p className="text-slate-500 text-base sm:text-lg lg:text-xl text-center lg:text-left font-serif w-full lg:w-2/3 lg:pl-16">
              Join us for our hybrid events that combine the best of in-person
              and virtual experiences. Engage with industry experts and fellow
              participants from anywhere, whether you're at the venue or joining
              remotely.
              <br />
              <br />
              Enjoy interactive sessions, valuable discussions, and ample
              networking opportunities that connect you to insights and
              innovations across the globe. Embrace the flexibility of hybrid
              events and be part of the future of gatherings!
            </p>
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end pr-0 lg:pr-6">
              <img
                className="h-64 sm:h-72 w-auto max-w-full object-contain"
                src="https://media.istockphoto.com/id/1306175866/vector/video-conference-theme.jpg?s=612x612&w=0&k=20&c=vtlB4uJdl3Cut5bx9BZRl5bJsBhhxJ9ivTUPgtB49NY="
                alt="hybridevent"
              />
            </div>
          </div>

          {/* Search bar (shown only on small/medium screens) */}
          <div className="max-w-lg mx-auto mt-6 lg:hidden h-16">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for product reviews, FAQs and More..."
                className="w-full h-full p-4 rounded-full text-sm sm:text-base text-zinc-700 font-mono focus:outline-none shadow-2xl border-2 border-black"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-900 rounded-full w-16 h-[2.67rem] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#ffffff" }}
                  className="text-lg"
                />
              </button>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xl sm:text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-950">
              WANT TO CREATE A HYBRID MEETING?
            </p>
            <button
              className="btn1 mt-5 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => navigate("/CreateForm/hybrid")}
            >
              Create Meeting
            </button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="text-center mb-12 px-4 sm:px-6 lg:px-8" id="upcoming">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6">
            Our upcoming events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(hybridEvents) &&
              hybridEvents.map((item) => (
                <VirtualCard
                  key={item._id}
                  eventId={item._id}
                  name={item.eventName}
                  date={item.date}
                  organizer={item.ownerId ? item.ownerId.username : null}
                  platform={item.platform}
                  venue={item.venue}
                  posterImage={item.posterImage ? item.posterImage.url : null}
                />
              ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}

export default HybridEvent;
