import React from "react";
import ServiceScheduleForm from "../../../../../components/ServiceSchedule/ServiceScheduleForm";
import Layout from "../../../../../components/Layout/layout";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/service-schedule/edit/${id}`
    ),
    title: "Edit Service Schedule",
    description:
      "Memungkinkan admin memperbarui informasi jadwal servis kendaraan, termasuk tanggal, deskripsi, atau detail lainya. Dirancang untuk memastikan jadwal servis tetap sesuai kebutuhan.",
    openGraph: {
      title: "Edit Service Schedule | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin memperbarui informasi jadwal servis kendaraan, termasuk tanggal, deskripsi, atau detail lainya. Dirancang untuk memastikan jadwal servis tetap sesuai kebutuhan.",
      type: "website",
      url:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/service-schedule/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/service-schedule/edit/" + id,
    },
  };
}

const page = () => {
  return (
    <Layout>
      <ServiceScheduleForm />
    </Layout>
  );
};

export default page;
