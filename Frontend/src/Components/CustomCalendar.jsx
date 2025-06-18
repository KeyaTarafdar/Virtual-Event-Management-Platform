import { useEffect, useState } from "react";

const CustomCalendar = ({ venue }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [bookingDates, setBookingDates] = useState([]);

  const today = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const blankDays = Array(startOfMonth.getDay()).fill(null);

  // Returns the first match for that day (used for hover + coloring)
  const getEventForDate = (day) => {
    const calendarDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toDateString();

    return bookingDates.find(
      (event) => new Date(event.date).toDateString() === calendarDate
    );
  };

  const isToday = (day) => {
    const thisDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return thisDate.toDateString() === today.toDateString();
  };

  useEffect(() => {
    const filtered = venue.bookings.filter((booking) => booking?.paymentDone);
    setBookingDates(filtered);
  }, [venue]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="calendar-container w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <div className="calendar-header flex justify-between items-center mb-4">
          <button className="nav-btn text-xl font-bold" onClick={prevMonth}>
            &lt;
          </button>
          <span className="month-display text-lg font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </span>
          <button className="nav-btn text-xl font-bold" onClick={nextMonth}>
            &gt;
          </button>
        </div>

        <div className="calendar-grid grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="font-medium">
              {day}
            </div>
          ))}

          {blankDays.map((_, index) => (
            <div key={index} className="h-12"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const event = getEventForDate(day);
            const isHovered = hoveredEvent && hoveredEvent === event;

            let bgColor = "bg-white";
            if (event) bgColor = "bg-green-500 text-white";
            if (isToday(day)) bgColor = "bg-blue-500 text-white";
            if (isToday(day) && event) bgColor = "bg-purple-600 text-white";

            return (
              <div
                key={day}
                className={`relative h-12 flex items-center justify-center rounded cursor-pointer border ${bgColor}`}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {day}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10 bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                    Slot: {event.slot}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
