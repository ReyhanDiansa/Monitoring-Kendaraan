"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import api from "../../utils/axios";

const LineChart = ({ apiUrl, label }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(apiUrl);
        const data = response.data.data;

        const labels = data.map((item) => item.date || item.month);
        const counts = data.map((item) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              fill: true,
              label: `Jumlah Pemakaian BBM`,
              lineTension: 0.1,
              backgroundColor: "#FF7A7F",
              borderColor: "#81171b",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#81171b",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#81171b",
              pointHoverBorderColor: "#c76165",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: counts,
            },
          ],
        });
        const values = counts;

        const maxValue = Math.max(...values);
        setOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Jumlah Pemakaian BBM`,
            },
          },
          scales: {
            y: {
              min: 0,
              max: maxValue + 10,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return <Line data={chartData} options={options} />;
};

const FuelData = () => {
  return (
    <div className="flex gap-3 my-3 justify-center items-center">
      <div className="w-4/12 bg-white rounded-md shadow-md p-2">
        <h1>Daily Data</h1>
        <LineChart
          apiUrl={"/api/fuel-consumption/getDataDaily/forChart"}
          label="Daily"
        />
      </div>

      <div className="w-4/12 bg-white rounded-md shadow-md p-2">
        <h1>Monthly Data</h1>
        <LineChart
          apiUrl={"/api/fuel-consumption/getDataMonthly/forChart"}
          label="Monthly"
        />
      </div>
    </div>
  );
};
export default FuelData;
