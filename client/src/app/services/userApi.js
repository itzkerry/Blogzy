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


export const signup = async (formData) =>{
    const {data} = await API.post('/auth/signup',formData);
    return data;
}

export const signin = async (formData) =>{
    const {data} = await API.post('/auth/signin',formData);
    return data;
}

export const createBlog = async (blogData) =>{
  const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("tags",JSON.stringify(blogData.tags));
    formData.append("content", JSON.stringify(blogData.content));
    formData.append("coverImage", blogData.coverImage[0]);
  console.log(formData);
  const {data} = await API.post('/blogs/my',formData);
  return data;
}

export const updateBlog = async (blogId,blogData) => {
  const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("tags",JSON.stringify(blogData.tags));
    formData.append("content", JSON.stringify(blogData.content));
    if(blogData.coverImage?.[0]){
      console.log('cover image hai');
      formData.append("coverImage", blogData.coverImage[0]);
    }else{
      console.log('cover image nahi hai');
      formData.append("coverImage",null);
    }
  const {data} = await API.put(`/blogs/my/${blogId}`,formData);
  return data;
}

export const getUserBlogs = async () =>{
  const {data} = await API.get('/blogs/my/blog');
  return data;
}

export const deleteBlog = async (id) =>{
  const {data} = await API.delete(`/blogs/my/${id}`);
}