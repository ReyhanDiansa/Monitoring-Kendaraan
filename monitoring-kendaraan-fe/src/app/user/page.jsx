import React from 'react'
import Layout from '../../components/Layout/layout';
import HistoriesData from '../../components/Chart/HistoriesData';
import FuelConsumptionChart from '../../components/Chart/FuelConsumptionChart';
import ServiceScheduleCard from '../../components/Card/ServiceScheduleCard';
import DataToApprove from '../../components/Card/DataToApprove';

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}user`),
  title: "User Dashboard",
  description: "Menampilkan grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, informasi kendaraan yang memerlukan servis hari ini, serta data terbaru yang memerlukan persetujuan. Dilengkapi dengan daftar permintaan penggunaan kendaraan terbaru untuk disetujui, mempermudah proses verifikasi dan manajemen data.",
  openGraph:{
    title: "User Dashboard | Portal Monitoring Kendaraan",
    description: "Menampilkan grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, informasi kendaraan yang memerlukan servis hari ini, serta data terbaru yang memerlukan persetujuan. Dilengkapi dengan daftar permintaan penggunaan kendaraan terbaru untuk disetujui, mempermudah proses verifikasi dan manajemen data.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'user',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'user'
  }
};

const page = () => {
  return (
    <Layout><HistoriesData/><FuelConsumptionChart/><ServiceScheduleCard /><DataToApprove/></Layout>
  )
}

export default page;