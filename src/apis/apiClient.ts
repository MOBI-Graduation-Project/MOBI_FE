import { useUserStore } from "@/stores/userStore";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true,
});

apiClient.interceptors.request.use(async config => {
  let token = useUserStore.getState().accessToken;

  if (!token) {
    try {
      const res = await refreshClient.post(
        "/auth/reissue",
        {},
        { withCredentials: true },
      );
      token = res.data.result.accessToken;
    } catch (err) {
      console.error("토큰 재발급 실패:", err);
    }
  }

  if (token) {
    useUserStore.getState().setAccessToken(token);
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  return config;
});
