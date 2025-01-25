// pages/news/edit/[id].tsx\
import React from "react";
import UserForm from "../../../../../components/User/UserForm";
import Layout from "../../../../../components/Layout/layout";


export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/user/edit/${id}`
    ),
    title: "Edit User",
    description:
      "Memungkinkan admin memperbarui informasi pengguna yang ada, termasuk data akun, peran, atau akses. Solusi cepat untuk memastikan data pengguna tetap akurat dan terkini.",
    openGraph: {
      title: "Edit User | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin memperbarui informasi pengguna yang ada, termasuk data akun, peran, atau akses. Solusi cepat untuk memastikan data pengguna tetap akurat dan terkini.",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "admin/user/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + "admin/user/edit/" + id,
    },
  };
}

const EditUserPage = () => {
  return (
    <Layout>
      <UserForm />
    </Layout>
  );
};

export default EditUserPage;
