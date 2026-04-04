"use client";
import { useappdata, user_service } from '@/context/AppContext';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Info from '../component/info';
import axios from 'axios';
import Cookies from 'js-cookie'
import { LoginResponse, User } from '@/type';
import Skills from '../component/skills';   

const Account = () => {
    const[profileUser,setprofileUser]=useState<User|null>(null);
    const {id}=useParams();
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

  return (
    <>
    
    <Info user={profileUser} isAuthorised={false}/>
    <Skills user={profileUser} isAuthorised={false}/>

    </>
    
  )
}

export default Account