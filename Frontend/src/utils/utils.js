// utils.js
import axios from "axios";

// COMMON FUNCTIONS -----------------------------------------------------------------------------------------------------

// Logout
export const logoutUser = async () => {
  try {
    let response = await axios.get("http://localhost:8000/commonroute/logout", {
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
      "http://localhost:8000/users/signup",
      {
        userName,
        email,
        contactNumber,
        password,
        agreeToTerms,
      },
      {
        withCredentials: true,
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
      "http://localhost:8000/users/login",
      { email, password },
      { withCredentials: true }
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
      "http://localhost:8000/users/updatepasswordrequest",
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
      "http://localhost:8000/users/updatepassword",
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
      "http://localhost:8000/venue/updatepasswordfirsttime",
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
    let response = await axios.get("http://localhost:8000/users/getuser", {
      withCredentials: true,
    });
    if (response.data.username) {
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
      "http://localhost:8000/users/createevent",
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
      "http://localhost:8000/users/getallvenue",
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
      "http://localhost:8000/users/fetchallvirtualevents",
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
      "http://localhost:8000/users/fetchallin_personvents",
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
      "http://localhost:8000/users/fetchallhyybridevents",
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
      "http://localhost:8000/users/fetchsingleevent",
      { eventId }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch a Single Event
export const fetchLastCreatedEvent = async () => {
  try {
    let response = await axios.get(
      "http://localhost:8000/users/fetchlastcreatedevent"
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
      "http://localhost:8000/users/eventregistration",
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

// Check a User is Registered in Event or Not
export const checkUserIsRegisteredInEventOrNot = async (eventId) => {
  try {
    let response = await axios.post(
      "http://localhost:8000/users/checkuserisregisteredineventornot",
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
      "http://localhost:8000/venue/login",
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
      "http://localhost:8000/venue/fetchvenueuser",
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Register Venue
export const registerVenue = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/venue/signup",
      { formData },
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
      "http://localhost:8000/admins/login",
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
    let response = await axios.get("http://localhost:8000/admins/fetchadmin", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Accept a Venue
export const acceptVenue = async (venueId) => {
  try {
    let response = await axios.post(
      "http://localhost:8000/admins/acceptvenue",
      { venueId },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
