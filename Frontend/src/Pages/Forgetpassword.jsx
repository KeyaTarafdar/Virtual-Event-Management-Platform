import { useState } from "react";
import { changePasswordRequest } from "../utils/utils";
import Resetpassword from "./Resetpassword";

const Forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [reset, setReset] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      changePasswordRequest(formData.email).then((response) => {
        if (response.success) {
          setReset(true);
        } else {
          alert(response.message);
        }
      });
    } else {
      if (errors.email) {
        alert("Wrong Email");
      }
    }
  };

  if (reset) {
    return <Resetpassword email={formData.email} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-[600px] max-w-2xl lg:max-w-3xl xl:max-w-4xl flex mt-4 mb-4">
        {/* Left part */}
        <div
          className="hidden md:flex md:w-1/3 items-center justify-center p-8 relative "
          style={{ clipPath: "circle(81% at 6% 50%)" }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src="https://media.istockphoto.com/id/1341025387/video/creative-people-brainstorming-about-start-up-project-and-collaboration.mp4?s=mp4-640x640-is&k=20&c=sYlazAvs9s6YNXRjqOhGIraUkb-U7yAIjoOvRuVfQ9w="
              type="video/mp4"
            />
          </video>
        </div>

        {/* Right part */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 relative">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            Forget Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative z-0 w-full mb-4 sm:mb-6 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 ${errors.email ? "border-red-500" : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2.5 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Email Address
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Button */}
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

export default Forgetpassword;
