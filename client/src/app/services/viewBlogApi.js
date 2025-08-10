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

export const fetchSingleBlog  = async (id)=>{
    const {data} = await API.get(`/blogs/${id}`);
    return data;
}

export const toogleLike = async (blogId)=>{
  const {data} = await API.post(`/blogs/${blogId}/like`);
  return data;
}
export const toogleSave = async (blogId)=>{
  const {data} = await API.post(`/blogs/${blogId}/save`);
  return data;
}