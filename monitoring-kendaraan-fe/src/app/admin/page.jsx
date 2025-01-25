import React from 'react'
import Layout from '../../components/Layout/layout';
import HistoriesData from '../../components/Chart/HistoriesData';
import FuelConsumptionChart from '../../components/Chart/FuelConsumptionChart';
import ServiceScheduleCard from '../../components/Card/ServiceScheduleCard';

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin`),
  title: "Admin Dashboard",
  description: "Dashboard Admin Portal Monitoring Kendaraan memberikan ringkasan lengkap, termasuk grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, dan daftar kendaraan yang memerlukan servis hari ini.",
  openGraph:{
    title: "Admin Dashboard | Portal Monitoring Kendaraan",
    description: "Dashboard Admin Portal Monitoring Kendaraan memberikan ringkasan lengkap, termasuk grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, dan daftar kendaraan yang memerlukan servis hari ini.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin'
  }
};

const page = () => {
  return (
    <Layout><HistoriesData/><FuelConsumptionChart/><ServiceScheduleCard /></Layout>
  )
}

export default page;