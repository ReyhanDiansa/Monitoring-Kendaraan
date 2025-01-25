import Layout from '../../../components/Layout/layout'
import TransportList from '../../../components/Transport/TransportList'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/transport`),
  title: "Transportation List",
  description: "Menampilkan seluruh data kendaraan dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menghapus data kendaraan dengan cepat dan efisien.",
  openGraph:{
    title: "Transportation List | Portal Monitoring Kendaraan",
    description: "Menampilkan seluruh data kendaraan dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menghapus data kendaraan dengan cepat dan efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/transport',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/transport'
  }
};

const page = () => {
  return (
    <Layout><TransportList/></Layout>
  )
}

export default page