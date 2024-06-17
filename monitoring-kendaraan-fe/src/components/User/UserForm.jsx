"use client"

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import 'sweetalert2/src/sweetalert2.scss';
import api from '../../utils/axios';

const UserForm = ({ id }) => {
    const [userItem, setUserItem] = useState({
        name: '',
        role: 'user', // Default role set to 'user'
        email: '',
        password: '',
    });
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchUserItem = async () => {
                try {
                    const response = await api.get(`/api/user/${id}`);
                    setUserItem(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch user item', error);
                }
            };
            fetchUserItem();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...userItem };
            console.log(payload);
            if (id) {
                await api.put(`/api/user/update/${id}`, payload); // Assuming endpoint for update is `/users/update/${id}`
                Swal.fire('Success', 'User updated successfully', 'success');
            } else {
                await api.post('/api/user/create', payload);
                Swal.fire('Success', 'User added successfully', 'success');
            }
            router.push('/admin/user');
        } catch (error) {
            console.error('Failed to save user item', error);
            Swal.fire('Error', 'Failed to save user item', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Add User'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userItem.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userItem.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        name="role"
                        value={userItem.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className='flex gap-3 items-center my-2'>
                {id && (
                    <div className="">
                        <button
                            type="button"
                            onClick={() => setShowPasswordFields(!showPasswordFields)}
                            className="bg-black hover:text-black hover:bg-white hover:ring-slate-800 hover:ring-2 focus:ring-4 focus:ring-slate-500  text-white px-4 py-2 rounded"
                        >
                            {showPasswordFields ? 'Cancel Password Update' : 'Update Password'}
                        </button>
                    </div>
                )}
                {(!id || showPasswordFields) && (
                    <div className="">
                        <input
                            type="password"
                            name="password"
                            value={userItem.password || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            placeholder={`${!id ? 'your password':'your new password'}`}
                        />
                    <p className='text-xs text-gray-400'>Min. 6 length</p>
                    </div>
                )}
                </div>
                <button type="submit" className="my-3 bg-blue-500 hover:text-blue-500 hover:bg-white hover:ring-blue-700 hover:ring-2 focus:ring-4 focus:ring-blue-200 text-white px-4 py-2 rounded">
                    {id ? 'Update User' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
