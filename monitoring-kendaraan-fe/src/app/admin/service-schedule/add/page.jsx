import Layout from '../../../../components/Layout/layout'
import ServiceScheduleForm from '../../../../components/ServiceSchedule/ServiceScheduleForm'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/service-schedule/add`),
  title: "Add Service Schedule",
  description: "Memungkinkan admin menambahkan jadwal servis kendaraan baru dengan detail seperti tanggal, deskripsi, dan kendaraan terkait. Memudahkan pengelolaan perawatan kendaraan.",
  openGraph:{
    title: "Add Service Schedule | Portal Monitoring Kendaraan",
    description: "Memungkinkan admin menambahkan jadwal servis kendaraan baru dengan detail seperti tanggal, deskripsi, dan kendaraan terkait. Memudahkan pengelolaan perawatan kendaraan.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule/add',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule/add'
  }
};

const page = () => {
  return (
    <Layout><ServiceScheduleForm/></Layout>
  )
}

export default page