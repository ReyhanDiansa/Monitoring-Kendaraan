import React from "react";
import DriverForm from "../../../../../components/Driver/DriverForm";
import Layout from "../../../../../components/Layout/layout";


export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/driver/edit/${id}`
    ),
    title: "Edit Driver",
    description:
      "Memungkinkan admin memperbarui atau mengubah informasi driver yang sudah ada, seperti nama, kontak, atau data lain yang relevan. Didesain untuk mempermudah pengelolaan data driver secara efisien.",
    openGraph: {
      title: "Edit Driver | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin memperbarui atau mengubah informasi driver yang sudah ada, seperti nama, kontak, atau data lain yang relevan. Didesain untuk mempermudah pengelolaan data driver secara efisien.",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "admin/driver/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + "admin/driver/edit/" + id,
    },
  };
}

const EditDriverPage = () => {
  return (
    <Layout>
      <DriverForm />
    </Layout>
  );
};

export default EditDriverPage;
