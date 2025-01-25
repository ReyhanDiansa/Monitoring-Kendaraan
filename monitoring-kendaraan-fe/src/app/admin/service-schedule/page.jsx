import Layout from '../../../components/Layout/layout'
import ServiceScheduleList from '../../../components/ServiceSchedule/ServiceScheduleList'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/service-schedule`),
  title: "Service Schedule List",
  description: "Menampilkan semua jadwal servis kendaraan dengan fitur pencarian, filter, dan pengelolaan. Mempermudah admin untuk memantau, mengedit, atau menghapus jadwal servis secara efisien.",
  openGraph:{
    title: "Service Schedule List | Portal Monitoring Kendaraan",
    description: "Menampilkan semua jadwal servis kendaraan dengan fitur pencarian, filter, dan pengelolaan. Mempermudah admin untuk memantau, mengedit, atau menghapus jadwal servis secara efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/service-schedule'
  }
};

const page = () => {
  return (
    <Layout><ServiceScheduleList/></Layout>
  )
}

export default page