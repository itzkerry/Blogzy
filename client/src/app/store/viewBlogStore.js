import { create } from "zustand";
import * as api  from '../services/viewBlogApi'
import useUserStore from "./userStore";

const useViewBlogStore = create((set,get)=>({
    blogId:null,
    title:null,
    content:null,
    coverImage:null,
    author:null,
    isLiked:false,
    isSaved:false,
    views:0,
    saves:[],
    likes:[],
    comments:[],
    createdAt:null,
    updatedAt:null,
    loading:false,
    errors:null,

    fetchSingleBlog: async(id)=>{
        try{
            set({loading:false,errors:null});
            const res = await api.fetchSingleBlog(id);
            const blog = res.blog;

            set({
                blogId:blog._id,
                title:blog.title,
                content:blog.content,
                coverImage:blog.coverImage?.url,
                author:blog.author,
                views:blog.views,
                saves:blog.saves,
                likes:blog.likes,
                comments:blog.comments,
                createdAt:blog.createdAt,
                updatedAt:blog.updatedAt,
                isLiked:res.isLiked,
                isSaved:res.isSaved,
                loading:false,
            })
        }catch(err){
            console.error('ALL blogs Fetch error:', err);
            set({ error: err.message || 'Failed to fetch blog',loading:false });
        }
    },

    toggleLike : async(like)=>{
        const {isLiked,blogId} = get();
        if(isLiked === like){
            return;
        }
        try{
            const res = await api.toogleLike(blogId);
            set({isLiked:res.isLiked,
                likes:res.likes,
            })
            useUserStore.setState({likedBlogs:res.likedBlogs});
        }catch(err){
            console.error('error liking blog : ',err);
            set({error:err.message || 'Failed to toggle like', loading:false})
        }
    },
    toggleSave : async(save)=>{
        const {isSaved,blogId} = get();
        if(isSaved === save){
            return;
        }
        try{
            const res = await api.toogleSave(blogId);
            set({isSaved:res.isSaved,
                saves:res.saves,
            })
            useUserStore.setState({savedBlogs:res.savedBlogs});
        }catch(err){
            console.error('error liking blog : ',err);
            set({error:err.message || 'Failed to toggle like', loading:false})
        }
    }
}))

export default useViewBlogStore