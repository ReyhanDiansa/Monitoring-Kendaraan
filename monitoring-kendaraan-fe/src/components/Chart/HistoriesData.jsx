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
              label: `Jumlah Pemakaian Kendaraan`,
              lineTension: 0.1,
              backgroundColor: "#ffd6a8",
              borderColor: "#ca3500",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#ca3500",
              pointBackgroundColor: "#ffd6a8",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#ffd6a8",
              pointHoverBorderColor: "#ca3500",
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
              text: `Jumlah Pemakaian Kendaraan`,
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

const HistoriesData = () => {
  return (
    <div className="flex gap-3 justify-center items-center">
      <div className="w-4/12 bg-white rounded-md shadow-md p-2">
        <h1>Daily Data</h1>
        <LineChart
          apiUrl={"/api/usage-histories/getHistoryDaily/forChart"}
          label="Daily"
        />
      </div>

      <div className="w-4/12 bg-white rounded-md shadow-md p-2">
        <h1>Monthly Data</h1>
        <LineChart
          apiUrl={"/api/usage-histories/getHistoryMonthly/forChart"}
          label="Monthly"
        />
      </div>
    </div>
  );
};
export default HistoriesData;
