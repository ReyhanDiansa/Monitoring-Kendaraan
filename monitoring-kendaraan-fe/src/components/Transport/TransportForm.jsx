"use client"

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';

const TransportForm = () => {
    const { id } = useParams();

    const [transportItem, setTransportItem] = useState({
        name: '',
        type: 'angkutan_orang', // Default type set to 'angkutan_orang'
        ownership: 'perusahaan', // Default ownership set to 'perusahaan'
        fuel: '',
    });
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchTransportItem = async () => {
                try {
                    const response = await api.get(`/api/transport/${id}`);
                    setTransportItem(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch transport item', error);
                }
            };
            fetchTransportItem();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransportItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...transportItem };
            if (id) {
                await api.put(`/api/transport/update/${id}`, payload);
                Swal.fire('Success', 'Transport updated successfully', 'success');
            } else {
                await api.post('/api/transport/create', payload);
                Swal.fire('Success', 'Transport added successfully', 'success');
            }
            router.push('/admin/transport');
        } catch (error) {
            console.error('Failed to save transport item', error);
            Swal.fire('Error', 'Failed to save transport item', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Transport' : 'Add Transport'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={transportItem.name}
                        onChange={handleChange}
                        className="w-9/12 px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        name="type"
                        value={transportItem.type}
                        onChange={handleChange}
                        className="w-9/12 px-4 py-2 border rounded"
                        required

                    >
                        <option value="angkutan_orang">Angkutan Orang</option>
                        <option value="angkutan_barang">Angkutan Barang</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Kepemilikan</label>
                    <select
                        name="ownership"
                        value={transportItem.ownership}
                        onChange={handleChange}
                        className="w-9/12 px-4 py-2 border rounded"
                        required

                    >
                        <option value="perusahaan">Perusahaan</option>
                        <option value="sewa">Sewa</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fuel</label>
                    <input
                        type="number"
                        name="fuel"
                        value={transportItem.fuel}
                        placeholder='ex. 10.0'
                        onChange={handleChange}
                        className="w-9/12 px-4 py-2 border rounded"
                        required

                    />
                </div>
               
                <button type="submit" className="bg-blue-500 hover:text-blue-500 hover:bg-white hover:ring-blue-700 hover:ring-2 focus:ring-4 focus:ring-blue-200 text-white px-4 py-2 rounded">
                    {id ? 'Update Transport' : 'Add Transport'}
                </button>
            </form>
        </div>
    )
};

export default TransportForm;
