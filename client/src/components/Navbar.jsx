"use client"

import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Menu, X, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/app/store/Theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(()=>{
    function handleClickOutside(event){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>document.removeEventListener('mousedown',handleClickOutside);
  },[])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-8 w-8 mt-1 text-sky-600 dark:text-sky-500" />
              <span className="text-4xl font-bold text-sky-600 dark:text-sky-500">BlogZy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/blog"
                className="text-foreground hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Blog
              </Link>
              <Link to={'/auth/signin'}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to={'/auth/signup'}>
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                  Sign Up
                </Button>
              </Link>
              <div className="">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeToggle />
            <div className="relative" ref={dropdownRef}>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className={`sm:hidden bg-[#f5fbff] p-4 fixed m-1 mt-4 right-0 rounded-sm drop-shadow-xl dark:bg-gray-700/90`}>
                  <div className="flex flex-col items-center justify-center gap-2 text-lg font-semibold ">
                    <Link to={'/blogs'}> Blogs </Link>
                    <Link to={'/auth/signin'}> Login </Link>
                    <Link to={'/auth/signup'}> Sign Up </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>


      </div>
    </nav>
  )
}
