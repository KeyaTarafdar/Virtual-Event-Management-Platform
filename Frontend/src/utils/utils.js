// utils.js
import axios from "axios";

// COMMON FUNCTIONS -----------------------------------------------------------------------------------------------------

// Fetch Company Details
export const fetchCompanyDetails = async () => {
  try {
    let { data } = await axios.get("http://localhost:8000/fetchcompanydetails");
    if (data.success) {
      sessionStorage.setItem("company", JSON.stringify(data.data));
      return data.data;
    } else {
      return {};
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    let { data } = await axios.get("http://localhost:8000/commonroute/logout", {
      withCredentials: true,
    });
    if (data.success) {
      if (data.message.includes("User")) sessionStorage.removeItem("user");
      else if (data.message.includes("Admin")) sessionStorage.removeItem("admin");
      else if (data.message.includes("Venue")) sessionStorage.removeItem("venue");
    } else {
      alert(data.message);
    }
    return data;
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
    let { data } = await axios.post("http://localhost:8000/users/signup", {
      userName,
      email,
      contactNumber,
      password,
      agreeToTerms,
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/users/login",
      { email, password },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (imageData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/users/uploadprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Change Password Request
export const changePasswordRequest = async (email) => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/users/updatepasswordrequest",
      { email }
    );
    return data;
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
    let { data } = await axios.get("http://localhost:8000/users/getuser", {
      withCredentials: true,
    });
    if (data.success) {
      sessionStorage.setItem("user", JSON.stringify(data.data));
      return data.data;
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
    const { data } = await axios.post(
      "http://localhost:8000/users/createevent",
      { ...formData },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch All Venue
export const fetchAllVenues = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/users/getallvenue",
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Virtual Events
export const fetchVirtualEvents = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/users/fetchallvirtualevents",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch In-person Events
export const fetchIn_PersonEvents = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/users/fetchallin_personvents",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Hybrid Events
export const fetchHybridEvents = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/users/fetchallhyybridevents",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch a Single Event
export const fetchSingleEvent = async (eventId) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/users/fetchsingleevent",
      { eventId }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch Last Created Event
export const fetchLastCreatedEvent = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/users/fetchlastcreatedevent"
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Event Registration
export const eventRegistration = async (eventId) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/users/eventregistration",
      { eventId },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Check a User is Registered in Event or Not
export const checkUserIsRegisteredInEventOrNot = async (eventId) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/users/checkuserisregisteredineventornot",
      { eventId },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// VENUE FUNCTIONALITIES -----------------------------------------------------------------------------------------------------

// Venues Login
export const loginVenue = async (email, password) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/venue/login",
      { email, password },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Find Venue
export const findVenue = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/venue/fetchvenueuser",
      { withCredentials: true }
    );
    if (data.success) {
      sessionStorage.setItem("venue", JSON.stringify(data.data));
      return data.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Upload venue Profile Picture
export const uploadVenueProfilePicture = async (imageData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/uploadvenueprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Register Venue
export const registerVenue = async (formData) => {
  try {
    const { data } = await axios.post("http://localhost:8000/venue/signup", {
      ...formData,
    });

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Name
export const updateVenueName = async (newHallName) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallname",
      { newHallName },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue City
export const updateVenueCity = async (newHallCity) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallcity",
      { newHallCity },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Email
export const updateVenueEmail = async (newHallEmail) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallemail",
      { newHallEmail },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Phone
export const updateVenuePhone = async (newHallPhone) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallphone",
      { newHallPhone },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Address
export const updateVenueAddress = async (newHallAddress) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehalladdress",
      { newHallAddress },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue MaxCapacity
export const updateVenueCapacity = async (newHallCapacity) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallcapacity",
      { newHallCapacity },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue Multiday
export const updateVenueMultidayEvent = async (newHallMultiday) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallmultiday",
      { newHallMultiday },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue halltype
export const updateVenueHalltype = async (newHalltype) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehalltype",
      { newHalltype },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue 1sthalf
export const updateHallTime_1st = async (newHalltime1st) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallTime_1st",
      { newHalltime1st },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Update Venue 2ndhalf
export const updateHallTime_2nd = async (newHalltime2nd) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallTime_2nd",
      { newHalltime2nd },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// Update Venue time fullday
export const updateHallTime_fullday = async (newHalltimefullday) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallTime_fullday",
      { newHalltimefullday },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// Update Venue hallprice_1
export const updateHallPrice_1st = async (newHallprice1) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallPrice_1st",
      { newHallprice1 },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// Update Venue hallPrice_2
export const updateHallPrice_2nd = async (newHallprice2) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallPrice_2nd",
      { newHallprice2 },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// Update Venue hallPrice_fullday
export const updateHallPrice_fullday = async (newHallpricefull) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/venue/updatehallPrice_fullday",
      { newHallpricefull },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
// ADMIN FUNCTIONS -----------------------------------------------------------------------------------------------------

// Admin Login
export const loginAdmin = async (email, password) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/admins/login",
      { email, password },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Find Admin
export const findAdmin = async () => {
  try {
    let { data } = await axios.get("http://localhost:8000/admins/fetchadmin", {
      withCredentials: true,
    });
    if (data.success) {
      sessionStorage.setItem("admin", JSON.stringify(data.data));
      return data.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Upload Profile Picture
export const uploadProfilePictureAdmin = async (imageData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/admins/uploadprofilepicture",
      { image: imageData },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Accept a Venue
export const acceptVenue = async (venueId) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/admins/acceptvenue",
      { venueId },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Reject a Venue
export const rejectVenue = async (venueId, reason) => {
  try {
    let { data } = await axios.post(
      "http://localhost:8000/admins/rejectvenue",
      { venueId, reason },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// Fetch All Venue
export const fetchAllEvents = async () => {
  try {
    let { data } = await axios.get(
      "http://localhost:8000/admins/fetchallevents",
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

//company name
export const updateCompanyInfo = async (company) => {
  try {
    console.log("company", company);
    let { data } = await axios.post(
      "http://localhost:8000/admins/updatecompanyinfo",
      {
        ...company,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

//company address
// export const setCompanyAdress = async (address) => {
//   try {
//     let { data } = await axios.post(
//       "http://localhost:8000/admins/updatecompanyaddress",
//       {address}
//       ,{
//         withCredentials: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// //company email
// export const setCompanyEmail = async (email) => {
//   try {
//     let { data } = await axios.post(
//       "http://localhost:8000/admins/updatecompanyemail",
//       {email},{
//         withCredentials: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// //company contact
// export const setCompanyContact = async (contact) => {
//   try {
//     let { data } = await axios.post(
//       "http://localhost:8000/admins/updatecompanycontact",{contact},
//       {
//         withCredentials: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// //company description
// export const setCompanyDesc = async (description) => {
//   try {
//     let { data } = await axios.post(
//       "http://localhost:8000/admins/updatecompanydescription",{description},
//       {
//         withCredentials: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };
