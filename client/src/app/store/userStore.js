// src/stores/userStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as api from '../services/userApi'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid';
import { Trash2 } from 'lucide-react';


const useUserStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      token: null,
      userId: null,
      username:null,
      email:null,
      avatar: null,
      bio:null,
      blogs: [],
      drafts:[],
      likedBlogs: [],
      SavedBlogs: [],
      followers: [],
      following: [],
      loading: false,
      error: null,

      // --- Auth ---
      signin: async (data,navigate) => {
        set({ loading: true })
        try {
          const res = await api.signin(data);
          const { user, token } = res;
          set({
            token,
            userId: user._id,
            username:user.username,
            email:user.email,
            avatar: user.avatar?.url,
            following: user.following,
            followers: user.followers,
            loading: false,
          })
          toast.success('Login successful')
          navigate('/',{replace:true})
        } catch (err) {
          const message = err.response?.data?.message  || 'Login failed';
          set({ error: message, loading: false })
          toast.error(message);
          throw new Error(message)
        }
      },

      signup: async (data,navigate) => {
        set({ loading: true })
        try {
          const res = await api.signup(data)
          const { user, token } = res
          set({
            token,
            userId: user._id,
            username:user.username,
            email:user.email,
            avatar: user.avatar?.url,
            following: user.following,
            followers: user.followers,
            loading: false
          })
          toast.success('SignUp Successful');
          navigate('/',{replace:true});
        } catch (err) {
          const message = err.response?.data?.message  || 'SignIn failed';
          set({ error: message, loading: false });
          toast.error(message)
          throw new Error(message);
        }
      },

      logout: () => {
        set({
          token: null,
          userId: null,
          username:null,
          email:null,
          avatar: null,
          bio:null,
          blogs: [],
          likedBlogs: [],
          SavedBlogs:[],
          commentedBlogs: [],
          followers: [],
          following: [],
        })
      },

      // --- Blog Actions ---
      fetchUserBlogs: async () => {
        try {
          const res = await api.getUserBlogs()
          set({ blogs: res.blogs })
        } catch (err) {
          console.error('Fetch blogs error:', err);
          return err;
        }
      },

      createBlog: async (blogData,navigate) => {
        try{
          const res = await api.createBlog(blogData);
          set((state) => ({ blogs: [res.blog, ...state.blogs] }));
          toast.success(res.message,{duration:2000});
          navigate('/blog/my/posted');
        }catch(err){
          const message = err.response?.data?.message  || 'Blog not created';
          toast.error(message);
          throw new Error(err);
        }
      },

      updateBlog: async (blogId,blogData,navigate) => {
        try{
          const res = await api.updateBlog(blogId,blogData);
          set((state) => ({
            blogs: state.blogs.map((b) => (b._id === blogId ? res.blog : b)),
          }))
          toast.success(res.message,{duration:2000});
          navigate('/blog/my/posted');
        }catch(err){
          const message = err.response?.data?.message  || 'Blog not updated';
          toast.error(message);
        }
      },

      deleteBlog: async (id) => {
        try{
          await api.deleteBlog(id)
          set((state) => ({
            blogs: state.blogs.filter((b) => b._id !== id),
          }))
          toast('Blog deleted',{icon:'🗑️'});
        }catch(err){
          const message = err.response?.data?.message  || 'Blog not Deleted';
          toast.error(message);
        }
      },
      
      // Drafts
      addDraft: (blogData,id=null)=>{
        try{
          const timestamp = new Date().toISOString();
          if(id){
            // update 
            set((state)=>({
              drafts: state.drafts.map((b)=>
                b.id === id 
                ? {...b,...blogData, updatedAt:timestamp}
                : b 
              )
            }));
            toast.success('Draft Updated');
            return id;

          }else{
            // create
            const newDraft = {
              id:uuidv4(),
              ...blogData,
              createdAt: timestamp,
              updatedAt: timestamp,
            }
            set((state)=>({
              drafts:[...state.drafts,newDraft]
            }))
            toast.success("Saved as Draft");
            return newDraft.id;
          }
        }catch(err){
          console.log('Failed to save draft',err);
          toast.error('Draft Not Saved');
        }
      },

      deleteDraft: (id)=>{
        try{
          if(id){
            set((state)=>({
              drafts: state.drafts.filter((b)=>b.id !== id)
            }))
            toast.success('Draft Deleted');
          }
        }catch(err){
          console.log('Failed to delete draft : ',err)
          toast.error('Error deleting draft')
        }
      }
    }),
    {
      name: 'user-store', // will persist in localStorage
      partialize: (state) => ({
        token: state.token,
        userId: state.userId,
        username:state.username,
        email:state.email,
        bio:state.bio,
        avatar: state.avatar,
        drafts:state.drafts,
        following: state.following,
        followers: state.followers,
      }),
    }
  )
)

export default useUserStore
