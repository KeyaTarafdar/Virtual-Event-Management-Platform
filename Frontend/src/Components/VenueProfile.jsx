import React, { useState,useEffect } from "react";
import { AiOutlineVideoCameraAdd,AiOutlineEdit,AiOutlineCheck } from "react-icons/ai";
import { findVenue } from "../utils/utils";

function VenueProfile() {
  const [activeMenu, setActiveMenu] = useState("BasicDetails");
  const [isEditing, setIsEditing] = useState(false);

  const bookingDetails = [
    { company: "Xyz", event: "Robotics", date: "4th April, 2024", head: "34", time: "10:00 AM", duration: "2 hour" },
    { company: "Shreya - The Legend", event: "Hacktonix", date: "10th Oct, 2024", head: "23", time: "3:00 PM", duration: "2 hour" },
  ];

  const [statuses, setStatuses] = React.useState(
    bookingDetails.map(() => null) 
  );

  const handleStatusChange = (index, status) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = status;
    setStatuses(updatedStatuses);
  };

  const [galleryImages, setGalleryImages] = useState([
    { url: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { url: "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { url: "https://images.pexels.com/photos/17669053/pexels-photo-17669053/free-photo-of-decorative-skulls-in-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const [videoList, setVideoList] = useState([
    { url: "https://www.w3schools.com/html/mov_bbb.mp4", },
    { url: "https://www.w3schools.com/html/movie.mp4",},
    { url: "https://www.w3schools.com/html/mov_bbb.mp4",},
  ]);
  
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const newVideo = {
        url: videoUrl,
      };
      setVideoList((prevVideos) => [...prevVideos, newVideo]);
    }
  };

  
  const handleLogoChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setCompanyDetails((prevDetails) => ({
        ...prevDetails,
        logo: imageUrl, 
      }));
    }
  };


  const [companyDetails, setCompanyDetails] = useState({
    name: "abc",
    address:"8/41, Sahid Nagar",
    city:"Kolkata",
    email: "abc@gmail.com",
    phone:"9748054871",
    logo: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });
  
  
  const handleSave = (field) => {
    if (field === "email" && !companyDetails.email.includes("@")) {
      alert("Please enter a valid email address.");
      return; 
    }
  
    if (field === "phone" && (!/^\d{10}$/.test(companyDetails.phone))) {
      alert("Please enter a valid 10-digit phone number.");
      return; 
    }
    setIsEditing(null); 
  };
  
  
  

  const renderComponent = () => {
    switch (activeMenu) {
        case "BasicDetails":
          return (
            <div className="flex w-[100%]">
                  {/* Company Image */}
                  <div className="image-section w-2/6 text-center">
                    <div className="relative inline-block">
                      <img
                        src={companyDetails.logo}
                        alt="Company Logo"
                        className="w-62 h-62 object-cover mx-auto"
                      />
                    </div>
                    <button
                      onClick={() => document.getElementById("logoUpload").click()}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Edit Image
                    </button>
                    <input
                      id="logoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    <div className="pt-5 flex-col text-center">
                      <div className="font-bold text-2xl">{companyDetails.name}</div>
                      <div className="text-sm">{companyDetails.city}</div>
                    </div>
                    <div className="flex pt-2 gap-2 justify-center">
                      <div>count</div>
                      <div className="ml-2 flex text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <svg
                              key={index}
                              className="h-5 w-5 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <polygon points="10 15.27 16.18 19 14.54 12.81 19 8.63 12.81 8.63 10 2.5 7.19 8.63 1 8.63 5.46 12.81 3.82 19" />
                            </svg>
                          ))}
                      </div>
                    </div>
                    <div className="flex h-10 mt-3 pl-5">
                      <div>Completed</div>
                      <div className="ml-5 mr-5 mt-[2%] flex w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${20}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-px bg-black m-6 "></div>
            
                  {/* Basic Details */}
                  <div className="bg-blue-100 w-4/6 border-2 border-blue-500 p-8 rounded-lg shadow-xl">
                    <div className="m-auto w-[35%] text-center">
                      <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">Basic Details</h2>
                    </div>
                    <div className="details-section space-y-4">
                      {/* Company Name */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Hall Name : </span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "name" ? (
                            <input
                              type="text"
                              value={companyDetails.name}
                              onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
                              className="p-2 border rounded-md w-full"
                            />
                          ) : (
                            <span className="font-bold text-lg">{companyDetails.name}</span>
                          )}
                          <button
                            onClick={() => (isEditing === "name" ? handleSave("name") : setIsEditing("name"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "name" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Hall Address */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Address : </span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "address" ? (
                            <input
                              type="text"
                              value={companyDetails.address}
                              onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                              className="p-2 border rounded-md w-full"
                            />
                          ) : (
                            <span className="text-md font-bold">{companyDetails.address}</span>
                          )}
                          <button
                            onClick={() => (isEditing === "address" ? handleSave("address") : setIsEditing("address"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "address" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Hall City */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">City:</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "city" ? (
                            <input
                              type="text"
                              value={companyDetails.city}
                              onChange={(e) => setCompanyDetails({ ...companyDetails, city: e.target.value })}
                              className="p-2 border rounded-md w-full"
                            />
                          ) : (
                            <span className="font-bold">{companyDetails.city}</span>
                          )}
                          <button
                            onClick={() =>
                              isEditing === "city" ? handleSave("city") : setIsEditing("city")
                            }
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "city" ?  <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Hall Email */}
                      <div className="flex items-start space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Email :</span>
                        <div className="flex flex-col w-3/5">
                          <div className="flex items-center justify-between">
                            {isEditing === "email" ? (
                              <input
                                type="text"
                                value={companyDetails.email}
                                onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })}
                                className={`p-2 border rounded-md w-full ${!companyDetails.email.includes("@") ? "border-red-500" : ""}`}
                              />
                            ) : (
                              <span  className="font-bold">{companyDetails.email}</span>
                            )}
                            <button
                              onClick={() =>
                                isEditing === "email" ? handleSave("email") : setIsEditing("email")
                              }
                              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                            >
                              {isEditing === "email" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                            </button>
                          </div>
                          {isEditing === "email" && !companyDetails.email.includes("@") && (
                            <span className="text-red-500 text-sm mt-2">Please enter a valid email address with "@"</span>
                          )}
                        </div>
                      </div>

                      {/* Hall Phone Number */}
                      <div className="flex items-start space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Phone Number :</span>
                        <div className="flex flex-col w-3/5">
                          <div className="flex items-center justify-between">
                            {isEditing === "phone" ? (
                              <input
                                type="text"
                                value={companyDetails.phone}
                                onChange={(e) => setCompanyDetails({ ...companyDetails, phone: e.target.value })}
                                className={`p-2 border rounded-md w-full ${!/^\d{10}$/.test(companyDetails.phone) ? "border-red-500" : ""}`}
                              />
                            ) : (
                              <span  className="font-bold">{companyDetails.phone}</span>
                            )}
                            <button
                              onClick={() =>
                                isEditing === "phone" ? handleSave("phone") : setIsEditing("phone")
                              }
                              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                            >
                              {isEditing === "phone" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                            </button>
                          </div>
                          {isEditing === "phone" && !/^\d{10}$/.test(companyDetails.phone) && (
                            <span className="text-red-500 text-sm mt-2">Please enter a valid 10-digit phone number.</span>
                          )}
                        </div>
                      </div>

                      {/* Seat Number */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Seat Number :</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "seat" ? (
                            <input
                              type="text"
                              value={companyDetails.seat}
                              onChange={(e) => setCompanyDetails({ ...companyDetails, seat: e.target.value })}
                              className="p-2 border rounded-md w-full"
                              placeholder="Enter Seat Number"
                            />
                          ) : (
                            <span 
                        className={`rounded-lg w-[90%] p-2 ${companyDetails.seat ? '' : 'text-red-500 bg-white'}`}
                      >
                        {companyDetails.seat || "Please Enter Seat Number"}
                      </span>

                          )}
                          <button
                            onClick={() => (isEditing === "seat" ? handleSave("seat") : setIsEditing("seat"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "seat" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Hall Type */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Hall Type :</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "halltype" ? (
                            <select
                              value={companyDetails.halltype}
                              onChange={(e) => setCompanyDetails({ ...companyDetails, halltype: e.target.value })}
                              className="p-2 border rounded-md w-full"
                            >
                              <option value="">Select Hall Type</option>
                              <option value="auditorium">Auditorium</option>
                              <option value="banquetHall">Banquet Hall</option>
                              <option value="openHalls">Open Halls</option>
                              <option value="lawns">Lawns</option>
                            </select>
                          ) : (
                            <span 
                              className={`rounded-lg w-[90%] p-2 ${companyDetails.halltype ? '' : 'text-red-500 bg-white'}`}
                            >
                              {companyDetails.halltype 
                                ? companyDetails.halltype.charAt(0).toUpperCase() + companyDetails.halltype.slice(1) 
                                : "Please Select Hall Type"}
                            </span>
                          )}
                          <button
                            onClick={() => (isEditing === "halltype" ? handleSave("halltype") : setIsEditing("halltype"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "halltype" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Multi Day Hall Booking Facility */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Multi-day hall booking facility:</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "multiDayBooking" ? (
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="yes"
                                  checked={companyDetails.multiDayBooking === "yes"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, multiDayBooking: e.target.value })}
                                  className="mr-2"
                                />
                                Yes
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="no"
                                  checked={companyDetails.multiDayBooking === "no"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, multiDayBooking: e.target.value })}
                                  className="mr-2"
                                />
                                No
                              </label>
                            </div>
                          ) : (
                            <span 
                              className={`rounded-lg w-[90%] p-2 ${companyDetails.multiDayBooking ? '' : 'text-red-500 bg-white'}`}
                            >
                              {companyDetails.multiDayBooking 
                                ? companyDetails.multiDayBooking.charAt(0).toUpperCase() + companyDetails.multiDayBooking.slice(1) 
                                : "Please Select an Option"}
                            </span>
                          )}
                          <button
                            onClick={() => (isEditing === "multiDayBooking" ? handleSave("multiDayBooking") : setIsEditing("multiDayBooking"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "multiDayBooking" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Projector Available */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Projector Available:</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "projector" ? (
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="yes"
                                  checked={companyDetails.projector === "yes"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, projector: e.target.value })}
                                  className="mr-2"
                                />
                                Yes
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="no"
                                  checked={companyDetails.projector === "no"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, projector: e.target.value })}
                                  className="mr-2"
                                />
                                No
                              </label>
                            </div>
                          ) : (
                            <span 
                              className={`rounded-lg w-[90%] p-2 ${companyDetails.projector ? '' : 'text-red-500 bg-white'}`}
                            >
                              {companyDetails.projector 
                                ? companyDetails.projector.charAt(0).toUpperCase() + companyDetails.projector.slice(1) 
                                : "Please Select an Option"}
                            </span>
                          )}
                          <button
                            onClick={() => (isEditing === "projector" ? handleSave("projector") : setIsEditing("projector"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "projector" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Broadband Available */}
                      <div className="flex items-center space-x-4">
                        <span className="w-2/5 text-blue-900 font-bold">Broadband Available:</span>
                        <div className="flex items-center justify-between w-3/5">
                          {isEditing === "broadband" ? (
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="yes"
                                  checked={companyDetails.broadband === "yes"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, broadband: e.target.value })}
                                  className="mr-2"
                                />
                                Yes
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  value="no"
                                  checked={companyDetails.broadband === "no"}
                                  onChange={(e) => setCompanyDetails({ ...companyDetails, broadband: e.target.value })}
                                  className="mr-2"
                                />
                                No
                              </label>
                            </div>
                          ) : (
                            <span 
                              className={`rounded-lg w-[90%] p-2 ${companyDetails.broadband ? '' : 'text-red-500 bg-white'}`}
                            >
                              {companyDetails.broadband 
                                ? companyDetails.broadband.charAt(0).toUpperCase() + companyDetails.broadband.slice(1) 
                                : "Please Select an Option"}
                            </span>
                          )}
                          <button
                            onClick={() => (isEditing === "broadband" ? handleSave("broadband") : setIsEditing("broadband"))}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-4"
                          >
                            {isEditing === "broadband" ? <AiOutlineCheck size={16} /> : <AiOutlineEdit size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          );
        
      case "Gallery":
        return (
          <>
            <div className="upcoming-bookings mr-5">
                  <div className="m-auto w-[35%] text-center">
                    <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">Gallery</h2>
                  </div>

                  {/* FOR IMAGES */}
                  <div className="photo-section">
                    <div className="mt-12 w-full flex justify-between items-center">
                      <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">Photos</h2>
                      <label
                        className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 cursor-pointer flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <AiOutlineVideoCameraAdd size={24} /> 
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    <div className="photo-gallery-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="photo-card relative overflow-hidden rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={image.url}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* FOR VIDEOS */}
                  <div className="video-section">
                    <div className="mt-12 w-full flex justify-between items-center">
                      <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">Videos</h2>
                      <label
                        className="bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 cursor-pointer flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <AiOutlineVideoCameraAdd size={24} /> 
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoUpload}
                        />
                      </label>
                    </div>
                    <div className="video-gallery-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {videoList.map((video, index) => (
                        <div
                          key={index}
                          className="video-card relative overflow-hidden rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                          <video
                            className="w-full h-full object-cover"
                            controls
                          >
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>

             </div>
         </>
       );
       case "Booking Requests":
        return (
          <>
            <div className="p-4">
              <div className="m-auto w-[35%] text-center">
                <h2 className="text-lg p-2 font-bold font-serif text-blue-900 mb-4">
                  Booking Requests
                </h2>
              </div>
              <div className="space-y-4">
                {bookingDetails.map((request, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row items-start lg:items-center bg-blue-200 p-4 border-2 border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-800">
                        Company Name: {request.company}
                      </h3>
                      <p className="text-gray-700 mt-2">
                        <span className="font-bold">Event Name: </span>
                        {request.event}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-bold">Date: </span>
                        {request.date}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-bold">Head Count: </span>
                        {request.head}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-bold">Time: </span>
                        {request.time}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <span className="font-bold">Duration: </span>
                        {request.duration}
                      </p>
                      <p className="text-gray-700 mt-4 bg-yellow-100 border-2 border-yellow-500 p-4 rounded-lg">
                        <span className="font-bold">Status: </span>
                        {statuses[index] ? (
                          <span
                            className={`font-bold ${
                              statuses[index] === "accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {statuses[index].toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-gray-500">Not yet decided</span>
                        )}
                      </p>
                    </div>

                    <div className="border-l-2 border-blue-500 ml-4 h-64 ">
                        <h2 className="text-lg pl-8 font-bold font-serif text-blue-900 mb-12">
                          Choose Status
                        </h2>
                        <div className="mt-4 lg:mt-0 lg:ml-4 flex space-x-2">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            onClick={() => handleStatusChange(index, "accepted")}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            onClick={() => handleStatusChange(index, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </>
        );


      case "Upcoming Bookings":
        return (
          <>
            <div className="upcoming-bookings mr-5">
              <div className="bookings-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <BookingCard
                      eventName={booking.eventName}
                      eventDate={booking.eventDate}
                      eventTime={booking.eventTime}
                      eventImage={booking.eventImage}
                      headcount={booking.headcount}
                      additionalInfo={booking.additionalInfo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case "Past Bookings":
        return (
          <>
            <div className="upcoming-bookings mr-5">
              <div className="bookings-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <BookingCard
                      eventName={booking.eventName}
                      eventDate={booking.eventDate}
                      eventTime={booking.eventTime}
                      eventImage={booking.eventImage}
                      headcount={booking.headcount}
                      additionalInfo={booking.additionalInfo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
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
      <div className="h-full w-full flex ">
        {/* <div className="border-r-[1px] border-gray-500 w-2/6 mt-3 pt-5 mb-3">
          <div className="h-52 w-52 m-auto">
            <img
              className="h-full w-full"
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ></img>
          </div>
          <div className="pt-5 flex-col text-center">
            <div className="font-bold text-2xl">Name</div>
            <div className="text-sm">City</div>
          </div>
          <div className="flex pt-2 gap-2 justify-center">
            <div>count</div>
            <div className="ml-2 flex text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
                    className="h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <polygon points="10 15.27 16.18 19 14.54 12.81 19 8.63 12.81 8.63 10 2.5 7.19 8.63 1 8.63 5.46 12.81 3.82 19" />
                  </svg>
                ))}
            </div>
          </div>
          <div className="flex h-10 mt-3 pl-5">
            <div>Completed</div>
            <div className="ml-5 mr-5 mt-[2%] flex w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${venue ? venue.completePercentage : 0}%` }}
              ></div>
            </div>
          </div>
        </div> */}
        <div className=" w-5/6">
          <div className="flex gap-5 cursor-pointer ml-5 mt-6">
            {/* Basic Details */}
            <div
              className={`cursor-pointer relative font-bold font-serif text-lg ${
                activeMenu === "BasicDetails"
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveMenu("BasicDetails")}
            >
              Basic Details
              {activeMenu === "BasicDetails" && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 
                       transition-all duration-300"
                ></span>
              )}
            </div>
            {/* Gallery */}
            <div
              className={`cursor-pointer relative font-bold font-serif text-lg ${
                activeMenu === "Gallery" ? "text-blue-700" : "text-gray-600"
              }`}
              onClick={() => setActiveMenu("Gallery")}
            >
              Gallery
              {activeMenu === "Gallery" && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 
                       transition-all duration-300"
                ></span>
              )}
            </div>
            {/* Booking Requests */}
            <div
              className={`cursor-pointer relative font-bold font-serif text-lg ${
                activeMenu === "Booking Requests"
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveMenu("Booking Requests")}
            >
              Booking Requests
              {activeMenu === "Booking Requests" && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 
                       transition-all duration-300"
                ></span>
              )}
            </div>
            {/* Upcoming Bookings */}
            <div
              className={`cursor-pointer relative font-bold font-serif text-lg ${
                activeMenu === "Upcoming Bookings"
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveMenu("Upcoming Bookings")}
            >
              Upcoming Bookings
              {activeMenu === "Upcoming Bookings" && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 
                       transition-all duration-300"
                ></span>
              )}
            </div>
            {/* Past Bookings */}
            <div
              className={`cursor-pointer relative font-bold font-serif text-lg ${
                activeMenu === "Past Bookings"
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveMenu("Past Bookings")}
            >
              Past Bookings
              {activeMenu === "Past Bookings" && (
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 
                       transition-all duration-300"
                ></span>
              )}
            </div>
          </div>
          <div className="pl-10 pt-10">{renderComponent()}</div>
        </div>
      </div>
    </>
  );
}

export default VenueProfile;

const bookings = [
  {
    id: 1,
    eventName: "Tech Conference",
    eventDate: "20/12/24",
    eventTime: "10:00 AM",
    eventImage:
      "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    headcount: "200",
    additionalInfo: "Cognizant",
  },
  {
    id: 2,
    eventName: "Health Summit",
    eventDate: "22/12/24",
    eventTime: "2:00 PM",
    eventImage:
      "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    headcount: "500",
    additionalInfo: "Siemens",
  },
  {
    id: 3,
    eventName: "Art Expo",
    eventDate: "24/12/24",
    eventTime: "5:00 PM",
    eventImage:
      "https://images.pexels.com/photos/17669053/pexels-photo-17669053/free-photo-of-decorative-skulls-in-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    headcount: "150",
    additionalInfo: "Accenture",
  },
];

const BookingCard = ({
  eventName,
  eventDate,
  eventTime,
  eventImage,
  headcount,
  additionalInfo,
}) => {
  return (
    <div className="product-card w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-4 bg-blue-200 flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
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
          {eventDate}
        </p>
      </div>
      <div className="w-[150px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#24187b] after:top-9 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover rounded-md group-hover:opacity-90 transition-all duration-300"
        />

        <div className="tooltips absolute top-0 left-0.5 right-7 -translate-x-[150%] p-2 flex flex-col items-start gap-6 transition-all duration-300 group-hover:-translate-x-full">
          <p className="text-[#24187b] font-semibold font-serif text-xl uppercase group-hover:delay-900 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
            {eventTime}
          </p>
          <ul className="flex flex-col items-start gap-3">
            <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0a036c"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                height={12}
                width={12}
                className="stroke-[#0a036c]"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

              <p className="text-s font-semibold font-serif text-[#0a036c]">
                {headcount}
              </p>
            </li>
            <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={3}
                className="stroke-[#0a036c]"
                stroke="#000000"
                fill="none"
                viewBox="0 0 24 24"
                height={10}
                width={10}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-s font-semibold font-serif text-[#0a036c]">
                {additionalInfo}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
