import axios from "axios";
import useUserStore from "../store/userStore";
import useProfileStore from "../store/profileStore";
import toast from "react-hot-toast";

const userId = useUserStore.getState().userId; 
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

export const fetchProfile = async (username)=>{
    const {data} = await API.get(`/profile/${username}`);
    return data;
}

export const updateBio = async (bio)=>{
  const {data} = await API.put(`/profile/${userId}/bio`,bio);
  return data;
}

export const updateAvatar = async (file)=>{
  const formData = new FormData();
  formData.append("avatar", file);
  const {data} = await API.put(`/profile/${userId}/avatar`,formData);
  return data;
}

export const toggleFollowing = async(id)=>{
  const {data} = await API.put(`/profile/${id}/toggleFollow`);
  return data;
}

