// pages/news/edit/[id].tsx\
"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import TransportForm from '../../../../../components/Transport/TransportForm';
import Layout from '../../../../../components/Layout/layout';

const EditTransportPage = () => {
    const { id } = useParams();

    return <Layout>
        <TransportForm id={Number(id)} />
        </Layout>
};

export default EditTransportPage;
