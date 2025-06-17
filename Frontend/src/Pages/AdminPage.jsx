import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  findAdmin,
  acceptVenue,
  fetchAllVenues,
  fetchAllEvents,
  uploadProfilePictureAdmin,
  rejectVenue,
  fetchCompanyDetails,
  updateCompanyInfo,
} from "../utils/utils";
import {
  faCalendarCheck,
  faGlobe,
  faUsers,
  faTimes,
  faEllipsisV,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useCompany } from "../context/companyContext/CompanyContext";
import { useUser } from "../context/userContext/UserContext";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { company, setCompany } = useCompany();
  const { admin, setAdmin } = useUser();


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

  const handleReject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReason("");
  };

  const handleSubmitReason = (venueId, reason) => {
    rejectVenue(venueId, reason).then((response) => {
      alert(response.message);
    });

    setIsModalOpen(false);
    setReason("");
  };

  function handleAcceptVenue(venueId) {
    acceptVenue(venueId).then((response) => {
      if (response.success) {
        setAdmin(response.data);
        sessionStorage.setItem("admin", JSON.stringify(response.data));
      }
      alert(response.message);
    });
  }

  const setFileToBase = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        resolve(reader.result);
      };
    });
  };
  const [image, setImage] = useState();

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const maxSizeInKB = 30;

      if (file.size > maxSizeInKB * 1024) {
        alert(`File size should be less than ${maxSizeInKB} KB.`);
        return;
      }

      const imageData = await setFileToBase(file);

      uploadProfilePictureAdmin(imageData).then((response) => {
        alert(response.message);
      });
    } else {
      alert("Please Upload an Image");
      return;
    }
  }

  const handleSearch = (type) => {
    const input = document.querySelector(`#${type}Input`).value;
    if (input) {
      console.log(
        `Searching for ${input} by ${type === "venueName" ? "Venue Name" : "Venue Address"
        }`
      );

      document.querySelector(`#${type}Input`).value = "";
    } else {
      alert(
        `Please enter a ${type === "venueName" ? "Venue Name" : "Venue Address"
        }`
      );
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB");
  };

  const [fields, setFields] = useState({
    companyName: "",
    address: "",
    email: "",
    contact: "",
    description: "",
  });

  const [editMode, setEditMode] = useState({
    companyName: false,
    address: false,
    email: false,
    contact: false,
    description: false,
  });

  const handleEditToggle = (field) => {
    if (editMode[field]) {
      updateCompanyInfo(fields).then((response) => {
        if (response.success) {
          setCompany(response.data);
          sessionStorage.setItem("company", JSON.stringify(response.data));
        } else {
          alert(response.message);
        }
      });
    }
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFieldChange = (e, field) => {
    setFields((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const renderComponent = () => {
    switch (activeMenu) {
      case "Venue Requests":
        return (
          <>
            {venueRequests.length > 0 ? (
              venueRequests.map((venue) => (
                <div className="p-2 sm:p-4 flex justify-center w-full min-h-screen flex-wrap gap-x-4 overflow-x-hidden">
                  <div
                    key={venue._id}
                    className="w-full sm:w-[97%] sm:ml-2 mt-3 rounded-lg h-80 sm:h-64 lg:h-56 shadow-md p-3 sm:p-4 px-8 flex flex-col md:flex-row justify-between items-start bg-blue-100 border-2 border-blue-600"
                  >
                    <div className="flex flex-col md:w-3/4 sm:border-r-4 sm:border-blue-600 mr-4">
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 pb-2 sm:pb-3 font-serif">
                        <span className="font-medium">Venue Name:</span>{" "}
                        {venue.name}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          Email:
                        </span>{" "}
                        {venue.email}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          Contact:
                        </span>{" "}
                        {venue.contact}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          City:
                        </span>{" "}
                        {venue.city}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          Address:
                        </span>{" "}
                        {venue.address}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          Multiday Event:
                        </span>{" "}
                        {venue.canOrganizeMultidayEvent ? "Yes" : "No"}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-bold text-blue-600 font-serif">
                          Max Headcount:
                        </span>{" "}
                        {venue.maxCapacity}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 sm:gap-4 md:gap-5 md:mr-3 mt-4 md:mt-0 text-white md:w-1/4 w-full sm:w-auto">
                      <button
                        className="border-2 rounded-lg bg-green-500 font-bold font-serif h-10 w-full sm:w-32 hover:bg-green-600 hover:border-green-600 transition duration-300 ease-in-out"
                        onClick={() => {
                          handleAcceptVenue(venue._id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="border-2 rounded-lg bg-red-500 font-bold font-serif h-10 w-full sm:w-32 hover:bg-red-600 hover:border-red-600 transition duration-300 ease-in-out"
                        onClick={handleReject}
                      >
                        Reject
                      </button>

                      {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
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
                                onClick={() => {
                                  handleSubmitReason(venue._id, reason);
                                }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-screen bg-gray-100">
                <img
                  className="h-80 w-80"
                  src="https://new4you.in/img/no_products_found.png"
                />
              </div>
            )}
          </>
        );

      case "Upcoming Events":
        return (
          <>
            <div className="p-4 flex justify-center overflow-y-scroll overflow-x-hidden w-full h-[92vh] bg-gray-100 scrollbar-hide flex-wrap gap-x-4">
              {Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id}>
                    <BookingCard
                      eventName={event.eventName}
                      eventStartingDate={formatDate(event.date)}
                      eventEndingDate={
                        event.eventEndDate ? event.eventEndDate : null
                      }
                      eventTime={event.time}
                      eventImage={event?.posterImage?.url}
                      venue={
                        event.eventType === "in_person" || event.eventType === "hybrid"
                          ? `${event.hallName ? `${event.hallName}, ` : ""} ${event.city
                          }`
                          : null
                      }
                      platform={
                        event.eventType === "virtual" || event.eventType === "hybrid"
                          ? `${event.platform}`
                          : null
                      }
                    />
                  </div>
                ))
              ) : (
                <img
                  className="h-80 w-80"
                  src="https://static.vecteezy.com/system/resources/previews/014/814/046/non_2x/no-schedule-events-flat-rounded-icon-in-appealing-graphic-vector.jpg"
                  alt="No events scheduled"
                />
              )}
            </div>
          </>
        );

      case "Past Events":
        return (
          <>
            <div className="p-4 flex justify-center overflow-y-scroll overflow-x-hidden scrollbar-hide w-full h-[92vh] bg-gray-100 flex-wrap gap-x-4">
              {Array.isArray(pastEvents) && pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <div key={event.id}>
                    <BookingCard
                      eventName={event.eventName}
                      eventStartingDate={formatDate(event.date)}
                      eventEndingDate={
                        event.eventEndDate ? event.eventEndDate : null
                      }
                      eventTime={event.time}
                      eventImage={event?.posterImage?.url}
                      venue={
                        event.eventType === "in_person" ||event.eventType === "hybrid"
                          ? `${event.hallName ? `${event.hallName}, ` : ""} ${event.city
                          }`
                          : null
                      }
                      platform={
                        event.eventType === "virtual" || event.eventType === "hybrid"
                          ? `${event.platform}`
                          : null
                      }
                    />
                  </div>
                ))
              ) : (
                <img
                  className="h-80 w-80"
                  src="https://static.vecteezy.com/system/resources/previews/014/814/046/non_2x/no-schedule-events-flat-rounded-icon-in-appealing-graphic-vector.jpg"
                  alt="No events scheduled"
                />
              )}
            </div>
          </>
        );

      case "Venue Details":
        return (
          <>
            <div className="flex w-full min-h-screen flex-wrap gap-x-4 overflow-x-hidden ">
              {/* Top search bar */}
              <div className="flex items-center p-5 flex-col lg:flex-row w-full h-[20%]">
                {/* Search by Venue Name */}
                <div className="flex items-center flex-col sm:flex-row gap-y-4">
                  <h3 className="mr-4 font-serif font-bold">
                    Search by Venue Name :
                  </h3>
                  <div>
                    <input
                      type="text"
                      id="venueNameInput"
                      className="p-2 border border-gray-500 rounded-md"
                      placeholder="Enter Venue Name"
                    />
                    <button
                      className="ml-2 p-2 bg-blue-800 text-white rounded-md"
                      onClick={() => handleSearch("venueName")}
                    >
                      <AiOutlineSearch />
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block lg:bg-yellow-500 lg:rounded-lg lg:w-1 lg:h-12 lg:ml-8 lg:mr-8"></div>
                <div className="lg:hidden bg-yellow-500 rounded-lg w-[90%] mt-4 mb-4 h-1 ml-8 mr-8"></div>

                {/* Search by Venue Address */}
                <div className="flex items-center flex-col sm:flex-row gap-y-4">
                  <h3 className="mr-4 font-serif font-bold">
                    Search by Venue Address :
                  </h3>
                  <div>
                    <input
                      type="text"
                      id="venueAddressInput"
                      className="p-2 border border-gray-500 rounded-md"
                      placeholder="Enter Venue Address"
                    />
                    <button
                      className="ml-2 p-2 bg-blue-800 text-white rounded-md"
                      onClick={() => handleSearch("venueAddress")}
                    >
                      <AiOutlineSearch />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable table container */}
              <div className="w-full overflow-x-auto  px-4 ">
                <table className="min-w-[120rem] table-fixed">
                  <thead className="sticky top-0 bg-black text-white">
                    <tr>
                      <th className="w-[5rem] border-2 border-white">Sl No.</th>
                      <th className="w-[15rem] border-2 border-white">
                        Venue Name
                      </th>
                      <th className="w-[15rem] border-2 border-white">
                        Venue Owner
                      </th>
                      <th className="w-[15rem] border-2 border-white">
                        Venue Email
                      </th>
                      <th className="w-[7rem] border-2 border-white">
                        Venue Contact
                      </th>
                      <th className="w-[7rem] border-2 border-white">
                        Venue City
                      </th>
                      <th className="w-[20rem] border-2 border-white">
                        Venue Address
                      </th>
                      <th className="w-[10rem] border-2 border-white">
                        Able to Organize Multiday Event
                      </th>
                      <th className="w-[5rem] border-2 border-white">
                        Max Capacity
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Opening Time
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Closing Time
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        1st Half Timing
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Booking Price (1st Half)
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        2nd Half Timing
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Booking Price (2nd Half)
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Full Day Timing
                      </th>
                      <th className="w-[8rem] border-2 border-white">
                        Booking Price (Full Day)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(allVenues) &&
                      allVenues.map((venue, index) => (
                        <tr key={venue._id}>
                          <td className="border-2 p-2">{index + 1}</td>
                          <td className="border-2 p-2">{venue.name}</td>
                          <td className="border-2 p-2">{venue.owner}</td>
                          <td className="border-2 p-2">{venue.email}</td>
                          <td className="border-2 p-2">{venue.contact}</td>
                          <td className="border-2 p-2">{venue.city}</td>
                          <td className="border-2 p-2">{venue.address}</td>
                          <td className="border-2 p-2">
                            {venue.canOrganizeMultidayEvent ? "Yes" : "No"}
                          </td>
                          <td className="border-2 p-2">{venue.maxCapacity}</td>
                          <td className="border-2 p-2">{venue.openingtime}</td>
                          <td className="border-2 p-2">{venue.closingtime}</td>
                          <td className="border-2 p-2">
                            {venue.firstHalfTiming}
                          </td>
                          <td className="border-2 p-2">
                            {venue.firstHalfPrice}
                          </td>
                          <td className="border-2 p-2">
                            {venue.secondHalfTiming}
                          </td>
                          <td className="border-2 p-2">
                            {venue.secondHalfPrice}
                          </td>
                          <td className="border-2 p-2">
                            {venue.fullDayTiming}
                          </td>
                          <td className="border-2 p-2">{venue.fullDayPrice}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case "Home":
        return (
          <div className="bg-white min-h-screen overflow-x-hidden">
            {/* Header with clip-path */}
            <div
              className="p-6 bg-gradient-to-r from-blue-200 to-indigo-500 h-44 text-white"
              style={{
                clipPath: "polygon(100% 0%, 0% 0%, 0% 65%, 100% 52.4%)",
              }}
            >
              <h1
                className="text-5xl font-serif font-bold text-gradient2 mt-[1.7rem]"
                style={{ fontFamily: '"quick"' }}
              >
                Welcome Admin...
              </h1>
            </div>

            {/* Main content container */}
            <div className="max-w-6xl mx-auto -mt-20 px-4 pb-10">
              <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-6 shadow-2xl">
                <h2 className="text-center text-2xl font-serif font-bold mb-6">
                  Company Information
                </h2>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Company details */}
                  <div className="flex-1 bg-white p-4 border-2 border-gray-400 rounded-md shadow-2xl">
                    <h3 className="text-center text-lg font-serif font-semibold mb-4">
                      Company Details
                    </h3>
                    <div className="space-y-6">
                      {Object.entries(fields).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center bg-gray-200 p-3 rounded shadow"
                        >
                          {editMode[key] ? (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleFieldChange(e, key)}
                              className="flex-1 p-1 border rounded"
                            />
                          ) : (
                            <p>
                              <span className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </span>{" "}
                              {value}
                            </p>
                          )}
                          <button
                            onClick={() => handleEditToggle(key)}
                            className="ml-4 text-xl text-blue-500"
                          >
                            {editMode[key] ? (
                              <AiOutlineSave />
                            ) : (
                              <AiOutlineEdit />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex-1">
                    <h3 className="text-center text-lg font-serif font-semibold mb-4 mt-4 md:mt-0">
                      Company Analytics
                    </h3>
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="bg-white border-2 border-gray-400 p-4 rounded shadow-xl flex flex-wrap justify-center gap-4">
                        {[
                          { color: "red", label: "Events", value: "100,000+" },
                          {
                            color: "yellow",
                            label: "Event Planner",
                            value: "50,000+",
                          },
                          { color: "green", label: "Countries", value: "100+" },
                          { color: "blue", label: "Attendees", value: "100k+" },
                        ].map(({ color, label, value }, i) => {
                          const bgColorClass = {
                            red: "bg-red-200",
                            yellow: "bg-yellow-200",
                            green: "bg-green-200",
                            blue: "bg-blue-200",
                          }[color];

                          return (
                            <div
                              key={i}
                              className={`${bgColorClass} h-28 w-[45%] p-4 rounded shadow`}
                            >
                              <FontAwesomeIcon icon={faCalendarCheck} />
                              <div className="text-xl font-bold">{value}</div>
                              <div className="text-sm">{label}</div>
                            </div>
                          );
                        })}
                      </div>
                      {/* Charts */}
                      <div className="flex justify-center gap-4 bg-white border-2 border-gray-400 p-4 rounded shadow-xl">
                        <img
                          src="https://r-charts.com/en/part-whole/donut-chart_files/figure-html/donut-chart-hole-fill.png"
                          alt="Chart 1"
                          className="w-[45%] rounded"
                        />
                        <img
                          src="https://www.nobledesktop.com/images/tableaucolorfig8.png"
                          alt="Chart 2"
                          className="w-[45%] rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const [adminuser, setadminuser] = useState(null);
  const [venueRequests, setvenueRequests] = useState([]);
  const [allVenues, setallVenues] = useState([]);
  const [allEvents, setallEvents] = useState([]);

  useEffect(() => {
    if (!adminuser) {
      findAdmin().then((response) => {
        setadminuser(response);
        setvenueRequests(response.appliedVenues);
      });
    }

    if (!company) {
      fetchCompanyDetails().then((response) => {
        setCompany(response);
        setFields({
          companyName: response?.companyName,
          email: response?.email,
          contact: response?.contact,
          description: response?.description,
          address: response?.address,
        });
      });
    } else {
      setFields({
        companyName: company?.companyName,
        email: company?.email,
        contact: company?.contact,
        description: company?.description,
        address: company?.address,
      });
    }
  }, []);

  const [upcomingEvents, setupcomingEvents] = useState([]);
  const [pastEvents, setpastEvents] = useState([]);

  useEffect(() => {
    fetchAllVenues().then((response) => {
      setallVenues(response.data);
    });

    fetchAllEvents().then((response) => {
      setallEvents(response.data);
      const today = new Date();
      const upcoming = response.data.filter(
        (event) => new Date(event.date) > today
      );
      setupcomingEvents(upcoming);

      const pastEvents = response.data.filter(
        (event) => new Date(event.date) < today
      );
      setpastEvents(pastEvents);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar menuItems={[]} />
        <div className="flex">
          {/* side bar */}
          <div
            className={`fixed top-16 left-0 bg-[#081647] text-white rounded-r-2xl shadow-2xl p-4 z-40 transition-transform duration-300 ${
              menuVisible ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[18rem]`}
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div className="w-full flex justify-center pt-3">
              <img
                className="rounded-full h-32 w-32 border-[.4rem] border-indigo-400"
                src={adminuser ? (adminuser.image ? adminuser.image.url : null) : null}
                alt="admin image"
              ></img>
              <label className="absolute top-[6.5rem] w-8 h-8 bg-gray-600 rounded-full flex justify-center items-center cursor-pointer">
                <FontAwesomeIcon icon={faEdit} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="h-20 text-center pt-5 font-bold font-serif text-lg">
              {/* <div className="h-8 pt-5 text-2xl font-extrabold flex items-center justify-center font-serif"> */}
              {company ? company.companyName : null}
              {/* </div> */}
            </div>

            <div className="border-b-4 border-yellow-400 rounded-2xl mb-2"></div>

            <ul className="space-y-4 p-2 flex flex-col items-center">
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${activeMenu === "Home" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setActiveMenu("Home")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${activeMenu === "Venue Requests" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setActiveMenu("Venue Requests")}
              >
                Requested Venue
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${activeMenu === "Upcoming Events" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setActiveMenu("Upcoming Events")}
              >
                Upcoming Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${activeMenu === "Past Events" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setActiveMenu("Past Events")}
              >
                Past Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${activeMenu === "Venue Details" ? "bg-gray-600" : ""
                  }`}
                onClick={() => setActiveMenu("Venue Details")}
              >
                Venue Details
              </li>
            </ul>
            {/* <div className="mt-[2rem] w-[100%] flex flex-col text-xs items-center"> */}
            <div className="mt-10 text-xs text-center border-t pt-2">
              &copy;{company?.companyName}2024.
            </div>
            {/* </div> */}
          </div>
          {/* Toggle button for small screens */}
          <div className="lg:hidden fixed top-[4.5rem] left-4 z-50">
            <button
              onClick={toggleMenu}
              className="p-2 h-8 w-8 rounded-full text-red-500 flex items-center justify-center font-bold border-4 border-red-500"
            >
              <FontAwesomeIcon icon={menuVisible ? faTimes : faEllipsisV} />
            </button>
          </div>
          {/* Main content */}
          <div className="w-[100%] ml-[13rem] overflow-y-auto scrollbar-hide">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;

const BookingCard = ({
  eventName,
  eventStartingDate,
  eventEndingDate,
  eventTime,
  eventImage,
  venue,
  platform,
}) => {
  return (
    <div className="w-[20rem] mt-[4rem] h-[18rem] rounded-md shadow-xl overflow-hidden relative cursor-pointer snap-start shrink-0 px-4 bg-blue-200 flex flex-col items-center justify-center transition-all duration-300 group gap-5">
      <div className="para uppercase text-center leading-none z-40">
        <p
          style={{
            WebkitTextStroke: "1px #1e90ff",
            WebkitTextFillColor: "transparent",
            textShadow: "1px 1px rgba(0, 0, 0, 0.8)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "0 4px",
            borderRadius: "4px",
          }}
          className="z-10 font-bold text-lg -mb-5 tracking-wider text-blue-800"
        >
          {eventName}
        </p>

        <p className="font-bold text-xl font-serif tracking-wider mt-5 text-[#181868] z-30">
          {eventStartingDate}
          {eventEndingDate ? `to ${eventEndingDate}` : ""}
        </p>
      </div>
      <div className="w-[150px] h-[150px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#24187b] after:top-9 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover rounded-md group-hover:opacity-90 transition-all duration-300"
        />
        <div className="tooltips absolute top-0 left-0.5 right-2 -translate-x-[150%] flex flex-col items-start gap-4 transition-all duration-300 group-hover:-translate-x-full">
          <p className="text-[#24187b] font-semibold font-serif text-xl uppercase group-hover:delay-900 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
            {eventTime}
          </p>
          <ul className="flex flex-col items-start gap-3">
            {venue && (
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  fill="none"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height={16}
                  width={16}
                  className="stroke-[#0a036c]"
                >
                  <path d="M12 21s8-6.5 8-13a8 8 0 0 0-16 0c0 6.5 8 13 8 13z" />
                  <circle cx="12" cy="8" r="3" />
                </svg>
                <p className="text-s font-semibold font-serif text-[#0a036c]">
                  {venue}
                </p>
              </li>
            )}
            {platform && (
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  className="stroke-[#000000]"
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 64 64"
                  height={16}
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="6"
                    width="60"
                    height="40"
                    rx="3"
                    ry="3"
                    className="stroke-[#0a036c]"
                  />
                  <circle cx="20" cy="20" r="6" className="stroke-[#0a036c]" />
                  <rect
                    x="14"
                    y="28"
                    width="12"
                    height="6"
                    className="stroke-[#0a036c]"
                  />
                  <circle cx="44" cy="15" r="4" className="stroke-[#0a036c]" />
                  <rect
                    x="40"
                    y="20"
                    width="8"
                    height="4"
                    className="stroke-[#0a036c]"
                  />
                  <circle cx="44" cy="30" r="4" className="stroke-[#0a036c]" />
                  <rect
                    x="40"
                    y="35"
                    width="8"
                    height="4"
                    className="stroke-[#0a036c]"
                  />
                  <rect
                    x="8"
                    y="50"
                    width="48"
                    height="10"
                    rx="2"
                    ry="2"
                    className="stroke-[#0a036c]"
                  />
                </svg>
                <p className="text-s font-semibold font-serif text-[#0a036c]">
                  {platform}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
