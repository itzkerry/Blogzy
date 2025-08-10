import { useEffect, useState, useRef } from "react";
import { ThumbsUp, MessageCircleMore, Bookmark } from "lucide-react"
import BlogCard from "../components/BlogCard";
import useBlogStore from "@/app/store/blogStore";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import useUserStore from "@/app/store/userStore";



const AllBlogPage = () => {
    const isAuth = useUserStore((state) => !!state.token);

    const { blogs, fetchBlogs, loading, error, hasMore } = useBlogStore();
    const { followingBlogs,fetchFollowingBlogs, followingLoading, followingError, followingHasMore} = useBlogStore();
    const {searchBlogs, fetchSearchBlogs, searchLoading, searchError, searchHasMore,searchQuery} = useBlogStore();

    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'all';
    const query = searchParams.get('q') || '';

    const loaderRef = useRef(null);
    const followingLoaderRef = useRef(null);
    const searchLoaderRef = useRef(null);

    useEffect(() => {
        fetchBlogs();
    }, [])

    useEffect(()=>{
        if(query!=='' && mode==='search'){
            fetchSearchBlogs(query);
        }
    },[query])

    useEffect(()=>{
        fetchFollowingBlogs();
    },[]);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchBlogs();
                }
            },
            { threshold: 1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loaderRef, hasMore, loading, mode]);

    useEffect(()=>{
        const followingObserver = new IntersectionObserver(
            (entries)=>{
                if(entries[0].isIntersecting && followingHasMore && !followingLoading){
                    fetchFollowingBlogs();
                }
            },
            {threshold:1}
        );
        if(followingLoaderRef.current) followingObserver.observe(followingLoaderRef.current);
        return ()=>{
            if(followingLoaderRef.current) followingObserver.unobserve(followingLoaderRef.current);
         }
    },[followingLoaderRef,followingHasMore,followingLoading,mode]);

    useEffect(()=>{
        const searchObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && searchHasMore && !searchLoading) {
                    fetchSearchBlogs(query);
                }
            },
            { threshold: 1 }
        );
        if (searchLoaderRef.current) searchObserver.observe(searchLoaderRef.current);
        return () => {
            if (searchLoaderRef.current) searchObserver.unobserve(searchLoaderRef.current);
        };
    },[searchLoaderRef,searchHasMore,searchLoading,mode])


    return (
        <div className="min-h-screen w-full bg-sky-50 dark:bg-gray-900 overflow-x-hidden">
            <div className="max-w-190 p-2 mx-auto" >
            {isAuth &&
                <div className="w-full px-3 sm:px-6">
                    <div className="w-full pt-3 border-b flex items-center justify-start gap-5 text-lg font-medium">
                        <NavLink to='/blogs?mode=all'
                            className={`pb-2 hover:text-gray-800 dark:hover:text-gray-300  ${mode==='all' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-gray-500'}`}
                        >
                            For You
                        </NavLink>
                        <NavLink to='/blogs?mode=following'
                            className={`pb-2 hover:text-gray-800 dark:hover:text-gray-300  ${mode==='following' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-gray-500'}`}
                        >
                            Following
                        </NavLink>
                        <NavLink to={`/blogs?mode=search&q=${searchQuery}`}
                            className={`pb-2 hover:text-gray-800 dark:hover:text-gray-300  ${mode==='search' ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-gray-500'}`}
                        >
                            Search
                        </NavLink>
                    </div>
                </div>
            }

            {mode==='all' && 
            <>
                {loading && [...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
                {error && <div className="flex w-full h-80 items-center justify-center text-5xl text-gray-300 dark:text-gray-700 font-bold text-center">{error}</div>}
                {blogs.map(blog => {
                    return <BlogCard blog={blog} key={blog._id} />
                })}
                {loading && <div className="h-20 flex gap-3 items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-500">
                        Loading ...
                    </span>
                </div>}
                {!loading && hasMore && <div ref={loaderRef} className="h-10 "></div>}
                {!hasMore && blogs.length>0 && <div className="w-full flex items-center justify-center border-b text-lg font-semibold text-gray-500">No More Blogs</div> }
            </>}

            {mode==='following' && <>
                {followingLoading && [...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
                {followingError && <div className="flex w-full h-80 items-center justify-center text-5xl text-gray-300 dark:text-gray-700 font-bold text-center">{followingError}</div>}
                {!followingBlogs.length>0 && !followingError && <div className="flex w-full h-80 items-center justify-center text-5xl text-gray-300 dark:text-gray-700 font-bold text-center">Your Following Has No Blog</div> }
                {followingBlogs.map(blog => {
                    return <BlogCard blog={blog} key={blog._id} />
                })} 
                {followingLoading && <div className="h-20 flex gap-3 items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-500">
                        Loading ...
                    </span>
                </div>}
                {!followingLoading && followingHasMore && <div ref={followingLoaderRef} className="h-10 "></div>}
                {!followingHasMore && followingBlogs.length>0 && <div className="w-full flex items-center justify-center border-b text-lg font-semibold text-gray-500">No More Blogs</div> }
            </>}

            {mode==='search' && 
            <>
                {query==='' ? 
                <div className="w-full px-3 sm:px-6 py-4 text-center text-gray-800 dark:text-gray-100 text-2xl font-semibold">Search is empty</div>
                :
                <div className="w-full px-3 sm:px-6 py-4 flex flex-wrap gap-2 text-gray-800 dark:text-gray-100 text-2xl font-semibold">Showing result for : 
                <span className=" text-gray-600">{query}</span>
                 </div> 
                }
                {!searchBlogs.length>0 && query!=='' && !searchError && !searchLoading && <div className="w-full flex justify-center items-center py-4 text-gray-300 dark:text-gray-700 text-4xl font-bold text-center">Not found</div>}
                {searchLoading && [...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)}
                {searchError && <div className="flex w-full h-80 items-center justify-center text-5xl text-gray-300 dark:text-gray-700 font-bold text-center">{searchError}</div>}
                {searchBlogs.map(blog => {
                    return <BlogCard blog={blog} key={blog._id} />
                })}
                {searchLoading && <div className="h-20 flex gap-3 items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-500">
                        Loading ...
                    </span>
                </div>}
                {!searchLoading && query!=='' && searchHasMore && <div ref={searchLoaderRef} className="h-10"></div>}
                {!searchHasMore && searchBlogs.length>0 &&<div className="w-full flex items-center justify-center border-b text-lg font-semibold text-gray-500">No More Blogs</div> }
            </>
            }
            </div>
        </div>
    )
}

export default AllBlogPage;