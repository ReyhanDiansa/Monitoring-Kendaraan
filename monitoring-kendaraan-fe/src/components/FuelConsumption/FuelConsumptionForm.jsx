"use client"

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';
import Select from 'react-select';

const FuelConsumptionForm = ({ id }) => {
    const [fuelConsumptionItem, setFuelConsumptionItem] = useState({
        date: '',
        final_amount: '',
        start_amount: '',
    });
    const router = useRouter();

    useEffect(() => {

        if (id) {
            const fetchFuelConsumptionItem = async () => {
                try {
                    const response = await api.get(`/api/fuel-consumption/${id}`);
                    setFuelConsumptionItem(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch fuel consumption item', error);
                }
            };
            fetchFuelConsumptionItem();
        }
    }, [id]);

    const handleChange = (name, selectedOption) => {
        setFuelConsumptionItem((prev) => ({ ...prev, [name]: selectedOption }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...fuelConsumptionItem };
            if (id) {
                await api.put(`/api/fuel-consumption/update/${id}`, payload);
                Swal.fire('Success', 'Fuel consumption record updated successfully', 'success');
            } else {
                await api.post('/api/fuel-consumption/create', payload);
                Swal.fire('Success', 'Fuel consumption record added successfully', 'success');
            }
            router.push('/admin/fuel-consumption');
        } catch (error) {
            console.error('Failed to save fuel consumption record', error);
            Swal.fire('Error', 'Failed to save fuel consumption record', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Fuel Consumption' : 'Add Fuel Consumption'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Date and Time</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={fuelConsumptionItem.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Final Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="final_amount"
                        value={fuelConsumptionItem.final_amount}
                        onChange={(e) => handleChange('final_amount', e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Start Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="start_amount"
                        value={fuelConsumptionItem.start_amount}
                        onChange={(e) => handleChange('start_amount', e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:text-blue-500 hover:bg-white hover:ring-blue-700 hover:ring-2 focus:ring-4 focus:ring-blue-200 text-white px-4 py-2 rounded">
                    {id ? 'Update Fuel Consumption' : 'Add Fuel Consumption'}
                </button>
            </form>
        </div>
    );
};

export default FuelConsumptionForm;
