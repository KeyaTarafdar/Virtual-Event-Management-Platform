import  { useEffect, useState } from "react";
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
      setvirtualEvents(
        events.filter((event) => {
          const today = new Date();
          const currentDate = today.toISOString().split("T")[0];
          // const currentTime = today.toTimeString().split(" ")[0];
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

        {/* Virtual Meeting Section */}
        <section className="text-center my-8 p-8">
          <h1
            className="text-7xl text-blue-600 font-bold font-serif "
            style={{ fontFamily: "quick" }}
          >
            Virtual Events
          </h1>
          <div className="flex h-72 items-center">
            <p className="text-slate-500 lg:text-xl mt-4 lg:mt-6 text-center lg:text-left font-serif w-[66%] pl-16">
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
            <div className=" w-[30%] ml-auto flex justify-end pr-5">
              <img
                className="h-72"
                src="https://img.freepik.com/free-vector/flat-happy-people-celebrate-birthday-online-party-via-internet_88138-908.jpg?w=996&t=st=1729426892~exp=1729427492~hmac=2c95422e579b3eed41d8a1a45f1607770d86d96f634223b841a5e3b6370cd776"
                alt="virtualevent"
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
              WANT TO CREATE A VIRTUAL MEETING?
            </p>
            <button
              className="btn1 justify-center items-center p-4 rounded-md mt-5"
              onClick={() => navigate("/CreateForm/virtual")}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-8">
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

export default VirtualEvent;
