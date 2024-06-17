"use client"

import { useParams } from 'next/navigation';
import React from 'react'
import UsageRequestForm from '../../../../../components/UsageRequest/UsageRequestForm';
import Layout from '../../../../../components/Layout/layout';

const page = () => {
    const { id } = useParams();

    return <Layout><UsageRequestForm id={Number(id)} /></Layout>
}

export default page