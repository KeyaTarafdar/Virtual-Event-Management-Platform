/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navabar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faEdit,
  faUser,
  faTimes,
  faEllipsisV,
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faPlus,
  faTowerBroadcast,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  findUser,
  fetchCompanyDetails,
  uploadProfilePicture,
} from "../utils/utils";
import { useCompany } from "../context/companyContext/CompanyContext";
import { useUser } from "../context/userContext/UserContext";

const headerMenuItems = [{ label: "Home", to: "/" }];

const CompanyPage = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTab, setSelectedTab] = useState("created");
  const { company, setCompany } = useCompany()
  const { user, setUser } = useUser()

  const handleCreateEventClick = () => {
    navigate("/createform");
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const setFileToBase = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSizeInKB = 30;

      if (file.size > maxSizeInKB * 1024) {
        alert(`File size should be less than ${maxSizeInKB} KB.`);
        return;
      }

      const imageData = await setFileToBase(file);

      uploadProfilePicture(imageData).then((response) => {
        if (response.success) {
          sessionStorage.setItem("user", JSON.stringify(response.data))
          setUser(response.data)
        }
        alert(response.message);
      });
    } else {
      alert("Please Upload an Image");
      return;
    }
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    if (menuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuVisible]);

  useEffect(() => {
    if (!company) {
      fetchCompanyDetails().then((response) => {
        sessionStorage.setItem("company", JSON.stringify(response))
        setCompany(response);
      });
    }
  }, []);

  const checkSlotConfirmation = (eventCreatedDate, slotConfirmedDate) => {
    const createdDate = new Date(eventCreatedDate);
    const confirmedDate = new Date(slotConfirmedDate);
    const timeDiff = confirmedDate - createdDate;
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const isSlotConfirmed = selectedEvent
    ? checkSlotConfirmation(
      selectedEvent.createdDate,
      selectedEvent.slotConfirmedDate
    )
    : false;

  const checkEventCompletion = (eventDate, slotConfirmedDate, createdDate) => {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);

    if (!slotConfirmedDate) {
      return false;
    }

    const isSlotConfirmed = checkSlotConfirmation(
      createdDate,
      slotConfirmedDate
    );

    return isSlotConfirmed && currentDate > eventDateObj;
  };

  // const [userProfile, setuserProfile] = useState();
  // const [createdEvents, setcreatedEvents] = useState([]);
  // const [appliedEvents, setappliedEvents] = useState([]);
  const [events, setevents] = useState([]);
  const [eventsCopy, seteventsCopy] = useState([]);

  useEffect(() => {
    if (!user) {
      findUser().then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response))
        setUser(response)
        setevents(response?.createdEvents)
      })
    } else {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setevents(user?.createdEvents)
    }
  }, []);

  return (
    <>
      <Navabar menuItems={headerMenuItems} />

      <div className="flex">
        {/* COMPANY DETAILS */}
        <div className="fixed top-[4.5rem] left-4 z-50  lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 h-8 w-8 bg-indigo-200 flex justify-center items-center rounded-full text-red-500  "
          >
            <FontAwesomeIcon
              icon={menuVisible ? faTimes : faEllipsisV}
              style={{ fontSize: "1.3rem" }}
              className="font-bold"
            />
          </button>
        </div>

        <div
          className={`fixed lg:z-10 z-40 top-16 left-0 bg-[#081647] text-white rounded-r-2xl rounded-br-2xl shadow-2xl p-4 flex flex-col items-center transition-transform duration-300 transform ${menuVisible ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 w-[18rem]`}
          style={{ height: "calc(100vh - 60px)" }}
        >
          <img
            src={
              user?.image?.url || "https://img.freepik.com/free-vector/natural-landscape-wallpaper-concept_23-2148650600.jpg"
            }
            alt="User Profile"
            className="rounded-full w-24 bg-gray-900 text-sm h-24 mb-4 shadow-lg border-[.4rem] border-indigo-400 sm:w-32 sm:h-32"
          />

          <label className="absolute top-[5.5rem] sm:top-[7.5rem] w-8 h-8 cursor-pointer flex justify-center items-center  bg-gray-600 rounded-full p-2">
            <FontAwesomeIcon icon={faEdit} className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <h2 className="text-md font-bold sm:text-lg">
            {user?.username}
          </h2>
          <div className="w-[90%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-4 mb-12"></div>

          <div className="flex flex-col text-left space-y-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-300" />
              <p className="text-xs sm:text-sm">
                {user?.email}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-300" />
              <p className="text-xs sm:text-sm">
                {user?.contact}
              </p>
            </div>
          </div>

          <div className="mt-auto w-[100%] flex flex-col text-xs items-center">
            <div className="w-[95%] border-b-2 border-gray-200 m-2 rounded-2xl mt-10 mb-4"></div>
            &copy;{company?.companyName}2024.
          </div>
        </div>

        {/* EVENT DETAILS */}
        <div
          className={` ${menuVisible ? "blur-sm lg:blur-none" : ""
            } mt-8 mb-8 w-full lg:w-4/6 ml-8 lg:ml-[24rem] mr-8 lgoverflow-y-auto space-y-4`}
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="mt-4 flex flex-row space-x-12 justify-center items-center mb-12">
            <h2
              className=" text-gradient2 text-3xl xds:text-3xl sm:text-5xl font-bold w-[80%]  "
              style={{ fontFamily: '"quick"' }}
            >
              Events &nbsp;Ground
            </h2>

            <button
              onClick={handleCreateEventClick}
              className="text-sm w-[12rem] xds:text-lg  sm:text-xl h-6 xds:h-8 sm:h-12  px-1 xds:px-2 sm:px-4 bg-indigo-600 hover:bg-indigo-500 text-white flex justify-center items-center font-bold rounded-md"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-white mr-2 font-bold"
              />
              Create Event
            </button>
          </div>

          <div className="flex mt-24 mr-12">
            <div
              onClick={() => {
                setSelectedTab("created");
                setevents(user?.createdEvents);
                seteventsCopy(user?.createdEvents);
              }}
              className={`text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h- px-1 xds:px-2 sm:px-4 flex justify-center items-center font-bold rounded-md cursor-pointer ${selectedTab === "created"
                ? "text-indigo-400"
                : "hover:text-indigo-800"
                }`}
            >
              Created Events
            </div>

            <div
              onClick={() => {
                setSelectedTab("participated");
                setevents(user?.appliedEvents);
                seteventsCopy(user?.appliedEvents);
              }}
              className={`text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h- px-1 xds:px-2 sm:px-4 flex justify-center items-center font-bold rounded-md cursor-pointer ${selectedTab === "participated"
                ? "text-indigo-400"
                : "hover:text-indigo-800"
                }`}
            >
              Participated Events
            </div>
          </div>

          <hr className="border-0 h-[2px] bg-gray-400 my-6"></hr>

          <div className="flex flex-row mr-12 justify-between space-x-4">
            {/* Search box */}
            <input
              type="text"
              placeholder="Search your events..."
              className=" mb-4 px-3 py-1 w-[50%] border-2 shadow-xl border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Buttons */}
            <div className="flex">
              <button
                onClick={() => {
                  setevents(
                    eventsCopy.filter((event) => {
                      const eventDate = new Date(event.date);
                      const today = new Date();

                      return eventDate >= today;
                    })
                  );
                }}
                className="text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h- px-1 xds:px-2 sm:px-4 bg-indigo-300 hover:bg-indigo-500 hover:text-white flex justify-center items-center font-bold rounded-md"
              >
                Upcoming Events
              </button>
              <button
                onClick={() => {
                  setevents(
                    eventsCopy.filter((event) => {
                      const eventDate = new Date(event.date);
                      const today = new Date();

                      return eventDate < today;
                    })
                  );
                }}
                className=" text-sm xds:text-lg ml-8 sm:text-lg h-6 xds:h-8 sm:h- px-1 xds:px-2 sm:px-4 bg-indigo-300 hover:bg-indigo-500 hover:text-white flex justify-center items-center font-bold rounded-md"
              >
                Past Events
              </button>
            </div>
          </div>

          <hr className="border-0 h-[2px] bg-gray-500 my-6"></hr>

          {Array.isArray(events) &&
            events.map((event, index) => (
              <div
                key={index}
                className="border-2 border-black mt-4 lg:ml-32 w-[100%] lg:w-[80%] h-auto bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                {/* Event Image */}
                <img
                  src={event.posterImage ? event.posterImage.url : null}
                  alt={event.eventName}
                  className="w-full md:w-60 h-auto rounded-md"
                  style={{ aspectRatio: "3 / 2" }}
                />

                {/* Event Info */}
                <div className="flex flex-col justify-center items-center w-full">
                  <h3 className="text-lg text-gradient1 xds:text-2xl mb-4 text-indigo-800 font-bold font-serif">
                    {event.eventName}
                  </h3>
                  <div className="flex justify-center items-center space-x-2 xds:space-x-8 sm:space-x-12 md:space-x-6 lg:space-x-8">
                    {/* Event Date */}
                    <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-sm lg:text-sm font-bold text-white">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="mr-2 text-indigo-800"
                      />
                      <span>{event.date.split("T")[0]}</span>
                    </div>

                    {/* Event Time */}
                    <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="mr-2 text-indigo-800"
                      />
                      <span>{event.time}</span>
                    </div>

                    {/* Location */}
                    {event.city && (
                      <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-2 text-indigo-800"
                        />
                        <span>{event.city}</span>
                      </div>
                    )}

                    {/* Platform */}
                    {event.platform && (
                      <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="mr-2 text-indigo-800"
                        />
                        <span>{event.platform}</span>
                      </div>
                    )}

                    {/* Event Type */}
                    <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                      <FontAwesomeIcon
                        icon={faTowerBroadcast}
                        className="mr-2 text-indigo-800"
                      />
                      {event.eventType === "in_person" && (
                        <span>In Person</span>
                      )}
                      {event.eventType === "virtual" && <span>Virtual</span>}
                      {event.eventType === "hybrid" && <span>Hybrid</span>}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-center items-center space-x-2 xds:space-x-8 sm:space-x-12 md:space-x-6 lg:space-x-8">
                    {/* Event transparency Type */}
                    <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 text-indigo-800"
                      />
                      <span>{event.isPublic ? "Public" : "Private"}</span>
                    </div>

                    <div className="flex items-center text-xs xds:text-md sm:text-lg md:text-xs lg:text-sm font-bold text-white">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="mr-2 text-indigo-800"
                      />
                      <span>{event.tillNowTotalRegistration}</span>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <button
                      className="btn1 mt-4 h-12 px-4 bg-indigo-600 text-white font-bold rounded-md"
                      onClick={() => openModal(event)}
                    >
                      Track Event
                    </button>

                    <button
                      className="btn1 mt-4 h-12 px-4 bg-indigo-600 text-white font-bold rounded-md"
                      onClick={() => openModal(event)}
                    >
                      Update Event Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {isModalVisible && selectedEvent && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleOutsideClick}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%]">
              <h2
                className="text-gradient1 text-4xl font-bold text-center mb-6"
                style={{ fontFamily: '"quick"' }}
              >
                Event Tracker
              </h2>
              <div className="relative">
                <div className="relative flex flex-col">
                  {/* Event Created */}
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${selectedEvent.createdDate
                        ? "bg-blue-600"
                        : "bg-gray-400"
                        } mr-2`}
                    ></div>
                    <span className="text-sm xds:text-lg font-bold">
                      Event Creation
                    </span>
                  </div>
                  <p className="text-green-500 text-sm ml-6">
                    Event created successfully
                  </p>
                  <div className="flex items-center ml-6">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-gray-500"
                    />
                    <span className="text-gray-500 text-sm">
                      {selectedEvent.createdDate}
                    </span>
                  </div>
                  <div
                    className={`w-1 ${selectedEvent.slotConfirmedDate
                      ? isSlotConfirmed || selectedEvent.completed
                        ? "bg-blue-600"
                        : "bg-gray-400"
                      : "bg-gray-400"
                      } h-16`}
                    style={{
                      marginLeft: "0.35rem",
                      marginRight: "1.5rem",
                      marginTop: "-2.8rem",
                    }}
                  ></div>

                  {/* Slot Confirmation */}
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${selectedEvent.slotConfirmedDate
                        ? isSlotConfirmed
                          ? "bg-blue-600"
                          : "bg-gray-400"
                        : "bg-gray-400"
                        } mr-2`}
                    ></div>
                    <span className="text-xs xds:text-lg font-bold">
                      Slot Confirmation (Within 24 hours)
                    </span>
                  </div>
                  {!selectedEvent.slotConfirmedDate ? (
                    <p className="text-yellow-500 text-sm ml-6">
                      Slot not yet decided
                    </p>
                  ) : !isSlotConfirmed && selectedEvent.createdDate ? (
                    <p className="text-red-500 text-sm ml-6">
                      Sorry! We failed to schedule a slot for you, and further
                      processing is not possible.
                    </p>
                  ) : (
                    <p className="text-green-500 text-sm ml-6">
                      Your slot has been successfully scheduled!
                    </p>
                  )}
                  <div className="flex items-center ml-6">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-gray-500"
                    />
                    <span className="text-gray-500 text-sm">
                      {selectedEvent.slotConfirmedDate || "N/A"}
                    </span>
                  </div>
                  <div
                    className={`w-1 ${checkEventCompletion(
                      selectedEvent.date,
                      selectedEvent.slotConfirmedDate,
                      selectedEvent.createdDate
                    )
                      ? "bg-blue-600"
                      : "bg-gray-400"
                      } h-16`}
                    style={{
                      marginLeft: "0.35rem",
                      marginRight: "1.5rem",
                      marginTop: "-2.8rem",
                    }}
                  ></div>

                  {/* Event Done */}
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${checkEventCompletion(
                        selectedEvent.date,
                        selectedEvent.slotConfirmedDate,
                        selectedEvent.createdDate
                      )
                        ? "bg-blue-600"
                        : "bg-gray-400"
                        } mr-2`}
                    ></div>
                    <span className="text-xs xds:text-lg font-bold">
                      Event Completion
                    </span>
                  </div>
                  {checkEventCompletion(
                    selectedEvent.date,
                    selectedEvent.slotConfirmedDate,
                    selectedEvent.createdDate
                  ) ? (
                    <p className="text-green-500 text-sm ml-6">
                      Event completed successfully
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm ml-6">
                      Event is not yet complete
                    </p>
                  )}
                </div>
              </div>

              <button
                className="mt-8 px-4 py-2 bg-red-600 text-white font-bold rounded-md w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
