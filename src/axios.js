import axios from "axios";
// import { useUserStore } from "./stores/user";

const axiosClient = axios.create({
	withCredentials: true,
	baseURL: `${import.meta.env.VITE_API_BASE_URL}`
});

// axiosClient.interceptors.request.use(config => {
//   const userStore = useUserStore()
//   config.headers.Authorization = `Bearer ${userStore.authUser.token}`
//   return config
// })

// axiosClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       const userStore = useUserStore()
//       userStore.logout()
//     }
//     return Promise.reject(error)
//   },
// )

export default axiosClient;
