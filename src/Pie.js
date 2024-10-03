// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "./Pie.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const data = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        data: [`${props.completed}`, `${props.inProgress}`], // Your task stats here
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Legend at the bottom
      },
    },
  };

  return (
    <div className="pie">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
