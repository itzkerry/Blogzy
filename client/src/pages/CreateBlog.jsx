import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Editor from '@/utils/Editor'
import Tooltip from '@/utils/Tooltip'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import useUserStore from '@/app/store/userStore'
import { base64ToFile, fileToBase64 } from '@/utils/fileToBase64'
import { useNavigate, useParams } from 'react-router-dom'

const CreateBlog = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const { register, unregister, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm()
  const { createBlog, updateBlog, addDraft, deleteDraft, drafts, blogs, fetchUserBlogs } = useUserStore();
  const navigate = useNavigate();
  const { draftId, blogId } = useParams();
  const mode = blogId ? 'update' : 'create';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const onSubmit = async (data) => {
    if (!watch('coverImage')?.[0]) {
      toast.error('coverImage is required onSubmit');
      return;
    }

    try {
      await createBlog(data, navigate);
      if (draftId) {
        deleteDraft(draftId);
      }
    } catch (err) {
      console.log('creating error : ', err);
    }
  }

  const onUpdate = async (data) => {
    try {
      await updateBlog(blogId, data, navigate);
    } catch (err) {
      console.log('updating error : ', err);
    }
  }

  const onInvalid = (errors) => {
    if (errors.title) {
      toast.error('Title is required!');
      return;
    }
    if (errors.content) {
      toast.error('Content is required!');
      return;
    }
    if (errors.coverImage) {
      toast.error('CoverImage is required!');
      return;
    }
    if (errors.tags) {
      toast.error('Add atleast one Tag');
      return;
    }
  }
  const [originalCoverImage, setOriginalCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)
  const file = watch('coverImage')?.[0]

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url)
      setCoverImage(file);
      return () => URL.revokeObjectURL(url)
    } else {

      if (originalCoverImage) {
        setImagePreview(originalCoverImage);
      }
    }
  }, [file, originalCoverImage]);


  const editorRef = useRef(null);

  useEffect(() => {
    if (draftId) {
      const blog = drafts.find((b) => b.id === draftId);
      // console.log("draftId : ", blog);   ////
      setContent(blog.content);
      setValue('content', blog.content);
      if (editorRef.current) {
        editorRef.current.commands.setContent(blog.content);
      }
      setTitle(blog.title);
      setValue('title', blog.title);
      setTags(blog.tags);
      setValue('tags', blog.tags);

      if (blog.coverImage) {
        const file = base64ToFile(blog.coverImage);
        setValue(('coverImage'), [file], { shouldValidate: true });
      }
    }
  }, [draftId])

  useEffect(() => {
    if (blogId) {
      const blog = blogs.find((b) => b._id === blogId);
      if (!blog) {
        fetchUserBlogs();
        return;
      }
      console.log(mode);
      // console.log("blogId : ", blog); ///
      setContent(blog.content);
      setValue('content', blog.content);
      if (editorRef.current) {
        editorRef.current.commands.setContent(blog.content);
      }
      setTitle(blog.title);
      setValue('title', blog.title);
      setTags(blog.tags);
      setValue('tags', blog.tags);

      if (blog.coverImage.url) {
        setOriginalCoverImage(blog.coverImage.url);
      }
    }
  }, [blogId, blogs])

  const saveToLocalStorage = async () => {
    const base64 = (coverImage&&!isMobile) ? await fileToBase64(coverImage) : null;
    const blogData = {
      title,
      content,
      coverImage: base64,
      tags,
    }
    const id = addDraft(blogData, draftId);
    navigate(`/blog/create/${id}`);
  }

  const onChange = (value) => {
    setContent(value);
    setValue('content', value);
  }
  const handleAddTag = () => {
    if (tag.trim() !== '') {
      setTags(prev => [...prev, tag]);
      setTag('');
    }
  };
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag();
    }
  }
  const handleTagBlur = ()=>{
    handleAddTag();
  }

  const removeTags = (id) => {
    setTags(prev => prev.filter((_, i) => i !== id));
  }
  useEffect(() => {
    setValue('tags', tags);
  }, [tags]);

  useEffect(() => {
    register('content', { required: true });
    register('tags', { required: true });
  }, [register]);

  return (
    <div className="w-full min-h-[calc(100vh-5.5rem)] dark:text-gray-300 bg-sky-50 dark:bg-gray-900">
      <div className="max-w-190 mx-auto p-4">
        <form onSubmit={handleSubmit((mode === 'create' ? onSubmit : onUpdate), onInvalid)} className='flex flex-col gap-3'>
          <input
            type='text'
            {...register('title', { required: true })}
            placeholder='Title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border-1 border-gray-300 dark:border-gray-600 text-2xl px-3 py-2 font-serif font-bold rounded-lg text-black/80 dark:text-slate-200 placeholder:text-gray-400'
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault() // prevent accidental submit
            }}
          />
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <label className='w-fit font-medium px-2 py-1 bg-blue-500/10 cursor-pointer text-blue-500 border border-blue-500 rounded-2xl'>
              {imagePreview ? "Change Image" : "Choose a cover Image"}
              <input
                type="file"
                accept="image/*"
                {...register('coverImage', {
                  validate: () => {
                    if (mode === 'update') return true;  // For update mode skip validation
                    return watch('coverImage')?.length > 0; // For create/draft require image
                  }
                })}
                placeholder=''
                className="hidden"
              />
            </label>

            <label htmlFor='tags' className="w-fit font-medium px-2 py-1 bg-blue-500/10 cursor-pointer text-blue-500 border border-blue-500 rounded-2xl">
              <span className='border-r border-blue-500'>Add Tags </span>
              <input type="text"
                id='tags'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={handleTagBlur}
                placeholder='Press enter to add..'
                className='px-3 w-40 outline-none text-sm text-indigo-500' />
            </label>
            <div className="flex gap-1 overflow-x-auto md:max-w-67 items-center"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none' // For IE/Edge
              }}
            >
              {tags.map((t, id) => (
                <span key={id} className='flex gap-1 items-center bg-indigo-50 dark:bg-gray-900 border-2 border-indigo-400 px-2 py-1 text-sm font-semibold text-indigo-500 rounded-md'>
                  <span className='pl-1'>{t}</span>
                  <button type='button' className='cursor-pointer text-red-400' onClick={() => removeTags(id)}><X strokeWidth={2} size={14} /></button>
                </span>
              ))}
            </div>
          </div>

          {imagePreview && (
            <img src={imagePreview} alt="cover preview"
              className='mt-2 max-h-fit max-w-full rounded shadow' />
          )}
          <Editor content={content} onChange={onChange} editorRef={editorRef} />

          <div className="flex justify-end gap-2">
            {mode === 'update' ?
              <Tooltip label='Update Blog'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-3 py-2 font-bold text-white bg-sky-500 rounded-lg hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
                >{isSubmitting ? 'Updating..' : 'Update'}</button>
              </Tooltip>
              :
              <Tooltip label='Create Blog'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-3 py-2 font-bold text-white bg-sky-500 rounded-lg hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
                >{isSubmitting ? 'Creating..' : 'Create'}</button>
              </Tooltip>
            }
            {mode === 'create' &&
              <Tooltip label='Save to local Storage'>
                <button
                  type='button'
                  disabled={isSubmitting}
                  onClick={saveToLocalStorage}
                  className='px-3 py-2 font-semibold text-gray-600 dark:text-gray-400 bg-gray-300/50 rounded-lg hover:bg-gray-400/40 dark:bg-gray-500/60 dark:hover:bg-gray-500/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
                >Save as Draft</button>
              </Tooltip>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog