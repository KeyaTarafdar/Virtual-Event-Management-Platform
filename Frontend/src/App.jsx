import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPage, CompanyPage, Home, Signup, Login, Forgetpassword, Resetpassword, VirtualEvent, InPersonEvent, HybridEvent, CreateForm, Registrationform, EventPage, Venue, VenueRegisteringPage, VenueUserPage, Venue_Details } from './Pages'
import {Event_card,CustomCalendar,Venue_card } from './Components'

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
