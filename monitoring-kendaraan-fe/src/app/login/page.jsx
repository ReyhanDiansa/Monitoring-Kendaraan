import React from 'react'
import Login from "../../components/Layout/Login"

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}login`),
  title: "Login",
  description: "Tempat pengguna untuk masuk dengan akun mereka dan mengakses fitur-fitur terkait manajemen kendaraan, pemakaian BBM, servis, dan permintaan penggunaan. Proses login yang aman dan mudah untuk memulai penggunaan aplikasi.",
  openGraph:{
    title: "Login | Portal Monitoring Kendaraan",
    description: "Tempat pengguna untuk masuk dengan akun mereka dan mengakses fitur-fitur terkait manajemen kendaraan, pemakaian BBM, servis, dan permintaan penggunaan. Proses login yang aman dan mudah untuk memulai penggunaan aplikasi.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'login',
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'login'
  }
};

const index = () => {
  return (
    <div><Login/></div>
  )
}

export default index;