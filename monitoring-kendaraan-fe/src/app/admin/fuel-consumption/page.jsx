
import FuelConsumptionList from '../../../components/FuelConsumption/FuelConsumptionList'
import React from 'react'
import Layout from '../../../components/Layout/layout'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/fuel-consumption`),
  title: "Fuel Consumption List",
  description: "Menampilkan seluruh data konsumsi BBM dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menganalisis penggunaan BBM secara efisien.",
  openGraph:{
    title: "Fuel Consumption List | Portal Monitoring Kendaraan",
    description: "Menampilkan seluruh data konsumsi BBM dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menganalisis penggunaan BBM secara efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/fuel-consumption',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/fuel-consumption'
  }
};

const page = () => {
  return (
    <Layout><FuelConsumptionList/></Layout>
  )
}

export default page