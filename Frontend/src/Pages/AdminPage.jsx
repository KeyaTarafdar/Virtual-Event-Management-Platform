import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { findAdmin, acceptVenue, fetchAllVenues } from "../utils/utils";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleAcceptVenue = (venueId) => {
    acceptVenue(venueId).then((response) => {
      alert(response);
    });
  };

  const renderComponent = () => {
    switch (activeMenu) {
      case "Venue Requests":
        return (
          <>
            {venueRequests.length > 0 ? (
              venueRequests.map((venue) => (
                <div className="w-[97%] ml-5 mt-3 border border-gray-300 rounded-lg shadow-md p-4 flex justify-between items-center bg-white">
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
                      <span className="font-medium">Booking Price:</span>{" "}
                      {venue.bookingPrice} Rs.
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
                      className="border-2 rounded-lg bg-red-500 font-bold font-serif h-10 w-32 hover:bg-red-600 hover:border-red-600 transition duration-300 ease-in-out"
                      onClick={() => {
                        handleAcceptVenue(venue._id);
                      }}
                    >
                      Accept
                    </button>
                    <button className="border-2 rounded-lg bg-green-500 font-bold font-serif h-10 w-32 hover:bg-green-600 hover:border-green-600 transition duration-300 ease-in-out">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-screen bg-gray-100">
                <img
                  className="h-80 w-80"
                  src="https://new4you.in/img/no_products_found.png"
                ></img>
              </div>
            )}
          </>
        );
      case "Upcoming Events":
        return (
          <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <img
                className="h-80 w-80"
                src="https://static.vecteezy.com/system/resources/previews/014/814/046/non_2x/no-schedule-events-flat-rounded-icon-in-appealing-graphic-vector.jpg"
              ></img>
            </div>
          </>
        );
      case "Past Events":
        return <></>;
      case "Venue Details":
        return (
          <>
            <div className="overflow-y-scroll max-w-[200rem] h-[92vh] text-center">
              <div>
                <table className="w-full table-fixed">
                  <thead className="sticky top-0 bg-black text-white">
                    <tr className="">
                      <th className="w-[5rem] border-2 border-white">Sl No.</th>
                      <th className="w-[15rem] border-2 border-white">
                        Venue Name
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
                      allVenues.map((venue,index) => (
                        <tr key={venue._id} >
                          <td className="border-2 p-2">{index+1}</td>
                          <td className="border-2 p-2">{venue.name}</td>
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
      default:
        return (
          <>
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
              </div>
            </div>
          </>
        );
    }
  };

  const [admin, setadmin] = useState(null);
  const [venueRequests, setvenueRequests] = useState([]);
  const [allVenues, setallVenues] = useState([]);

  useEffect(() => {
    findAdmin().then((response) => {
      setadmin(response);
      setvenueRequests(response.appliedVenues);
    });
  }, [handleAcceptVenue]);

  useEffect(() => {
    fetchAllVenues().then((response) => {
      setallVenues(response);
    });
  }, []);

  return (
    <>
      <div className="h-screen">
        <Navbar menuItems={[]} />
        <div className="h-[91.7vh] flex m-0 p-0 overflow-hidden">
          <div className="w-[13rem] min-w-[13rem] bg-gray-800 text-white p-4">
            <div className="w-full flex justify-center pt-3">
              <img className="rounded-full h-32 w-32 div"></img>
            </div>
            <div className="h-24 text-center flex-col justify-center">
              <div className="h-8 pt-5">{admin ? admin.username : null}</div>
            </div>
            <ul className="space-y-4">
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeMenu === "Venue Requests" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Venue Requests")}
              >
                Venue Requests
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeMenu === "Upcoming Events" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Upcoming Events")}
              >
                Upcoming Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeMenu === "Past Events" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Past Events")}
              >
                Past Events
              </li>
              <li
                className={`cursor-pointer p-2 rounded ${
                  activeMenu === "Venue Details" ? "bg-gray-600" : ""
                }`}
                onClick={() => setActiveMenu("Venue Details")}
              >
                Venue Details
              </li>
            </ul>
          </div>
          <div className="w-full overflow-hidden">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
