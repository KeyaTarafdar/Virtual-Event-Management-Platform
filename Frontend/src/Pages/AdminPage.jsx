import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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
} from "@fortawesome/free-solid-svg-icons";
import { useCompany } from "../context/companyContext/CompanyContext";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { company, setCompany } = useCompany();

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
        `Searching for ${input} by ${
          type === "venueName" ? "Venue Name" : "Venue Address"
        }`
      );

      document.querySelector(`#${type}Input`).value = "";
    } else {
      alert(
        `Please enter a ${
          type === "venueName" ? "Venue Name" : "Venue Address"
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
          localStorage.setItem("company", JSON.stringify(response.data));
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
                <div
                  key={venue._id}
                  className="w-[97%] ml-5 mt-3 border-gray-300 rounded-lg shadow-md p-4 flex justify-between items-center bg-white border-4"
                >
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 pb-3">
                      <span className="font-medium">Venue Name:</span>{" "}
                      {venue.name}
                    </h2>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Email:</span> {venue.email}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Contact:</span>{" "}
                      {venue.contact}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">City:</span> {venue.city}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Address:</span>{" "}
                      {venue.address}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Multiday Event:</span>{" "}
                      {venue.canOrganizeMultidayEvent ? "Yes" : "No"}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Max Headcount:</span>{" "}
                      {venue.maxCapacity}
                    </p>
                  </div>

                  <div className="flex gap-5 mr-5 text-white">
                    <button
                      className="border-2 rounded-lg bg-green-500 font-bold font-serif h-10 w-32 hover:bg-green-600 hover:border-green-600 transition duration-300 ease-in-out"
                      onClick={() => {
                        handleAcceptVenue(venue._id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="border-2 rounded-lg bg-red-500 font-bold font-serif h-10 w-32 hover:bg-red-600 hover:border-red-600 transition duration-300 ease-in-out"
                      onClick={handleReject}
                    >
                      Reject
                    </button>

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
            <div className="p-4 flex justify-center overflow-y-scroll overflow-x-hidden w-full h-[92vh] bg-gray-100 flex-wrap gap-x-4">
              {Array.isArray(allEvents) && allEvents.length > 0 ? (
                allEvents.map((event) => (
                  <div key={event.id}>
                    <BookingCard
                      eventName={event.eventName}
                      eventStartingDate={formatDate(event.date)}
                      eventEndingDate={
                        event.eventEndDate ? event.eventEndDate : null
                      }
                      eventTime={event.time}
                      eventImage={event.posterImage.url}
                      venue={
                        event.eventType === "in_person" || "hybrid"
                          ? `${event.hallName ? `${event.hallName}, ` : ""} ${
                              event.city
                            }`
                          : null
                      }
                      platform={
                        event.eventType === "virtual" || "hybrid"
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
            <div className="p-4 flex justify-center overflow-y-scroll overflow-x-hidden w-full h-[92vh] bg-gray-100 flex-wrap gap-x-4">
              {Array.isArray(allEvents) && allEvents.length > 0 ? (
                allEvents.map((event) => (
                  <div key={event.id}>
                    <BookingCard
                      eventName={event.eventName}
                      eventStartingDate={formatDate(event.date)}
                      eventEndingDate={
                        event.eventEndDate ? event.eventEndDate : null
                      }
                      eventTime={event.time}
                      eventImage={event.posterImage.url}
                      venue={
                        event.eventType === "in_person" || "hybrid"
                          ? `${event.hallName ? `${event.hallName}, ` : ""} ${
                              event.city
                            }`
                          : null
                      }
                      platform={
                        event.eventType === "virtual" || "hybrid"
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
            <div className="flex items-center p-5 ">
              {/* Search by Venue Name */}
              <div className="flex items-center">
                <h3 className="mr-4 font-serif font-bold">
                  Search by Venue Name :{" "}
                </h3>
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

              <div className="bg-yellow-500 rounded-lg w-1 h-12 ml-8 mr-8"></div>
              {/* Search by Venue Address */}
              <div className="flex items-center">
                <h3 className="mr-4 font-serif font-bold">
                  Search by Venue Address :{" "}
                </h3>
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

            <div className=" max-w-[200rem] h-[92vh] text-center mt-[0.6px]">
              <div>
                <table className="w-full table-fixed">
                  <thead className=" sticky top-0 bg-black text-white">
                    <tr className="">
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
                          <td className="border-2 p-2">{venue.ownerName}</td>
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
          <>
            <div className="bg-white">
              <div
                className="p-5  pl-4 shadow-inner bg-gradient-to-r from-blue-200 to-indigo-500 h-48  "
                style={{
                  clipPath:
                    "polygon(100% 0%, 0% 0% , 0% 65%, 1% 64.95%, 2% 64.8%, 3% 64.6%, 4% 64.3%, 5% 63.9%, 6% 63.45%, 7% 62.9%, 8% 62.25%, 9% 61.55%, 10% 60.8%, 11% 59.95%, 12% 59.05%, 13% 58.1%, 14% 57.1%, 15% 56.05%, 16% 55%, 17% 53.9%, 18% 52.8%, 19% 51.65%, 20% 50.5%, 21% 49.35%, 22% 48.2%, 23% 47.05%, 24% 45.9%, 25% 44.8%, 26% 43.75%, 27% 42.75%, 28% 41.75%, 29% 40.8%, 30% 39.9%, 31% 39.1%, 32% 38.35%, 33% 37.65%, 34% 37.05%, 35% 36.5%, 36% 36.05%, 37% 35.65%, 38% 35.35%, 39% 35.15%, 40% 35.05%, 41% 35%, 42% 35.05%, 43% 35.2%, 44% 35.45%, 45% 35.75%, 46% 36.15%, 47% 36.65%, 48% 37.2%, 49% 37.85%, 50% 38.55%, 51% 39.35%, 52% 40.2%, 53% 41.1%, 54% 42.05%, 55% 43.05%, 56% 44.1%, 57% 45.15%, 58% 46.3%, 59% 47.4%, 60% 48.55%, 61% 49.7%, 62% 50.85%, 63% 52%, 64% 53.15%, 65% 54.25%, 66% 55.35%, 67% 56.4%, 68% 57.45%, 69% 58.4%, 70% 59.35%, 71% 60.2%, 72% 61.05%, 73% 61.8%, 74% 62.45%, 75% 63.05%, 76% 63.6%, 77% 64.05%, 78% 64.4%, 79% 64.7%, 80% 64.85%, 81% 65%, 82% 65%, 83% 64.9%, 84% 64.75%, 85% 64.5%, 86% 64.2%, 87% 63.75%, 88% 63.25%, 89% 62.7%, 90% 62.05%, 91% 61.3%, 92% 60.5%, 93% 59.65%, 94% 58.75%, 95% 57.8%, 96% 56.8%, 97% 55.75%, 98% 54.65%, 99% 53.55%, 100% 52.4%)",
                }}
              >
                <h1
                  className="text-5xl ml-6 font-serif text-gradient2 font-bold tracking-wide flex items-center"
                  style={{ fontFamily: '"quick"', wordSpacing: "0.2em" }}
                >
                  Welcome Admin...
                </h1>
              </div>

              <div className="max-w-6xl mx-auto p-5 bg-yellow-100 shadow-2xl border-2 border-yellow-500 rounded-lg mt-[-8rem]">
                <h2 className="text-center text-2xl font-serif font-bold mb-5 mt-5">
                  Company Information
                </h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 p-4 bg-white shadow-2xl border-2 border-gray-400 rounded-md mt-[2rem]">
                    {/* Company Details Section */}
                    <h3 className="text-lg text-center font-serif font-semibold">
                      Company Details
                    </h3>
                    <div className="space-y-[2.5rem] pl-8 pr-8 mt-6">
                      {Object.entries(fields).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between border-4 p-3 bg-gray-200 rounded-lg shadow-lg"
                        >
                          {editMode[key] ? (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleFieldChange(e, key)}
                              className="flex-1 p-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="text-base">
                              <span className="font-medium">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) =>
                                    str.toUpperCase()
                                  )}{" "}
                                :{" "}
                              </span>
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

                  {/* Company Analytics */}
                  <div className="flex-1 ">
                    <h2 className="text-center text-xl font-serif font-bold mt-8 ">
                      Company Analytics
                    </h2>
                    <div className="flex-1 mt-4 flex flex-col items-center gap-4 ">
                      <div className="bg-white w-[100%] p-4 flex flex-col items-center rounded-lg shadow-xl border-2 border-gray-400">
                        <div className="flex gap-4 w-[95%] h-36">
                          {/* Red box */}
                          <div className="bg-red-200 h-28 w-[90%] shadow-xl rounded-lg p-4">
                            <FontAwesomeIcon
                              icon={faCalendarCheck}
                              style={{ color: "#000000" }}
                            />
                            <div className=" text-2xl font-bold flex ">
                              100,000+
                            </div>
                            <div className="text-md">Events</div>
                          </div>
                          {/* Yellow box */}
                          <div className="bg-yellow-200 h-28 w-[90%] shadow-xl rounded-lg p-4">
                            <FontAwesomeIcon
                              icon={faCalendarCheck}
                              style={{ color: "#000000" }}
                            />
                            <div className="text-2xl font-bold">50,000+</div>
                            <div className="text-md">Event Planner</div>
                          </div>
                        </div>
                        <div className="flex gap-4 w-[95%] h-36">
                          {/* GREEN   BOX */}
                          <div className="bg-green-200 h-28 w-[90%] shadow-xl rounded-lg p-4">
                            <FontAwesomeIcon
                              icon={faGlobe}
                              style={{ color: "#000000" }}
                            />
                            <div className="text-2xl font-bold">100+</div>
                            <div className="text-md">Countries</div>
                          </div>
                          {/* Blue  Box */}
                          <div className="bg-blue-200 h-28 w-[90%] shadow-xl rounded-lg p-4">
                            <FontAwesomeIcon
                              icon={faUsers}
                              style={{ color: "#000000" }}
                            />
                            <div className=" text-2xl font-bold">100k+</div>
                            <div className="text-md">Attendees</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 bg-white w-[98%] rounded-lg shadow-xl border-2 border-gray-400 mt-12">
                        <img
                          src="https://r-charts.com/en/part-whole/donut-chart_files/figure-html/donut-chart-hole-fill.png"
                          alt="Image 1"
                          className="w-[45%] rounded-md"
                        />
                        <img
                          src="https://www.nobledesktop.com/images/tableaucolorfig8.png"
                          alt="Image 2"
                          className="w-[45%] rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  const [admin, setadmin] = useState(null);
  const [venueRequests, setvenueRequests] = useState([]);
  const [allVenues, setallVenues] = useState([]);
  const [allEvents, setallEvents] = useState([]);

  useEffect(() => {
    if (!admin) {
      findAdmin().then((response) => {
        setadmin(response);
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

  useEffect(() => {
    fetchAllVenues().then((response) => {
      setallVenues(response.data);
    });

    fetchAllEvents().then((response) => {
      setallEvents(response);
    });
  }, []);

  return (
    <>
      <div className="h-screen">
        <Navbar menuItems={[]} />
        <div className="h-[91.7vh] flex m-0 p-0 overflow-hidden">
          {/* side bar */}
          <div className="w-[13rem] min-w-[13rem] rounded-r-2xl bg-[#081647] text-white p-4 h-[91%] fixed top-[4rem] left-0 z-10">
            <div className="w-full flex justify-center pt-3  ">
              <img
                className="rounded-full h-32 w-32 border-[.4rem] border-indigo-400"
                src={admin ? (admin.image ? admin.image.url : null) : null}
                alt="admin image"
              ></img>
              <label className="mt-3 absolute top-[5.8rem] sm:top-[7.5rem] w-8 h-8 cursor-pointer flex justify-center items-center  bg-gray-600 rounded-full p-2">
                <FontAwesomeIcon icon={faEdit} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="h-20 text-center flex-col justify-center ">
              <div className="h-8 pt-5 text-2xl font-extrabold flex items-center justify-center font-serif">
                {company ? company.companyName : null}
              </div>
            </div>

            <div className="w-[100%] h-1 border-b-4 border-yellow-400 rounded-2xl  mb-2"></div>

            <ul className="space-y-4 p-2 flex flex-col items-center">
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${
                  activeMenu === "Home" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Home")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${
                  activeMenu === "Venue Requests" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Venue Requests")}
              >
                Requested Venue
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${
                  activeMenu === "Upcoming Events" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Upcoming Events")}
              >
                Upcoming Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${
                  activeMenu === "Past Events" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Past Events")}
              >
                Past Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded w-full text-center ${
                  activeMenu === "Venue Details" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Venue Details")}
              >
                Venue Details
              </li>
            </ul>
            <div className="mt-[2rem] w-[100%] flex flex-col text-xs items-center">
              <div className="w-[95%] border-b-2 border-gray-200 m-2 rounded-2xl mt-6 mb-4"></div>
              &copy;{company?.companyName}2024.
            </div>
          </div>

          {/* Main content */}
          <div className="w-[100%] ml-[13rem] overflow-y-auto">
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
    <div className="w-[20rem] mt-[4rem] h-[18rem] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 px-4 bg-blue-200 flex flex-col items-center justify-center transition-all duration-300 group gap-5">
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
