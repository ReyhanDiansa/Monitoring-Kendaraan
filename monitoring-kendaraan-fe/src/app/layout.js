import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase:new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "Portal Monitoring Kendaraan",
    template:"%s | Portal Monitoring Kendaraan"
  },
  description: "Portal Monitoring Kendaraan yang dilengkapi dengan fitur lengkap, termasuk grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, informasi kendaraan yang memerlukan servis hari ini, serta notifikasi data yang perlu disetujui. Tersedia fitur CRUD untuk driver, pengguna, transportasi, konsumsi BBM, jadwal servis, permintaan penggunaan, dan riwayat penggunaan. Mendukung ekspor data ke Excel langsung dari antarmuka pengguna. Ideal untuk manajemen kendaraan yang efisien dan modern.",
  favicon:"/favicon.ico",
  keywords: ['Next.js', 'React', 'JavaScript', 'Portfolio', 'Laravel', 'Nextjs', 'Reyhan', 'Reyhan Diansa', 'Reyhan Marsalino Diansa', 'Portal', 'Monitoring', 'Kendaraan', 'Monitoring Kendaraan'],
  creator: 'Reyhan Marsalino Diansa',
  publisher: 'Reyhan Marsalino Diansa',
  openGraph:{
    title: "Portal Monitoring Kendaraan",
    description: "Portal Monitoring Kendaraan yang dilengkapi dengan fitur lengkap, termasuk grafik pemakaian kendaraan dan BBM per tanggal dan per bulan, informasi kendaraan yang memerlukan servis hari ini, serta notifikasi data yang perlu disetujui. Tersedia fitur CRUD untuk driver, pengguna, transportasi, konsumsi BBM, jadwal servis, permintaan penggunaan, dan riwayat penggunaan. Mendukung ekspor data ke Excel langsung dari antarmuka pengguna. Ideal untuk manajemen kendaraan yang efisien dan modern.",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL,
    siteName:"Portal Monitoring Kendaraan"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
