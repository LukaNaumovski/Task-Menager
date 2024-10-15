import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Pie.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const [shouldScroll, setShouldScroll] = useState(false);

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

    setShouldScroll(true);
  };

  const handleInProgressClick = () => {
    props.handleDashboardArray("inprogress");

    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && props.taskListRef.current) {
      // Only scroll if the grid is rendered and shouldScroll is true
      props.taskListRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false); // Reset after scrolling
    }
  }, [shouldScroll, props.taskListRef]);

  return (
    <div className="pie">
      {props.tasks.length > 0 || props.completedTasks.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>No tasks yet!</p>
      )}
    </div>
  );
};

export default PieChart;
