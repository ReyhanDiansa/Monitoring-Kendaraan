"use client"

import React from 'react'
import LoginForm from "../LoginForm/loginForm"
import withAuth from "../../utils/withAuth"

const loginLayout = () => {
  return (
    <div className="bg-[#F5F7F8] w-screen h-screen">
       <div className="h-full">    
        <LoginForm/>
       </div>
    </div>
  )
}

export default withAuth(loginLayout);