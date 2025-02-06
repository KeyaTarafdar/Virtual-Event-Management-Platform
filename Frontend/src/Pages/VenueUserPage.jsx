import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { findVenue } from "../utils/utils";
import CustomCalendar from "../Components/CustomCalendar";
import VenueProfile from "../Components/VenueProfile";
import { AiOutlineEnvironment } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import { uploadVenueProfilePicture } from "../utils/utils";

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
                backgroundImage: "url(https://media.istockphoto.com/id/1264684053/photo/abstract-blur-image-background-of-shopping-mall-department-store.jpg?s=612x612&w=0&k=20&c=21gEfKy8-MTYLVvHSvsHexJ4R25ZL1tujMpACxK9zaw=)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
              }}
              className="flex items-center justify-center"

            >
              <div className="w-[50%] text-center ">
                <div className="text-8xl font-serif">WELCOME</div>
                <div className="p-2 ml-[4rem] w-[80%] rounded-lg text-2xl shadow-2xl border-4 border-blue-300 font-serif font-bold bg-gray-200 text-red-600">
                  <div className=" animate-blink">Please complete your profile 100%!</div>
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
          alert(response);
          findVenue().then((response) => {
            setvenue(response);
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
      <div className="flex m-0 p-0">
        {/* SIDE BAR */}
        <div className="w-[15%] fixed rounded-r-2xl bg-[#081647] text-white h-[91%] p-4">
          <div className="h-40 text-center flex-col justify-center">
            <img
              src={
                venue && venue.profilepicture ? venue.profilepicture.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2pmX-vrTVeKcf4JXDwuxSSVJf66zPpmc5w&s"
              }
              alt="Venue Profile"
              className="rounded-full w-24 bg-gray-900 text-sm h-24 mb-4 shadow-lg ml-9 border-[.3rem] border-indigo-400 sm:w-32 sm:h-32"
            />
            <label className="absolute top-[5.5rem] ml-[5.3rem] sm:top-[7.5rem] w-8 h-8 cursor-pointer flex justify-center items-center  bg-gray-600 rounded-full p-2">
              <FontAwesomeIcon icon={faEdit} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="h-8 text-2xl font-serif font-extrabold">{venue ? venue.name.split(" ")[0] : null}</div>
            <div className="h-8 flex items-center justify-center">
              {venue && (
                <>
                  <AiOutlineEnvironment className="mr-2 text-lg" />
                  {venue.city}
                </>
              )}
            </div>
          </div>

          <div className="w-[90%] h-1 border-b-4 border-yellow-400 m-2 rounded-2xl md:mt-[4rem] mb-2"></div>
          <ul className="space-y-4 flex flex-col items-center p-2">
            <li
              className={`cursor-pointer p-2 rounded ${activeMenu === "Calendar" ? "bg-gray-600" : ""
                }`}
              onClick={() => setActiveMenu("Calendar")}
            >
              Event Calender
            </li>
            <li
              className={`cursor-pointer  p-2 rounded ${activeMenu === "Profile" ? "bg-gray-600" : ""
                }`}
              onClick={() => setActiveMenu("Profile")}
            >
              Venue Profile
            </li>
          </ul>
          <div className="mt-[12rem] w-[100%] flex flex-col text-xs items-center">
            <div className="w-[95%] border-b-2 border-gray-200 m-2 rounded-2xl mt-10 mb-4"></div>
            &copy;Eventek2024.
          </div>
        </div>
        {/* MAIN  CONTENT */}
        <div
          className={`overflow-y-auto main-content ml-[14rem] w-[100%] ${activeMenu === "Calendar" ? "calendarDiv" : ""
            } ${activeMenu === "Profile" ? "profileDiv" : ""}`}
        >
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default VenueUserPage;