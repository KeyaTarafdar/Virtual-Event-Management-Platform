import { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";
import Company_card from "../Components/Company_card";
import Upcoming_event from "../Components/UpcomingEvents";
import FreqtQuestion from "../Components/FreqtQuestion";
import Gallery_Card from "../Components/Gallery_card";
import Event_card from "../Components/Event_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendar,
  faGlobe,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineSolution,
  AiOutlineAppstore,
  AiOutlineTeam,
  AiOutlineQuestionCircle,
  AiFillEdit,
} from "react-icons/ai";
import { fetchLastCreatedEvent, fetchCompanyDetails } from "../utils/utils";
import { useCompany } from "../context/companyContext/CompanyContext";
import { useUser } from "../context/userContext/UserContext";

const headerMenuItems = [
  { label: "Services", href: "services" },
  { label: "Features", href: "features" },
  { label: "Upcoming  Events", href: "upcoming" },
  { label: "Help", href: "freq" },
];

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "services", label: "Services", icon: AiOutlineSolution },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "collaborators", label: "Collaborators", icon: AiOutlineTeam },
  { href: "analytics", label: "Analytics", icon: AiFillEdit },
  { href: "freq", label: "Help", icon: AiOutlineQuestionCircle },
];

export default function Home() {
  const navigate = useNavigate();
  const { company, setCompany } = useCompany();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const [fetchingCompleted, setfetchingCompleted] = useState(false);
  const [lastEvent, setlastEvent] = useState({});
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const user = useUser();
  const isLoggedIn = !!user;

  useEffect(() => {
    fetchLastCreatedEvent().then((response) => {
      if (response.success) setlastEvent(response.data);
    });

    if (!company) {
      fetchCompanyDetails().then((response) => {
        setCompany(response);
      });
    }
    setfetchingCompleted(true);
  }, []);

  if (!fetchingCompleted) {
    return (
      <>
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      {/* Navbar ------------------------------------------------------------- */}
      <Navbar menuItems={headerMenuItems} />

      {/* Hero panel --------------------------------------------------------- */}
      <Header isLoggedIn={isLoggedIn} scrollToServices={scrollToServices} />

      {/* Event types -------------------------------------------------------- */}
      <div
        id="services"
        ref={servicesRef}
        className="bg-slate-900 h-auto px-8 rounded-[2rem] text-center mt-8 lg:mt-0 ml-12 mr-12"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
        }}
      >
        <Event_card />
      </div>

      <div id="features" className="justify-center items-center flex-col flex">
        {/* Features 1--------------------------------------------------------- */}
        <div className="flex flex-col text-center sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-row 2xl:flex 2xl:flex-row px-10 py-14 xl:py-24 items-center h-auto">
          <div className="grid grid-col-2 w-auto text-2xl sm:text-3xl md:text-4xl font-bold px-10 pb-8 animate-assembleText">
            Manage, promote, and track your event— all in one platform
          </div>
          <div className="px-10 text-md sm:text-lg">
            Maximize your event's potential with our powerful, all-in-one
            management solution. With{" "}
            <i>
              <strong
                style={{
                  color: "#1534a7",
                  fontSize: "2rem",
                  fontFamily: '"quick"',
                }}
              >
                {company?.companyName}{" "}
              </strong>
            </i>
            , you can effortlessly plan, execute, and evaluate your event's
            success. <br></br>
            <br></br>Simplify your workflow, amplify your impact, and leave a
            lasting impression on your attendees.
          </div>
        </div>

        {/* Upcoming events---------------------------------------------------------- */}
        <div id="upcoming" className="w-[85%]">
          <Upcoming_event
            eventId={lastEvent ? lastEvent._id : null}
            name={lastEvent ? lastEvent.eventName : null}
            des={lastEvent ? lastEvent.description : null}
            date={lastEvent ? lastEvent.date : null}
            time={lastEvent ? lastEvent.time : null}
            platform={lastEvent ? lastEvent.platform : null}
            venue={lastEvent ? lastEvent.city : null}
            poster={
              lastEvent
                ? lastEvent.posterImage
                  ? lastEvent.posterImage.url
                  : null
                : null
            }
          />
        </div>

        {/* Features 2 ------------------------------------------------------------ */}
        <div
          id="highlight"
          className=" px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 pb-16"
        >
          <div className="mt-[20rem] sm:mt-16 mb-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-2">
            {/* Image Slider Column */}
            <div id="imuu" className="flex justify-center rounded-lg">
              <Slider />
            </div>

            {/* Text Column */}
            <div className="flex flex-col text-center md:text-left 2xl:pt-[15%] 2xl:px-14 xl:pt-[12%] lg:pt-[10%]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] xl:text-6xl 2xl:text-7xl font-bold mb-4 font-serif">
                Discover Our Key Features
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[25px] lg:pt-5 md:pt-1">
                Explore the unique features that set us apart from the others.
                Our platform is designed to cater your every need, ensuring a
                seamless and successful event experience.
              </p>

              <div className="md:absolute 2xl:ml-[-17rem] xl:ml-[-10rem] lg:ml-[-10rem] md:ml-[-8rem] 2xl:mt-[25%] xl:mt-[20%] lg:mt-[21%] md:mt-[30%] sm:m-auto">
                <div className="py-2 2xl:w-[450px] xl:w-[400px] lg:w-[380px] md:w-[360px] sm:w-[370px] 2xl:h-14 xl:h-11 sm:h-12 bg-gradient-to-r from-slate-800 via-blue-700 to-cyan-700 rounded-3xl mt-5 text-white text-2xl flex justify-center items-center">
                  Easy management and tracking
                </div>
                <div className="py-2 2xl:w-[350px]  xl:w-[300px] lg:w-[280px] md:w-[280px] sm:w-[100%] 2xl:h-14 xl:h-11 sm:h-12 bg-gradient-to-r from-slate-800 via-blue-700 to-cyan-700 rounded-3xl mt-5 text-white text-2xl flex justify-center items-center">
                  Various Event Modes
                </div>
                <div className="py-2 2xl:w-[250px]  xl:w-[240px] lg:w-[230px] md:w-[220px] sm:w-[100%] 2xl:h-14 xl:h-11 sm:h-12 bg-gradient-to-r from-slate-800 via-blue-700 to-cyan-700 rounded-3xl mt-5 text-white text-2xl flex justify-center items-center">
                  Event promotions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery card */}
        <Gallery_Card />

        {/* Company name ------------------------------------------------------------ */}
        <div className="h-auto w-[85%]">
          <h1 className="text-center mt-[4rem] text-4xl md:text-6xl font-bold">
            Our Collaborators
          </h1>
          <Company_card />
        </div>

        {/* Analytics ---------------------------------------------------------------------- */}
        <div
          id="analytics"
          className="grid-cols-2 md:grid-cols-4 grid w-[90%] bg-gradient-to-r from-slate-900 to-blue-800 h-auto rounded-xl text-white items-center justify-center md:py-10"
        >
          <div className="flex flex-col h-full justify-center m-auto py-10 w-[40%]">
            <div>
              <FontAwesomeIcon
                icon={faCalendarCheck}
                style={{ color: "#ffffff" }}
              />
            </div>
            <div className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold">
              100,000+
            </div>
            <div>Events</div>
          </div>
          <div className="flex flex-col h-full justify-center m-auto py-10 w-[40%]">
            <div>
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#ffffff" }} />
            </div>
            <div className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold">
              50,000+
            </div>
            <div>Event Planner</div>
          </div>
          <div className="flex flex-col h-full justify-center m-auto py-10 w-[40%]">
            <div>
              <FontAwesomeIcon icon={faGlobe} style={{ color: "#ffffff" }} />
            </div>
            <div className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold">
              100+
            </div>
            <div>Country</div>
          </div>
          <div className="flex flex-col h-full justify-center m-auto py-10 w-[40%]">
            <div>
              <FontAwesomeIcon icon={faUsers} style={{ color: "#ffffff" }} />
            </div>
            <div className="2xl:text-4xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-bold">
              100K+
            </div>
            <div>Attendees</div>
          </div>
        </div>
      </div>

      {/* Get Started-------------------------------------------------------------------------------- */}
      <div className="flex flex-col items-center pt-20 w-[70%] sm:w-[40%] md:w-[45%] lg:w-[44%] xl:w-[36%] 2xl:w-[40%] text-center m-auto">
        <div className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-sans font-bold">
          Elevate your Events, elevate Our brand
        </div>
        <div className="h-[10%] w-[75%] hover:w-[76%] sm:w-[65%] sm:hover:w-[66%] md:w-[50%] md:hover:w-[51%] lg:w-[40%] lg:hover:w-[41%]">
          <button
            onClick={handleSignUpClick}
            className="mt-10 h-full w-full bg-blue-400 p-5 rounded-md font-bold 2xl:text-3xl xl:text-2xl md:text-2xl sm:text-xl text-xl hover:bg-blue-500"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Frequently asked question--------------------------------------------------------------- */}
      <FreqtQuestion />

      <Footer menuItems1={footerMenuItems} />
    </>
  );
}
