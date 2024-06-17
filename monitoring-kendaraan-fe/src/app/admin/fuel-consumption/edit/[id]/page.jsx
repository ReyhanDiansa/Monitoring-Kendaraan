"use client"

import { useParams } from 'next/navigation';
import FuelConsumptionForm from '../../../../../components/FuelConsumption/FuelConsumptionForm';
import React from 'react'

const page = () => {
    const { id } = useParams();

    return <FuelConsumptionForm id={Number(id)} />;
}

export default page