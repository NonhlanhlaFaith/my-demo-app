import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.css"; // Optional: you can create this for custom styling

const CalendarView = ({ tasks }) => {
  // Extract and convert task dates to Date objects
  const taskDates = tasks.map((task) => new Date(task.date));

  const tileClassName = ({ date }) => {
    const hasTask = taskDates.some(
      (taskDate) => taskDate.toDateString() === date.toDateString()
    );
    return hasTask ? "has-task" : null;
  };

  return (
    <div className="calendar-view">
      <h3>📅 Task Calendar</h3>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarView;
