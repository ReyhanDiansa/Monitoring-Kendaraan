import Layout from '../../../components/Layout/layout'
import UsageHistoryList from '../../../components/UsageHistories/UsageHistoriesList'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/usage-histories`),
  title: "Usage Histories List",
  description: "Menampilkan data lengkap seperti waktu mulai dan akhir penggunaan, deskripsi, kendaraan, driver, serta jumlah awal dan akhir BBM yang digunakan. Memudahkan admin untuk memantau dan menganalisis riwayat pemakaian kendaraan secara efisien.",
  openGraph:{
    title: "Usage Histories List | Portal Monitoring Kendaraan",
    description: "Menampilkan data lengkap seperti waktu mulai dan akhir penggunaan, deskripsi, kendaraan, driver, serta jumlah awal dan akhir BBM yang digunakan. Memudahkan admin untuk memantau dan menganalisis riwayat pemakaian kendaraan secara efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-histories',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/usage-histories'
  }
};

const page = () => {
  return (
    <Layout><UsageHistoryList/></Layout>
  )
}

export default page