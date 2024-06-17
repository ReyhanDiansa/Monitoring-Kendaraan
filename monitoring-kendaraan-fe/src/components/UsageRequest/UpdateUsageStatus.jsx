"use client"

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';

const UpdateUsageStatusForm = ({ id, closeModal }) => {
    const [usageStatus, setUsageStatus] = useState('');
    const router = useRouter();


    const handleModalClose = () => {
        setUsageStatus('');
        closeModal();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!usageStatus) {
            Swal.fire('Validation Error', 'You need to select a usage status', 'error');
            return;
        }
        try {
            await api.put(`/api/usage-request/update/usage-status/${id}`, { usage_status: usageStatus });
            Swal.fire('Updated!', 'The usage status has been updated.', 'success');
            router.push('/admin/usage-request');
            handleModalClose();
        } catch (error) {
            console.error('Failed to update usage status', error);
            Swal.fire('Failed!', 'There was an error updating the usage status.', 'error');
        }
    };

    return (
        <div>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Usage Status</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Usage Status</label>
                                <select
                                    className="w-full px-4 py-2 border rounded"
                                    value={usageStatus}
                                    onChange={(e) => setUsageStatus(e.target.value)}
                                >
                                    <option value="" disabled>Select status</option>
                                    <option value="sudah_digunakan">Sudah Digunakan</option>
                                    <option value="belum_digunakan">Belum Digunakan</option>
                                    <option value="sedang_digunakan">Sedang Digunakan</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#ff7400] hover:bg-white hover:text-[#ff7400] hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    );
};

export default UpdateUsageStatusForm;
