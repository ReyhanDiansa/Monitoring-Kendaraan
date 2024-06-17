import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const router = useRouter()
  return (
    <header className="bg-white border-b-2 flex justify-between gap-16 text-center md:gap-0 items-center z-20 w-full">
      <div className="flex gap-5 mx-2 items-center">
        <button onClick={toggleSidebar} className="text-2xl text-orange-700">
          ☰
        </button>
        <div className="flex gap-2 items-center">
        <Image src={"/assets/images/logo.png"} width={40} height={40} alt="logo SMK Telkom Malang" onClick={()=>router.push("/admin")}
            className="cursor-pointer"/>
        <p className="text-2xl text-orange-700">PT NIKEL JAYA</p>
        </div>
      </div>
      <div className="text-md md:text-xl font-semibold text-orange-700">Portal Monitoring Kendaraan</div>
    </header>
  );
};

export default Header;