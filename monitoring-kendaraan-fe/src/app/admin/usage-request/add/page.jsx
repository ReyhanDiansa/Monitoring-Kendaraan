import Layout from '../../../../components/Layout/layout'
import UsageRequestForm from '../../../../components/UsageRequest/UsageRequestForm'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/usage-request/add`),
  title: "Add Usage Request",
  description: "Memungkinkan pengguna membuat permintaan baru dengan informasi seperti kendaraan yang akan digunakan, tujuan, dan tanggal pemakaian. Proses mudah untuk manajemen permintaan penggunaan.",
  openGraph:{
    title: "Add Usage Request | Portal Monitoring Kendaraan",
    description: "Memungkinkan pengguna membuat permintaan baru dengan informasi seperti kendaraan yang akan digunakan, tujuan, dan tanggal pemakaian. Proses mudah untuk manajemen permintaan penggunaan.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request/add',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-request/add'
  }
};

const page = () => {
  return (
    <Layout><UsageRequestForm/></Layout>
  )
}

export default page