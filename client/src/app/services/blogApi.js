import axios from "axios";
import useUserStore from "../store/userStore";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config)=>{
    const token = useUserStore.getState().token;
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
)
API.interceptors.response.use(
  (response)=> response,
  (error) => {
    if (error.request && !error.response) {
      // 🛑 Server not responding (offline, crash, etc.)
      toast.error("Server is unreachable. Please try later.");
    }
    return Promise.reject(error); // pass error to calling code if needed
  }
)

export const fetchBlogs = async (page,search='') =>{
    const {data} = await API.get(`/blogs?page=${page}&limit=10&search=${search}`);
    return data;
}

export const fetchFollowingBlogs = async (page)=>{
  const {data} = await API.get(`/blogs/my/feed?feed=following&page=${page}`);
  return data;
}
export const fetchLikedBlogs = async (page)=>{
  const {data} = await API.get(`/blogs/my/feed?feed=liked&page=${page}`);
  return data;
}
export const fetchSavedBlogs = async (page)=>{
  const {data} = await API.get(`/blogs/my/feed?feed=saved&page=${page}`);
  return data;
}
