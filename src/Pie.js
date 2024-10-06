import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Pie.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const totalTasks = props.completed + props.inProgress;

  const data = {
    labels: ["Completed Tasks", "In Progress Tasks"],
    datasets: [
      {
        label: "Tasks Distribution",
        data: [props.completed, props.inProgress],
        backgroundColor: ["#55AD9B", "#E0FBE2"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return ` ${value} (${percentage}%)`; // Show percentage in tooltip
          },
        },
      },
    },
    // Add the click handler
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedElementIndex = elements[0].index;
        handleSliceClick(clickedElementIndex);
      }
    },
  };

  // Handle slice click based on index
  const handleSliceClick = (index) => {
    if (index === 0) {
      handleCompletedClick();
    } else if (index === 1) {
      handleInProgressClick();
    }
  };

  const handleCompletedClick = () => {
    props.handleDashboardArray("completed");
  };

  const handleInProgressClick = () => {
    // props.handleDashboardArray("inprogress");
  };

  return (
    <div className="pie">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
