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

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];

function EventPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setevent] = useState({});

  const eventTags = [
    { label: "Event Name", value: event.eventName },
    {
      label: "Organized by",
      value: event.ownerId ? event.ownerId.username : null,
    },
    {
      label: "Date & Time",
      value: `${new Date(event.date).toLocaleDateString("en-GB")}, ${
        event.time
      }`,
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

  const handleCommentSubmit = () => {
    alert("Comment submitted!");
  };

  const handleReplyClick = () => {
    alert("Reply clicked!");
  };

  useEffect(() => {
    fetchSingleEvent(eventId).then((response) => {
      setevent(response);
    });
  }, []);

  const [user, setUser] = useState(null);
  const [registered, setregistered] = useState(false);

  useEffect(() => {
    findUser().then((response) => {
      setUser(response.username.split(" ")[0]);
      if (response.username) {
        checkUserIsRegisteredInEventOrNot(eventId).then((result) => {
          setregistered(result);
        });
      }
    });
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
        {/* Header Section */}

        <Navbar menuItems={headerMenuItems} />

        {/* Event Header with Image */}
        <div className="flex justify-between w-full max-w-4xl items-center">
          {event.posterImage ? (
            <img
              src={event.posterImage ? event.posterImage.url : null}
              alt={event.eventName}
              className="w-96 h-48 object-cover rounded-lg"
            />
          ) : (
            <ImageLoader />
          )}
          <div className="ml-8">
            {eventTags.map((item, index) => (
              <p key={index} className="text-lg font-medium">
                {item.label} : <span className="font-light">{item.value}</span>
              </p>
            ))}

            {registered ? (
  <button className="mt-6 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500">
    Registered
  </button>
) : (
  <button
    className="mt-6 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"
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
        <div className="w-full max-w-4xl mt-8">
          {descriptionTags.map((item, index) =>
            (event.eventType === "virtual" && item.label === "Venue") ||
            (event.eventType === "in_person" &&
              item.label === "Platform") ? null : (
              <p key={index} className="text-lg font-medium">
                {item.label} : <span className="font-light">{item.value}</span>
              </p>
            )
          )}
        </div>

      {/* Comment Section */}
      <CommentSection /> 

      {/* Footer Section */}
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </div>
    </>
  );
}

export default EventPage;
