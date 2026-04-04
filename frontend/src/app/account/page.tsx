"use client";
import { useappdata } from '@/context/AppContext';
import React from 'react'
import Info from './component/info';
import Skills from './component/skills';

const MyAccount  = () => {
    const{user,loading,btnLoading,isAuth,setUser,setLoading,setIsAuth,setBtnloading}=useappdata();
  return (
    <>
    
    <Info user={user} isAuthorised={true}/>
    <Skills user={user} isAuthorised={true}/>
    </>
  )
}

export default MyAccount 