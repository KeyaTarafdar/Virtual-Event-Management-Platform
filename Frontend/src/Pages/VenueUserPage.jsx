import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { findVenue } from "../utils/utils";
import CustomCalendar from "../Components/CustomCalendar";
import VenueProfile from "../Components/VenueProfile";
import { AiOutlineEnvironment } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { uploadVenueProfilePicture } from "../utils/utils";
import { HiDotsVertical, HiX } from "react-icons/hi";
import { useUser } from "../context/userContext/UserContext";

function VenueUserPage() {
  const [activeMenu, setActiveMenu] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeMenu) {
      case "Calendar":
        return <CustomCalendar venue={venue} />;
      case "Profile":
        return <VenueProfile />;
      default:
        return (
          venue && (
            <div
              style={{
                backgroundImage:
                  "url(https://media.istockphoto.com/id/1264684053/photo/abstract-blur-image-background-of-shopping-mall-department-store.jpg?s=612x612&w=0&k=20&c=21gEfKy8-MTYLVvHSvsHexJ4R25ZL1tujMpACxK9zaw=)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="w-[90%] sm:w-[50%] text-center ">
                <div className="text-5xl sm:text-8xl font-serif">WELCOME</div>
                {venue?.completePercentage < 100 && (
                  <div className="mt-4 sm:ml-[4rem] w-full sm:w-[80%] mx-auto rounded-lg text-lg sm:text-2xl shadow-2xl border-4 border-blue-300 font-serif font-bold bg-gray-200 text-red-600 animate-blink p-4">
                    Please complete your profile 100%!
                  </div>
                )}
              </div>
            </div>
          )
        );
    }
  };

  const { venue, setVenue } = useUser();

  useEffect(() => {
    findVenue().then((response) => {
      setVenue(response);
    });
  }, []);

  const [image, setImage] = useState();

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSizeInKB = 30;

      if (file.size > maxSizeInKB * 1024) {
        alert(`File size should be less than ${maxSizeInKB} KB.`);
        return;
      }

      const imageData = await setFileToBase(file);

      uploadVenueProfilePicture(imageData).then((response) => {
        alert(response.message);
        findVenue().then((response) => {
          setVenue(response);
        });
      });
    } else {
      alert("Please Upload an Image");
      return;
    }
  };

  return (
    <>
      <Navbar menuItems={[]} />
      <div className="flex m-0 p-0 relative">
        <div className="sm:block lg:hidden relative z-50 ml-4 mt-2 ">
          {!sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-4xl text-red-700"
              aria-label="Open sidebar"
            >
              <HiDotsVertical />
            </button>
          ) : (
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-4xl text-red-700"
              aria-label="Close sidebar"
            >
              <HiX />
            </button>
          )}
        </div>
        {/* SIDE BAR */}
        <div
          className={`
            ${sidebarOpen ? "block" : "hidden"} 
            lg:block fixed z-40 bg-[#081647] text-white rounded-r-2xl transition-transform ease-in-out duration-300
            left-0 shadow-2xl p-4 lg:translate-x-0 w-[50%] sm:w-[70%] md:w-[50%] lg:w-[18rem]  
          `}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="h-40 text-center flex flex-col items-center justify-center relative">
            <div className="relative inline-block">
              <img
                src={
                  venue && venue.profilepicture
                    ? venue.profilepicture.url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2pmX-vrTVeKcf4JXDwuxSSVJf66zPpmc5w&s"
                }
                alt="Venue Profile"
                className="rounded-full w-24 h-24 sm:w-32 sm:h-32 shadow-lg border-[.3rem] border-indigo-400 bg-gray-900"
              />
              <label
                className="
                  absolute bottom-0 right-0 
                  w-7 h-7 sm:w-8 sm:h-8 
                  cursor-pointer flex justify-center items-center 
                  bg-gray-600 rounded-full
                "
              >
                <FontAwesomeIcon icon={faEdit} className="text-white text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mt-2 text-base sm:text-xl font-serif font-extrabold">
              {venue ? venue.name.split(" ")[0] : null}
            </div>
            <div className="h-8 flex items-center justify-center text-xs sm:text-sm">
              {venue && (
                <>
                  <AiOutlineEnvironment className="mr-2 text-lg" />
                  {venue.city}
                </>
              )}
            </div>
          </div>

          <div className="w-[90%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-10 mb-2"></div>
          <ul className="space-y-4 flex flex-col items-center p-2">
            <li
              className={`cursor-pointer p-2 rounded ${
                activeMenu === "Calendar" ? "bg-gray-600" : ""
              }`}
              onClick={() => {
                setActiveMenu("Calendar");
                setSidebarOpen(false);
              }}
            >
              Event Calender
            </li>
            <li
              className={`cursor-pointer  p-2 rounded ${
                activeMenu === "Profile" ? "bg-gray-600" : ""
              }`}
              onClick={() => {
                setActiveMenu("Profile");
                setSidebarOpen(false);
              }}
            >
              Venue Profile
            </li>
          </ul>
          <div className="mt-10 w-full flex flex-col text-xs items-center">
            <div className="w-[95%] border-b-2 border-gray-200 m-2 rounded-2xl"></div>
            &copy;Eventek2024.
          </div>
        </div>
        {/* MAIN  CONTENT */}
        <div
          className={`
            flex-1 w-full  lg:ml-[15%] mt-[3.5rem] lg:mt-0
            overflow-y-auto transition-all duration-300
            ${
              sidebarOpen &&
              "opacity-50 sm:opacity-100 pointer-events-none sm:pointer-events-auto "
            }
          `}
        >
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default VenueUserPage;
