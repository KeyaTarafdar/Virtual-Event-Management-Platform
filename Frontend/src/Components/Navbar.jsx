/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import {
  faBars,
  faXmark,
  faCaretDown,
  faCaretUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  findUser,
  logoutUser,
  findVenue,
  findAdmin,
  fetchCompanyDetails,
} from "../utils/utils";
import Loader from "./loader";
import { useCompany } from "../context/companyContext/CompanyContext";
import { useUser } from "../context/userContext/UserContext";

export default function Navbar({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { company, setCompany } = useCompany();
  const { user, setUser, admin, setAdmin, venue, setVenue } = useUser();

  const [hamburgerMenuClicked, setHamburgerMenuClicked] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isClosingDropdown, setIsClosingDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleCompanyPageClick = () => {
    if (user) navigate("/companypage");

    if (venue) navigate("/venueuser");

    if (admin) navigate("/adminpanel");
  };

  const hambergerClick = () => {
    if (hamburgerMenuClicked) {
      setIsClosing(true);
      setTimeout(() => {
        setHamburgerMenuClicked(false);
        setIsClosing(false);
      }, 900);
    } else {
      setHamburgerMenuClicked(true);
    }
    setDropDownOpen(false);
  };

  const dropDown = () => {
    if (dropDownOpen) {
      setIsClosingDropdown(true);
      setTimeout(() => {
        setDropDownOpen(false);
        setIsClosingDropdown(false);
      }, 900);
    } else {
      setDropDownOpen(true);
    }
    setHamburgerMenuClicked(false);
  };

  useEffect(() => {
    if (!company) {
      fetchCompanyDetails().then((response) => {
        setCompany(response);
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      findUser().then((user) => {
        if (user) {
          setUser(user);
        }
      });
    }
    if (!venue) {
      findVenue().then((venue) => {
        if (venue) {
          setVenue(venue);
        }
      });
    }
    if (!admin) {
      findAdmin().then((admin) => {
        if (admin) {
          setAdmin(admin);
        }
      });
    }
  }, []);

  const handelLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logoutUser().then((response) => {
        setLoading(false);
        // if (response === "User Logout successfully") {
        //   if (location.pathname === "/") window.location.reload();
        //   else navigate("/");
        // } else if (response === "Venue Logout successfully") {
        //   if (location.pathname === "/") window.location.reload();
        //   else navigate("/");
        // } else if (response === "Admin Logout successfully") {
        //   if (location.pathname === "/") window.location.reload();
        //   else navigate("/");
        // } else {
        //   alert(response);
        // }
        if (response.success) {
          setUser(null);
          navigate("/");
        }
      });
    }, 3000);
  };

  return (
    <>
      <div className="w-full h-16">
        {/* Navbar */}
        <nav
          id="header"
          className="h-16 flex items-center px-4 justify-between w-full text-[16px] bg-black text-white fixed top-0 z-50"
        >
          {/* Logo */}
          <div
            className="text-gradient2 font-serif text-5xl w-[50%] sm:w-[20%] md:w-[20%] lg:w-[20%] xl:w-[20%] 2xl:w-[20%] lg:pl-5 xl:pl-8"
            style={{ fontFamily: '"quick"' }}
          >
            {company?.companyName}
          </div>

          {/* Navbar Menu */}
          <div className="hidden md:flex md:w-3/5 lg:w-[45%] xl:w-[40%] 2xl:w-[35%] items-center">
            <ul className="w-full flex justify-around text-center sm:space-x-2 md:space-x-4 lg:space-x-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.to ? (
                    <RouterLink
                      to={item.to}
                      className="hover:cursor-pointer hover:text-red-300 hover:font-bold"
                    >
                      {item.label}
                    </RouterLink>
                  ) : item.href ? (
                    <ScrollLink
                      to={item.href}
                      smooth={true}
                      duration={500}
                      className="hover:cursor-pointer hover:text-red-300 hover:font-bold"
                    >
                      {item.label}
                    </ScrollLink>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          {/* User Section */}
          <div className="w-[50%] sm:w-[35%] md:w-[35%] lg:w-2/5 xl:w-[25%] 2xl:w-[20%] flex justify-end items-center space-x-4">
            {/* User Section in Navbar */}
            {user || venue || admin ? (
              <>
                {/* User Section in Navbar */}
                <div className="flex items-center justify-center px-[3px] space-x-8 sm:px-8 pr-16 md:pr-16 lg:pr-24 xl:px-2 2xl:px-2">
                  <div className=" w-full md:w-40 flex justify-center items-center space-x-4">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-lg cursor-pointer"
                    />
                    <span className="text-white font-bold hover:text-blue-100 hover:underline">
                      {user?.username
                        ? user.username.split(" ")[0]
                        : venue?.name
                        ? venue.name.split(" ")[0]
                        : admin?.username
                        ? admin.username.split(" ")[0]
                        : null}
                    </span>

                    {dropDownOpen ? (
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        className="cursor-pointer"
                        style={{ color: "#ffffff" }}
                        onClick={dropDown}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{ color: "#ffffff" }}
                        className="cursor-pointer"
                        onClick={dropDown}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <div className=" flex items-center justify-center px-[3px] sm:px-8 pr-16 md:pr-16 md:px-1 lg:pr-24 xl:px-2 2xl:px-1">
                  <div className=" w-full flex justify-center items-center">
                    <button
                      onClick={handleLogInClick}
                      className="flex btn1 justify-center items-center h-12 sm:h-10 md:h-12 lg:h-12 xl:h-12 w-full px-2 sm:px-5 md:px-6 lg:px-8 xl:px-10 rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Hamburger Icon */}
            {!isMdOrLarger && (
              <div className="block md:hidden fixed">
                <FontAwesomeIcon
                  icon={hamburgerMenuClicked ? faXmark : faBars}
                  style={{ color: "#ffffff" }}
                  className={`cursor-pointer h-6 w-7 animate-none`}
                  onClick={hambergerClick}
                />
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger Menu */}
        {(hamburgerMenuClicked || isClosing) && (
          <div
            className={`z-50 md:hidden flex-col flex justify-end mt-4 mr-2 text-white w-40 p-4 space-y-8 items-center h-auto ${
              isClosing ? "animate-slideOut" : "animate-slideIn"
            } fixed top-14 right-5 bg-slate-300 bg-opacity-[0.3] rounded-lg`}
            style={{ backgroundColor: "rgba(0, 0, 255, 0.6)" }}
          >
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.to ? (
                  <RouterLink
                    to={item.to}
                    className="w-full text-center hover:cursor-pointer hover:text-red-300 hover:font-bold"
                  >
                    <div className=" w-40 border-b-2 border-gray-200 -mb-3  ">
                      {item.label}
                    </div>
                  </RouterLink>
                ) : item.href ? (
                  <ScrollLink
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className="w-full text-center  hover:cursor-pointer hover:text-red-300 hover:font-bold"
                  >
                    <div className=" w-40 border-b-2 border-gray-200 -mb-2  ">
                      {item.label}
                    </div>
                  </ScrollLink>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {/* User Dropdown */}
        {(dropDownOpen || isClosingDropdown) && (user || venue || admin) && (
          <div
            className={`border-2 z-50 fixed mt-4 sm:ml-8 top-14 left-[49%] 2xl:left-[87%] xl:left-[83%] lg:left-[75%] md:left-[71%] sm:left-[66%] flex-col justify-end flex text-white w-40 items-center mr-[5%] sm:mr-[5%] md:mr-[3%] lg:mr-[5%] bg-slate-300 bg-opacity-[0.3] rounded-lg ${
              isClosingDropdown ? "animate-slideUp" : "animate-slideBelow"
            }`}
            style={{ backgroundColor: "rgba(0, 0, 255, 0.6)" }}
          >
            {location.pathname !== "/venueuser" &&
              location.pathname !== "/adminpanel" && (
                <div
                  onClick={handleCompanyPageClick}
                  className="w-full text-center pt-2 pb-2 hover:cursor-pointer hover:text-red-300 hover:font-bold"
                >
                  Profile
                </div>
              )}

            <div
              onClick={handelLogout}
              className="w-full text-center pt-2 pb-2 hover:cursor-pointer hover:text-red-300 hover:font-bold"
            >
              Log Out
            </div>
          </div>
        )}
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
            <Loader />
          </div>
        </>
      )}
    </>
  );
}
