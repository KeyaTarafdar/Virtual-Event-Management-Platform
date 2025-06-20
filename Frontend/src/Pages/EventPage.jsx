import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  findUser,
  fetchSingleEvent,
  checkUserIsRegisteredInEventOrNot,
} from "../utils/utils";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";
import ImageLoader from "../Components/ImageLoader1";
import CommentSection from "../Components/CommentSection";
import { useUser } from "../context/userContext/UserContext";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function EventPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { user, setUser } = useUser();

  const [event, setevent] = useState({});

  const eventTags = [
    { label: "Event Name", value: event.eventName },
    {
      label: "Organized by",
      value: event.ownerId ? event.ownerId.username : null,
    },
    {
      label: "Date & Time",
      value: `${new Date(event.date).toLocaleDateString("en-GB")}, ${event.time}`,
    },
    { label: "Speaker", value: event.speaker },
    {
      label: "Paid Amount",
      value: event.payableAmount ? event.payableAmount : "Free",
    },
    { label: "Total Seats", value: event.headcount },
  ];

  const descriptionTags = [
    { label: "Platform", value: event.platform },
    { label: "Venue", value: event.city },
    { label: "Description", value: event.description },
    {
      label: "Remaining Seats",
      value: event.headcount - event.tillNowTotalRegistration,
    },
    {
      label: "Last Date of Registration",
      value: new Date(event.lastDateOfRegistration).toLocaleDateString("en-GB"),
    },
    { label: "Rules & Regulations", value: event.rules },
  ];

  const [scrollDirection, setScrollDirection] = useState(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const direction = scrollTop > 100 ? "down" : "up";
    if (scrollDirection !== direction) {
      setScrollDirection(direction);
    }
  };

  const [buttonCursor, setbuttonCursor] = useState("cursor-pointer");

  useEffect(() => {
    fetchSingleEvent(eventId).then((response) => {
      setevent(response.data);
      const today = new Date();
      const currentDate = today.toISOString().split("T")[0];
      const registrationLastDate = new Date(
        response.data.lastDateOfRegistration
      )
        .toISOString()
        .split("T")[0];
      if (registrationLastDate < currentDate) {
        setbuttonCursor("cursor-not-allowed");
      }
    });
  }, []);

  const [registered, setregistered] = useState(false);

  useEffect(() => {
    if (!user) {
      findUser().then((response) => {
        setUser(response);
        if (response.username) {
          checkUserIsRegisteredInEventOrNot(eventId).then((result) => {
            setregistered(result);
          });
        }
      });
    } else {
      checkUserIsRegisteredInEventOrNot(eventId).then((result) => {
        setregistered(result);
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection]);

  const headerMenuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <>
      <div className="flex flex-col items-center pt-10">
        {/* Full-width Navbar */}
        <div className="w-full">
          <Navbar menuItems={headerMenuItems} />
        </div>

        {/* Event Header with Image */}
        <div className="flex flex-col lg:flex-row justify-between w-full max-w-4xl items-center lg:items-start px-4 sm:px-6">
          {event.posterImage ? (
            <img
              src={event.posterImage ? event.posterImage.url : null}
              alt={event.eventName}
              className="w-full sm:w-96 h-48 object-cover rounded-lg"
            />
          ) : (
            <ImageLoader />
          )}
          <div className="mt-6 lg:mt-0 lg:ml-8 w-full lg:w-1/2">
            {eventTags.map((item, index) => (
              <p
                key={index}
                className="text-base sm:text-lg font-medium mb-1"
              >
                {item.label} :{" "}
                <span className="font-light break-words">{item.value}</span>
              </p>
            ))}

            {registered ? (
              <button className="mt-6 w-full sm:w-auto bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500">
                Registered
              </button>
            ) : (
              <button
                className="mt-6 w-full sm:w-auto bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
                onClick={() => {
                  if (user) {
                    navigate(`/registrationform/${eventId}`);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Register Now
              </button>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full max-w-4xl mt-8 px-4 sm:px-6">
          {descriptionTags.map((item, index) =>
            (event.eventType === "virtual" && item.label === "Venue") ||
            (event.eventType === "in_person" && item.label === "Platform") ? null : (
              <p
                key={index}
                className="text-base sm:text-lg font-medium mb-1"
              >
                {item.label} :{" "}
                <span className="font-light break-words">{item.value}</span>
              </p>
            )
          )}
        </div>

        {/* Comment Section */}
        <div className=" w-full max-w-4xl mt-8 px-4 sm:px-6">
          <CommentSection />
        </div>

        {/* Full-width Footer */}
        <div className="w-full mt-10" id="contact">
          <Footer menuItems1={footerMenuItems} />
        </div>
      </div>
    </>
  );
}

export default EventPage;
