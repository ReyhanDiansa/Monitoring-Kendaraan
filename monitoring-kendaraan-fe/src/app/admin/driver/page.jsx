import DriverList from '../../../components/Driver/DriverList'
import React from 'react'
import Layout from '../../../components/Layout/layout'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/driver`),
  title: "Driver List",
  description: "Menampilkan semua data driver dengan opsi pencarian, filter, dan pengelolaan. Memudahkan admin untuk melihat, mengedit, atau menghapus data driver secara terorganisir.",
  openGraph:{
    title: "Driver List | Portal Monitoring Kendaraan",
    description: "Menampilkan semua data driver dengan opsi pencarian, filter, dan pengelolaan. Memudahkan admin untuk melihat, mengedit, atau menghapus data driver secara terorganisir.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/driver',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/driver'
  }
};

const page = () => {
  return (
    <Layout><DriverList/></Layout>
  )
}

export default page