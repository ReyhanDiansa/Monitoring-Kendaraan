"use client"

import { useParams } from 'next/navigation';
import React from 'react'
import ServiceScheduleForm from '../../../../../components/ServiceSchedule/ServiceScheduleForm';
import Layout from '../../../../../components/Layout/layout';

const page = () => {
    const { id } = useParams();

    return <Layout><ServiceScheduleForm id={Number(id)} /></Layout>
}

export default page