import React from 'react'
import Layout from '../../../components/Layout/layout'
import UserUsageRequest from "../../../components/UsageRequest/UserUsageRequest"

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}user/usage-request`),
  title: "Usage Request List",
  description: "Menampilkan semua permintaan penggunaan yang perlu disetujui, dengan opsi untuk mengubah status pemakaian. Mempermudah approver untuk memantau, menyetujui, atau menolak permintaan penggunaan kendaraan secara efisien.",
  openGraph:{
    title: "Usage Request List | Portal Monitoring Kendaraan",
    description: "Menampilkan semua permintaan penggunaan yang perlu disetujui, dengan opsi untuk mengubah status pemakaian. Mempermudah approver untuk memantau, menyetujui, atau menolak permintaan penggunaan kendaraan secara efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'user/usage-request',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'user/usage-request'
  }
};

const page = () => {
  return (
    <Layout><UserUsageRequest /></Layout>
  )
}

export default page