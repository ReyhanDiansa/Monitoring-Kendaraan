"use client"

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';
import Select from 'react-select';

const UsageRequestForm = ({ id }) => {
    const [usageRequestItem, setUsageRequestItem] = useState({
        usage_description: '',
        usage_start: '',
        usage_final: '',
        driver_id: null,
        transport_id: null,
        approvers: [],
    });
    const [drivers, setDrivers] = useState([]);
    const [transports, setTransports] = useState([]);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await api.get('/api/driver/get/name');
                setDrivers(response.data.data.map(driver => ({ value: driver.id, label: driver.name })));
            } catch (error) {
                console.error('Failed to fetch drivers', error);
            }
        };

        const fetchTransports = async () => {
            try {
                const response = await api.get('/api/transport/get/name');
                setTransports(response.data.data.map(transport => ({ value: transport.id, label: transport.name })));
            } catch (error) {
                console.error('Failed to fetch transports', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/user/get/name');
                setUsers(response.data.data.map(user => ({ value: user.id, label: user.name })));
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        const fetchUsageRequest = async () => {
            if (id) {
                try {
                    const response = await api.get(`/api/usage-request/${id}`);
                    setUsageRequestItem(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch usage request', error);
                }
            }
        };

        fetchDrivers();
        fetchTransports();
        fetchUsers();
        fetchUsageRequest();
    }, [id]);

    const handleChange = (name, value) => {
        setUsageRequestItem(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                await api.put(`/api/usage-request/update/${id}`, usageRequestItem);
                Swal.fire('Updated!', 'The usage request has been updated.', 'success');
            } else {
                await api.post('/api/usage-request/create', usageRequestItem);
                Swal.fire('Added!', 'The usage request has been added.', 'success');
            }
            router.push('/admin/usage-request');
        } catch (error) {
            console.error('Failed to save usage request', error);
            Swal.fire('Failed!', 'There was an error saving the usage request.', 'error');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Usage Request' : 'Add Usage Request'}</h1>
            <div className="mb-4">
                <label className="block mb-1">Description *</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded"
                    value={usageRequestItem.usage_description}
                    onChange={(e) => handleChange('usage_description', e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Waktu Mulai Pemakaian *</label>
                <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded"
                    value={usageRequestItem.usage_start}
                    onChange={(e) => handleChange('usage_start', e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Waktu Selesai Pemakaian *</label>
                <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border rounded"
                    value={usageRequestItem.usage_final}
                    onChange={(e) => handleChange('usage_final', e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Driver *</label>
                <Select
                    options={drivers}
                    value={drivers.find(driver => driver.value === usageRequestItem.driver_id)}
                    onChange={(selectedOption) => handleChange('driver_id', selectedOption ? selectedOption.value : null)}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Transport *</label>
                <Select
                    options={transports}
                    value={transports.find(transport => transport.value === usageRequestItem.transport_id)}
                    onChange={(selectedOption) => handleChange('transport_id', selectedOption ? selectedOption.value : null)}
                />
            </div>
            {!id && 
            <div className="mb-4">
                <label className="block mb-1">Approver *</label>
                <Select
                    options={users}
                    value={users.filter(user => usageRequestItem.approvers?.includes(user.value))}
                    onChange={(selectedOptions) => handleChange('approvers', selectedOptions ? selectedOptions.map(option => option.value) : [])}
                    isMulti
                />
                <p className='text-xs text-gray-400'>Min. 2 Approver</p>
                <p className='text-xs text-gray-400'>The first order is those that must be approved first
                </p>
            </div>
            }
            <button
                type="submit"
                className="bg-[#ff7400] hover:text-[#ff7400] hover:bg-white hover:ring-[#ff7400] hover:ring-2 focus:ring-4 focus:ring-[#ff7400] text-white px-4 py-2 rounded"
            >
                {id ? 'Update' : 'Add'} Usage Request
            </button>
        </form>
    );
};

export default UsageRequestForm;
