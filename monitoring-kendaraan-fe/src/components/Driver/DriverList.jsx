"use client"

import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../utils/axios";
import Spinner from "../Loading/SpinnerLoading";
import * as XLSX from "xlsx";


const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchDrivers = useCallback(
    async (page) => {
      try {
        let response;
        if (searchQuery.trim() === "") {
          response = await api.get(`/api/driver?page=${page}`);
          setDrivers(response.data.data.data);
          setTotalPages(response.data.data.last_page);
          setLoading(false);
        } else {
          searchDrivers(searchQuery, page);
        }
      } catch (error) {
        console.error("Failed to fetch drivers", error);
        setLoading(false);
      }
    },
    [searchQuery]
  );

  const searchDrivers = async (keyword, page) => {
    try {
      const response = await api.post(`/api/driver/filter/${keyword}`, { page });
      setDrivers(response.data.data.data);
          setTotalPages(response.data.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch drivers", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers(currentPage);
  }, [currentPage, fetchDrivers]);

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
          await api.delete(`/api/driver/delete/${id}`);
          Swal.fire("Deleted!", "The driver has been deleted.", "success");
          fetchDrivers(1);
        } catch (error) {
          console.error("Failed to delete driver", error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the driver.",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = (id) => {
    router.push(`/admin/driver/edit/${id}`);
  };

  const handleAdd = () => {
    router.push("/admin/driver/add");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchDrivers(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = async () => {
    setSearchQuery("");
    setLoading(true);
    fetchDrivers(1);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }


  const nameExport = 'Driver Data';

  const exportData = async () => {
    let keyword = searchQuery;
    let url = '/api/driver/get-data/for-export';
    if (keyword !== '') {
      url += `?keyword=${keyword}`;
    }
    try {
      const res = await api.post(url);
      console.log(res.data.data.data);
      const arrData = res.data.data.data?.map((element) => ({
        'Driver Name': element.name ? element.name : '-',
        'NIP': element.nip ? element.nip : '-'
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
        <h1 className="text-2xl font-bold">Driver List</h1>
        <button
          className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded "
          onClick={handleAdd}
        >
          Add Driver
        </button>
      </div>
      <div>
      <button
          className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 my-3 rounded "
          onClick={exportData}
        >
          Export Data
        </button>
      </div>
          <div className="flex mb-4 gap-2">
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
              onClick={() => fetchDrivers(1)}
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
          <p className="mb-4 text-xs text-gray-600">Untuk melakukan export data hasil filter anda bisa memasukkan keyword dengan contoh 'alif'</p>
      {drivers?.length === 0 || !drivers ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ff7400] text-white">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">NIP</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers?.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.nip}</td>
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

export default DriverList;
