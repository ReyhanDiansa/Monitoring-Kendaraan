"use client"

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';

const PelaporanPemakaianModal = ({id, closeModal}) => {
    const [finalAmount, setFinalAmount] = useState('');
    const router = useRouter();


    const handleModalClose = () => {
        setFinalAmount('');
        closeModal();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!finalAmount) {
            Swal.fire('Validation Error', 'You need to enter a final amount', 'error');
            return;
        }
        try {
            await api.post(`/api/usage-histories/create/laporan-pemakaian/${id}`, { final_amount: finalAmount });
            Swal.fire('Added!', 'The report has been added.', 'success');
            router.push('/admin/usage-histories');
            handleModalClose();
        } catch (error) {
            console.error('Failed to save report', error);
            Swal.fire('Failed!', 'There was an error saving the report.', 'error');
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Masukkan Laporan</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Jumlah BBM Setelah Digunakan</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder='ex. 8.50'
                                    value={finalAmount}
                                    onChange={(e) => setFinalAmount(e.target.value)}
                                />
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
    );
};

export default PelaporanPemakaianModal;