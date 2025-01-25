import Layout from '../../../components/Layout/layout'
import UsageRequestList from '../../../components/UsageRequest/UsageRequestList'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/usage-request`),
  title: "Usage Request List",
  description: "Menampilkan semua permintaan penggunaan dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau permintaan dengan cepat.",
  openGraph:{
    title: "Usage Request List | Portal Monitoring Kendaraan",
    description: "Menampilkan semua permintaan penggunaan dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau permintaan dengan cepat.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request'
  }
};

const page = () => {
  return (
    <Layout><UsageRequestList/></Layout>
  )
}

export default page