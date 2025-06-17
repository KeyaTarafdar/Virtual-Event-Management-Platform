import { useState, useEffect } from "react";
import {
  AiOutlineVideoCameraAdd,
  AiOutlineEdit,
  AiOutlineCheck,AiOutlineMenu, AiOutlineClose
} from "react-icons/ai";
import {
  findVenue,
  updateVenueName,
  updateVenueCity,
  updateVenueEmail,
  updateVenuePhone,
  updateVenueAddress,
  updateVenueCapacity,
  updateVenueMultidayEvent,
  updateVenueHalltype,
} from "../utils/utils";
import BookingCard from "../Components/BookingCard";
import { useUser } from "../context/userContext/UserContext";

function VenueProfile() {
  const [activeMenu, setActiveMenu] = useState("BasicDetails");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [newHallName, setnewHallName] = useState("");
  const [newHallCity, setnewHallCity] = useState("");
  const [newHallEmail, setnewHallEmail] = useState("");
  const [newHallPhone, setnewHallPhone] = useState("");
  const [newHallAddress, setnewHallAddress] = useState("");
  const [newHallCapacity, setnewHallCapacity] = useState("");
  const [newHallMultiday, setnewHallMultiday] = useState();
  const [newHallType, setnewHallType] = useState();

  const handleReject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReason("");
  };

  const handleSubmitReason = () => {
    if (reason.trim() === "") {
      alert("Please enter a reason before submitting.");
      return;
    }

    setIsModalOpen(false);
    setReason("");
  };

    const menuItems = [
    "BasicDetails",
    "Gallery",
    "Booking Requests",
    "Upcoming Bookings",
    "Past Bookings",
  ];

  const [galleryImages, setGalleryImages] = useState([
    {
      url: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/17669053/pexels-photo-17669053/free-photo-of-decorative-skulls-in-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCompanyDetails((prevDetails) => ({
        ...prevDetails,
        logo: imageUrl,
      }));
    }
  };

  const [companyDetails, setCompanyDetails] = useState({
    name: "ITC",
    address: "8/41, Sahid Nagar",
    city: "Kolkata",
    email: "itc@gmail.com",
    phone: "9876543211",
    logo: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  const handleSave = (field) => {
    if (field === "email" && !companyDetails.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (field === "phone" && !/^\d{10}$/.test(companyDetails.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsEditing(null);
  };

  const { venue, setVenue } = useUser();

  useEffect(() => {
    if (!venue) {
      findVenue().then((response) => {
        if (response.success) {
          setVenue(response);
        }
      });
    }
  }, []);

  const renderComponent = () => {
    switch (activeMenu) {
      case "BasicDetails":
        return (
        <div className="flex w-full flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-around">
            {/* Venue Image */}
            <div className="image-section w-full sm:w-2/5 lg:w-2/6 flex flex-col items-center text-center px-4 py-6">
              <div className="relative">
                <img
                  src={
                    venue && venue.profilepicture
                      ? venue.profilepicture.url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2pmX-vrTVeKcf4JXDwuxSSVJf66zPpmc5w&s"
                  }
                  alt="Company Logo"
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover shadow-md mx-auto"
                />
              </div>

              <button
                onClick={() => document.getElementById("logoUpload").click()}
                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all text-sm sm:text-base"
              >
                Edit Image
              </button>
              <input
                id="logoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />

              <div className="pt-4 flex flex-col items-center">
                <div className="font-bold text-lg sm:text-xl lg:text-2xl">
                  {venue ? venue.name : null}
                </div>
                <div className="text-sm sm:text-base">{venue ? venue.city : null}</div>
              </div>

              <div className="flex pt-2 gap-2 justify-center items-center text-sm">
                <div>Rating:</div>
                <div className="flex text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg
                        key={index}
                        className="h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10 15.27 16.18 19 14.54 12.81 19 8.63 12.81 8.63 10 2.5 7.19 8.63 1 8.63 5.46 12.81 3.82 19" />
                      </svg>
                    ))}
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 px-4">
                <div className="text-sm mb-1">Completed</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${20}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="w-px bg-black m-6 "></div>

            <div className="lg:hidden bg-yellow-500 rounded-lg w-[90%] mb-8 h-1 ml-8 mr-8"></div>

            {/* Basic Details */}
            <div className="bg-blue-100 w-full lg:w-4/6 mb-8 border-2 border-blue-500 p-8 rounded-lg shadow-xl ">
              <div className="m-auto w-[35%] text-center">
                <h2 className="text-2xl p-1 font-bold font-serif text-yellow-600 mb-4">
                  Basic Details
                </h2>
              </div>
              <div className="details-section space-y-4">
                {/* Venue Name */}
                <div className="flex items-center space-x-4 ">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Hall Name:{" "}
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "name" ? (
                      <input
                        type="text"
                        value={newHallName}
                        onChange={(e) => setnewHallName(e.target.value)}
                        className="p-2 border rounded-md w-full"
                      />
                    ) : (
                      <span className="font-bold text-lg">
                        {venue ? venue.name : null}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        if (isEditing === "name") {
                          updateVenueName(newHallName).then((response) => {
                            if (response.success) {
                              setVenue(response.data);
                              sessionStorage.setItem(
                                "venue",
                                JSON.stringify(response.data)
                              );
                            }
                            setIsEditing(null);
                          });
                        } else {
                          setnewHallName(venue ? venue.name : "");
                          setIsEditing("name");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "name" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Hall Email */}
                <div className="flex items-start space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Email :{" "}
                  </span>
                  <div className="flex flex-col w-3/5">
                    <div className="flex items-center justify-between">
                      {isEditing === "email" ? (
                        <input
                          type="text"
                          value={newHallEmail}
                          onChange={(e) => setnewHallEmail(e.target.value)}
                          className={`p-2 border rounded-md w-full ${!newHallEmail.includes("@") ? "border-red-500" : ""
                            }`}
                        />
                      ) : (
                        <span className="font-bold">
                          {venue ? venue.email : null}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (isEditing === "email") {
                            updateVenueEmail(newHallEmail).then((response) => {
                              if (response.success) {
                                findVenue().then((response) => {
                                  setVenue(response.data);
                                  sessionStorage.setItem(
                                    "venue",
                                    JSON.stringify(response.data)
                                  );
                                });
                              }
                              setIsEditing(null);
                            });
                          } else {
                            setnewHallEmail(venue ? venue.email : "");
                            setIsEditing("email");
                          }
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                      >
                        {isEditing === "email" ? (
                          <AiOutlineCheck size={16} />
                        ) : (
                          <AiOutlineEdit size={16} />
                        )}
                      </button>
                    </div>
                    {isEditing === "email" &&
                      !companyDetails.email.includes("@") && (
                        <span className="text-red-500 text-sm mt-2">
                          Please enter a valid email address with &quot;@&quot;
                        </span>
                      )}
                  </div>
                </div>

                {/* Hall Phone Number */}
                <div className="flex items-start space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Phone Number :
                  </span>
                  <div className="flex flex-col w-3/5">
                    <div className="flex items-center justify-between">
                      {isEditing === "phone" ? (
                        <input
                          type="text"
                          value={newHallPhone}
                          onChange={(e) => setnewHallPhone(e.target.value)}
                          className={`p-2 border rounded-md w-full ${!/^\d{10}$/.test(newHallPhone.phone)
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                      ) : (
                        <span className="font-bold">
                          {venue ? venue.contact : null}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (isEditing === "phone") {
                            updateVenuePhone(newHallPhone).then((response) => {
                              if (response.success) {
                                findVenue().then((response) => {
                                  setVenue(response.data);
                                  sessionStorage.setItem(
                                    "venue",
                                    JSON.stringify(response.data)
                                  );
                                });
                              }
                              setIsEditing(null);
                            });
                          } else {
                            setnewHallPhone(venue ? venue.contact : "");
                            setIsEditing("phone");
                          }
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                      >
                        {isEditing === "phone" ? (
                          <AiOutlineCheck size={16} />
                        ) : (
                          <AiOutlineEdit size={16} />
                        )}
                      </button>
                    </div>
                    {isEditing === "phone" &&
                      !/^\d{10}$/.test(companyDetails.phone) && (
                        <span className="text-red-500 text-sm mt-2">
                          Please enter a valid 10-digit phone number.
                        </span>
                      )}
                  </div>
                </div>

                {/* Hall City */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">City:</span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "city" ? (
                      <input
                        type="text"
                        value={newHallCity}
                        onChange={(e) => setnewHallCity(e.target.value)}
                        className="p-2 border rounded-md w-full"
                      />
                    ) : (
                      <span className="font-bold">
                        {venue ? venue.city : null}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        if (isEditing === "city") {
                          updateVenueCity(newHallCity).then((response) => {
                            if (response.success) {
                              findVenue().then((response) => {
                                setVenue(response.data);
                                sessionStorage.setItem(
                                  "venue",
                                  JSON.stringify(response.data)
                                );
                              });
                            }
                            setIsEditing(null);
                          });
                        } else {
                          setnewHallCity(venue ? venue.city : "");
                          setIsEditing("city");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "city" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Hall Address */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Address :{" "}
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "address" ? (
                      <input
                        type="text"
                        value={newHallAddress}
                        onChange={(e) => setnewHallAddress(e.target.value)}
                        className="p-2 border rounded-md w-full"
                      />
                    ) : (
                      <span className="text-md font-bold">
                        {venue ? venue.address : null}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        if (isEditing === "address") {
                          updateVenueAddress(newHallAddress).then((response) => {
                            if (response.success) {
                              findVenue().then((response) => {
                                setVenue(response.data);
                                sessionStorage.setItem(
                                  "venue",
                                  JSON.stringify(response.data)
                                );
                              });
                            }
                            setIsEditing(null);
                          }
                          );
                        } else {
                          setnewHallAddress(venue ? venue.address : "");
                          setIsEditing("address");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "address" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Seat Number */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Maximum Capacity :
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "seat" ? (
                      <input
                        type="number"
                        value={newHallCapacity}
                        onChange={(e) => setnewHallCapacity(e.target.value)}
                        className="p-2 border rounded-md w-full"
                        placeholder="Enter Maximum Capacity"
                      />
                    ) : (
                      <span className="font-bold">
                        {venue ? venue.maxCapacity : null}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        if (isEditing === "seat") {
                          updateVenueCapacity(newHallCapacity).then(
                            (response) => {
                              if (response.data) {
                                findVenue().then((response) => {
                                  setVenue(response.data);
                                  sessionStorage.setItem(
                                    "venue",
                                    JSON.stringify(response.data)
                                  );
                                });
                              }
                              setIsEditing(null);
                            }
                          );
                        } else {
                          setnewHallCapacity(venue ? venue.maxCapacity : "");
                          setIsEditing("seat");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "seat" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Multi Day Hall Booking Facility */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Multi-day hall booking facility:
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "multiDayBooking" ? (
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            checked={companyDetails.multiDayBooking === "yes"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                multiDayBooking: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            checked={companyDetails.multiDayBooking === "no"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                multiDayBooking: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    ) :(
                      <span
// className={`rounded-lg w-[90%] p-2 ${
//                           companyDetails.multiDayBooking
//                             ? ""
//                             : "text-red-500 bg-white"
//                         }`}
//                       >
//                         {companyDetails.multiDayBooking
//                           ? companyDetails.multiDayBooking.charAt(0).toUpperCase() +
//                             companyDetails.multiDayBooking.slice(1)


                        className={`rounded-lg w-[90%] p-2 ${venue && venue.canOrganizeMultidayEvent
                          ? ""
                          : "text-red-500 bg-white"
                          }`}
                      >
                        {venue && venue.canOrganizeMultidayEvent
                          ? venue.canOrganizeMultidayEvent
                            .charAt(0)
                            .toUpperCase() +
                          venue.canOrganizeMultidayEvent.slice(1)
                          : "Please Select an Option"}
                      </span>
                    )}
                    <button
                    // onClick={() =>
                    //     isEditing === "multiDayBooking"
                    //       ? handleSave("multiDayBooking")
                    //       : setIsEditing("multiDayBooking")
                    //   }
                      onClick={() => {
                        if (isEditing === "multiDayBooking") {
                          updateVenueMultidayEvent(newHallMultiday).then(
                            (response) => {
                              if (response.success) {
                                findVenue().then((response) => {
                                  setVenue(response.data);
                                  sessionStorage.setItem(
                                    "venue",
                                    JSON.stringify(response.data)
                                  );
                                });
                              }
                              setIsEditing(null);
                            }
                          );
                        } else {
                          setnewHallMultiday(
                            venue ? venue.canOrganizeMultidayEvent : null
                          );
                          setIsEditing("multiDayBooking");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "multiDayBooking" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Hall Type */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Hall Type :
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "halltype" ? (
                      <select
                        value={companyDetails.halltype}
                        onChange={(e) =>
                          setCompanyDetails({
                            ...companyDetails,
                            halltype: e.target.value,
                          })
                        }
                        className="p-2 border rounded-md w-full"
                      >
                        <option value="">Select Hall Type</option>
                        <option value="auditorium">Auditorium</option>
                        <option value="banquetHall">Banquet Hall</option>
                        <option value="openHalls">Open Halls</option>
                        <option value="lawns">Lawns</option>
                      </select>
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.halltype ? "" : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.halltype
                          ? companyDetails.halltype.charAt(0).toUpperCase() +
                          companyDetails.halltype.slice(1)
                          : "Please Select Hall Type"}
                      </span>
                    )}
                    {/* <button
                      onClick={() =>
                        isEditing === "halltype"
                          ? handleSave("halltype")
                          : setIsEditing("halltype")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "halltype" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button> */}
                     <button
                      onClick={() => {
                        if (isEditing === "halltype") {
                          updateVenueHalltype(newHallType).then((response) => {
                            if (response.success) {
                              findVenue().then((response) => {
                                setVenue(response.data);
                                sessionStorage.setItem(
                                  "venue",
                                  JSON.stringify(response.data)
                                );
                              });
                            }
                            setIsEditing(null);
                          });
                        } else {
                          setnewHallType(venue ? venue.hallType : "");
                          setIsEditing("halltype");
                        }
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "halltype" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Time of 1st Half */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="w-2/5 text-blue-900 font-bold">
                      Time of 1st Half:
                    </span>
                    <div className="flex items-center justify-between w-3/5">
                      {isEditing === "time1" ? (
                        <div className="flex flex-col w-full">
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={companyDetails.start_time || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  start_time: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                            <span className="text-gray-500 ml-4 mr-4">
                              &nbsp;&nbsp;TO&nbsp;&nbsp;
                            </span>
                            <input
                              type="time"
                              value={companyDetails.end_time || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  end_time: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                          </div>
                          {/* Validation Message */}
                          {companyDetails.start_time &&
                            companyDetails.end_time &&
                            companyDetails.start_time >=
                            companyDetails.end_time && (
                              <p className="text-red-500 text-sm mt-1">
                                **Start time must be earlier than end time
                              </p>
                            )}
                        </div>
                      ) : (
                        <span
                          className={`rounded-lg w-[90%] p-2 ${companyDetails.start_time && companyDetails.end_time
                            ? ""
                            : "text-red-500 bg-white"
                            }`}
                        >
                          {companyDetails.start_time && companyDetails.end_time
                            ? `${companyDetails.start_time} -- ${companyDetails.end_time}`
                            : "Please Enter Start and End Time"}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (
                            isEditing === "time1" &&
                            companyDetails.start_time &&
                            companyDetails.end_time &&
                            companyDetails.start_time < companyDetails.end_time
                          ) {
                            handleSave("time1");
                          } else if (isEditing === "time1") {
                            alert("Start time must be earlier than end time");
                          } else {
                            setIsEditing("time1");
                          }
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                      >
                        {isEditing === "time1" ? (
                          <AiOutlineCheck size={16} />
                        ) : (
                          <AiOutlineEdit size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price for 1st Half Booking */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Price for 1st Half Booking :
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "price1" ? (
                      <input
                        type="number"
                        value={companyDetails.price1}
                        onChange={(e) =>
                          setCompanyDetails({
                            ...companyDetails,
                            price1: e.target.value,
                          })
                        }
                        className="p-2 border rounded-md w-full"
                        placeholder="Enter Price for 1st Half Booking "
                      />
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.price1 ? "" : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.price1 ||
                          "Please Enter Price for 1st Half Booking "}
                      </span>
                    )}
                    <button
                      onClick={() =>
                        isEditing === "price1"
                          ? handleSave("price1")
                          : setIsEditing("price1")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "price1" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Time of 2nd Half */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="w-2/5 text-blue-900 font-bold">
                      Time of 2nd Half:
                    </span>
                    <div className="flex items-center justify-between w-3/5">
                      {isEditing === "time2" ? (
                        <div className="flex flex-col w-full">
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={companyDetails.start_time2 || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  start_time2: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                            <span className="text-gray-500 ml-4 mr-4">
                              &nbsp;&nbsp;TO&nbsp;&nbsp;
                            </span>
                            <input
                              type="time"
                              value={companyDetails.end_time2 || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  end_time2: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                          </div>
                          {/* Validation Message */}
                          {companyDetails.start_time2 &&
                            companyDetails.end_time2 &&
                            companyDetails.start_time2 >=
                            companyDetails.end_time2 && (
                              <p className="text-red-500 text-sm mt-1">
                                **Start time must be earlier than end time
                              </p>
                            )}
                        </div>
                      ) : (
                        <span
                          className={`rounded-lg w-[90%] p-2 ${companyDetails.start_time2 &&
                            companyDetails.end_time2
                            ? ""
                            : "text-red-500 bg-white"
                            }`}
                        >
                          {companyDetails.start_time2 &&
                            companyDetails.end_time2
                            ? `${companyDetails.start_time2} -- ${companyDetails.end_time2}`
                            : "Please Enter Start and End Time"}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (
                            isEditing === "time2" &&
                            companyDetails.start_time2 &&
                            companyDetails.end_time2 &&
                            companyDetails.start_time2 <
                            companyDetails.end_time2
                          ) {
                            handleSave("time2");
                          } else if (isEditing === "time2") {
                            alert("Start time must be earlier than end time");
                          } else {
                            setIsEditing("time2");
                          }
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                      >
                        {isEditing === "time2" ? (
                          <AiOutlineCheck size={16} />
                        ) : (
                          <AiOutlineEdit size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price for 2nd Half Booking */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Price for 2nd Half Booking :
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "price2" ? (
                      <input
                        type="number"
                        value={companyDetails.price2}
                        onChange={(e) =>
                          setCompanyDetails({
                            ...companyDetails,
                            price2: e.target.value,
                          })
                        }
                        className="p-2 border rounded-md w-full"
                        placeholder="Enter Price for 2nd Half Booking "
                      />
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.price2 ? "" : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.price2 ||
                          "Please Enter Price for 2nd Half Booking "}
                      </span>
                    )}
                    <button
                      onClick={() =>
                        isEditing === "price2"
                          ? handleSave("price2")
                          : setIsEditing("price2")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "price2" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Time of full day */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="w-2/5 text-blue-900 font-bold">
                      Time of Full Day:
                    </span>
                    <div className="flex items-center justify-between w-3/5">
                      {isEditing === "time3" ? (
                        <div className="flex flex-col w-full">
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={companyDetails.start_time3 || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  start_time3: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                            <span className="text-gray-500 ml-4 mr-4">
                              &nbsp;&nbsp;TO&nbsp;&nbsp;
                            </span>
                            <input
                              type="time"
                              value={companyDetails.end_time3 || ""}
                              onChange={(e) =>
                                setCompanyDetails({
                                  ...companyDetails,
                                  end_time3: e.target.value,
                                })
                              }
                              className="p-2 border rounded-md w-[45%]"
                            />
                          </div>
                          {/* Validation Message */}
                          {companyDetails.start_time3 &&
                            companyDetails.end_time3 &&
                            companyDetails.start_time3 >=
                            companyDetails.end_time3 && (
                              <p className="text-red-500 text-sm mt-1">
                                **Start time must be earlier than end time
                              </p>
                            )}
                        </div>
                      ) : (
                        <span
                          className={`rounded-lg w-[90%] p-2 ${companyDetails.start_time3 &&
                            companyDetails.end_time3
                            ? ""
                            : "text-red-500 bg-white"
                            }`}
                        >
                          {companyDetails.start_time3 &&
                            companyDetails.end_time3
                            ? `${companyDetails.start_time3} -- ${companyDetails.end_time3}`
                            : "Please Enter Start and End Time"}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (
                            isEditing === "time3" &&
                            companyDetails.start_time3 &&
                            companyDetails.end_time3 &&
                            companyDetails.start_time3 <
                            companyDetails.end_time3
                          ) {
                            handleSave("time3");
                          } else if (isEditing === "time3") {
                            alert("Start time must be earlier than end time");
                          } else {
                            setIsEditing("time3");
                          }
                        }}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                      >
                        {isEditing === "time3" ? (
                          <AiOutlineCheck size={16} />
                        ) : (
                          <AiOutlineEdit size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price for full day Booking */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Price for Full Day Booking :
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "price3" ? (
                      <input
                        type="number"
                        value={companyDetails.price3}
                        onChange={(e) =>
                          setCompanyDetails({
                            ...companyDetails,
                            price3: e.target.value,
                          })
                        }
                        className="p-2 border rounded-md w-full"
                        placeholder="Enter Price for Full Day Booking "
                      />
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.price3 ? "" : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.price3 ||
                          "Please Enter Price for Full Day Booking "}
                      </span>
                    )}
                    <button
                      onClick={() =>
                        isEditing === "price3"
                          ? handleSave("price3")
                          : setIsEditing("price3")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "price3" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Projector Available */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Projector Available:
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "projector" ? (
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            checked={companyDetails.projector === "yes"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                projector: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            checked={companyDetails.projector === "no"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                projector: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.projector
                          ? ""
                          : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.projector
                          ? companyDetails.projector.charAt(0).toUpperCase() +
                          companyDetails.projector.slice(1)
                          : "Please Select an Option"}
                      </span>
                    )}
                    <button
                      onClick={() =>
                        isEditing === "projector"
                          ? handleSave("projector")
                          : setIsEditing("projector")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "projector" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Broadband Available */}
                <div className="flex items-center space-x-4">
                  <span className="w-2/5 text-blue-900 font-bold">
                    Broadband Available:
                  </span>
                  <div className="flex items-center justify-between w-3/5">
                    {isEditing === "broadband" ? (
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="yes"
                            checked={companyDetails.broadband === "yes"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                broadband: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="no"
                            checked={companyDetails.broadband === "no"}
                            onChange={(e) =>
                              setCompanyDetails({
                                ...companyDetails,
                                broadband: e.target.value,
                              })
                            }
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    ) : (
                      <span
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.broadband
                          ? ""
                          : "text-red-500 bg-white"
                          }`}
                      >
                        {companyDetails.broadband
                          ? companyDetails.broadband.charAt(0).toUpperCase() +
                          companyDetails.broadband.slice(1)
                          : "Please Select an Option"}
                      </span>
                    )}
                    <button
                      onClick={() =>
                        isEditing === "broadband"
                          ? handleSave("broadband")
                          : setIsEditing("broadband")
                      }
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                    >
                      {isEditing === "broadband" ? (
                        <AiOutlineCheck size={16} />
                      ) : (
                        <AiOutlineEdit size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Gallery":
        return (
          <>
            <div className="upcoming-bookings">
              {/* FOR IMAGES */}
              <div className="photo-section ">
                <div className="mt-12 w-full flex justify-between items-center">
                  <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">
                    Photos
                  </h2>
                  <label
                    className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 cursor-pointer flex items-center justify-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <AiOutlineVideoCameraAdd size={24} />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <div className="photo-gallery-container grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="photo-card relative overflow-hidden rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={image.url}
                        alt={`Gallery Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "Booking Requests":
        return (
          <>
            <div className="p-4">
              <div className="space-y-8">
                {Array.isArray(venue.bookingRequests) &&
                  venue.bookingRequests.map((request, index) => (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row items-start lg:items-center bg-gradient-to-r from-blue-200 via-blue-400 to-blue-300 p-4 border-2 border-blue-500 rounded-lg shadow-2xl hover:shadow-lg transition-all"
                    >
                      <div className="flex-1 w-full">
                        <h3 className="text-xl font-bold text-blue-800 font-serif">
                          Event Created By:{" "}
                          {request.id ? request.id.ownerId.username : null}
                        </h3>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Event Name: </span>
                          {request.id ? request.id.eventName : null}
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Date: </span>
                          {request.id
                            ? new Date(request.id.date).toLocaleDateString("en-GB")
                            : null}
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Head Count: </span>
                          {request.id ? request.id.headcount : null}
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Time: </span>
                          {request.id ? request.id.time : null}
                        </p>
                        <p className="text-gray-700 mt-2">
                          <span className="font-bold">Time Slot: </span>
                          {request.timeslot === "1" && "1st Half"}
                          {request.timeslot === "2" && "2nd Half"}
                          {request.timeslot === "F" && "Full Day"}
                        </p>
                      </div>

                      {/* Right section (Status) */}
                      <div className="w-full lg:w-auto lg:border-l-4 border-yellow-600 lg:ml-4 lg:pl-6 mt-6 lg:mt-0">
                        <h2 className="text-lg font-bold font-serif text-blue-900 text-center mb-4 lg:mb-12">
                          Choose Status
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                          <button className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg border-green-800 border-2 hover:bg-green-600">
                            Approve
                          </button>
                          <button
                            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg border-red-800 border-2 hover:bg-red-600"
                            onClick={handleReject}
                          >
                            Reject
                          </button>
                        </div>
                      </div>

                      {/* Rejection Modal */}
                      {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                              Enter Rejection Reason
                            </h2>
                            <textarea
                              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                              rows="4"
                              placeholder="Enter your reason here..."
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                            <div className="flex justify-end mt-4 gap-2">
                              <button
                                className="border-2 rounded-lg bg-gray-300 font-bold px-4 py-2 hover:bg-gray-400 transition duration-300 ease-in-out"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                              <button
                                className="border-2 rounded-lg bg-red-500 font-bold px-4 py-2 hover:bg-red-600 transition duration-300 ease-in-out"
                                onClick={handleSubmitReason}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </>
        );

      case "Upcoming Bookings":
        return (
          <>
            <div className="upcoming-bookings mr-5  flex justify-center align-center ">
              <div className="bookings-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card ">
                    <BookingCard
                      eventName={booking.eventName}
                      eventDate={booking.eventDate}
                      eventTime={booking.eventTime}
                      eventImage={booking.eventImage}
                      headcount={booking.headcount}
                      additionalInfo={booking.additionalInfo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "Past Bookings":
        return (
          <>
            <div className="upcoming-bookings mr-5 flex justify-center align-center">
              <div className="bookings-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <BookingCard
                      eventName={booking.eventName}
                      eventDate={booking.eventDate}
                      eventTime={booking.eventTime}
                      eventImage={booking.eventImage}
                      headcount={booking.headcount}
                      additionalInfo={booking.additionalInfo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
        default:
        return null;
    }
  };


  const onMenuClick = (menu) => {
    setActiveMenu(menu);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full flex ">
        <div className="w-full sm:w-[95%] relative">
          {/* Hamburger button for < lg */}
          <div className="lg:hidden flex justify-end p-4 border-b border-gray-300">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="text-3xl text-gray-700"
            >
              {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>

          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
            ${
              isMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            } lg:hidden`}
          >
            <nav className="flex flex-col p-6 gap-6 mt-16">
              {menuItems.map((menu) => (
                <div
                  key={menu}
                  className={`cursor-pointer relative font-bold font-serif text-lg ${
                    activeMenu === menu ? "text-blue-700" : "text-gray-600"
                  }`}
                  onClick={() => onMenuClick(menu)}
                >
                  {menu.replace(/([A-Z])/g, " $1").trim()}
                  {activeMenu === menu && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 transition-all duration-300"></span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {isMenuOpen && (
            <div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            />
          )}

          <div className="hidden lg:flex gap-6 lg:gap-12 items-center justify-center cursor-pointer mt-6 flex-wrap">
            {menuItems.map((menu) => (
              <div
                key={menu}
                className={`cursor-pointer relative font-bold font-serif text-lg ${
                  activeMenu === menu ? "text-blue-700" : "text-gray-600"
                }`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu.replace(/([A-Z])/g, " $1").trim()}
                {activeMenu === menu && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 transition-all duration-300"></span>
                )}
              </div>
            ))}
          </div>

          <div className="sm:pl-[5rem] pt-10">{renderComponent()}</div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Enter Rejection Reason
                </h2>
                <textarea
                  className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
                  rows="4"
                  placeholder="Enter your reason here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    className="border-2 rounded-lg bg-gray-300 font-bold px-4 py-2 hover:bg-gray-400 transition duration-300 ease-in-out"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="border-2 rounded-lg bg-red-500 font-bold px-4 py-2 hover:bg-red-600 transition duration-300 ease-in-out"
                    onClick={handleSubmitReason}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default VenueProfile;

const bookings = [
  {
    id: 1,
    eventName: "Robotics Workshop",
    eventDate: "25/01/25",
    eventTime: "19:00 PM",
    eventImage:
      "https://phcet.ac.in/wp-content/uploads/2023/03/hands-on-workshop-on-robotics-1.jpg",
    headcount: "200",
    additionalInfo: "Cognizant",
  },
  {
    id: 2,
    eventName: "AI Workshop",
    eventDate: "27/01/25",
    eventTime: "16:30 PM",
    eventImage:
      "https://ebenezerame.org/wp-content/uploads/2024/03/7-AI-Workshop-GRAPHIC.jpg",
    headcount: "100",
    additionalInfo: "Accenture",
  },
  {
    id: 3,
    eventName: "Art Expo",
    eventDate: "28/01/25",
    eventTime: "5:00 PM",
    eventImage:
      "https://images.pexels.com/photos/17669053/pexels-photo-17669053/free-photo-of-decorative-skulls-in-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    headcount: "150",
    additionalInfo: "Art Center",
  },
];
