import React, { useState, useEffect } from "react";
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
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useCompany } from "../context/companyContext/CompanyContext";
import { useUser } from "../context/userContext/UserContext";

import { useNavigate } from "react-router-dom";
import {
  findUser,
  fetchCompanyDetails,
  uploadProfilePicture,
  payVenue,
} from "../utils/utils";
import axios from "axios";

const headerMenuItems = [{ label: "Home", to: "/" }];

const EditableField = ({ label, value, onSave, type }) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState(value || "");

  const handleSave = () => {
    onSave(fieldValue);
    setEditMode(false);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-start md:items-center gap-3 w-full">
      <label className="w-full md:w-56 font-semibold text-sm md:text-base">
        {label} :-{" "}
      </label>

      {!editMode ? (
        <>
          <p className="w-[90%] md:w-[60%] text-green-700 font-bold shadow-[0_4px_10px_#e4f868] bg-blue-200 rounded-lg p-2 md:pl-8 border-blue-800 border-2 text-sm md:text-base break-words">
            {fieldValue}
          </p>
          <FontAwesomeIcon
            icon={faPen}
            className="cursor-pointer text-blue-600 text-base md:text-lg"
            onClick={() => setEditMode(true)}
          />
        </>
      ) : (
        <>
          <input
            type={type}
            className="flex-1 min-w-0 px-2 py-1 border rounded text-sm md:text-base"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className="cursor-pointer font-bold text-green-600 text-base md:text-lg"
            onClick={handleSave}
          />
        </>
      )}
    </div>
  );
};

const CompanyPage = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTab, setSelectedTab] = useState("created");
  const [isTrackModalVisible, setIsTrackModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const { company, setCompany } = useCompany();
  const { user, setUser } = useUser();

  const handleCreateEventClick = () => {
    navigate("/createform");
  };

  // const handleUpdateEventClick = () => {
  //   navigate("/rough");
  // };

  const openTrackModal = (event) => {
    console.log("event", event);
    setSelectedEvent(event);
    setIsTrackModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };

  const openUpdateModal = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalVisible(true);
  };

  const closeTrackModal = () => {
    setIsTrackModalVisible(false);
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
  const [image, setImage] = useState();

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
          sessionStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
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
        sessionStorage.setItem("company", JSON.stringify(response));
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

  const [events, setevents] = useState([]);
  const [eventsCopy, seteventsCopy] = useState([]);

  useEffect(() => {
    // if (!user) {
    findUser().then((response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      setevents(response?.createdEvents);
    });
    // } 
    // else {
    //   const user = JSON.parse(sessionStorage.getItem("user"));
    //   setevents(user?.createdEvents);
    // }
  }, []);

  const handleVenuePayment = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/users/create-order",
      {
        amount: Number(selectedEvent?.bill),
        currency: "INR",
        receipt: "receipt#1",
        notes: {},
      },
      { withCredentials: true }
    );

    const options = {
      key: "rzp_test_B9RwKdpPVSHcZx",
      amount: data.order.amount,
      currency: data.order.currency,
      name: "abc",
      description: "abcd",
      order_id: data.order.id,
      handler: async (response) => {
        let verifyResponse = await axios.post(
          "http://localhost:8000/users/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          { withCredentials: true }
        );
        if (verifyResponse.data.success) {
          payVenue(selectedEvent._id).then((response) => {
            if (response.success) setSelectedEvent(response.data);
          });
        } else {
          alert("Failed to register!");
        }
      },
      prefill: {
        name: "Rahul Jha",
        email: "rahul@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Navabar menuItems={headerMenuItems} />

      <div className="flex">
        {/* COMPANY DETAILS */}
        <div className="fixed top-[4.5rem] left-4 z-50 lg:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 h-8 w-8 bg-indigo-200 flex justify-center items-center rounded-full text-red-500"
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
              user?.image?.url ||
              "https://img.freepik.com/free-vector/natural-landscape-wallpaper-concept_23-2148650600.jpg"
            }
            alt="User Profile"
            className="rounded-full w-24 bg-gray-900 text-sm h-24 mb-4 shadow-lg border-[.4rem] border-indigo-400 sm:w-32 sm:h-32"
          />

          <label className="absolute top-[5.5rem] sm:top-[7.5rem] w-8 h-8 cursor-pointer flex justify-center items-center  bg-gray-600 rounded-full p-2">
            {" "}
            <FontAwesomeIcon icon={faEdit} className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <h2 className="text-md font-bold sm:text-lg">{user?.username}</h2>
          <div className="w-[90%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-4 mb-12"></div>

          <div className="flex flex-col text-left space-y-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-300" />
              <p className="text-xs sm:text-sm">{user?.email}</p>
            </div>

            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-300" />
              <p className="text-xs sm:text-sm">{user?.contact}</p>
            </div>
          </div>

          <div className="mt-auto w-[100%] flex flex-col text-xs items-center">
            <div className="w-[95%] border-b-2 border-gray-200 m-2 rounded-2xl mt-10 mb-4"></div>
            &copy;{company?.companyName}2024.
          </div>
        </div>

        {/* EVENT DETAILS */}
        <div
          className={`${menuVisible ? "blur-sm lg:blur-none" : ""
            } mt-8 mb-8 w-full lg:w-4/6 ml-8 lg:ml-[24rem] mr-8 lgoverflow-y-auto space-y-4`}
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="mt-4 flex flex-row space-x-6 justify-center items-center mb-12">
            <h2
              className="text-gradient2 text-3xl xds:text-3xl sm:text-4xl font-bold w-[80%] sm:w-[100%]"
              style={{ fontFamily: '"quick"' }}
            >
              Events &nbsp;Ground
            </h2>

            <button
              onClick={handleCreateEventClick}
              className="text-sm w-[14rem] sm:w-[15rem] xds:text-lg sm:text-xl h-6 xds:h-8 sm:h-12 px-1 xds:px-2 sm:px-4 bg-indigo-600 hover:bg-indigo-500 text-white flex justify-center items-center font-bold rounded-md"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-white mr-2 font-bold"
              />
              Create Event
            </button>
          </div>

          <div className=" flex mt-24 sm:mr-12">
            <div
              onClick={() => {
                setSelectedTab("created");
                setevents(createdEvents);
                seteventsCopy(createdEvents);
              }}
              className={` text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h- px-1 xds:px-2 sm:px-4 flex justify-center items-center font-bold rounded-md cursor-pointer ${selectedTab === "created"
                ? "text-indigo-400"
                : "hover:text-indigo-800"
                }`}
            >
              Created Events
            </div>

            <div
              onClick={() => {
                setSelectedTab("participated");
                setevents(appliedEvents);
                seteventsCopy(appliedEvents);
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

          <div className="flex flex-col sm:flex-row justify-center sm:justify-between sm:mr-12 sm:space-x-4 space-y-4 sm:space-y-0 p-4">
            {/* Search box */}
            <input
              type="text"
              placeholder="Search your events..."
              className="mb-4 px-3 py-1 w-full sm:w-[40%] lg:w-[30%] border-2 shadow-xl border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
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
                className="text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h-12 px-2 xds:px-4 sm:px-4 bg-indigo-300 hover:bg-indigo-500 hover:text-white flex justify-center items-center font-bold rounded-md w-full sm:w-auto"
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
                className="text-sm xds:text-lg sm:text-lg h-6 xds:h-8 sm:h-12 px-2 xds:px-4 sm:px-4 bg-indigo-300 hover:bg-indigo-500 hover:text-white flex justify-center items-center font-bold rounded-md w-full sm:w-auto"
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

                  <div className="flex flex-col sm:flex-row sm:gap-10">
                    <button
                      className="btn1 mt-4 h-12 px-4 bg-indigo-600 text-white font-bold rounded-md w-full sm:w-auto text-sm"
                      onClick={() => openTrackModal(event)}
                    >
                      Track Event
                    </button>

                    <button
                      className="btn1 mt-4 h-12 px-4 bg-indigo-600 text-white font-bold rounded-md w-full sm:w-auto text-sm"
                      onClick={() => openUpdateModal(event)}
                    >
                      Update Event Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {isTrackModalVisible && selectedEvent && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={(e) =>
              e.target.id === "modal-overlay" && closeTrackModal()
            }
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
                    <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                    <span className="text-sm xds:text-lg font-bold">
                      Event Creation
                    </span>
                  </div>
                  <p className="text-green-500 text-sm ml-6 font-bold">
                    Event created successfully
                  </p>
                  <div className="flex items-center ml-6 mt-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-gray-500"
                    />
                    :
                    <span className="text-gray-500 text-sm ml-2">
                      {selectedEvent.createdDate || "N/A"}
                    </span>
                  </div>

                  {/* Venue Confirmation (Only for in-person or hybrid) */}
                  {(selectedEvent.eventType === "in_person" ||
                    selectedEvent.eventType === "hybrid") && (
                      <>
                        <div
                          className={`w-1 h-16 ${selectedEvent.venueConfirmed
                            ? "bg-blue-600"
                            : "bg-gray-400"
                            }`}
                          style={{
                            marginLeft: "0.35rem",
                            marginRight: "1.5rem",
                            marginTop: "-3.5rem",
                          }}
                        ></div>

                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${selectedEvent.finalVenueDeatails
                              ? "bg-blue-600"
                              : "bg-gray-400"
                              } mr-2`}
                          ></div>
                          <span className="text-xs xds:text-lg font-bold">
                            Venue Confirmation
                          </span>
                        </div>
                        <p
                          className={`text-sm ml-6 font-bold ${selectedEvent.finalVenueDeatails
                            ? "text-green-500"
                            : selectedEvent.venueRejected
                              ? "text-red-500"
                              : "text-yellow-500"
                            }`}
                        >
                          {selectedEvent.finalVenueDeatails
                            ? "Venue has been confirmed"
                            : selectedEvent.venueRejected
                              ? "Venue confirmation failed"
                              : "Venue is not yet confirmed"}
                          {selectedEvent.finalVenueDeatails && (
                            <>
                              <span>{selectedEvent?.finalVenueDeatails}</span>
                              <span className="underline text-blue-600 cursor-pointer px-5">
                                Check Now
                              </span>
                            </>
                          )}
                        </p>

                        <div className="flex items-center ml-6 mt-2">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-2 text-gray-500"
                          />
                          :
                          <span className="text-gray-500 text-sm ml-2">
                            {selectedEvent.venueConfirmationDate || "N/A"}
                          </span>
                        </div>

                        {/* Line to Slot Confirmation */}
                        <div
                          className={`w-1 h-16 ${selectedEvent.slotConfirmedDate
                            ? "bg-blue-600"
                            : "bg-gray-400"
                            }`}
                          style={{
                            marginLeft: "0.35rem",
                            marginRight: "1.5rem",
                            marginTop: "-3.5rem",
                          }}
                        ></div>

                        {/* Payment Confirmation */}
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${selectedEvent.isVenueConfirmed
                              ? "bg-blue-600"
                              : "bg-gray-400"
                              } mr-2`}
                          ></div>
                          <span className="text-xs xds:text-lg font-bold">
                            Payment Comfirmation
                          </span>
                        </div>
                        {!selectedEvent.isVenueConfirmed ? (
                          <div className="flex gap-4">
                            <p className="text-yellow-500 text-sm ml-6 font-bold">
                              Payment is not done yet
                            </p>
                            <span
                              className="underline text-sm font-bold text-blue-600 cursor-pointer"
                              onClick={handleVenuePayment}
                            >
                              Pay Now ({selectedEvent?.bill}/-)
                            </span>
                            <span className="text-red-500 text-xs">
                              Do the payment within 12 hours. Else the your venue
                              will be cancled!
                            </span>
                          </div>
                        ) : !isSlotConfirmed && selectedEvent.createdDate ? (
                          <p className="text-red-500 text-sm ml-6 font-bold">
                            Slot Confirmation failed
                          </p>
                        ) : (
                          <p className="text-green-500 text-sm ml-6 font-bold">
                            Payment Done!
                          </p>
                        )}
                        <div className="flex items-center ml-6 mt-2">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-2 text-gray-500"
                          />
                          :
                          <span className="text-gray-500 text-sm ml-2">
                            {selectedEvent.slotConfirmedDate || "N/A"}
                          </span>
                        </div>
                      </>
                    )}

                  {/* Line to Completion */}
                  <div
                    className={`w-1 h-16 ${checkEventCompletion(
                      selectedEvent.date,
                      selectedEvent.slotConfirmedDate,
                      selectedEvent.createdDate
                    )
                      ? "bg-blue-600"
                      : "bg-gray-400"
                      }`}
                    style={{
                      marginLeft: "0.35rem",
                      marginRight: "1.5rem",
                      marginTop: "-3.5rem",
                    }}
                  ></div>

                  {/* Event Completion */}
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
                    <p className="text-green-500 text-sm ml-6 font-bold">
                      Event completed successfully
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm ml-6 font-bold">
                      Event is not yet complete
                    </p>
                  )}
                </div>
              </div>

              <button
                className="mt-8 px-4 py-2 bg-red-600 text-white font-bold rounded-md w-full"
                onClick={closeTrackModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isUpdateModalVisible && selectedEvent && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
            onClick={(e) =>
              e.target.id === "modal-overlay" && closeUpdateModal()
            }
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[75%] lg:w-[50%] space-y-6">
              <h2
                className="text-gradient1 text-4xl font-bold text-center mb-6"
                style={{ fontFamily: '"quick"' }}
              >
                Update Event Details
              </h2>

              {/* Event Name Field */}
              <EditableField
                label="Event Name"
                value={selectedEvent.eventName}
                onSave={(val) =>
                  setSelectedEvent({ ...selectedEvent, eventName: val })
                }
              />

              {/* Speaker Name Field */}
              <EditableField
                label="Speaker Name"
                value={selectedEvent.speaker || ""}
                onSave={(val) =>
                  setSelectedEvent({ ...selectedEvent, speaker: val })
                }
              />

              {/* Description Field */}
              <EditableField
                label="Description"
                value={selectedEvent.description || ""}
                onSave={(val) =>
                  setSelectedEvent({ ...selectedEvent, description: val })
                }
              />

              {/* Last Date of Registration */}
              <EditableField
                label="Last Date of Registration"
                value={
                  selectedEvent.lastDateOfRegistration
                    ? selectedEvent.lastDateOfRegistration.split("T")[0]
                    : ""
                }
                type="date"
                onSave={(val) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    lastDateOfRegistration: val,
                  })
                }
              />

              {/* Poster Image Upload */}
              <div className="space-y-2">
                <label className="block font-semibold">Poster Image</label>
                <img
                  src={selectedEvent.posterImage?.url}
                  alt="Event Poster"
                  className="w-40 h-auto rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFileToBase(e.target.files[0]);
                    }
                  }}
                  className="mt-2"
                />
              </div>

              <div className="flex  justify-center">
                <button
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-md w-[50%]"
                  onClick={closeUpdateModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
