"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Briefcase, Home,Info, LogOut, Menu, User, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useState } from "react"
import { ModeToggle } from "./ui/darkmod-toggle"

const NavBar = () => {
    const[initstate,setState]=useState(false);
    const toggler=()=>{
        setState (!initstate);
    }
 const isAuth=true;
 const logoutHandler=()=>{};

  return (
    <nav className="z-50 sticky top-0 bg-background/80 border-b backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1 group">
              <div className="text-2xl font-bold tracking-tight">
                
                {/* Gradient Text */}
                <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Job 
                </span>

                {/* Second part of logo */}
                <span className="text-red-500">
                  Portal
                </span>

              </div>
            </Link>
          </div>

          {/* Right side placeholder (buttons/menu later) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
            <Button variant="ghost">
                <Home size={16}/>Home
            </Button>
            </Link>

            <Link href="/jobs">
            <Button variant="ghost">
                <Briefcase size={16}/>Jobs
            </Button>
            </Link>

            <Link href="/about">
            <Button variant="ghost">
                <Info size={16}/>About
            </Button>
            </Link>

            
          </div>

        {/* {show only if user is login} */}
        <div className="hidden md:flex items-center gap-3">
            {isAuth?
            <Popover>

          {/* Avatar Button */}
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">

              <Avatar
                className="h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-blue-500/20 cursor-pointer hover:ring-blue-500/40 transition-all"
              >

                {/* Optional image */}
                {/* <AvatarImage src="" alt="" /> */}

                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600">
                  D
                </AvatarFallback>

              </Avatar>

            </button>
          </PopoverTrigger>

          {/* Dropdown */}
          <PopoverContent className="w-56 p-2" align="end">

            {/* User info */}
            <div className="px-3 py-2 mb-2 border-b">
              <p className="text-sm font-semibold">
                Dev
              </p>

              <p className="text-xs opacity-60 truncate">
                Dev@gmail.com
              </p>
            </div>

            {/* Profile */}
            <Link href="/account">
              <Button
                className="w-full justify-start gap-2"
                variant="ghost"
              >
                <User size={16} />
                My Profile
              </Button>
            </Link>

            {/* Logout */}
            <Button
              className="w-full justify-start gap-2 mt-1"
              variant="ghost"
              onClick={logoutHandler}
            >
              <LogOut size={16} />
              Logout
            </Button>

          </PopoverContent>

        </Popover>

            
            :
            <Link href="/login">
                <Button className={"ghost"}>Sign in</Button>
                </Link>}
            <ModeToggle/>

        </div>

        <div className="md:hidden flex items-center gap-3">
              <button onClick={toggler} className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="toggle-menu" >{initstate?<X size={24}/>:<Menu size={24}/>}</button>
              </div>
        </div>
      </div>
      {/* Mobile view  */}
      <div
  className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
    initstate ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="px-3 py-3 space-y-1 bg-background/95 backdrop-blur-md">

    <Link href="/" onClick={toggler}>
      <Button variant="ghost" className="w-full justify-start gap-3 h-11">
        <Home size={18} />
        Home
      </Button>
    </Link>

    <Link href="/jobs" onClick={toggler}>
      <Button variant="ghost" className="w-full justify-start gap-3 h-11">
        <Briefcase size={18} />
        Jobs
      </Button>
    </Link>

    <Link href="/about" onClick={toggler}>
      <Button variant="ghost" className="w-full justify-start gap-3 h-11">
        <Info size={18} />
        About
      </Button>
    </Link>

    {!isAuth ? (
      <Link href="/login" onClick={toggler}>
        <Button className="w-full justify-start gap-3 h-11">
          Sign In
        </Button>
      </Link>
    ) : (
      <Button
        variant="destructive"
        className="w-full justify-start gap-3 h-11"
        onClick={()=>{
          toggler();
          logoutHandler();
        }}
      >
        <LogOut size={18} />
        Logout
      </Button>
    )}

  </div>
</div>
    </nav>
  )
}

export default NavBar