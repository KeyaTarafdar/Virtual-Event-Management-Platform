import { useState } from "react";
import { registerVenue } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function VenueRegisteringPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const [cityerror, setCityError] = useState("");
  const [contactError, setContactError] = useState("");
  const [content, setcontent] = useState("");

  const [loading, setLoading] = useState(false);
  const [successfullyApplied, setSuccessfullyApplied] = useState(false);
  const [errorApplied, seterrorApplied] = useState(false);

  const [formData, setFormData] = useState({
    venueName: "",
    owner: "",
    email: "",
    contact: "",
    city: "",
    fullAddress: "",
    maxCapacity: 0,
    canOrganizeMultidayEvent: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      registerVenue(formData).then((response) => {
        setTimeout(() => {
          setcontent(response.message);
          if (response.success) {
            setSuccessfullyApplied(true);
          } else {
            seterrorApplied(true);
          }
          setLoading(false);
        }, 3000);
      });
    } catch (error) {
      setcontent(
        "An error occurred while creating the event. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 m-12 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Part */}
          <div className="w-full lg:w-full">
            <h2 className="font-serif text-3xl sm:text-3xl font-bold mb-6 sm:mb-8 text-indigo-600">
              Register Your Venue
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Venue Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={(e) => {
                    const value = e.target.value;
                    const maxWords = 20;
                    const regex = /^[A-Za-z][A-Za-z\s]{0,}$/;
                    const wordCount = value.trim().split(/\s+/).length;

                    const errorMessage = !regex.test(value)
                      ? "Venue name must start with a letter and contain only alphabets and spaces."
                      : wordCount > maxWords
                      ? `Venue name should not exceed ${maxWords} words.`
                      : "";
                    setNameError(errorMessage);
                    setFormData({ ...formData, venueName: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    nameerror ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter venue name"
                  required
                />
                {nameerror && (
                  <p className="text-red-500 text-sm mt-1">{nameerror}</p>
                )}
              </div>

              {/* Venue Owner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Venue Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[A-Za-z\s]*$/;

                    const errorMessage = !regex.test(value)
                      ? "Owner name must contain only alphabets and spaces."
                      : "";
                    setOwnerError(errorMessage);
                    setFormData({ ...formData, owner: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    ownerError ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter venue owner name"
                  required
                />
                {ownerError && (
                  <p className="text-red-500 text-sm mt-1">{ownerError}</p>
                )}
              </div>

              {/* Venue Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Venue Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm"
                  placeholder="Enter venue email"
                  required
                />
              </div>

              {/* Venue Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Venue Contact No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[0-9]{0,10}$/;
                    const errorMessage = !regex.test(value)
                      ? "Contact number must contain only digits."
                      : value.length !== 10 && value.length > 0
                      ? "Contact number must be exactly 10 digits."
                      : "";
                    setContactError(errorMessage);
                    setFormData({ ...formData, contact: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    contactError ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter venue contact no."
                  required
                />
                {contactError && (
                  <p className="text-red-500 text-sm mt-1">{contactError}</p>
                )}
              </div>

              {/* Venue City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => {
                    const value = e.target.value;
                    const maxWords = 2;
                    const regex = /^[A-Za-z][A-Za-z\s]{0,}$/;
                    const wordCount = value.trim().split(/\s+/).length;

                    const errorMessage = !regex.test(value)
                      ? "City name must start with a letter and contain only alphabets and spaces."
                      : wordCount > maxWords
                      ? `City name should not exceed ${maxWords} words.`
                      : "";
                    setCityError(errorMessage);
                    setFormData({ ...formData, city: value });
                  }}
                  className={`mt-1 block w-full p-2 border ${
                    cityerror ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm`}
                  placeholder="Enter main city"
                  required
                />
                {cityerror && (
                  <p className="text-red-500 text-sm mt-1">{cityerror}</p>
                )}
              </div>

              {/* Venue Full Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, fullAddress: value });
                  }}
                  className="mt-1 block w-full p-2 border  rounded-md shadow-sm"
                  placeholder="Enter full address of the venue"
                  required
                />
              </div>

              {/* Able to organize Multiday Event or not */}
              <div className="flex">
                <label className="block text-sm font-medium text-gray-700 pr-5">
                  Are you able to organize Multiday Event like &quot;
                  <b>Hackathon</b>&quot;?
                </label>
                <input
                  checked={formData.canOrganizeMultidayEvent}
                  type="checkbox"
                  className="mr-1"
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      canOrganizeMultidayEvent: true,
                    }))
                  }
                />
                Yes
                <input
                  type="checkbox"
                  className="ml-4 mr-1"
                  checked={!formData.canOrganizeMultidayEvent}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      canOrganizeMultidayEvent: false,
                    }))
                  }
                />
                No
              </div>

              {/* Max Capacity */}
              <div>
                <label className="block text-sm mt-8 font-medium text-gray-700">
                  Maximum Capacity of the Hall
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter number of maximum capacity"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setError("");
                    setFormData({
                      ...formData,
                      maxCapacity: value,
                    });
                  }}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  disabled={!!error}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {/* Right Part*/}
          <div className="hidden lg:block relative">
            <div
              className="relative overflow-hidden w-full h-full rounded-lg shadow-lg"
              style={{
                clipPath:
                  "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
              }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/3202042/3202042-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
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
            <div className="loader"></div>
          </div>
        </>
      )}
      {(successfullyApplied || errorApplied) && (
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
            <div className="flex flex-col items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-lg bg-white">
                {successfullyApplied && (
                  <>
                    <TiTick className="text-8xl text-green-600 border-4 border-green-600 rounded-full" />

                    <h2 className="text-2xl font-bold mt-10">{content}</h2>
                    <div
                      className="mt-6 text-blue-500 hover:underline cursor-pointer"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Back to Home
                    </div>
                  </>
                )}

                {errorApplied && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 text-red-600"
                      viewBox="0 0 122.88 122.879"
                      fill="none"
                    >
                      <g>
                        <path
                          fill="#FF4141"
                          d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z"
                        />
                      </g>
                    </svg>
                    <h2 className="text-2xl font-bold mt-10">{content}</h2>
                    <div
                      className="mt-6 text-blue-500 hover:underline cursor-pointer"
                      onClick={() => {
                        navigate("venueregistering");
                      }}
                    >
                      Back to Application
                    </div>
                  </>
                )}

                <div className="mt-5">
                  <p className="text-gray-400 text-sm">Thanks & Regards</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Eventek.com</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VenueRegisteringPage;
