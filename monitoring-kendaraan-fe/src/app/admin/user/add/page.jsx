import Layout from '../../../../components/Layout/layout'
import UserForm from '../../../../components/User/UserForm'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/user/add`),
  title: "Add User",
  description: "Memungkinkan admin untuk menambahkan akun pengguna baru dengan detail lengkap, seperti nama, email, peran, dan informasi lainnya. Mudah digunakan untuk mengelola akses pengguna.",
  openGraph:{
    title: "Add User | Portal Monitoring Kendaraan",
    description: "Memungkinkan admin untuk menambahkan akun pengguna baru dengan detail lengkap, seperti nama, email, peran, dan informasi lainnya. Mudah digunakan untuk mengelola akses pengguna.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/user/add',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/user/add'
  }
};

const page = () => {
  return (
    <Layout><UserForm /></Layout>
  )
}

export default page