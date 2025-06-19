import { useEffect, useState } from "react";
import VirtualCard from "../Components/VirtualCard";
import { useNavigate } from "react-router-dom";
import { fetchVirtualEvents } from "../utils/utils";
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

function VirtualEvent() {
  const navigate = useNavigate();
  const [virtualEvents, setvirtualEvents] = useState([]);

  useEffect(() => {
    fetchVirtualEvents().then((events) => {
      if (events.success) {
        setvirtualEvents(
          events.data
          // events.data.filter((event) => {
          //   const today = new Date();
          //   const currentDate = today.toISOString().split("T")[0];
          //   const eventDate = new Date(event.date).toISOString().split("T")[0];
          //   const registrationLastDate = new Date(event.lastDateOfRegistration)
          //     .toISOString()
          //     .split("T")[0];

          //   return eventDate >= currentDate;
          // })
        );
      } else {
        alert(events.message);
      }
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
        {/* Header */}
        <Navbar menuItems={headerMenuItems} />

        {/* Main Section */}
        <section className="text-center my-8 px-4 sm:px-6 md:px-8">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl text-blue-600 font-bold font-serif"
            style={{ fontFamily: "quick" }}
          >
            Virtual Events
          </h1>

          {/* Text + Image Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center mt-8">
            <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl mt-4 lg:mt-6 font-serif px-2 sm:px-4 md:px-8 lg:w-[66%] text-center lg:text-left">
              Join our virtual events to connect with industry experts, explore
              exciting opportunities, and expand your network—all from the
              comfort of home. Engage in insightful discussions, discover the
              latest trends, and collaborate with professionals in a dynamic
              online community.
              <br />
              <br />
              Whether you&apos;re looking to enhance your skills or broaden your
              connections, our events offer valuable insights and interactive
              experiences. Don’t miss out—participate in workshops, panels, and
              live sessions designed to help you grow personally and
              professionally.
            </p>
            <div className="w-full lg:w-[30%] flex justify-center mb-6 lg:mb-0">
              <img
                className="h-48 sm:h-64 md:h-72 lg:h-72 object-contain"
                src="https://img.freepik.com/free-vector/flat-happy-people-celebrate-birthday-online-party-via-internet_88138-908.jpg?w=996&t=st=1729426892~exp=1729427492~hmac=2c95422e579b3eed41d8a1a45f1607770d86d96f634223b841a5e3b6370cd776"
                alt="virtualevent"
              />
            </div>
          </div>

          {/* Search Bar (visible only on mobile/tablet) */}
          <div className="w-full max-w-md mx-auto mt-6 px-2 lg:hidden">
            <div className="relative w-full h-12">
              <input
                type="text"
                placeholder="Search for product reviews, FAQs and More..."
                className="w-full h-full px-4 rounded-full text-sm sm:text-base text-zinc-700 font-mono focus:outline-none shadow-md border-2 border-black"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-900 rounded-full w-10 h-10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white text-sm sm:text-base"
                />
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <p className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-950">
              WANT TO CREATE A VIRTUAL MEETING?
            </p>
            <button
              className="btn1 p-3 sm:p-4 rounded-md mt-4 text-sm sm:text-base mx-auto bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => navigate("/CreateForm/virtual")}
            >
              Create Meeting
            </button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="text-center mb-8 px-4" id="upcoming">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold">
            Our upcoming events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.isArray(virtualEvents) &&
              virtualEvents.map((item) => (
                <VirtualCard
                  key={item._id}
                  eventId={item._id}
                  name={item.eventName}
                  date={item.date}
                  organizer={item.ownerId ? item.ownerId.username : null}
                  platform={item.platform ? item.platform : null}
                  posterImage={item.posterImage ? item.posterImage.url : null}
                  lastDateOfRegistration={
                    item.lastDateOfRegistration
                      ? item.lastDateOfRegistration
                      : null
                  }
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

export default VirtualEvent;
