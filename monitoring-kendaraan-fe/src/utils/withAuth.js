// utils/withAuth.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenCookie } from "./handleCookie";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
      const token = getTokenCookie();

      const fetchProfile = async () => {
        try {
          const userProfile = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(userProfile.data.data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      };

      if (token) {
        fetchProfile();
      } else {
        router.push("/login");
      }
    }, [router]);

    useEffect(() => {
      if (data) {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
        if (data.role === "admin" && !currentPath.startsWith("/admin")) {
          router.push("/admin");
        } else if (data.role === "user" && !currentPath.startsWith("/user")) {
          router.push("/user");
        }
      }
    }, [data, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
