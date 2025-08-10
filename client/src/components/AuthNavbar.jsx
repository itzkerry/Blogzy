import React, { useEffect, useRef } from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import { useState } from "react"
import { X, PenTool, Search,User, BookmarkCheck,BookText, ScrollText , LogOut,Heart,SquarePen} from "lucide-react"
import ThemeToggle  from "@/app/store/Theme-toggle"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import useUserStore from '@/app/store/userStore'

const AuthNavbar = () => {
    const {username,logout,avatar} = useUserStore();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // close on outside click 
    useEffect(()=>{
        function handleClickOutside(event){
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return ()=>document.removeEventListener("mousedown",handleClickOutside);
    },[]);

    const handleKeyDown = (e)=>{
        const search = e.target.value;
        if(e.key === 'Enter' && search.trim()){
            navigate(`blogs?mode=search&q=${search}`);
        }
    }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-6 w-6 sm:h-8 sm:w-8  mt-1 text-sky-600 dark:text-sky-500" />
              <span className="text-2xl sm:text-4xl font-bold text-sky-600 dark:text-sky-500">BlogZy</span>
            </Link>
            <div className="flex justify-start h-10 p-1 items-center bg-sky-100 dark:bg-slate-900/90 rounded-full">
                <Search className='h-5 ml-1 text-sky-800 dark:text-sky-600'/>
                <input type="search" 
                placeholder='Search'
                onKeyDown={handleKeyDown}
                className='h-5 w-full sm:w-60 mx-3 py-4 text-lg text-sky-700 dark:text-sky-500 placeholder:text-sky-700/50 dark:placeholder:text-sky-400/50 outline-0 '
                />    
            </div>
          </div>
          <div className="relative mt-1" ref={dropdownRef}>
                <button onClick={()=>setIsOpen(!isOpen)} className={`cursor-pointer ${isOpen ? "ring-2 ring-sky-200 rounded-full dark:ring-sky-600" : ""}`}>
                    <Avatar className={`h-10 w-10 m-1 ring ring-gray-200 bg-gray-50 dark:bg-gray-800 dark:ring-gray-500`}>
                        <AvatarImage src={avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`}
                        className="bg-sky-200 dark:bg-slate-800"/>
                    </Avatar>
                </button>
                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute flex flex-col justify-between h-130 w-55 px-4 py-2 text-xl dark:text-white font-serif dark:bg-slate-950 bg-[#f5fbff] z-50 mt-4 right-0 rounded shadow-md shadow-sky-800/40 dark:shadow-slate-50/10 ">
                        <div className="flex flex-col gap-3 *:pb-2 *:items-center">
                            <div className="flex justify-between items-center pt-2 border-b">
                                <NavLink to={`/profile/${username}`} className={({isActive})=>`flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                    <User className='m-1 stroke-1'/>
                                    <h1 className='line-clamp-1'>{username}</h1>
                                </NavLink>
                                <ThemeToggle/>
                            </div>
                            
                            <NavLink to='/blog/create' className={({isActive})=>`border-b flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                <SquarePen className='m-1 stroke-1'/>
                                Create
                            </NavLink>
                            <NavLink to='/blogs' className={({isActive})=>`border-b flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                <ScrollText className='m-1 stroke-1'/>
                                Blogs
                            </NavLink>
                            <NavLink to='/blog/my/posted' className={({isActive})=>`border-b flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                <BookText className='m-1 stroke-1'/>
                                My Blogs
                            </NavLink>
                            <NavLink to='/blog/my/saved' className={({isActive})=>`border-b flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                <BookmarkCheck className='m-1 stroke-1'/>
                                Saved
                            </NavLink>
                            <NavLink to='/blog/my/liked' className={({isActive})=>`border-b flex gap-1 ${isActive ? 'text-sky-500/70' : 'hover:text-sky-800/70'}`}>
                                <Heart className='m-1 stroke-1'/>
                                Liked
                            </NavLink>
                        </div>
                        <div className="pl-2 border-t pt-2 flex gap-2 hover:bg-gray-300/30 dark:hover:bg-gray-600/30 rounded-lg hover:text-sky-800/70"
                            onClick={()=>{logout(); navigate('/')}}
                        >
                            LogOut
                            <LogOut className='m-1 stroke-1'/>
                        </div>
                    </div>
                )}
           </div>
        </div>
      </div>
    </nav>
  )
}

export default AuthNavbar