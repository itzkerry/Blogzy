import useProfileStore from '@/app/store/profileStore';
import useUserStore from '@/app/store/userStore'
import { convertToSquare } from '@/utils/convertToSquare';
import { createdAt } from '@/utils/createdAt';
import { debounce } from '@/utils/debounce';
import { Camera, EditIcon, Eye, FileText, UserPlus, Users, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const { fetchProfile, toggleFollowing, updateAvatar, updateBio, bio: profileBio, username, email, avatar, followers, following, isFollowing: follow, blogs, loading, error, totalViews } = useProfileStore();
    const personal = username === useUserStore.getState().username;

    const { drafts } = useUserStore();
    const { profile } = useParams();

    const [bio, setBio] = useState('');
    const [bioEditing, setBioEditing] = useState(false);

    // const [originalAvatar,setOriginalAvater] = useState(null);
    const [imageInput, setImageInput] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]; // get the first file
        if (selectedFile) {
            const squareImage = await convertToSquare(selectedFile, 300);
            setFile(squareImage);
        }
    }
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url)
            return () => URL.revokeObjectURL(url)
        } else {

            if (avatar) {
                setImagePreview(avatar);
            }
        }
    }, [file, avatar]);
    const [avatarUpdating, setAvatarUpdating] = useState(false);
    const handleAvaterUpdate = async () => {
        if (file) {
            setAvatarUpdating(true);
            await updateAvatar(file);
            setImageInput(false);
        } else {
            toast.error('Image not selected');
        }
        setAvatarUpdating(false);
    }

    const handleEditingKeyDown = (e) => {
        if (e.key === 'Enter') {
            const bio = e.target.value;/////
            console.log('clicked : ', e.target.value)/////
            updateBio({ bio });
            setBioEditing(false);
            setBio(profileBio);
        }
    }

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    const toggleFollow = async () => {
        const newFollowState = !isFollowing;
        setIsFollowing((prev) => !prev);
        setFollowerCount((prev) => prev + (isFollowing ? -1 : 1))
        debouncedToggle(newFollowState);
    }

// <-- empty dependency so it's created only once
    const debouncedToggle = useCallback(
        debounce((followState) => {
            toggleFollowing(followState);
        }, 500),
        [] // <-- empty dependency so it's created only once
    );

    useEffect(() => {
        setIsFollowing(follow);
        setFollowerCount(followers.length)
    }, [follow, followers]);

    useEffect(() => {
        if (profile) {
            fetchProfile(profile);
        }
    }, [profile])

    return (
        <div className="min-h-screen w-full bg-sky-50 dark:bg-gray-900 overflow-x-hidden">
            <div className="max-w-190 p-2 mx-auto" >
                <div className="w-full px-3 sm:px-6">

                    {personal && <div className="pt-2 text-2xl font-bold text-gray-500">
                        Your profile
                    </div>}
                    {error && <div className="pt-10 text-2xl text-gray-500 ">{error}</div>}
                    {!error && !loading &&
                        <>
                            <div className="relative w-full p-2 sm:p-5 mt-5 flex flex-col sm:flex-row items-start gap-5 border  dark:border-gray-700 rounded-xl shadow">
                                <div className="w-35 h-35 p-2 aspect-square relative">
                                    <div className="w-full rounded-full overflow-hidden bg-sky-200 dark:bg-gray-700 ">
                                        <img src={avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`} alt="" />
                                    </div>
                                    {personal &&
                                        <label type='button' onClick={() => setImageInput(true)} className="w-8 h-8 absolute cursor-pointer flex items-center justify-center rounded-full -bottom-0 -right-0 text-gray-500 bg-gray-200">
                                            <Camera size={17} />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                placeholder=''
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    }
                                </div>
                                <div className="w-full flex flex-col items-start gap-0.5 sm:pr-10">
                                    <div className="w-full flex flex-wrap gap-3 justify-between">
                                        <div className="flex flex-col gap-0.5">
                                            <h1 className='text-xl text-gray-950 dark:text-gray-100 font-semibold'>{username}</h1>
                                            <p className='text-sm text-gray-500'>{email}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="p-1">
                                                <span className='flex gap-3 pl-1 text-sm text-gray-900 dark:text-gray-200 font-semibold'><Users size={16} />{followerCount}</span>
                                                <p className='text-sm text-gray-500 font-semibold'>Followers</p>
                                            </div>
                                            <div className="p-1">
                                                <span className='flex gap-3 pl-1 text-sm text-gray-900 dark:text-gray-200 font-semibold'><UserPlus size={16} />{following.length}</span>
                                                <p className='text-sm text-gray-500 font-semibold'>Following</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex flex-col justify-start items-start">
                                            <span className='flex items-center justify-center gap-2 pt-3'>About
                                                {personal &&
                                                    <button type='button'
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            if (!bioEditing) {
                                                                setBio(profileBio);
                                                                setBioEditing(true);
                                                            } else {
                                                                setBioEditing(false);
                                                            }
                                                        }

                                                        }
                                                    >
                                                        {bioEditing ? <X size={16} className='hover:text-red-400' /> : <EditIcon size={16} />}
                                                    </button>
                                                }
                                            </span>
                                            {!bioEditing && <p className='text-sm text-gray-600 dark:text-gray-400'>{profileBio ? profileBio : 'Not added bio'}</p>}
                                            {bioEditing && <input type="text"
                                                id='bio-input'
                                                onKeyDown={handleEditingKeyDown}
                                                onChange={(e) => setBio(e.target.value)}
                                                value={bio}
                                                className='w-full text-sm text-gray-700 dark:text-gray-400 border'
                                            />}
                                        </div>
                                        {!personal && <button className={`px-2 sm:px-4 py-2 text-sm sm:text-md font-semibold self-end rounded-lg ${isFollowing ? 'border-2 text-gray-900 dark:text-white dark:border-gray-500' : 'bg-sky-500 text-white hover:bg-sky-600 '}`}
                                            onClick={toggleFollow}
                                        >
                                            {isFollowing ? 'Following' : 'follow'}
                                        </button>}
                                    </div>


                                </div>
                                {imageInput && <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/10 rounded-xl backdrop-blur-sm shadow">
                                    <div className="h-10/12 aspect-square rounded-full bg-gray-900/20 overflow-hidden">
                                        <img src={imagePreview || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`} alt="" className='' />
                                    </div>
                                    <button type='button'
                                        className='absolute top-5 right-5 hover:text-red-400'
                                        onClick={() => setImageInput(false)}
                                    ><X size={16} /></button>
                                    <button type='button'
                                        onClick={() => handleAvaterUpdate()}
                                        disabled={avatarUpdating}
                                        className='absolute bottom-5 right-5 px-3 py-2 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600 cursor-pointer disabled:cursor-not-allowed'
                                    >
                                        {avatarUpdating ? 'Updating...' : 'Update Profile'}
                                    </button>
                                </div>}
                            </div>

                            <div className="text-xl my-5 text-gray-500">Blog Statistics</div>

                            <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-between">
                                <div className="p-6 w-full h-35 flex justify-between border dark:border-gray-700 rounded-2xl shadow">
                                    <div className="flex flex-col justify-between">
                                        <p className='text-sm font-semibold'>Published Posts</p>
                                        <div className="flex flex-col">
                                            <span className='text-2xl font-bold'>{blogs.length}</span>
                                            <span className='text-xs text-gray-500'>Live on your blog</span>
                                        </div>
                                    </div>
                                    <FileText size={16} />
                                </div>
                                {personal &&
                                    <div className="p-6 w-full h-35 flex justify-between border dark:border-gray-700 rounded-2xl shadow">
                                        <div className="flex flex-col justify-between">
                                            <p className='text-sm font-semibold'>Draft Posts</p>
                                            <div className="flex flex-col">
                                                <span className='text-2xl font-bold'>{drafts.length}</span>
                                                <span className='text-xs text-gray-500'>Work in progress</span>
                                            </div>
                                        </div>
                                        <EditIcon size={16} />
                                    </div>
                                }
                                <div className="p-6 w-full h-35 flex justify-between border dark:border-gray-700 rounded-2xl shadow">
                                    <div className="flex flex-col justify-between">
                                        <p className='text-sm font-semibold'>Total Views</p>
                                        <div className="flex flex-col">
                                            <span className='text-2xl font-bold'>{totalViews}</span>
                                            <span className='text-xs text-gray-500'>Across all published posts</span>
                                        </div>
                                    </div>
                                    <Eye size={16} />
                                </div>
                            </div>

                            {blogs.length > 0 && <div className="text-xl my-5 text-gray-500">Recent Blogs</div>}

                            <div className="flex flex-col gap-2">
                                {blogs.map((blog, id) => (
                                    <div key={id} className="w-full p-4 border border-black/30 dark:border-gray-300/30 rounded-2xl shadow cursor-pointer "
                                        onClick={() => navigate(`/blog/view/${blog._id}`)}
                                    >
                                        <div className="flex flex-col sm:flex-row gap-1 justify-between items-start">
                                            <h1 className='w-[85%] text-2xl font-bold line-clamp-2'>{blog.title} </h1>
                                            <p className='text-sm text-gray-500 font-semibold'>{createdAt(blog.createdAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default Profile