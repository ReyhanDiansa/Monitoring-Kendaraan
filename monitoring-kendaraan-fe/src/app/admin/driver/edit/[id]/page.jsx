// pages/news/edit/[id].tsx\
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import DriverForm from '../../../../../components/Driver/DriverForm';
import Layout from '../../../../../components/Layout/layout';

const EditDriverPage = () => {
    const { id } = useParams();

    return <Layout><DriverForm id={Number(id)} /></Layout>;
};

export default EditDriverPage;
