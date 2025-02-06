import { useState, useEffect } from "react";
import { createEvent, fetchAllVenues } from "../utils/utils";
import { useParams, useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();
  const { eventType } = useParams();

  const [error, setError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [dateerror, setDateError] = useState("");
  const [enddateerror, setEndDateError] = useState("");
  const [speakerError, setSpeakerError] = useState("");
  const [timeerror, setTimeError] = useState("");
  const [regerror, setRegError] = useState("");
  const [descerror, setDescError] = useState("");
  const [posterError, setPosterError] = useState("");
  const [loading, setLoading] = useState(false);

  const [venueDropdown, setVenueDropdown] = useState(false);

  const [venue1, setVenue1] = useState(false);
  const [venue2, setVenue2] = useState(false);
  const [venue3, setVenue3] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventDuration: 1,
    eventEndDate: "",
    eventTime: "",
    eventType: "",
    speakerName: "",
    city: "",
    platform: "",
    description: "",
    registrationEndDate: "",
    rulesFile: null,
    headcount: 0,
    isPaid: false,
    isPublic: true,
    paidAmountPerPerson: 0,
    bill: 0,
    posterImage: null,
    scannerImage: null,
    venue1: {
      id: null,
      timeslot: null,
    },
    venue2: {
      id: null,
      timeslot: null,
    },
    venue3: {
      id: null,
      timeslot: null,
    },
  });

  const handleScannerImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please Upload an Scanner Image");
      return;
    }
    const maxSizeInKB = 50;
    if (file.size > maxSizeInKB * 1024) {
      alert(`File size should be less than ${maxSizeInKB} KB.`);
      return;
    }

    const imageData = await setFileToBase(file);
    setFormData({ ...formData, scannerImage: imageData });
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

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleEventTypeChange = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFormData({
        ...formData,
        [name]: value,
        city: "",
        platform: "",
        venue1: {
          ...formData.venue1,
          id: null,
          bookingshifts: null,
        },
        venue2: {
          ...formData.venue2,
          id: null,
          bookingshifts: null,
        },
        venue3: {
          ...formData.venue3,
          id: null,
          bookingshifts: null,
        },
      });
    } else {
      setFormData({ ...formData, [name]: eventType });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await createEvent(formData);
      setTimeout(async () => {
        setLoading(false);
        alert(result);
        if (
          formData.eventType === "virtual" &&
          result === "Event created successfully!"
        ) {
          navigate("/virtualevent");
        }
        if (
          formData.eventType === "hybrid" &&
          result === "Event created successfully!"
        ) {
          navigate("/hybridevent");
        }
        if (
          formData.eventType === "in_person" &&
          result === "Event created successfully!"
        ) {
          navigate("/inpersonevent");
        }
      }, 3000);
    } catch (error) {
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  const [allVenues, setallVenues] = useState([]);
  const [allVenuesCopy, setallVenuesCopy] = useState([]);
  const [allCity, setallCity] = useState([]);
  const [venue_1, setvenue_1] = useState([]);
  const [venue_2, setvenue_2] = useState([]);
  const [venue_3, setvenue_3] = useState([]);
  const [venue_1_BookingShift, setvenue_1_BookingShift] = useState("");
  const [venue_2_BookingShift, setvenue_2_BookingShift] = useState("");
  const [venue_3_BookingShift, setvenue_3_BookingShift] = useState("");

  useEffect(() => {
    setFormData({ ...formData, eventType });
    fetchAllVenues().then((response) => {
      setallVenues(response);
      setallVenuesCopy(response);
    });
  }, []);

  const openNewTab = () => {
    window.open("http://localhost:5173/venue", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 m-12 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Part */}
          <div className="w-full lg:w-full">
            <h2 className="font-serif text-3xl sm:text-3xl font-bold mb-6 sm:mb-8 text-indigo-600">
              Create Your Event
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={(e) => {
                    const value = e.target.value;
                    const maxWords = 20;
                    const regex = /^[A-Za-z][A-Za-z\s]{0,}$/; // Starts with letters, only spaces allowed, no special chars or digits.
                    const wordCount = value.trim().split(/\s+/).length;

                    const errorMessage = !regex.test(value)
                      ? "Event name must start with a letter and contain only alphabets and spaces."
                      : wordCount > maxWords
                      ? `Event name should not exceed ${maxWords} words.`
                      : "";
                    setNameError(errorMessage);
                    setFormData({ ...formData, eventName: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    nameerror ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter event name"
                  required
                />
                {nameerror && (
                  <p className="text-red-500 text-sm mt-1">{nameerror}</p>
                )}
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Event <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const today = new Date();
                    const oneYearLater = new Date();
                    oneYearLater.setFullYear(today.getFullYear() + 1);

                    if (selectedDate < today) {
                      setDateError("Event date cannot be in the past.");
                      setFormData({ ...formData, eventDate: "" });
                      return;
                    }

                    if (selectedDate > oneYearLater) {
                      setDateError(
                        "Event date must be within the next 1 year."
                      );
                      setFormData({ ...formData, eventDate: "" });
                      return;
                    }

                    setDateError("");
                    setFormData({ ...formData, eventDate: e.target.value });

                    // Filter venue based to date
                    const filteredVenues = allVenuesCopy.filter((venue) => {
                      return venue.bookingDates.every((bookingDate, index) => {
                        return (
                          bookingDate !== e.target.value ||
                          venue.bookingShifts[index] !== "F"
                        );
                      });
                    });
                    setallVenues(filteredVenues);

                    // Extract only cities
                    const uniqueCities = [
                      ...new Set(filteredVenues.map((venue) => venue.city)),
                    ];
                    setallCity(uniqueCities);
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
                {dateerror && (
                  <p className="text-red-500 text-sm mt-1">{dateerror}</p>
                )}
              </div>

              {/* Event Duration */}
              {formData.eventDate && (
                <div className="flex">
                  <label className="block text-sm font-medium text-gray-700 pr-5">
                    Is it a Single Day Event?
                  </label>
                  <input
                    checked={formData.eventDuration === 1}
                    type="checkbox"
                    className="mr-1"
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        eventDuration: 1,
                      }))
                    }
                  />
                  Yes
                  <input
                    type="checkbox"
                    className="ml-4 mr-1"
                    checked={formData.eventDuration === 0}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        eventDuration: 0,
                      }))
                    }
                  />
                  No
                </div>
              )}

              {/* Event Ending Date */}
              {formData.eventDuration === 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date of Event <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventEndDate"
                    onChange={(e) => {
                      const selectedEndDate = new Date(e.target.value);
                      const eventStartDate = new Date(formData.eventDate);
                      const today = new Date();
                      const oneYearLater = new Date();
                      oneYearLater.setFullYear(today.getFullYear() + 1);

                      const fiveDaysLater = new Date(eventStartDate);
                      fiveDaysLater.setDate(eventStartDate.getDate() + 5);

                      if (selectedEndDate <= eventStartDate) {
                        setEndDateError("Please select a valid Event end data");
                        setFormData({ ...formData, eventEndDate: "" });
                      }
                      if (selectedEndDate > fiveDaysLater) {
                        setEndDateError(
                          "Event end date must be within 5 days from the event start date."
                        );
                        setFormData({ ...formData, eventEndDate: "" });
                      } else {
                        setEndDateError("");
                        setFormData({
                          ...formData,
                          eventEndDate: e.target.value,
                        });
                      }
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                  {enddateerror && (
                    <p className="text-red-500 text-sm mt-1">{enddateerror}</p>
                  )}
                </div>
              )}

              {/* Event Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time of Event<span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const currentDate = new Date();
                    const currentTime = currentDate.toTimeString().slice(0, 5);

                    const isToday =
                      formData.eventDate ===
                      currentDate.toISOString().split("T")[0];
                    const minTime = "09:00";
                    const maxTime = "21:00";

                    if (selectedTime < minTime || selectedTime > maxTime) {
                      setTimeError(
                        "Event time must be between 9:00 AM and 9:00 PM."
                      );
                    } else if (isToday && selectedTime < currentTime) {
                      setTimeError("Event time cannot be in the past.");
                    } else {
                      setTimeError("");
                    }

                    setFormData({ ...formData, eventTime: selectedTime });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    timeerror ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  required
                />
                {timeerror && (
                  <p className="text-red-500 text-sm mt-1">{timeerror}</p>
                )}
              </div>

              {/* Speaker */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Speaker's Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="speakerName"
                  value={formData.speakerName}
                  onChange={(e) => {
                    const value = e.target.value;
                    const nameRegex = /^[a-zA-Z\s]*$/;

                    if (value.trim() === "") {
                      setSpeakerError("Speaker's name cannot be empty.");
                    } else if (!nameRegex.test(value)) {
                      setSpeakerError(
                        "Speaker's name can only contain alphabets and spaces."
                      );
                    } else if (value.length > 50) {
                      setSpeakerError(
                        "Speaker's name cannot exceed 50 characters."
                      );
                    } else {
                      setSpeakerError("");
                    }

                    setFormData({ ...formData, speakerName: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    speakerError ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter speaker's name"
                  required
                />
                {speakerError && (
                  <p className="text-red-500 text-sm mt-1">{speakerError}</p>
                )}
              </div>

              {/* Total HeadCount */}
              <div>
                <label className="block text-sm mt-8 font-medium text-gray-700">
                  Total HeadCount
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="headcount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter number of maximum participent"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setError("");
                    setFormData({
                      ...formData,
                      headcount: e.target.value,
                    });
                  }}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm mt-8 font-medium text-gray-700">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  disabled={
                    eventType === "in_person" ||
                    eventType === "virtual" ||
                    eventType === "hybrid"
                      ? true
                      : false
                  }
                  name="eventType"
                  onChange={handleEventTypeChange}
                  value={eventType ? eventType : null}
                  required
                >
                  <option value="" disabled selected={eventType ? false : true}>
                    Select event type
                  </option>
                  <option value="in_person">In-person</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Conditional field based on event type */}
              {(formData.eventType === "in_person" ||
                eventType === "in_person") && (
                <div className="bg-indigo-200 p-6 rounded-xl">
                  {/* City Dropdown */}
                  <label className="block text-sm font-medium text-gray-700">
                    Preferable City Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    id="city"
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      setvenue_1(
                        allVenues
                          .filter(
                            (venue) =>
                              venue.city === e.target.value &&
                              ((venue.bookingDates.includes(
                                formData.eventDate
                              ) &&
                                venue.bookingShifts !== "F") ||
                                !venue.bookingDates.includes(
                                  formData.eventDate
                                ))
                          )
                          .map((venue) => venue)
                      );

                      setVenueDropdown(true);
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option disabled selected>
                      Select City
                    </option>
                    {formData.eventDate ? (
                      <>
                        {allCity.map((city, index) => (
                          <option key={index}>{city}</option>
                        ))}
                      </>
                    ) : (
                      <option disabled className="text-red-600">
                        Please select the Event Date first
                      </option>
                    )}
                  </select>

                  {/* Venue Dropdowns */}
                  {venueDropdown && formData.city && (
                    <>
                      {/* Venue 1 */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Venue 1 <span className="text-red-500">*</span>
                          <span
                            className="float-end hover:underline text-blue-800"
                            onClick={openNewTab}
                          >
                            View Details
                          </span>
                        </label>
                        <select
                          onChange={(e) => {
                            const selectedVenue = JSON.parse(e.target.value);
                            setFormData({
                              ...formData,
                              venue1: {
                                ...formData.venue1,
                                id: selectedVenue._id,
                              },
                            });
                            setVenue1(true);
                            setvenue_1_BookingShift(
                              selectedVenue.bookingShifts
                            );

                            const filteredVenues = venue_1.filter(
                              (venue) => venue._id !== selectedVenue._id
                            );
                            setvenue_2(filteredVenues);
                          }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                          <option value="" disabled selected>
                            Select Venue 1
                          </option>
                          {Array.isArray(venue_1) &&
                            venue_1.map((venue, index) => (
                              <option key={index} value={JSON.stringify(venue)}>
                                {venue.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Time Slot for Venue 1 */}
                      {venue1 &&
                      formData.venue1.id &&
                      formData.venue1.id !== "no-venue" ? (
                        <div className="mt-4">
                          <p className="block text-sm font-medium text-gray-700">
                            Select Preferred Time Slot for Venue 1
                          </p>
                          <div>
                            <input
                              type="radio"
                              id="firstday1"
                              name="timeslot1"
                              value="1"
                              disabled={venue_1_BookingShift === "1"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue1: {
                                    ...formData.venue1,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            First Half (7:00 AM - 10:00 AM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="secday1"
                              name="timeslot1"
                              value="2"
                              disabled={venue_1_BookingShift === "2"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue1: {
                                    ...formData.venue1,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Second Half (12:00 PM - 5:00 PM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="fullday1"
                              name="timeslot1"
                              value="F"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue1: {
                                    ...formData.venue1,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Full Day (7:00 AM - 9:00 PM)
                          </div>
                        </div>
                      ) : null}

                      {/* Venue 2 */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Venue 2 <span className="text-red-500">*</span>
                          <span
                            className="float-end hover:underline text-blue-800"
                            onClick={openNewTab}
                          >
                            View Details
                          </span>
                        </label>
                        <select
                          onChange={(e) => {
                            const selectedVenue = JSON.parse(e.target.value);
                            setFormData({
                              ...formData,
                              venue2: {
                                ...formData.venue2,
                                id: selectedVenue._id,
                              },
                            });
                            setVenue2(true);
                            setvenue_2_BookingShift(
                              selectedVenue.bookingShifts
                            );

                            const filteredVenues = venue_2.filter(
                              (venue) => venue._id !== selectedVenue._id
                            );
                            setvenue_3(filteredVenues);
                          }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                          defaultValue=""
                        >
                          <option value="" disabled selected>
                            Select Venue 2
                          </option>
                          {Array.isArray(venue_2) && venue_2.length === 0 ? (
                            <option value="no-venue" className="text-red-600">
                              No more venue is available!
                            </option>
                          ) : (
                            venue_2.map((venue, index) => (
                              <option key={index} value={JSON.stringify(venue)}>
                                {venue.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* Time Slot for Venue 2 */}
                      {venue2 &&
                      formData.venue2.id &&
                      formData.venue2.id !== "no-venue" ? (
                        <div className="mt-4">
                          <p className="block text-sm font-medium text-gray-700">
                            Select Preferred Time Slot for Venue 2
                          </p>
                          <div>
                            <input
                              type="radio"
                              id="firstday2"
                              name="timeslot2"
                              value="1"
                              disabled={venue_2_BookingShift === "1"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue2: {
                                    ...formData.venue2,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            First Half (7:00 AM - 10:00 AM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="secday2"
                              name="timeslot2"
                              value="2"
                              disabled={venue_2_BookingShift === "2"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue2: {
                                    ...formData.venue2,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Second Half (12:00 PM - 5:00 PM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="fullday2"
                              name="timeslot2"
                              value="F"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue2: {
                                    ...formData.venue2,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Full Day (7:00 AM - 9:00 PM)
                          </div>
                        </div>
                      ) : null}

                      {/* Venue 3 */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Venue 3
                          <span
                            className="float-end hover:underline text-blue-800"
                            onClick={openNewTab}
                          >
                            View Details
                          </span>
                        </label>
                        <select
                          onChange={(e) => {
                            const selectedVenue = JSON.parse(e.target.value);
                            setFormData({
                              ...formData,
                              venue3: {
                                ...formData.venue3,
                                id: selectedVenue._id,
                              },
                            });
                            setVenue3(true);
                            setvenue_3_BookingShift(
                              selectedVenue.bookingShifts
                            );
                          }}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                          <option value="" disabled selected>
                            Select Venue 3
                          </option>
                          {Array.isArray(venue_3) && venue_3.length === 0 ? (
                            <option value="no-venue" className="text-red-600">
                              No more venue is available!
                            </option>
                          ) : (
                            venue_3.map((venue, index) => (
                              <option key={index} value={JSON.stringify(venue)}>
                                {venue.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* Time Slot for Venue 3 */}
                      {venue3 &&
                      formData.venue3.id &&
                      formData.venue3.id !== "no-venue" ? (
                        <div className="mt-4">
                          <p className="block text-sm font-medium text-gray-700">
                            Select Preferred Time Slot for Venue 3
                          </p>
                          <div>
                            <input
                              type="radio"
                              id="firstday3"
                              name="timeslot3"
                              value="1"
                              disabled={venue_3_BookingShift === "1"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue3: {
                                    ...formData.venue3,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            First Half (7:00 AM - 10:00 AM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="secday3"
                              name="timeslot3"
                              value="2"
                              disabled={venue_3_BookingShift === "2"}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue3: {
                                    ...formData.venue3,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Second Half (12:00 PM - 5:00 PM)
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="fullday3"
                              name="timeslot3"
                              value="F"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue3: {
                                    ...formData.venue3,
                                    timeslot: e.target.value,
                                  },
                                });
                              }}
                            />
                            Full Day (7:00 AM - 9:00 PM)
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              )}

              {(eventType === "virtual" ||
                formData.eventType === "virtual") && (
                <div className="bg-indigo-200 p-6 rounded-xl">
                  <label className="block text-sm mt-1 font-medium text-gray-700">
                    Preferable Online Meeting Platform{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    name="platform"
                    value={formData.platform || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        platform: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled selected>
                      Select preferable platform
                    </option>
                    <option value="zoom">Zoom</option>
                    <option value="gmeet">Google Meet</option>
                    <option value="skype">Skype</option>
                  </select>
                </div>
              )}

              {(eventType === "hybrid" || formData.eventType === "hybrid") && (
                <>
                  <div className="bg-indigo-200 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm mt-2 font-medium text-gray-700">
                        Preferable Online Meeting Platform{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        name="platform"
                        value={formData.platform || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            platform: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled selected>
                          Select preferable platform
                        </option>
                        <option value="zoom">Zoom</option>
                        <option value="gmeet">Google Meet</option>
                        <option value="skype">Skype</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mt-8 font-medium text-gray-700">
                        Preferable City Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        id="city"
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          setvenue_1(
                            allVenues
                              .filter((venue) => venue.city === e.target.value)
                              .map((venue) => venue)
                          );

                          setVenueDropdown(true);
                        }}
                        className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="" disabled selected>
                          Select City
                        </option>
                        {formData.eventDate ? (
                          <>
                            {allCity.map((city, index) => (
                              <option key={index}>{city}</option>
                            ))}
                          </>
                        ) : (
                          <option disabled className="text-red-600">
                            Please select the Event Date first
                          </option>
                        )}
                      </select>

                      {/* Venue Dropdown */}
                      {venueDropdown && formData.city && (
                        <>
                          {/* Venue 1 */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Venue 1 <span className="text-red-500">*</span>
                              <span
                                className="float-end hover:underline text-blue-800"
                                onClick={openNewTab}
                              >
                                View Details
                              </span>
                            </label>
                            <select
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue1: {
                                    ...formData.venue1,
                                    id: e.target.value,
                                  },
                                });
                                setVenue1(true);

                                const filteredVenues = venue_1.filter(
                                  (venue) => venue._id !== e.target.value
                                );
                                setvenue_2(filteredVenues);
                              }}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="" disabled selected>
                                Select Venue 1
                              </option>
                              {Array.isArray(venue_1) &&
                                venue_1.map((venue, index) => (
                                  <option key={index} value={venue._id}>
                                    {venue.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          {/* Time Slot for Venue 1 */}
                          {venue1 &&
                          formData.venue1.id &&
                          formData.venue1.id !== "no-venue" ? (
                            <div className="mt-4">
                              <p className="block text-sm font-medium text-gray-700">
                                Select Preferred Time Slot for Venue 1
                              </p>
                              <div>
                                <input
                                  type="radio"
                                  id="firstday1"
                                  name="timeslot1"
                                  disabled={venue_1_BookingShift === "1"}
                                />
                                First Half (7:00 AM - 10:00 AM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="secday1"
                                  name="timeslot1"
                                  disabled={venue_1_BookingShift === "2"}
                                />
                                Second Half (12:00 PM - 5:00 PM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="fullday1"
                                  name="timeslot1"
                                />
                                Full Day (7:00 AM - 9:00 PM)
                              </div>
                            </div>
                          ) : null}

                          {/* Venue 2 */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Venue 2 <span className="text-red-500">*</span>
                              <span
                                className="float-end hover:underline text-blue-800"
                                onClick={openNewTab}
                              >
                                View Details
                              </span>
                            </label>
                            <select
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue2: {
                                    ...formData.venue2,
                                    id: e.target.value,
                                  },
                                });
                                setVenue2(true);
                                const filteredVenues = venue_2.filter(
                                  (venue) => venue._id !== e.target.value
                                );
                                setvenue_3(filteredVenues);
                              }}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="" disabled selected>
                                Select Venue 2
                              </option>
                              {Array.isArray(venue_2) &&
                              venue_2.length === 0 ? (
                                <option
                                  value="no-venue"
                                  className="text-red-600"
                                >
                                  No more venue is available!
                                </option>
                              ) : (
                                venue_2.map((venue, index) => (
                                  <option key={index} value={venue._id}>
                                    {venue.name}
                                  </option>
                                ))
                              )}
                            </select>
                          </div>

                          {/* Time Slot for Venue 2 */}
                          {venue2 &&
                          formData.venue2.id &&
                          formData.venue2.id !== "no-venue" ? (
                            <div className="mt-4">
                              <p className="block text-sm font-medium text-gray-700">
                                Select Preferred Time Slot for Venue 2
                              </p>
                              <div>
                                <input
                                  type="radio"
                                  id="firstday2"
                                  name="timeslot2"
                                />
                                First Half (7:00 AM - 10:00 AM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="secday2"
                                  name="timeslot2"
                                />
                                Second Half (12:00 PM - 5:00 PM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="fullday2"
                                  name="timeslot2"
                                />
                                Full Day (7:00 AM - 9:00 PM)
                              </div>
                            </div>
                          ) : null}

                          {/* Venue 3 */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Venue 3
                              <span
                                className="float-end hover:underline text-blue-800"
                                onClick={openNewTab}
                              >
                                View Details
                              </span>
                            </label>
                            <select
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  venue3: {
                                    ...formData.venue3,
                                    id: e.target.value,
                                  },
                                });
                                setVenue3(true);
                              }}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="" disabled selected>
                                Select Venue 3
                              </option>
                              {Array.isArray(venue_3) &&
                              venue_3.length === 0 ? (
                                <option
                                  value="no-venue"
                                  className="text-red-600"
                                >
                                  No more venue is available!
                                </option>
                              ) : (
                                venue_3.map((venue, index) => (
                                  <option key={index} value={venue._id}>
                                    {venue.name}
                                  </option>
                                ))
                              )}
                            </select>
                          </div>

                          {/* Time Slot for Venue 3 */}
                          {venue3 &&
                          formData.venue3.id &&
                          formData.venue3.id !== "no-venue" ? (
                            <div className="mt-4">
                              <p className="block text-sm font-medium text-gray-700">
                                Select Preferred Time Slot for Venue 3
                              </p>
                              <div>
                                <input
                                  type="radio"
                                  id="firstday3"
                                  name="timeslot3"
                                />
                                First Half (7:00 AM - 10:00 AM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="secday3"
                                  name="timeslot3"
                                />
                                Second Half (12:00 PM - 5:00 PM)
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  id="fullday3"
                                  name="timeslot3"
                                />
                                Full Day (7:00 AM - 9:00 PM)
                              </div>
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Event's Transparency Type (Private/Public) */}
              <div>
                <label className="block text-sm mt-8 font-medium text-gray-700">
                  Event's Transparency Type{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  value={formData.isPublic ? "public" : "private"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPublic: e.target.value === "public",
                    })
                  }
                  required
                >
                  <option value="" disabled>
                    Select your preferable transparency type
                  </option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              {/* Paid/Not Paid */}
              <div>
                <label className="block text-sm mt-8 font-medium text-gray-700">
                  Event payment type for your audience{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  name="isPaid"
                  onChange={(e) => {
                    if (e.target.value == "paid") {
                      setFormData({ ...formData, isPaid: true });
                    } else {
                      setFormData({ ...formData, isPaid: false });
                    }
                  }}
                  required
                >
                  <option value="" disabled selected>
                    Select payment type
                  </option>
                  <option value="not_paid">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Paid Amount/Person */}
              {formData.isPaid && (
                <>
                  <div className="bg-indigo-200 p-6 rounded-xl">
                    <div>
                      <label className="block text-sm mt-8 font-medium text-gray-700">
                        Paid Amount/Person{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="paidAmountPerPerson"
                        value={formData.paidAmountPerPerson}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paidAmountPerPerson: e.target.value,
                          })
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter amount per person"
                      />
                    </div>

                    {/* Scanner Image for Payment */}
                    <div>
                      <label className="block text-sm mt-8 font-medium text-gray-700">
                        Company's Scanner Image for Payment
                        <span className="text-red-500">*</span>
                      </label>
                      <h5 className="text-red-500 mt-2">
                        **Image should be in jpeg/jpg/png format
                      </h5>

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleScannerImage}
                        className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Description of the event */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description of the Event{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    const inputText = e.target.value.trim();
                    const wordCount = inputText
                      .split(/\s+/)
                      .filter((word) => word).length;
                    if (wordCount > 100) {
                      setDescError("Description cannot exceed 100 words.");
                    } else if (wordCount < 10) {
                      setDescError(
                        "Description must be at least 10 words long."
                      );
                    } else {
                      setDescError("");
                    }
                  }}
                  placeholder="Enter event description in 100 words"
                  required
                />
                {descerror && (
                  <p className="text-red-500 text-sm mt-1">{descerror}</p>
                )}
              </div>

              {/* Last Date of Registration*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Date of Registration{" "}
                  <span className="text-gray-400">(if any)</span>
                </label>
                <input
                  type="date"
                  name="registrationEndDate"
                  value={formData.registrationEndDate}
                  onChange={(e) => {
                    const registrationDate = new Date(e.target.value);
                    const today = new Date();
                    const eventDate = new Date(formData.eventDate);
                    today.setHours(0, 0, 0, 0);

                    if (registrationDate < today) {
                      setRegError(
                        "Last date of registration cannot be in the past."
                      );
                      setFormData({ ...formData, registrationEndDate: "" });
                      return;
                    }

                    if (formData.eventDate && registrationDate > eventDate) {
                      setRegError(
                        "Last date of registration must be before the event date."
                      );
                      setFormData({ ...formData, registrationEndDate: "" });
                      return;
                    }
                    setRegError("");
                    setFormData({
                      ...formData,
                      registrationEndDate: e.target.value,
                    });
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {regerror && (
                  <p className="text-red-500 text-sm mt-1">{regerror}</p>
                )}
              </div>

              {/* Rules & Regulations */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rules & Regulations (in PDF format)
                </label>
                <input
                  type="file"
                  name="rulesFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>

              {/* Poster image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Poster (in JPG/JPEG/PNG format){" "}
                  <span className="text-red-500">*</span>
                  <h5 className="text-red-500">
                    **Image should be in JPG, JPEG, or PNG format
                  </h5>
                </label>
                <input
                  type="file"
                  name="posterImage"
                  accept=".jpg,.jpeg,.png"
                  onChange={async (e) => {
                    const file = e.target.files[0];

                    if (!file) {
                      setPosterError("Please select an image file.");
                      return;
                    }

                    // File size validation
                    const maxSizeInKB = 30;
                    if (file.size > maxSizeInKB * 1024) {
                      setPosterError(
                        `File size should be less than ${maxSizeInKB} KB.`
                      );
                      return;
                    }

                    // File format validation
                    const validFormats = [
                      "image/jpeg",
                      "image/jpg",
                      "image/png",
                    ];
                    if (!validFormats.includes(file.type)) {
                      setPosterError(
                        "File must be in JPG, JPEG, or PNG format."
                      );
                      return;
                    }
                    setPosterError("");

                    try {
                      const imageData = await setFileToBase(file);
                      setFormData((prev) => ({
                        ...prev,
                        posterImage: imageData,
                      }));
                    } catch {
                      setPosterError("Failed to process the image file.");
                    }
                  }}
                  className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                  required
                />
                {posterError && (
                  <p className="text-red-500 text-sm mt-1">{posterError}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  disabled={!!error}
                  onClick={handleSubmit}
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>

          {/* Right Part*/}
          <div className="hidden lg:block relative">
            <div
              className="relative overflow-hidden w-full h-full rounded-lg shadow-lg"
              style={{
                clipPath:
                  "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
              }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/3202042/3202042-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateForm;
