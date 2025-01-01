import { useState } from 'react';

const events = [
  { date: "2024-12-02T00:00:00.000+00:00", time: "10:00" },
  { date: "2024-12-03T00:00:00.000+00:00", time: "14:00" },
  { date: "2024-12-04T00:00:00.000+00:00", time: "18:00" },
  { date: "2024-12-05T00:00:00.000+00:00", time: "11:00" },
];

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState(null);
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
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const blankDays = Array(startOfMonth.getDay()).fill(null);

  // Format date for comparison
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
  };

  // Check if a date has an event
  const getEventForDate = (day) => {
    const formattedDate = formatDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
    return events.find((event) => event.date.startsWith(formattedDate));
  };

  // Convert 24-hour time to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Check if a date is today
  const isToday = (day) => {
    const currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return currentDay.toDateString() === today.toDateString();
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>&lt;</button>
        <span className="month-display">
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </span>
        <button className="nav-btn" onClick={nextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">{day}</div>
        ))}
        {blankDays.map((_, index) => (
          <div key={index} className="day-cell blank"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const event = getEventForDate(day);
          return (
            <div
              key={day}
              className={`day-cell ${isToday(day) ? "current-day" : ""} ${event ? "event-day" : ""}`}
              onMouseEnter={() => setHoveredEvent(event)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {day}
              {hoveredEvent && hoveredEvent.date.startsWith(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))) && (
                <div className="tooltip">{formatTime(hoveredEvent.time)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
