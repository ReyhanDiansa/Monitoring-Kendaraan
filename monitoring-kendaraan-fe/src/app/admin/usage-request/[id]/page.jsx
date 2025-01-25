import Layout from "../../../../components/Layout/layout";
import UsageRequestDetail from "../../../../components/UsageRequest/UsageRequestDetail";
import React from "react";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/usage-request/${id}`
    ),
    title: "Usage Request Detail",
    description:
      "Menampilkan informasi lengkap permintaan penggunaan, termasuk status pemakaian dan pelaporan jumlah BBM setelah digunakan. Admin dapat mengubah status permintaan langsung dari halaman ini.",
    openGraph: {
      title: "Usage Request Detail | Portal Monitoring Kendaraan",
      description:
        "Menampilkan informasi lengkap permintaan penggunaan, termasuk status pemakaian dan pelaporan jumlah BBM setelah digunakan. Admin dapat mengubah status permintaan langsung dari halaman ini.",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "admin/usage-request/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/usage-request/" + id,
    },
  };
}

const page = () => {
  return (
    <Layout>
      <UsageRequestDetail />
    </Layout>
  );
};

export default page;
