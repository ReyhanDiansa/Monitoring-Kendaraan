import React from "react";
import UsageRequestForm from "../../../../../components/UsageRequest/UsageRequestForm";
import Layout from "../../../../../components/Layout/layout";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/usage-request/edit/${id}`
    ),
    title: "Edit Usage Request",
    description:
      "Memungkinkan admin atau pengguna memperbarui informasi permintaan, seperti kendaraan yang digunakan, tujuan, tanggal pemakaian, atau detail lainnya. Dirancang untuk mempermudah penyesuaian data permintaan.",
    openGraph: {
      title: "Edit Usage Request | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin atau pengguna memperbarui informasi permintaan, seperti kendaraan yang digunakan, tujuan, tanggal pemakaian, atau detail lainnya. Dirancang untuk mempermudah penyesuaian data permintaan.",
      type: "website",
      url:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/usage-request/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/usage-request/edit/" + id,
    },
  };
}

const page = () => {
  return (
    <Layout>
      <UsageRequestForm />
    </Layout>
  );
};

export default page;
