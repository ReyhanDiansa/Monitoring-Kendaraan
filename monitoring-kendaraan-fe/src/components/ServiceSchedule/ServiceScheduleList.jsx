"use client"

import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../utils/axios";
import Spinner from "../Loading/SpinnerLoading";
import * as XLSX from "xlsx";


const ServiceScheduleList = () => {
  const [serviceSchedules, setServiceSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchServiceSchedules = useCallback(
    async (page) => {
      try {
        let response;
        if (searchQuery.trim() === "") {
          response = await api.get(`/api/service-schedule?page=${page}`);
          setServiceSchedules(response.data.data.data);
          setTotalPages(response.data.data.last_page);
          setLoading(false);
        } else {
          searchServiceSchedules(searchQuery, page);
        }
      } catch (error) {
        console.error("Failed to fetch service schedules", error);
        setLoading(false);
      }
    },
    [searchQuery]
  );

  const searchServiceSchedules = async (keyword, page) => {
    try {
      const response = await api.post(`/api/service-schedule/filter/${keyword}`, { page });
      setServiceSchedules(response.data.data.data);
      setTotalPages(response.data.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch service schedules", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceSchedules(currentPage);
  }, [currentPage, fetchServiceSchedules]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/service-schedule/delete/${id}`);
          Swal.fire("Deleted!", "The service schedule has been deleted.", "success");
          fetchServiceSchedules(1);
        } catch (error) {
          console.error("Failed to delete service schedule", error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the service schedule.",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = (id) => {
    router.push(`/admin/service-schedule/edit/${id}`);
  };

  const handleAdd = () => {
    router.push("/admin/service-schedule/add");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchServiceSchedules(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = async () => {
    setSearchQuery("");
    setLoading(true);
    fetchServiceSchedules(1);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  const nameExport = 'Service Schedule Data';

  const exportData = async () => {
    let keyword = searchQuery;
    let url = '/api/service-schedule/get-data/for-export';
    if (keyword !== '') {
      url += `?keyword=${keyword}`;
    }
    try {
      const res = await api.post(url);
      console.log(res.data.data.data);
      const arrData = res.data.data.data?.map((element) => ({
        'Date': element.date ? element.date : '-',
        'Service Description': element.service_description ? element.service_description : '-',
        'Transport': element.transport.name ? element.transport.name : '-',
      }));
      const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(arrData);
        XLSX.utils.book_append_sheet(workbook, worksheet, nameExport);
        XLSX.writeFile(workbook, `${nameExport}.xlsx`);
    } catch (err) {
      console.error('Export data failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Service Schedule List</h1>
        <button
          className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add Service Schedule
        </button>
      </div>
      <button
          className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 my-3 rounded "
          onClick={exportData}
        >
          Export Data
        </button>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-10/12 px-4 py-2 border rounded mr-2"
              placeholder="Search by all column..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              className={`${
                searchQuery.trim() !== "" ? "w-1/12" : "w-2/12"
              } bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded`}
              onClick={() => fetchServiceSchedules(1)}
            >
              Search
            </button>
            {searchQuery.trim() !== "" && (
              <button
                className="bg-red-600 hover:text-red-700 hover:bg-white hover:ring-red-800 hover:ring-2 focus:ring-4 focus:ring-red-200 w-1/12 text-white px-4 py-2 rounded"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
          <p className="mb-4 text-xs text-gray-600">Untuk melakukan export data periodik/data hasil filter anda bisa memasukkan keyword dengan contoh '2024-07' atau '2024-06-19'</p>
      {serviceSchedules?.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ff7400] text-white">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Service Description</th>
                <th className="border px-4 py-2">Transport</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceSchedules?.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.service_description}</td>
                  <td className="border px-4 py-2">{item.transport.name}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button
                      className="bg-yellow-500 text-white hover:text-yellow-500 hover:bg-white hover:ring-yellow-600 hover:ring-2 focus:ring-4 focus:ring-yellow-200 px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white hover:text-red-500 hover:bg-white hover:ring-red-700 hover:ring-2 focus:ring-4 focus:ring-red-200 px-2 py-1 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from(Array(totalPages).keys()).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 mx-1 border rounded ${
                  currentPage === page + 1
                    ? "bg-[#ff7400] text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceScheduleList;
