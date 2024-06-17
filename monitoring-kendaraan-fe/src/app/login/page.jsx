import React from 'react'
import Login from "../../components/Layout/Login"
import Head from "next/head"
// import withAuth from '@/utils/withAuth'

const index = () => {
  return (
    <>
    <Head>
    <title>Portal Kedisiplinan Siswa | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={""} />
        <meta property="og:title" content={"Portal Kedisiplinan Siswa | Admin"} />

        <meta property="og:image" content={"/images/Navbar/Logo2.png"} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <link rel="icon" type="image/png" href="/images/Navbar/Logo2.png"/>
    </Head>
    <div><Login/></div>
    </>
  )
}

export default index;