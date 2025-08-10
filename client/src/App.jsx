import { useState } from 'react'

import AuthPage from './pages/AuthPage'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import Layout from './Layouts/layout'
import AllBlogPage from './pages/AllBlogpage'
import CreatePostPage from './pages/CreateBlog'

import useUserStore from './app/store/userStore'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile';
import ViewBlog from './pages/ViewBlog';
import NotFound from './pages/NotFound';
import LikedBlog from './pages/LikedBlog';
import SavedBlog from './pages/SavedBlog';

function App() {
  const isAuth = useUserStore((state) => !!state.token);

  return (
    <>
      <Routes>
        <Route path="/auth/:mode" element={<AuthPage />} />

        <Route element={<Layout/>}> {/* Provide navbar */}

          <Route path="/" element={isAuth ? <AllBlogPage/> : <LandingPage />} />
          <Route path="/blogs" element={<AllBlogPage/>} />

          <Route path="/blog/create" element={isAuth ? <CreatePostPage/> : <Navigate to='/auth/signup'/>} />
          <Route path="/blog/create/:draftId" element={isAuth ? <CreatePostPage/> : <Navigate to='/auth/signup'/>} />
          <Route path="/blog/update/:blogId" element={isAuth ? <CreatePostPage/> : <Navigate to='/auth/signup'/>} />

          <Route path='/blog/my/:mode' element={isAuth ? <MyBlogs/> : <Navigate to='/auth/signup'/> }/>
          <Route path="/profile/:profile" element={isAuth ? <Profile/> : <Navigate to='/auth/signup'/>} />
          <Route path="/blog/view/:id" element={isAuth ? <ViewBlog/> : <Navigate to='/auth/signup'/>} />
          <Route path='/blog/my/liked' element={isAuth ? <LikedBlog/> : <Navigate to='/auth/signup'/> }/>
          <Route path='/blog/my/saved' element={isAuth ? <SavedBlog/> : <Navigate to='/auth/signup'/> }/>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>



      <footer className="h-6 flex items-center justify-center dark:bg-gray-800 dark:text-white bg-sky-50 text-sky-600 text-center">
        <p>&copy; {new Date().getFullYear()} Blogzy. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
