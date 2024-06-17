"use client";

import React, { useEffect, useState, useCallback } from "react";
import api from "../../utils/axios";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Spinner from "../../components/Loading/SpinnerLoading";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PelaporanPemakaianForm from "./PelaporanPemakaianModal";
import UpdateUsageStatus from "./UpdateUsageStatus";

const UsageRequestDetail = () => {
  const [usageRequest, setUsageRequest] = useState({});
  const [openModalPelaporan, setOpenModalPelaporan] = useState(false);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchUsageRequest = useCallback(async () => {
    try {
      const response = await api.get(`/api/usage-request/${id}`);
      setUsageRequest(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch usage request details", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUsageRequest();
  }, [fetchUsageRequest]);

  const handleChange = (field, value) => {
    setUsageRequest((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/api/usage-request/${id}`, usageRequest);
      Swal.fire("Success!", "Usage request updated successfully.", "success");
      router.push("/dashboard/usage-request");
    } catch (error) {
      console.error("Failed to update usage request", error);
      Swal.fire(
        "Failed!",
        "There was an error updating the usage request.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  if (!usageRequest) {
    return (
      <div className="w-full flex justify-center my-5">
        Usage request not found
      </div>
    );
  }

  const handleOpenModalLaporan = () => {
    setOpenModalPelaporan(true);
  };

  const handleOpenModalStatus = () => {
    setOpenModalStatus(true);
  };

  const handleCloseModal = () => {
    setOpenModalStatus(false);
    setOpenModalPelaporan(false);
    fetchUsageRequest();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Usage Request Details</h1>
        <div className="flex gap-2">
          <button
            className={`bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded my-3 disabled:bg-[#ff73009f] disabled:hover:bg-none disabled:hover:ring-0 disabled:hover:text-white disabled:cursor-not-allowed`}
            disabled={usageRequest?.history?.length > 0}
            onClick={handleOpenModalLaporan}
          >
            Laporkan Pemakaian
          </button>
          <button
            className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded my-3"
            onClick={handleOpenModalStatus}
          >
            Ubah Status Pemakaian
          </button>
        </div>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">Description:</strong>
                <span className="ml-2 bg-orange-100 p-2 rounded-lg font-semibold">
                  {usageRequest.usage_description}
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">Start:</strong>
                <span className="ml-2 bg-orange-100 p-2 rounded-lg font-semibold">
                  {usageRequest.usage_start}
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">End:</strong>
                <span className="ml-2 bg-orange-100 p-2 rounded-lg font-semibold">
                  {usageRequest.usage_final}
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">Driver:</strong>
                <span className="ml-2 bg-orange-100 p-2 rounded-lg font-semibold">
                  {usageRequest?.driver?.name}
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">Transport:</strong>
                <span className="ml-2 bg-orange-100 p-2 rounded-lg font-semibold">
                  {usageRequest?.transport?.name}
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="my-2">
                <strong className="text-orange-600">Approver</strong>
                {usageRequest.detail?.map((item) => (
                  <div className=" bg-orange-100 p-2 rounded-lg my-2 font-semibold">
                    <p> name : {item.approver?.name}</p>
                    <p> Status : {item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalPelaporan && (
        <PelaporanPemakaianForm id={Number(id)} closeModal={handleCloseModal} />
      )}
      {openModalStatus && (
        <UpdateUsageStatus id={Number(id)} closeModal={handleCloseModal} />
      )}
    </>
  );
};

export default UsageRequestDetail;
