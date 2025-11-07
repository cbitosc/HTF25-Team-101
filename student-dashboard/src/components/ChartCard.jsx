import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartCard = ({ title, labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
      },
    ],
  };

  return (
    <div style={{ background: "#fff", padding: "20px", margin: "10px", borderRadius: "8px", boxShadow: "0 0 5px #ccc" }}>
      <h3>{title}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ChartCard;
