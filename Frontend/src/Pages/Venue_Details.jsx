import  { useEffect} from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AiFillHome, AiOutlineAppstore, AiFillContacts } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUser } from "../context/userContext/UserContext";
import { findVenue } from "../utils/utils";

const footerMenuItems = [
  { href: "header", label: "Header", icon: AiFillHome },
  { href: "features", label: "Features", icon: AiOutlineAppstore },
  { href: "contact", label: "Contact", icon: AiFillContacts },
];
function Venue_Details() {

  const headerMenuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/" },
    { label: "Contact", href: "contact" },
  ];

  // const {venueId}=useParams();
  // const{venue,setVenue}=useUser();

  // useEffect(() => {
  //   findVenue(venueId).then((response)=>{
  //     setVenue(response.data);
  //   })  
  // }, [])
  

  return (
    <>
      <div className="App">
        {/* Header Section */}
        <Navbar menuItems={headerMenuItems} />
        <section className="text-center my-8 p-8">
          <h1
            className="text-7xl text-orange-800 font-bold font-serif "
          >
            ITC ROYAL BENGAL
          </h1>
          <p className="text-center text-5xl">Kolkata</p>
          <div className="flex h-72 items-center">
            <div className="text-slate-500 lg:text-xl mt-4 lg:mt-6 text-center lg:text-left font-serif w-[66%] pl-16">
              <p><strong>Owner Name:</strong> Mr. Gopal Bhar</p>
              <p><strong>Address:</strong> Sector 1, Salt Lake, Kolkata 700010</p>
              <p><strong>Maximum Head:</strong> 400</p>
              <p><strong>Email ID:</strong> <a href="mailto:itcroyalbengal@gmail.com" className="text-blue-500">itcroyalbengal@gmail.com</a></p>
              <p><strong>Contact:</strong> 6789045362</p>
            </div>

            <div className=" w-[30%] ml-auto flex justify-end pr-13">
              <img
                className="h-72"
                src="https://media.istockphoto.com/id/1344107024/photo/a-beautiful-cityscape-of-kolkata-showing-maa-flyover-and-itc-royal-bengal-hotel.jpg?s=1024x1024&w=is&k=20&c=OpHe6wBIW3a-LajbSkTkcTKNcn6gZyvEDu0yK-aH_5E="
                alt="venuedetails"
              />
            </div>
          </div>
        </section>

        {/* Hotel Description */}
        <section className="bg-white rounded-md p-6 max-w-4xl w-full mt-6">
          <h2 className="text-xl font-semibold">About the Hotel</h2>
          <p className="mt-2 text-gray-700">
            Our hotel is one of the premium hotels and boasts luxury and comfort for all our guests. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non libero vitae nisi tincidunt facilisis.
          </p>
        </section>
      </div>

      {/* Gallery Section */}
      <div className="m-0 p-0" id="contact">
        <Footer menuItems1={footerMenuItems} />
      </div>
    </>
  );
}
export default Venue_Details;