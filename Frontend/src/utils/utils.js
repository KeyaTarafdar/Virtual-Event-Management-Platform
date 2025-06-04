// utils.js
import axios from "axios";

// COMMON FUNCTIONS -----------------------------------------------------------------------------------------------------

// Fetch Company Details
export const fetchCompanyDetails = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/fetchcompanydetails"
    );
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    let response = await axios.get("https://event-management-application-5hs8.onrender.com/commonroute/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// USER FUNCTIONS -----------------------------------------------------------------------------------------------------

// User Signup
export const signUp = async (
  userName,
  email,
  contactNumber,
  password,
  agreeToTerms
) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/signup",
      {
        userName,
        email,
        contactNumber,
        password,
        agreeToTerms,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (imageData) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/uploadprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Change Password Request
export const changePasswordRequest = async (email) => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/updatepasswordrequest",
      { email }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Change Password of User
export const changePassword = async (email, password) => {
  try {
    let response = await axios.put(
      "https://event-management-application-5hs8.onrender.com/users/updatepassword",
      { email, password }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Change Password of Venue User
export const changePasswordVenue = async (venueId, password) => {
  try {
    let response = await axios.put(
      "https://event-management-application-5hs8.onrender.com/venue/updatepasswordfirsttime",
      { venueId, password }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Find user
export const findUser = async () => {
  try {
    let response = await axios.get("https://event-management-application-5hs8.onrender.com/users/getuser", {
      withCredentials: true,
    });
    console.log('response', response)
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Create Event
export const createEvent = async (formData) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/createevent",
      { formData },
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch All Venue
export const fetchAllVenues = async () => {
  try {
    const response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/getallvenue",
      { withCredentials: true }
    );

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Virtual Events
export const fetchVirtualEvents = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/fetchallvirtualevents",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch In-person Events
export const fetchIn_PersonEvents = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/fetchallin_personvents",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Hybrid Events
export const fetchHybridEvents = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/fetchallhyybridevents",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch a Single Event
export const fetchSingleEvent = async (eventId) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/fetchsingleevent",
      { eventId }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Last Created Event
export const fetchLastCreatedEvent = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/users/fetchlastcreatedevent"
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Event Registration
export const eventRegistration = async (eventId) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/eventregistration",
      { eventId },
      {
        withCredentials: true,
      }
    );
    console.log('response', response)
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Check a User is Registered in Event or Not
export const checkUserIsRegisteredInEventOrNot = async (eventId) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/users/checkuserisregisteredineventornot",
      { eventId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// VENUE FUNCTIONALITIES -----------------------------------------------------------------------------------------------------

// Venues Login
export const loginVenue = async (email, password) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Find Venue
export const findVenue = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/venue/fetchvenueuser",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Upload venue Profile Picture
export const uploadVenueProfilePicture = async (imageData) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/uploadvenueprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Register Venue
export const registerVenue = async (formData) => {
  try {
    const response = await axios.post("https://event-management-application-5hs8.onrender.com/venue/signup", {
      formData,
    });

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Name
export const updateVenueName = async (newHallName) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallname",
      { newHallName },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue City
export const updateVenueCity = async (newHallCity) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallcity",
      { newHallCity },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Email
export const updateVenueEmail = async (newHallEmail) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallemail",
      { newHallEmail },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Phone
export const updateVenuePhone = async (newHallPhone) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallphone",
      { newHallPhone },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Address
export const updateVenueAddress = async (newHallAddress) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehalladdress",
      { newHallAddress },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue MaxCapacity
export const updateVenueCapacity = async (newHallCapacity) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallcapacity",
      { newHallCapacity },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Multiday
export const updateVenueMultidayEvent = async (newHallMultiday) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/venue/updatehallmultiday",
      { newHallMultiday },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// ADMIN FUNCTIONS -----------------------------------------------------------------------------------------------------

// Admin Login
export const loginAdmin = async (email, password) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/admins/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Find Admin
export const findAdmin = async () => {
  try {
    let response = await axios.get("https://event-management-application-5hs8.onrender.com/admins/fetchadmin", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Upload Profile Picture
export const uploadProfilePictureAdmin = async (imageData) => {
  try {
    const response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/admins/uploadprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Accept a Venue
export const acceptVenue = async (venueId) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/admins/acceptvenue",
      { venueId },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Reject a Venue
export const rejectVenue = async (venueId, reason) => {
  try {
    let response = await axios.post(
      "https://event-management-application-5hs8.onrender.com/admins/rejectvenue",
      { venueId, reason },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch All Venue
export const fetchAllEvents = async () => {
  try {
    let response = await axios.get(
      "https://event-management-application-5hs8.onrender.com/admins/fetchallvenue",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
