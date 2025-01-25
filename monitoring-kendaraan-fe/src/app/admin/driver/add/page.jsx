import DriverForm from '../../../../components/Driver/DriverForm'
import React from 'react'
import Layout from '../../../../components/Layout/layout'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/driver/add`),
  title: "Add Driver",
  description: "Memungkinkan admin untuk menambahkan data driver baru dengan informasi lengkap seperti nama, dan detail lainnya. Proses mudah dan cepat untuk memperbarui database pengelolaan kendaraan.",
  openGraph:{
    title: "Add Driver | Portal Monitoring Kendaraan",
    description: "Memungkinkan admin untuk menambahkan data driver baru dengan informasi lengkap seperti nama, dan detail lainnya. Proses mudah dan cepat untuk memperbarui database pengelolaan kendaraan.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/driver/add',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/driver/add'
  }
};

const page = () => {
  return (
   <Layout><DriverForm/></Layout>
  )
}

export default page