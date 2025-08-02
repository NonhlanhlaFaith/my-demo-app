import React, { useEffect } from "react";
import Gantt from "frappe-gantt";
import "./GanttChart.css";

const GanttChart = ({ tasks }) => {
  useEffect(() => {
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      name: task.title,
      start: task.startDate || new Date().toISOString().split("T")[0],
      end: task.endDate || new Date().toISOString().split("T")[0],
      progress: task.completed ? 100 : 0
    }));

    const ganttContainer = document.getElementById("gantt");
    if (ganttContainer && formattedTasks.length > 0) {
      ganttContainer.innerHTML = ""; // Clear previous chart
      new Gantt("#gantt", formattedTasks);
    }
  }, [tasks]);

  return <div id="gantt" style={{ overflowX: "auto" }}></div>;
};

export default GanttChart;
