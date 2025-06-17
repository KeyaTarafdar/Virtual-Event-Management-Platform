import React, { useEffect, useState } from "react";
import VirtualCard from "../Components/VirtualCard";
import { useNavigate } from "react-router-dom";
import { fetchIn_PersonEvents } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function InPersonEvent() {
  const navigate = useNavigate();
  const [in_personEvents, setin_personEvents] = useState([]);

  useEffect(() => {
    fetchIn_PersonEvents().then((events) => {
      if (events.success) {
        setin_personEvents(
          events.data.filter((event) => {
            const today = new Date();
            const currentDate = today.toISOString().split("T")[0];
            const currentTime = today.toTimeString().split(" ")[0];
            const eventDate = new Date(event.date).toISOString().split("T")[0];
            const registrationLastDate = new Date(event.lastDateOfRegistration)
              .toISOString()
              .split("T")[0];

            return (
              registrationLastDate >= currentDate && eventDate > currentDate
            );
          })
        );
      } else {
        alert(events.message);
      }
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
        <section className="text-center my-8 px-4 sm:px-8">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl text-blue-600 font-bold font-serif"
            style={{ fontFamily: "quick" }}
          >
            In-Person Events
          </h1>

          {/* Text and Image */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center mt-8">
            <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl mt-4 lg:mt-6 font-serif px-2 sm:px-4 md:px-8 lg:w-[66%] text-center lg:text-left">
              Join us for our upcoming in-person meetings, where you will have
              the opportunity to connect with industry professionals and
              like-minded individuals. These gatherings are designed to foster
              collaboration and inspire innovation.
              <br /> <br />
              You'll gain valuable insights into the latest trends and
              developments in the industry, while also exploring exciting
              opportunities for networking and partnership. Whether you are
              looking to enhance your skills, share knowledge, or simply engage
              with peers, our events offer a dynamic environment to exchange
              ideas and make meaningful connections. Don't miss out on the
              chance to be a part of these impactful meetings!
            </p>
            <div className="w-full lg:w-[30%] flex justify-center mb-6 lg:mb-0">
              <img
                className="h-48 sm:h-64 md:h-72 lg:h-72 object-contain"
                src="https://media.istockphoto.com/id/1385509455/vector/business-communication-concept.jpg?s=612x612&w=0&k=20&c=BqAT-opyxl84x3IKO4JMi6E8YB8AJIPU_7q49c8FojY="
                alt="inpersonevent"
              />
            </div>
          </div>

          {/* search div for md and sm screen------------------------- */}
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

          {/* Create Button */}
          <div className="mt-10">
            <p className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-950">
              WANT TO CREATE AN IN-PERSON MEETING?
            </p>
            <button
              className="btn1 p-3 sm:p-4 rounded-md mt-4 text-sm sm:text-base mx-auto bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => navigate("/CreateForm/in_person")}
            >
              Create Meeting
            </button>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="text-center mb-8 px-4" id="upcoming">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold">
            Our upcoming events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.isArray(in_personEvents) &&
              in_personEvents.map((item) =>
                item.eventType === "virtual" ||
                ((item.eventType === "in_person" ||
                  item.eventType === "hybrid") &&
                  item.isVanueConfirmed) ? (
                  <VirtualCard
                    eventType={item.eventType}
                    eventId={item._id}
                    name={item.eventName}
                    date={item.date}
                    organizer={item.ownerId ? item.ownerId.username : null}
                    venue={item.venue}
                    posterImage={item.posterImage ? item.posterImage.url : null}
                  />
                ) : null
              )}
          </div>
        </section>
      </div>

      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}

export default InPersonEvent;
