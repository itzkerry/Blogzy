import { create } from 'zustand'
import * as api from '../services/profileApi'
import toast from 'react-hot-toast';
import useUserStore from './userStore';

const useProfileStore = create(
    (set,get) =>({
        profileId:null,
        username:null,
        email:null,
        avatar:null,
        bio:null,
        followers:[],
        following:[],
        isFollowing:false,
        blogs:[],
        totalViews:0,
        loading:false,
        updateLoading:false,
        error:null,

        fetchProfile: async(username) =>{
            set({loading:true, error:null});
            try{
                const res = await api.fetchProfile(username);
                const user = res.user;
                const totalViews = res.blogs?.reduce((sum, blog) => sum + (blog.views || 0), 0) || 0;
            set({
                profileId:user._id,
                username:user.username,
                email:user.email,
                avatar:user.avatar?.url,
                bio:user.bio,
                followers:user.followers,
                following:user.following,
                isFollowing:res.isFollowing,
                blogs:res.blogs,
                totalViews,
                loading:false,
            })
            }catch(err){
                console.error('Profile fetching error: ',err);
                set({error:err.message || 'Failed to fetch Profile', loading:false})
            }
        },
        
        updateBio : async (bio)=>{
            set({UpdateLoading:true,error:null})
            try{
                const res = await api.updateBio(bio);
                set({
                    bio:res.bio,
                    loading:false,
                })
                useUserStore.setState({bio:res.bio});
                toast.success('Bio Updated');
            }catch(err){
                console.error('Profile Updating error: ',err);
                set({error:err.message || 'Failed to update Profile', loading:false})
            }
        }, 

        updateAvatar: async(file)=>{
            set({UpdateLoading:true,error:null})
            try{
                const res = await api.updateAvatar(file);
                set({
                    avatar:res.avatar?.url,
                    loading:false,
                })
                useUserStore.setState({avatar:res.avatar?.url});
                toast.success('Avatar Updated');
            }catch(err){
                console.error('Profile Updating error: ',err);
                set({error:err.message || 'Failed to update Profile', loading:false})
            }
        },

        toggleFollowing : async(follow)=>{
            const {isFollowing,profileId} = get();
            if(isFollowing === follow){
                return;
            }
            try{
                const res = await api.toggleFollowing(profileId);
                set({isFollowing:res.isFollowing,
                    followers:res.followers
                })
                useUserStore.setState({following:res.following})
            }catch(err){
                console.error('Following error: ',err);
                set({error:err.message || 'Failed to toggle follow', loading:false})
            }
        }
    })
)

export default useProfileStore