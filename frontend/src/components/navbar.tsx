"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Briefcase, Home, Info, LogOut, Menu, User, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useState } from "react"
import { ModeToggle } from "./ui/darkmod-toggle"

const NavBar = () => {
  const [initstate, setState] = useState(false)
  const toggler = () => setState(!initstate)

  const isAuth = true
  const logoutHandler = () => {}

  return (
    <nav className="z-50 sticky top-0 bg-background/70 border-b backdrop-blur-xl shadow-sm relative">
      
      {/* linear overlay (matches hero) */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1 group">
              <div className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                
                <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent transition-all duration-300">
                  Job
                </span>

                <span className="text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
                  Portal
                </span>

              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Home */}
            <Link href="/">
              <Button className="relative group flex items-center gap-2 transition-all duration-300 hover:scale-105" variant="ghost">
                <Home size={16} className="transition-transform group-hover:-translate-y-0.5" />
                <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300">
                  Home
                </span>
              </Button>
            </Link>

            {/* Jobs */}
            <Link href="/jobs">
              <Button className="relative group flex items-center gap-2 transition-all duration-300 hover:scale-105" variant="ghost">
                <Briefcase size={16} className="transition-transform group-hover:-translate-y-0.5" />
                <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300">
                  Jobs
                </span>
              </Button>
            </Link>

            {/* About */}
            <Link href="/about">
              <Button className="relative group flex items-center gap-2 transition-all duration-300 hover:scale-105" variant="ghost">
                <Info size={16} className="transition-transform group-hover:-translate-y-0.5" />
                <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300">
                  About
                </span>
              </Button>
            </Link>

          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <Popover>

                {/* Avatar */}
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <Avatar
                      className="h-9 w-9 ring-2 ring-offset-2 ring-offset-background ring-purple-500/20 cursor-pointer
                      hover:ring-purple-500/60 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-purple-500/20"
                    >
                      <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-600">
                        D
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>

                {/* Dropdown */}
                <PopoverContent
                  className="w-56 p-2 animate-in fade-in zoom-in-95 duration-200"
                  align="end"
                >
                  <div className="px-3 py-2 mb-2 border-b">
                    <p className="text-sm font-semibold">Dev</p>
                    <p className="text-xs opacity-60 truncate">Dev@gmail.com</p>
                  </div>

                  <Link href="/account">
                    <Button className="w-full justify-start gap-2" variant="ghost">
                      <User size={16} />
                      My Profile
                    </Button>
                  </Link>

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
            ) : (
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
            )}

            <ModeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggler}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {initstate ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
          initstate
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="px-3 py-3 space-y-1 bg-background/95 backdrop-blur-md">

          <Link href="/" onClick={toggler}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 transition-all duration-200 hover:scale-[1.02] hover:bg-purple-500/10">
              <Home size={18} />
              Home
            </Button>
          </Link>

          <Link href="/jobs" onClick={toggler}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 transition-all duration-200 hover:scale-[1.02] hover:bg-purple-500/10">
              <Briefcase size={18} />
              Jobs
            </Button>
          </Link>

          <Link href="/about" onClick={toggler}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 transition-all duration-200 hover:scale-[1.02] hover:bg-purple-500/10">
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
              onClick={() => {
                toggler()
                logoutHandler()
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