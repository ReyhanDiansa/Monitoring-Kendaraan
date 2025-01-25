"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../utils/axios";

const DriverForm = () => {
  const { id } = useParams();
  const [driverItem, setDriverItem] = useState({
    name: "",
    nip: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchDriverItem = async () => {
        try {
          const response = await api.get(`/api/driver/${id}`);
          setDriverItem(response.data.data);
        } catch (error) {
          console.error("Failed to fetch driver item", error);
        }
      };
      fetchDriverItem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...driverItem };
      if (id) {
        await api.put(`/api/driver/update/${id}`, payload);
        Swal.fire("Success", "Driver updated successfully", "success");
      } else {
        await api.post("/api/driver/create", payload);
        Swal.fire("Success", "Driver added successfully", "success");
      }
      router.push("/admin/driver");
    } catch (error) {
      console.error("Failed to save driver item", error);
      Swal.fire("Error", "Failed to save driver item", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Driver" : "Add Driver"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={driverItem.name}
            onChange={handleChange}
            className="w-9/12 px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NIP</label>
          <input
            type="number"
            name="nip"
            value={driverItem.nip}
            onChange={handleChange}
            className="w-9/12 px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:text-blue-500 hover:bg-white hover:ring-blue-700 hover:ring-2 focus:ring-4 focus:ring-blue-200 text-white px-4 py-2 rounded"
        >
          {id ? "Update Driver" : "Add Driver"}
        </button>
      </form>
    </div>
  );
};

export default DriverForm;
