// pages/dashboard.js
"use client";
import { useEffect, useState } from "react";
import api from "../../utils/axios";

const Dashboard = () => {
  const [serviceSchedules, setServiceSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceSchedules = async () => {
      try {
        const response = await api.post(
          "/api/service-schedule/get-data/service-today"
        );
        setServiceSchedules(response.data.data.data);
      } catch (err) {
        if (err?.response.status !== 404) {
          setError("Failed to load service schedules");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServiceSchedules();
  }, []);

  if (loading) {
    return <p className="text-center my-2">Loading...</p>;
  }

  return (
    <div className="w-full mx-auto my-5">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Today's Service Schedule
        </h1>
        <div className="flex gap-2 justify-center">
          {serviceSchedules.length > 0 ? (
            serviceSchedules.map((schedule) => (
              <ServiceScheduleCard
                key={schedule.id}
                serviceDescription={schedule.service_description}
                transportName={schedule.transport.name}
              />
            ))
          ) : (
            <p className="text-center">
              {" "}
              {error ? { error } : "No service schedules for today."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceScheduleCard = ({ serviceDescription, transportName }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{serviceDescription}</h2>
      <p className="text-gray-700">Transport: {transportName}</p>
    </div>
  );
};

export default Dashboard;
