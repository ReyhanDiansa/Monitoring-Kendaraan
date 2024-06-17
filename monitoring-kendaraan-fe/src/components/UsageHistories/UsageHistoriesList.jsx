"use client"

import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../utils/axios";
import Spinner from "../Loading/SpinnerLoading";
import * as XLSX from "xlsx";


const UsageHistoryList = () => {
  const [usageHistories, setUsageHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchUsageHistories = useCallback(
    async (page) => {
      try {
        let response;
        if (searchQuery.trim() === "") {
          response = await api.get(`/api/usage-histories?page=${page}`);
          setUsageHistories(response.data.data.data);
          setTotalPages(response.data.data.last_page);
          setLoading(false);
        } else {
          searchUsageHistories(searchQuery, page);
        }
      } catch (error) {
        console.error("Failed to fetch usage histories", error);
        setLoading(false);
      }
    },
    [searchQuery]
  );

  const searchUsageHistories = async (keyword, page) => {
    try {
      const response = await api.post(`/api/usage-histories/filter/${keyword}`, { page });
      setUsageHistories(response.data.data.data);
          setTotalPages(response.data.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch usage histories", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageHistories(currentPage);
  }, [currentPage, fetchUsageHistories]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchUsageHistories(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = async () => {
    setSearchQuery("");
    setLoading(true);
    fetchUsageHistories(1);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  const nameExport = 'Usage History Data';

  const exportData = async () => {
    let keyword = searchQuery;
    let url = '/api/usage-histories/get-data/for-export';
    if (keyword !== '') {
      url += `?keyword=${keyword}`;
    }
    try {
      const res = await api.post(url);
      console.log(res.data.data.data);
      const arrData = res.data.data.data?.map((element) => ({
        'Driver Name': element.usage_request.driver?.name ? element.usage_request.driver?.name : '-',
        'Transport Name': element.usage_request.transport?.name ? element.usage_request.transport?.name : '-',
        'Description': element.usage_request.usage_description ?  element.usage_request.usage_description : '-',
        'Start Pemakaian': element.usage_request.usage_start ?  element.usage_request.usage_start : '-',
        'Akhir Pemakaian': element.usage_request.usage_final ?  element.usage_request.usage_final : '-',
        'Status Pemakaian': element.usage_request.usage_status ?  element.usage_request.usage_status : '-',
        'Request Status': element.usage_request.request_status ?  element.usage_request.request_status : '-',
        'Jumlah Awal BBM': element.fuel.start_amount ?  element.fuel.start_amount : '-',
        'Jumlah Akhir BBM': element.fuel.final_amount ?  element.fuel.final_amount : '-',
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
        <h1 className="text-2xl font-bold">Usage History List</h1>
        <div
          class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-100 dark:text-blue-400"
          role="alert"
        >
          <p className="font-bold">Penambahan data Histori hanya bisa dilakukan saat pelaporan setelah pemakaian Kendaraan</p>
        </div>
      </div>
      <button
          className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 my-3 rounded "
          onClick={exportData}
        >
          Export Data
        </button>
      {usageHistories?.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <>
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
              onClick={() => fetchUsageHistories(1)}
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ff7400] text-white">
                <th className="border px-4 py-2">Usage Start</th>
                <th className="border px-4 py-2">Usage Final</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Transport</th>
                <th className="border px-4 py-2">Driver</th>
                <th className="border px-4 py-2">Start Amount</th>
                <th className="border px-4 py-2">Final Amount</th>
              </tr>
            </thead>
            <tbody>
              {usageHistories?.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.usage_request.usage_start}</td>
                  <td className="border px-4 py-2">{item.usage_request.usage_final}</td>
                  <td className="border px-4 py-2">{item.usage_request.usage_description}</td>
                  <td className="border px-4 py-2">{item.usage_request.transport.name}</td>
                  <td className="border px-4 py-2">{item.usage_request.driver.name}</td>
                  <td className="border px-4 py-2">{item.fuel.start_amount}</td>
                  <td className="border px-4 py-2">{item.fuel.final_amount}</td>
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

export default UsageHistoryList;
