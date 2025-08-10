import { create } from 'zustand';
import * as api from '@/app/services/blogApi'; // Make sure to import your API
// ^ This is missing in your snippet
const useBlogStore = create((set, get) => ({
  blogs: [],
  page:1,
  hasMore:true,
  loading: false,
  error: null,

  followingBlogs:[],
  followingPage:1,
  followingHasMore:true,
  followingLoading:false,
  followingError:null,

  searchBlogs:[],
  searchPage:1,
  searchQuery:'',
  searchHasMore:true,
  searchLoading:false,
  searchError:null,

  likedBlogs: [],
  likedPage: 1,
  likedHasMore: true,
  likedLoading: false,
  likedError: null,

  savedBlogs: [],
  savedPage: 1,
  savedHasMore: true,
  savedLoading: false,
  savedError: null,

  fetchBlogs: async () => {
    const { page, blogs, hasMore } = get();
    if (!hasMore) return;

    set({ loading: true, error: null }); // Start loading
    try {
      const res = await api.fetchBlogs(page);
      set({ 
        blogs:[...blogs,...res.blogs],
        hasMore: res.totalPages > page,
        page: page + 1,
        loading: false
      });
    } catch (err) {
      console.error('ALL blogs Fetch error:', err);
      set({ error: err.message || 'Failed to fetch blogs', hasMore:false,loading:false });
    }
  },

  fetchSearchBlogs: async(search)=>{
    const {searchQuery} = get();
    if(search !== searchQuery){
      set({searchBlogs:[],searchPage:1,searchHasMore:true,searchQuery:search})
    }

    const {searchPage,searchBlogs,searchHasMore} = get();
    if(!searchHasMore) return;

    try{
      set({searchLoading:true,searchError:null});
      const res = await api.fetchBlogs(searchPage,search);
      set({ 
        searchBlogs:[...searchBlogs,...res.blogs],
        searchHasMore: res.totalPages > searchPage,
        searchPage: searchPage + 1,
        searchLoading: false
      });
    }catch (err) {
      console.error('Search blogs Fetch error:', err);
      set({ searchError: err.message || 'Failed to fetch searched blogs', searchHasMore:false, searchLoading:false });
    }
  },

  fetchFollowingBlogs : async()=>{
    const {followingPage,followingBlogs,followingHasMore} = get();
    if(!followingHasMore){
      return ;
    }
    try{
      set({followingLoading:true, followingError:null});
      const res = await api.fetchFollowingBlogs(followingPage);
      set({
        followingBlogs : [...followingBlogs,...res.blogs],
        followingHasMore : res.totalPages > followingPage,
        followingPage: followingPage + 1,
        followingLoading:false
      })
    }catch (err) {
      console.error('Following blogs Fetch error:', err);
      set({ followingError: err.message || 'Failed to fetch searched blogs', followingHasMore:false });
    }
  },
  fetchLikedBlogs: async () => {
    const { likedPage, likedBlogs, likedHasMore } = get();
    if (!likedHasMore) return;

    try {
      set({ likedLoading: true, likedError: null });
      const res = await api.fetchLikedBlogs(likedPage); // your backend API
      set({
        likedBlogs: [...likedBlogs, ...res.blogs],
        likedHasMore: res.totalPages > likedPage,
        likedPage: likedPage + 1,
        likedLoading: false
      });
    } catch (err) {
      console.error('Liked blogs fetch error:', err);
      set({ likedError: err.message || 'Failed to fetch liked blogs', likedHasMore: false, likedLoading: false });
    }
  },
  
  fetchSavedBlogs: async () => {
    const { savedPage, savedBlogs, savedHasMore } = get();
    if (!savedHasMore) return;

    try {
      set({ savedLoading: true, savedError: null });
      const res = await api.fetchSavedBlogs(savedPage); 
      // ^ Make sure you have this API function in blogApi.js
      set({
        savedBlogs: [...savedBlogs, ...res.blogs],
        savedHasMore: res.totalPages > savedPage,
        savedPage: savedPage + 1,
        savedLoading: false
      });
    } catch (err) {
      console.error('Saved blogs Fetch error:', err);
      set({
        savedError: err.message || 'Failed to fetch saved blogs',
        savedHasMore: false,
        savedLoading: false
      });
    }
  },

}));

export default useBlogStore;