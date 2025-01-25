import Layout from '../../../components/Layout/layout'
import UserList from '../../../components/User/UserList'
import React from 'react'

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}admin/user`),
  title: "User List",
  description: "Menampilkan semua akun pengguna dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menghapus data pengguna dengan efisien.",
  openGraph:{
    title: "User List | Portal Monitoring Kendaraan",
    description: "Menampilkan semua akun pengguna dengan fitur pencarian, filter, dan pengelolaan. Memudahkan admin untuk memantau, mengedit, atau menghapus data pengguna dengan efisien.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'admin/user',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'admin/user'
  }
};

const page = () => {
  return (
    <Layout><UserList/></Layout>
  )
}

export default page