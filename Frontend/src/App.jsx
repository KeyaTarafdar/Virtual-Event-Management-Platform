import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Forgetpassword from "./Pages/Forgetpassword";
import Resetpassword from "./Pages/Resetpassword";
import VirtualEvent from "./Pages/VirtualEvent";
import InPersonEvent from "./Pages/InPersonEvent";
import HybridEvent from "./Pages/HybridEvent";
import CreateForm from "./Pages/CreateForm";
import CompanyPage from "./Pages/CompanyPage";
import Registrationform from "./Pages/Registrationform";
import EventPage from "./Pages/EventPage";
import Event_card from "./Components/Event_card";
import CustomCalendar from "./Components/CustomCalendar";
import VenueUserPage from "./Pages/VenueUserPage";
import VenueRegisteringPage from "./Pages/VenueRegisteringPage";
import Venue from "./Pages/Venue";
import Venue_card from "./Components/Venue_card";
import Venue_Details from "./Pages/Venue_Details";
import AdminPage from "./Pages/AdminPage";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <div className="m-0 p-0 mx-auto">
        <Router>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/resetpassword/:venueId" element={<Resetpassword />} />
            <Route path="/virtualevent" element={<VirtualEvent />} />
            <Route path="/inpersonevent" element={<InPersonEvent />} />
            <Route path="/hybridevent" element={<HybridEvent />} />
            <Route path="/createform/:eventType" element={<CreateForm />} />
            <Route path="/createform" element={<CreateForm />} />
            <Route
              path="/venueregistering"
              element={<VenueRegisteringPage />}
            />
            <Route path="/companypage" element={<CompanyPage />} />
            <Route
              path="/registrationform/:eventId"
              element={<Registrationform />}
            />
            <Route path="/eventpage/:eventId" element={<EventPage />} />
            <Route path="/eventcard" element={<Event_card />} />
            <Route path="/venueuser" element={<VenueUserPage />} />
            <Route path="/calendar" element={<CustomCalendar />} />
            <Route path="/venuecard" element={<Venue_card />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/venuedetails" element={<Venue_Details />} />
            <Route path="/adminpanel" element={<AdminPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
