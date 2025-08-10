// src/layouts/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import {Navbar} from "@/components/Navbar";
import AuthNavbar from "@/components/AuthNavbar";
import useUserStore from "@/app/store/userStore";

export default function Layout() {
  const isAuth = useUserStore((state)=> !!state.token);
  return (
    <>
      <main className="min-h-[calc(100vh-1.5rem)] w-full"> {/* Adjust padding if Navbar is fixed */}
        {isAuth ? <AuthNavbar/> : <Navbar/>}
        <Outlet />
      </main>
    </>
  );
}
