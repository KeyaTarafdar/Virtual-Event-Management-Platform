import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { findVenue } from "../utils/utils";

function VenueProfile() {
  const [activeMenu, setActiveMenu] = useState("BasicDetails");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [venue, setVenue] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    findVenue().then((response) => {
      setVenue(response);
    });
  }, []);

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

  const renderComponent = () => {
    switch (activeMenu) {
      case "BasicDetails":
        return (
          <div className="flex w-full flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-around">
            Shreya
          </div>
        );
      case "Gallery":
        return <div className="upcoming-bookings">Kundu</div>;
      case "Booking Requests":
        return <div className="p-4">bubu</div>;
      case "Upcoming Bookings":
        return (
          <div className="upcoming-bookings mr-5 flex justify-center items-center">
            kundu 2
          </div>
        );
      case "Past Bookings":
        return (
          <div className="upcoming-bookings mr-5 flex justify-center items-center">
            Shreya 2
          </div>
        );
      default:
        return null;
    }
  };

  // Handles menu item click - closes mobile menu automatically
  const onMenuClick = (menu) => {
    setActiveMenu(menu);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="min-h-screen w-full flex border-4 border-red-600">
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

          {/* Mobile menu (slide-in) */}
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

          {/* Overlay when menu is open on mobile */}
          {isMenuOpen && (
            <div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            />
          )}

          {/* Horizontal menu for lg and above */}
          <div className="hidden lg:flex gap-6 lg:gap-12 border-4 items-center justify-center cursor-pointer mt-6 flex-wrap">
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
