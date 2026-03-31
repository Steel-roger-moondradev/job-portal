"use client";
import { useappdata } from '@/context/AppContext';
import React from 'react'
import Info from './component/info';


const MyAccount  = () => {
    const{user,loading,btnLoading,isAuth,setUser,setLoading,setIsAuth,setBtnloading}=useappdata();
  return (
    <>
    <Info user={user} isAuthorised={true}/>
    </>
  )
}

export default MyAccount 