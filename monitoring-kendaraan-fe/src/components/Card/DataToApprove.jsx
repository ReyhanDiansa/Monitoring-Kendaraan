// pages/dashboard.js
"use client";
import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Link from "next/link";

const DataToApprove = () => {
  const [approveData, setApproveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataToApprove = async () => {
      try {
        const response = await api.post("/api/usage-request/approver/getAll?is_pending=true");
        setApproveData(response.data.data.data.slice(0, 10));
      } catch (err) {
        if (err?.response.status !== 404) {
          setError("Failed to load approve data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDataToApprove();
  }, []);

  if (loading) {
    return <p className="text-center my-2">Loading...</p>;
  }

  return (
    <div className="w-full mx-auto my-5">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Data To Approve</h1>
        <div className="flex gap-2 justify-center">
          <div className="bg-white w-6/12 shadow-md rounded-lg p-6 mb-4">
            <div>
              <div className="flex  flex-wrap gap-5 justify-center">
                {approveData.length > 0 ? (
                  approveData.map((schedule) => (
                    <ServiceScheduleCard
                      key={schedule.id}
                      serviceDescription={schedule.usage_description}
                      transportName={schedule.transport.name}
                    />
                  ))
                ) : (
                  <p className="text-center">
                    {" "}
                    {error ? error : "You have no usage requests to approve"}
                  </p>
                )}
              </div>
              {approveData.length > 0 && (
                <Link
                  className="text-blue-600 underline mt-3  text-center flex justify-center w-full"
                  href={"/user/usage-request"}
                >
                  Approve/Reject Data or see more data
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceScheduleCard = ({ serviceDescription, transportName }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{serviceDescription}</h2>
      <p className="text-gray-700">Transport: {transportName}</p>
    </div>
  );
};

export default DataToApprove;
