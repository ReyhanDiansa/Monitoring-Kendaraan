"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { UserLogin } from "../../utils/UserLogin";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { useRouter } from "next/navigation";
import { CiWarning, CiCircleCheck } from "react-icons/ci";
import api from "../../utils/axios";
import axios from "axios";
import { getTokenCookie } from "../../utils/handleCookie";

const index = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    const userData = { email, password };

    try {
      const fetchLogin = await UserLogin(userData);

      if (fetchLogin?.status === true) {
        const token = getTokenCookie();
        const userProfile = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataUser(userProfile?.data?.data);

        const userRole = userProfile?.data?.data?.role;
        if (userRole === "admin") {
          router.push("/admin");
        } else if (userRole === "user") {
          router.push("/user");
        }
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage(
          fetchLogin?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-full  md:mx-0 flex justify-center items-center">
      <div className="bg-white rounded-md flex justify-center md:px-5 py-7 shadow-md  w-[95%] md:w-auto">
        <div className="mx-auto">
          <div className="flex gap-2 justify-center items-center">
            <Image
              src={"/assets/images/logo.png"}
              width={40}
              height={40}
              alt="logo SMK Telkom Malang"
              onClick={() => router.push("/admin")}
              className="cursor-pointer"
            />
            <p className="text-2xl text-orange-700">PT NIKEL JAYA</p>
          </div>
          <div className="mt-5 text-center">
            <p className="font-semibold text-xl text-orange-600">LOGIN</p>
            <h1 className=" text-sm text-gray-500">
              PORTAL MONITORING KENDARAAN
            </h1>
          </div>
          <div className="my-5">
            <div className="relative w-[20rem]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-orange-700 block w-full pl-10 p-2.5 "
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mt-4 w-[20rem]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <RiLockPasswordFill className="text-gray-500 opacity-70" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-orange-700 block w-full pl-10 p-2.5"
                placeholder="Masukkan Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide /> : <BiShowAlt />}
              </div>
            </div>
          </div>
          {isError && (
            <div className="text-center  w-full flex justify-center">
              <div className="bg-red-200 rounded-md p-3 flex items-center gap-3">
                <div>
                  <CiWarning className="font-bold text-3xl text-red-600" />
                </div>
                <div className="text-red-600 font font-semibold">
                  Login Failed
                </div>
              </div>
            </div>
          )}
          {isSuccess && (
            <div className="text-center  w-full flex justify-center">
              <div className="bg-green-200 rounded-md p-3 flex items-center gap-3">
                <div>
                  <CiCircleCheck className="font-bold text-3xl text-green-600" />
                </div>
                <div className="text-green-600 font font-semibold">
                  Login Successfull
                </div>
              </div>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center">
              <SpinnerLoading />
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              className="bg-orange-600 py-2 text-white font-semibold rounded-md w-[13rem] hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring focus:ring-orange-200"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
