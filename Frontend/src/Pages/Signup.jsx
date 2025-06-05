import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signUp } from "../utils/utils";
import Loader from "../Components/loader";
import { useUser } from "../context/userContext/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setAdmin, setUser, setVenue } = useUser();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!formData.userName)
      newErrors.userName = "Company/User name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    if (!formData.password) newErrors.password = "Password is required";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (validateForm()) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const result = await signUp(
            formData.userName,
            formData.email,
            formData.contactNumber,
            formData.password,
            formData.agreeToTerms
          );

          console.log('result', result)

          if (result.success) {
            if (result.message.includes("User")) {
              setUser(result.data);
              localStorage.setItem("user", JSON.stringify(result.data));
            } else if (result.message.includes("Admin")) {
              setAdmin(result.data);
              localStorage.setItem("admin", JSON.stringify(result.data));
            } else if (result.message.includes("Venue")) {
              setVenue(result.data);
              localStorage.setItem("venue", JSON.stringify(result.data));
            }
            navigate("/");
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error("Signup failed:", error);
          setSignupError("An error occurred during signup. Please try again.");
        } finally {
          setLoading(false);
        }
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 ">
      {/* Sign up box */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl flex mt-4 mb-4">
        {/* Left Part */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 relative">
          <h2 className="font-serif text-3xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Sign up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div className="relative z-0 w-full mb-4 group">
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                  errors.userName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                } peer`}
                placeholder=" "
              />
              <label
                htmlFor="userName"
                className={`peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 ${
                  errors.userName ? "text-red-500" : "peer-focus:text-blue-600"
                } peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                Company Name/User Name
              </label>
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Email*/}
            <div className="relative z-0 w-full mb-4 sm:mb-6 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contact number */}
            <div className="relative z-0 w-full mb-4 sm:mb-6 group">
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                  errors.contactNumber ? "border-red-500" : "border-gray-300"
                } peer`}
                placeholder=" "
              />
              <label
                htmlFor="contactNumber"
                className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contact Number
              </label>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>

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
                Password
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
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start pb-4 sm:pb-6">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <div className="ml-2">
                <label className="block text-gray-600">
                  I agree with the terms and privacy policy
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Or Continue With */}
          <div className="flex items-center justify-between mt-6">
            <hr className="border-b w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              Or continue with
            </p>
            <hr className="border-b w-1/5 lg:w-1/4" />
          </div>

          {/* Google & Facebook Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded-full inline-flex items-center hover:bg-red-700 transition duration-200"
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-full inline-flex items-center hover:bg-blue-700 transition duration-200"
            >
              <FaFacebook className="mr-2" /> Facebook
            </button>
          </div>

          {/* Already have an account */}
          <div className="text-center mt-4 mb-2">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 underline hover:no-underline cursor-pointer"
                onClick={() => {
                  console.log("Login link clicked");
                  navigate("/login");
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>

        {/* Right Part */}
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center p-8 relative "
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src="https://media.istockphoto.com/id/2153401715/video/young-empowering-thought-leader-standing-behind-a-tribune-showing-an-inspiring-presentation.mp4?s=mp4-640x640-is&k=20&c=RJ1xCk0nm_OltgDlxOqDxEnGAg2jKz-nYvGS21P3zpQ="
              type="video/mp4"
            />
          </video>
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
            <Loader />
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
