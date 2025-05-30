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
        <section className="text-center my-8 p-8">
          <h1
            className="text-7xl text-blue-600 font-bold font-serif "
            style={{ fontFamily: '"quick"' }}
          >
            In-Person Events
          </h1>
          <div className="flex h-72 items-center">
            <p className="text-slate-500 lg:text-xl mt-4 lg:mt-6 text-center lg:text-left font-serif w-[66%] pl-16">
              Join us for our upcoming in-person meetings, where you will have
              the opportunity to connect with industry professionals and
              like-minded individuals. These gatherings are designed to foster
              collaboration and inspire innovation.
              <br /> <br /> You'll gain valuable insights into the latest trends
              and developments in the industry, while also exploring exciting
              opportunities for networking and partnership. Whether you are
              looking to enhance your skills, share knowledge, or simply engage
              with peers, our events offer a dynamic environment to exchange
              ideas and make meaningful connections. Don't miss out on the
              chance to be a part of these impactful meetings!
            </p>
            <div className=" w-[30%] ml-auto flex justify-end pr-13">
              <img
                className="h-72"
                src="https://media.istockphoto.com/id/1385509455/vector/business-communication-concept.jpg?s=612x612&w=0&k=20&c=BqAT-opyxl84x3IKO4JMi6E8YB8AJIPU_7q49c8FojY="
                alt="inpersonevent"
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
              WANT TO CREATE A IN-PERSON MEETING?
            </p>
            <button
              className="btn1 justify-center items-center p-4 rounded-md mt-7"
              onClick={() => navigate("/CreateForm/in_person")}
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
