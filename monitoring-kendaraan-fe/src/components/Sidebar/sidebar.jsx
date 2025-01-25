// components/Sidebar.js
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MenuItem, MenuItemUser } from "./MenuItem";
import { BiLogOut } from "react-icons/bi";
import { removeTokenCookie, getTokenCookie } from "../../utils/handleCookie";
import { ToastContainer, toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import api from "../../utils/axios";
import axios from "axios";

const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const pathname = usePathname();

  const getProfile = async () => {
    const userProfile = await api.get("/api/me");
    setUserData(userProfile.data.data);
  };
  useEffect(() => {
    setToken(getTokenCookie());
    getProfile();
  }, [token]);

  const handleLogOut = () => {
    try {
      removeTokenCookie();
      router.push("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  const isActive = (item) => {
    return (
      (item.link === "/" && pathname === "/") ||
      (item.link !== "/" && item.path.some((path) => pathname.startsWith(path)))
    );
  };

  return (
    <>
      <ToastContainer />
      <aside
        className={`bg-white mt-16 border-r-2 z-30 h-full w-64 fixed top-0 overflow-auto pb-20 left-0 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div>
          <div>
            <div className="flex items-center gap-3 border-y-2 py-3 my-3 px-4">
              <FaUserAlt />
              <div>
                {userData.name}
                <p className="text-xs text-gray-400">{userData.email}</p>
              </div>
            </div>
          </div>

          <ul>
            {(userData.role === "admin" ? MenuItem : MenuItemUser).map(
              (item) => {
                return (
                  <li key={item.link}>
                    <a
                      href={item.link}
                      className={` flex gap-2 my-3 p-4 items-center ${
                        (item.link === "/admin" &&
                          pathname === "/admin") ||
                          (item.link === "/user" &&
                            pathname === "/user") ||
                        (item.link !== "/admin" && item.link !== "/user" &&
                          item.path.some((path) =>
                           pathname.startsWith(path)
                          ))
                          ? "bg-orange-500 text-white "
                          : "hover:bg-orange-300"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              }
            )}

            <li>
              <div
                className="flex gap-2 my-3 p-4 items-center hover:bg-orange-300 cursor-pointer"
                onClick={handleLogOut}
              >
                <BiLogOut />
                <span>LogOut</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
