"use client";
import { useappdata, user_service } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Info from '../component/info';
import axios from 'axios';
import Cookies from 'js-cookie'
import { LoginResponse, User } from '@/type';
import Skills from '../component/skills';   
import Company from '../component/company';
import Loading from '@/components/ui/loading';

const Account = () => {
    const[profileUser,setprofileUser]=useState<User|null>(null);
    const {id}=useParams();
    const{loading}=useappdata();
    async function fetchUser(){
        try{

            const token=Cookies.get("token");
            const {data}=await axios.get<LoginResponse>(`${user_service}/api/user/${id}`,
                {
                    headers:{
                        Authorization :`Bearer ${token}`
                    }
                }
            );
            setprofileUser(data.userObject);
        }catch(error:any){
            console.log(error.response?.data?.message);
        }
    }
    useEffect(()=>{fetchUser()},[id]);
   if (loading) return <Loading />;
  return (
    <>
<div className="min-h-screen pt-10 bg-linear-to-br from-[#f8f9ff] via-[#eef1ff] to-[#f0f4ff] dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">  
  <div className="max-w-4xl mx-auto px-4 space-y-6">
    <Info user={profileUser} isAuthorised={false}/>
    {profileUser?.role=="jobseeker" ? (
      <Skills user={profileUser} isAuthorised={false}/>
    ) : (
      <Company  isAuthorised={false}/>
    )}
    </div>

</div>  
    </>
    
  )
}

export default Account