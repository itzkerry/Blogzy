import useViewBlogStore from '@/app/store/viewBlogStore';
import BlogContent from '@/utils/BlogContent';
import { createdAt } from '@/utils/createdAt';
import { debounce } from '@/utils/debounce';
import Editor from '@/utils/Editor';
import { Bookmark, BookmarkPlus, Heart, MessageCircleMore } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
const ViewBlog = () => {
  const {fetchSingleBlog,
    title,
     content, 
     coverImage, 
     author, 
     likes,
     saves,
     comments,
     isLiked,
     isSaved, 
     views,
     toggleLike,
     toggleSave,
     createdAt:created,
     loading,
     error} = useViewBlogStore();
  const {id} = useParams();

  const [like,setLike] = useState(false);
  const [likeCount,setLikeCount] = useState(0);

  const toggleLikes = async()=>{
    const newLike = !like;
    setLike((prev)=>!prev);
    setLikeCount((prev)=> prev + (like ? -1 : 1))
    debounceToggleLike(newLike);
  }
// <-- empty dependency so it's created only once
  const debounceToggleLike = useCallback(
    debounce((newLike)=>{
      toggleLike(newLike);
    },500),
    []// <-- empty dependency so it's created only once
  )

  useEffect(()=>{
    setLike(isLiked);
    setLikeCount(likes.length);
  },[isLiked,likes])


  const [save,setSave] = useState(false);
  const [saveCount,setSaveCount] = useState(0);

  const toggleSaves = async()=>{
    const newSave = !save;
    setSave((prev)=>!prev);
    setSaveCount((prev)=> prev + (like ? -1 : 1))
    debounceToggleSave(newSave);
  }
// <-- empty dependency so it's created only once
  const debounceToggleSave = useCallback(
    debounce((newSave)=>{
      toggleSave(newSave);
    },500),
    []// <-- empty dependency so it's created only once
  )

  useEffect(()=>{
    setSave(isSaved);
    setSaveCount(saves.length);
  },[isSaved,saves])

  const addComment = async()=>{
    toast.error('comment is under construction')
  }

  useEffect(() => {
    if(id){
      fetchSingleBlog(id);
    }
  }, [id]);
  
  return (
        <div className="w-full min-h-[calc(100vh-5.5rem)] dark:text-gray-300 bg-sky-50 dark:bg-gray-900">
            <div className="max-w-190 mx-auto p-4">
                <div className="w-full px-3 sm:px-6 ">
                  {id && !loading && <div className="pt-2 sm:pt-10 flex gap-8 flex-col">

                  <h1 className='text-3xl sm:text-4xl font-bold font-serif sm:leading-13 wrap-break-word'>{title}</h1>
    
                  <div  className="flex justify-start items-center gap-4 ">
                    <Link to={`/profile/${author?.username}`} className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                      <img src={author?.avatar.url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author?.username)}`} alt="avatar" />
                    </Link>
                    <Link to={`/profile/${author?.username}`} className="text-sm font-semibold cursor-pointer">{author?.username}</Link>
                    <p className='text-sm text-gray-500 font-medium'>{createdAt(created)}</p>
                  </div>

                  <div className="w-full py-3 px-2 flex justify-between items-center font-serif font-light border-y dark:border-y-gray-400 text-gray-600 dark:text-gray-300">
                    <div className="flex gap-8 items-center">
                      <button className="flex gap-2 items-center hover:text-black dark:hover:text-white cursor-pointer"
                        onClick={toggleLikes}
                      >
                        {like ? <Heart size={20} strokeWidth={1} fill='red' color='red'/> : <Heart size={20} strokeWidth={1}/>}
                        <span>{likeCount>0 && likeCount}</span>
                      </button>
                      <button className="flex gap-2 items-center hover:text-black dark:hover:text-white cursor-pointer"
                        onClick={addComment}
                      >
                        <MessageCircleMore size={20} strokeWidth={1} />
                        <span>{comments.length>0 && comments.length}</span>
                      </button>
                    </div>
                    <button className="flex gap-2 items-center hover:text-black dark:hover:text-white "
                      onClick={toggleSaves}
                    >
                      {save ? <Bookmark size={20} strokeWidth={1} fill='black'/> :<BookmarkPlus size={20} strokeWidth={1}/>}
                      <span>{saveCount>0 && saveCount}</span>
                    </button>
                  </div>
                  {coverImage && <img src={coverImage} alt="cover preview"
                      className='mt-2 max-h-fit max-w-full rounded shadow' />}
                  {content && <BlogContent content={content}/>}

                  </div> }
                </div>
            </div>
        </div>
  )
}

export default ViewBlog