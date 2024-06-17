import api from "./axios";
import { setTokenCookie } from "./handleCookie";
import axios from "axios";

export const UserLogin = async (userData) => {
  const url = `/api/login`;
  const data = {
    email: userData.email,
    password: userData.password,
  };
  try {
    const response = await api.post(url, data);
    if (response.data.success === true) {
      const token = response.data.data;
      setTokenCookie(token);
        let dataUser = {};
        const fetchProfile = async () => {
          const userProfile = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dataUser = userProfile.data.data;
        };
        fetchProfile();
        if(dataUser){
            return {
              data: dataUser,
              token: token,
              response: response,
              status: true,
            };
        }
    } else {
      return { response: response, status: false };
    }
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
};
