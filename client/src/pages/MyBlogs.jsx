import useUserStore from '@/app/store/userStore';
import { createdAt } from '@/utils/createdAt';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import ThreeDot from '../components/ThreeDot';

const MyBlogs = () => {
  const { mode } = useParams();
  const navigate = useNavigate();

  const validMode = ['draft', 'posted', 'comment'];
  if (!validMode.includes(mode)) {
    return <Navigate to='/404' />
  }

  const { drafts,fetchUserBlogs,blogs,deleteDraft,deleteBlog} = useUserStore();

  useEffect(()=>{
      fetchUserBlogs();
  },[]);

  return (
    <div className="w-full min-h-[calc(100vh-5.5rem)] dark:text-gray-300 bg-sky-50 dark:bg-gray-900">
      <div className="max-w-190 mx-auto p-4 ">
        <div className="flex justify-between items-center py-6 sm:py-8 ">
          <h1 className='text-3xl sm:text-4xl font-semibold'
          >Your Blogs</h1>
          <NavLink
            to='/blog/create'
            className='px-4 py-2 text-sm sm:text-md text-white bg-sky-500 hover:bg-sky-600 rounded-full '
          >Write a blog</NavLink>
        </div>

        <div className="flex gap-8 py-2 border-b border-black dark:border-white">
          <NavLink to='/blog/my/draft'
            className={({ isActive }) => `flex gap-2 text-ms hover:text-black dark:hover:text-white ${isActive ? "text-black dark:text-white" : "text-gray-500"}`}
          >Drafts
            <span>{drafts.length}</span>
          </NavLink>
          <NavLink to='/blog/my/posted'
            className={({ isActive }) => `flex gap-2 text-ms hover:text-black dark:hover:text-white ${isActive ? "text-black dark:text-white" : "text-gray-500"}`}
          >Posted
            <span>{blogs.length}</span>
          </NavLink>
          <NavLink to='/blog/my/comment'
            className={({ isActive }) => `flex gap-2 text-ms hover:text-black dark:hover:text-white ${isActive ? "text-black dark:text-white" : "text-gray-500"}`}
          >comment
            <span>{0}</span>
          </NavLink>
        </div>

        <div className="w-full max-h-130 overflow-y-scroll">
          {/* Draft */}
          {mode === 'draft' && drafts.map((draft,id) => (
            <div key={id} className="flex gap-5 h-25 border-b-2 p-4 ">
              <div className="w-full flex items-center justify-between">
                <div className="h-full flex flex-col justify-between">
                  <h1 className="text-xl font-bold line-clamp-1">{draft.title === '' ? 'Untitled Blog' : draft.title }</h1>
                  <div className="text-sm text-gray-600 dark:text-gray-500">Created {createdAt(draft.createdAt)}</div>
                </div>
                <div className="h-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  {draft.coverImage ? <img src={draft.coverImage}  className='w-full h-full'/> : <div className="text-xs font-bold dark:text-gray-600">no Image</div> }
                </div>
              </div>
              {<ThreeDot onDelete={()=>deleteDraft(draft.id)} onEdit={()=>navigate(`/blog/create/${draft.id}`)}/>}
            </div>
          ))}

          {/* Posted  */}
          {mode === 'posted' && blogs.map((blog,id)=>(
            <div key={id} className="flex gap-5 h-25 border-b-2 p-4 ">
              <Link to={`/blog/view/${blog._id}`} key={id} className="w-full flex items-center justify-between">
                <div className="h-full flex flex-col justify-between">
                  <h1 className="text-xl font-bold line-clamp-1">{blog.title}</h1>
                  <div className="text-sm text-gray-600 dark:text-gray-500">Created {createdAt(blog.createdAt)}</div>
                </div>
                <div className="h-full aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  {blog.coverImage.url ? <img src={blog.coverImage.url}  className='w-full h-full'/> : <div className="text-xs font-bold dark:text-gray-600">no Image</div> }
                </div>
              </Link>
              {<ThreeDot onDelete={()=>deleteBlog(blog._id)} onEdit={()=>navigate(`/blog/update/${blog._id}`)}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBlogs