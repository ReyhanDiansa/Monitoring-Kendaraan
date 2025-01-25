import Layout from '../../../../components/Layout/layout'
import TransportForm from '../../../../components/Transport/TransportForm'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/transport/add`),
  title: "Add Transportation",
  description: "Memungkinkan admin menambahkan data kendaraan baru, termasuk informasi seperti nama, tipe kendaraan, dan detail lainnya. Proses sederhana untuk memperbarui database transportasi.",
  openGraph:{
    title: "Add Transportation | Portal Monitoring Kendaraan",
    description: "Memungkinkan admin menambahkan data kendaraan baru, termasuk informasi seperti nama, tipe kendaraan, dan detail lainnya. Proses sederhana untuk memperbarui database transportasi.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/transportation/add',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/transportation/add'
  }
};

const page = () => {
  return (
    <Layout><TransportForm /></Layout>
  )
}

export default page