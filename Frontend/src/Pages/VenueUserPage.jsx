import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { findVenue } from "../utils/utils";
import CustomCalendar from "../Components/CustomCalendar";
import VenueProfile from "../Components/VenueProfile";

function VenueUserPage() {
  const [activeMenu, setActiveMenu] = useState("");

  const renderComponent = () => {
    switch (activeMenu) {
      case "Calendar":
        return <CustomCalendar />;
      case "Profile":
        return <VenueProfile />;
      default:
        return (
          venue && venue.completePercentage < 100 && (
            <div
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/4466492/pexels-photo-4466492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <div className="w-[50%] text-center pt-[20%]">
                <div className="text-8xl font-serif">WELCOME</div>
                <div className="pt-2 font-serif text-red-700 animate-blink">
                  Please complete your profile 100%!
                </div>
              </div>
            </div>
          )
        );
    }
  };

  const [venue, setvenue] = useState(null);

  useEffect(() => {
    findVenue().then((response) => {
      setvenue(response);
    });
  }, []);

  return (
    <>
      <Navbar menuItems={[]} />
      <div className="flex m-0 p-0">
        <div className="w-[15%] bg-gray-800 text-white h-screen p-4">
          <div className="h-40 text-center flex-col justify-center">
            <div className="h-8">{venue ? venue.name : null}</div>
            <div className="h-8">{venue ? venue.city : null}</div>
          </div>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded ${
                activeMenu === "Calendar" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveMenu("Calendar")}
            >
              Event Calender
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${
                activeMenu === "Profile" ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveMenu("Profile")}
            >
              Profile
            </li>
          </ul>
        </div>
        <div
          className={`main-content w-full ${
            activeMenu === "Calendar" ? "calendarDiv" : ""
          } ${activeMenu === "Profile" ? "profileDiv" : ""}`}
        >
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default VenueUserPage;
