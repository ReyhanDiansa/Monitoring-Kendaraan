// pages/news/edit/[id].tsx\
import React from "react";
import TransportForm from "../../../../../components/Transport/TransportForm";
import Layout from "../../../../../components/Layout/layout";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/transport/edit/${id}`
    ),
    title: "Edit Transportation",
    description:
      "Memungkinkan admin memperbarui atau mengubah informasi kendaraan yang sudah ada, seperti nama, tipe, atau detail lainnya. Dirancang untuk mempermudah pengelolaan data kendaraan.",
    openGraph: {
      title: "Edit Transportation | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin memperbarui atau mengubah informasi kendaraan yang sudah ada, seperti nama, tipe, atau detail lainnya. Dirancang untuk mempermudah pengelolaan data kendaraan.",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "admin/transport/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/transport/edit/" + id,
    },
  };
}

const EditTransportPage = () => {
  return (
    <Layout>
      <TransportForm />
    </Layout>
  );
};

export default EditTransportPage;
