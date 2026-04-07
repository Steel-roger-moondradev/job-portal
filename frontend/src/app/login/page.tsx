"use client";

import { useappdata } from "@/context/AppContext";
import { useState} from "react";
import {auth_service} from "../../context/AppContext"
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { LoginResponse } from "@/type";
import Cookies from 'js-cookie';
import { Card, CardContent } from "@/components/ui/card";
import { Mail,Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";

const login = () => {
  const router = useRouter();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[btnLoading,setBtnloading]=useState(false);
  const{        user,
                loading,
                isAuth,
                setUser,
                setIsAuth}=useappdata();
  const submitHandler=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setBtnloading(true);
   if(isAuth){
        router.push('/');
      return;}

    try{
      
      const {data}= await axios.post<LoginResponse>(`${auth_service}/api/auth/login`,{email,password});
      if (!data || !data.token || !data.userObject) {
  throw new Error("Invalid response");
}
      toast.success(data.message);
      Cookies.set("token",data.token,{
        secure:true,
        expires:15,
        path:"/",
      });
      setUser(data.userObject);
      setIsAuth(true);  
      router.push('/');
    }
    catch(error:any){
      toast.error(error.response?.data?.message);
      setIsAuth(false);
    } finally{
      setBtnloading(false);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-white px-4">
      
      {/* Animated Card */}
      <Card className="w-full max-w-md shadow-xl rounded-2xl transition-all duration-500 hover:scale-[1.02]">
        <CardContent className="p-6 space-y-6">

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm">
              Login to continue to Job Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link
                href="/forgot"
                className="text-purple-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={btnLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300"
            >
              {btnLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default login