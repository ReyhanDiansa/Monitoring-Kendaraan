import FuelConsumptionForm from "../../../../../components/FuelConsumption/FuelConsumptionForm";
import React from "react";
import Layout from "../../../../../components/Layout/layout";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}admin/fuel-consumption/edit/${id}`
    ),
    title: "Edit Fuel Consumption",
    description:
      "Memungkinkan admin memperbarui data konsumsi BBM, termasuk tanggal, jumlah, dan detail lainnya. Solusi praktis untuk memastikan data penggunaan BBM tetap akurat.",
    openGraph: {
      title: "Edit Fuel Consumption | Portal Monitoring Kendaraan",
      description:
        "Memungkinkan admin memperbarui data konsumsi BBM, termasuk tanggal, jumlah, dan detail lainnya. Solusi praktis untuk memastikan data penggunaan BBM tetap akurat.",
      type: "website",
      url:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/fuel-consumption/edit/" + id,
      siteName: "Portal Monitoring Kendaraan",
    },
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_BASE_URL + "admin/fuel-consumption/edit/" + id,
    },
  };
}

const page = () => {
  return (
    <Layout>
      <FuelConsumptionForm />
    </Layout>
  );
};

export default page;
