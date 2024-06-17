"use client";

import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import "sweetalert2/src/sweetalert2.scss";
import api from "../../utils/axios";
import Spinner from "../Loading/SpinnerLoading";
import PelaporanPemakaianForm from "./PelaporanPemakaianModal";
import UpdateUsageStatus from "./UpdateUsageStatus";
import * as XLSX from "xlsx";
import ApproveRejectForm from "./ApproveRejectModal";


const UsageRequestList = () => {
  const [usageRequests, setUsageRequests] = useState([]);
  const [idRequest, setidRequest] = useState(0);
  const [openModalPelaporan, setOpenModalPelaporan] = useState(false);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchUsageRequests = useCallback(
    async (page) => {
      try {
        let response;
        if (searchQuery.trim() === "") {
          response = await api.post(`/api/usage-request/approver/getAll?page=${page}`);
          setUsageRequests(response.data.data.data);
          setTotalPages(response.data.data.last_page);
          setLoading(false);
        } else {
          searchUsageRequests(searchQuery, page);
        }
      } catch (error) {
        console.error("Failed to fetch usage requests", error);
        setLoading(false);
      }
    },
    [searchQuery]
  );

  const searchUsageRequests = async (keyword, page) => {
    try {
      const response = await api.post(`/api/usage-request/filter/for-approver/${keyword}`, {
        page,
      });
      setUsageRequests(response.data.data.data);
          setTotalPages(response.data.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch usage requests", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageRequests(currentPage);
  }, [currentPage, fetchUsageRequests]);

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
          await api.delete(`/api/usage-request/delete/${id}`);
          Swal.fire(
            "Deleted!",
            "The usage request has been deleted.",
            "success"
          );
          fetchUsageRequests(1);
        } catch (error) {
          console.error("Failed to delete usage request", error);
          Swal.fire(
            "Failed!",
            "There was an error deleting the usage request.",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = (id) => {
    router.push(`/admin/usage-request/edit/${id}`);
  };

  const handleDetail = (id) => {
    router.push(`/admin/usage-request/${id}`);
  };

  const handleAdd = () => {
    router.push("/admin/usage-request/add");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchUsageRequests(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReset = async () => {
    setSearchQuery("");
    setLoading(true);
    fetchUsageRequests(1);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  const handleOpenModalLaporan = (id) => {
    setidRequest(id);
    setOpenModalPelaporan(true);
  };

  const handleOpenModalStatus = (id) => {
    setidRequest(id);
    setOpenModalStatus(true);
  };

  const handleCloseModal = () => {
    setOpenModalStatus(false);
    setOpenModalPelaporan(false);
    fetchUsageRequests(currentPage);
  };

  const nameExport = 'Usage Request Data';

  const exportData = async () => {
    let keyword = searchQuery;
    let url = '/api/usage-request/get-data/for-export/for-approver';
    if (keyword !== '') {
      url += `?keyword=${keyword}`;
    }
    try {
      const res = await api.post(url);
      console.log(res.data.data.data);
      const arrData = res.data.data.data?.map((element) => ({
       'Driver Name': element.driver?.name ? element.driver?.name : '-',
        'Transport Name': element.transport?.name? element.transport?.name : '-',
        'Description': element.usage_description ?  element.usage_description : '-',
        'Start Pemakaian': element.usage_start ?  element.usage_start : '-',
        'Akhir Pemakaian': element.usage_final ?  element.usage_final : '-',
        'Status Pemakaian': element.usage_status ?  element.usage_status : '-',
        'Request Status': element.request_status ?  element.request_status : '-',
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
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Usage Request List</h1>
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
            onClick={() => fetchUsageRequests(1)}
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
        {usageRequests?.length === 0 ? (
          <p className="text-center text-gray-500">No data found</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#ff7400] text-white">
                  <th className="border px-4 py-2">Driver</th>
                  <th className="border px-4 py-2">Transport</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Start Date</th>
                  <th className="border px-4 py-2">Final Date</th>
                  <th className="border px-4 py-2">Usage Status</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usageRequests?.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.driver?.name}</td>
                    <td className="border px-4 py-2">{item.transport?.name}</td>
                    <td className="border px-4 py-2">
                      {item.usage_description}
                    </td>
                    <td className="border px-4 py-2">{item.usage_start}</td>
                    <td className="border px-4 py-2">{item.usage_final}</td>
                    <td className="border px-4 py-2">{item.usage_status}</td>
                    <td className="border px-4 py-2">{item.request_status}</td>
                    <td className="border px-4 py-2 flex flex-col gap-2 items-center justify-center">
                      <div className="flex gap-2">
                        <button
                          className={`bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white text-sm px-2 py-2 rounded mr-2 disabled:bg-[#ff73009f] disabled:hover:bg-none disabled:hover:ring-0 disabled:hover:text-white disabled:cursor-not-allowed`}
                          disabled={item?.detail[0]?.status !== 'pending'}
                          onClick={() => handleOpenModalLaporan(item.id)}
                        >
                          Approve/Reject
                        </button>
                      </div>
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
      {openModalPelaporan && (
        <ApproveRejectForm
          id={Number(idRequest)}
          closeModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default UsageRequestList;
