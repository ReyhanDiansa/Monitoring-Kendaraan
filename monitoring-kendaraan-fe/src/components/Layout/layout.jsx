"use client"

import React, { useState } from 'react';
import Sidebar from '../Sidebar/sidebar'; // Impor Sidebar komponen
import Header from '../Header/header'; // Impor Header komponen
import Head from 'next/head';
import withAuth from '../../utils/withAuth';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    <Head>
    <title>Portal Kedisiplinan Siswa | Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={""} />
        <meta property="og:title" content={"Portal Kedisiplinan Siswa | Admin"} />

        <meta property="og:image" content={"/images/Navbar/Logo2.png"} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <link rel="icon" type="image/png" href="/images/Navbar/Logo2.png"/>
    </Head>
    <div className="bg-[#F5F7F8]">
      <div className="sticky top-0 z-20 w-full flex center h-[5rem]">
        <Header toggleSidebar={toggleSidebar}/>
      </div>
      <div className="flex min-h-screen ">
        <div
          className={`z-10 ${
            sidebarOpen ? 'h-screen lg:w-[20%]' : 'h-fit lg:h-screen'
          }  fixed pb-[5rem]`}
        >
        <div className={`${sidebarOpen?'w-full h-full':''}`}>
            <Sidebar isOpen={sidebarOpen}/>
          </div>
        </div>
        <div className={`${sidebarOpen ? "ml-0 md:max-w-[80%] md:ml-[20%]" : "ml-0"} w-full p-3 mt-5 md:mt-16 lg:mt-0 z-1 `}>
          {children}
        </div>
      </div>
    </div>
    </>
  );
};

export default withAuth(Layout);