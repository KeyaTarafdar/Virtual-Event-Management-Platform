import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, changePasswordVenue } from "../utils/utils";

const Resetpassword = (email) => {
  const navigate = useNavigate();
  const { venueId } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => {
          const { confirmPassword, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) newErrors.password = "Password is required";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (venueId) {
          changePasswordVenue(venueId, formData.password).then((response) => {
            alert(response);
          });
        } else {
          changePassword(email, formData.password).then((response) => {
            alert(response);
          });
        }
        navigate("/login");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-[600px] max-w-2xl lg:max-w-3xl xl:max-w-4xl flex mt-4 mb-4">
        {/* Left Part */}
        <div
          className="hidden md:flex md:w-1/3 items-center justify-center p-8 relative "
          style={{ clipPath: "circle(73% at 4% 50%)" }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src="https://media.istockphoto.com/id/2037484164/video/people-using-videoconference-app-take-part-in-virtual-meeting-collage.mp4?s=mp4-640x640-is&k=20&c=tr4LlV9pmPyOqNLedkJSjWSgtQxkOydhwoCA69Jijmg="
              type="video/mp4"
            />
          </video>
        </div>

        {/* Right Part */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 relative">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div className="relative z-0 w-full mb-4 sm:mb-6 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative z-0 w-full mb-4 pb-4 sm:mb-6 group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm New Password
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
