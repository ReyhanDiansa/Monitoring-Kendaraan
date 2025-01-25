"use client"

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';
import Select from 'react-select';

const ServiceScheduleForm = () => {
    const { id } = useParams();

    const [serviceScheduleItem, setServiceScheduleItem] = useState({
        date: '',
        service_description: '',
        transport_id: null,
    });
    const [transports, setTransports] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTransports = async () => {
            try {
                const response = await api.get('/api/transport/get/name');
                setTransports(response.data.data.map(transport => ({ value: transport.id, label: transport.name })));
            } catch (error) {
                console.error('Failed to fetch transports', error);
            }
        };

        if (id) {
            const fetchServiceScheduleItem = async () => {
                try {
                    const response = await api.get(`/api/service-schedule/${id}`);
                    setServiceScheduleItem(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch service schedule item', error);
                }
            };
            fetchServiceScheduleItem();
        }

        fetchTransports();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceScheduleItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleTransportChange = (selectedOption) => {
        setServiceScheduleItem((prev) => ({ ...prev, transport_id: selectedOption ? selectedOption.value : null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...serviceScheduleItem };
            if (id) {
                await api.put(`/api/service-schedule/update/${id}`, payload);
                Swal.fire('Success', 'Service schedule updated successfully', 'success');
            } else {
                await api.post('/api/service-schedule/create', payload);
                Swal.fire('Success', 'Service schedule added successfully', 'success');
            }
            router.push('/admin/service-schedule');
        } catch (error) {
            console.error('Failed to save service schedule item', error);
            Swal.fire('Error', 'Failed to save service schedule item', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Service Schedule' : 'Add Service Schedule'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={serviceScheduleItem.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Service Description *</label>
                    <input
                        type="text"
                        name="service_description"
                        value={serviceScheduleItem.service_description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Transport *</label>
                    <Select
                        options={transports}
                        value={transports.find(transport => transport.value === serviceScheduleItem.transport_id)}
                        onChange={handleTransportChange}
                        className="w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:text-blue-500 hover:bg-white hover:ring-blue-700 hover:ring-2 focus:ring-4 focus:ring-blue-200 text-white px-4 py-2 rounded">
                    {id ? 'Update Service Schedule' : 'Add Service Schedule'}
                </button>
            </form>
        </div>
    );
};

export default ServiceScheduleForm;
