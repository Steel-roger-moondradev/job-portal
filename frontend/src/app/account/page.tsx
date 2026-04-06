"use client";
import { useappdata } from '@/context/AppContext';
import React from 'react'
import Info from './component/info';
import Skills from './component/skills';
import Company from './component/company';
import Loading from '@/components/ui/loading';

const MyAccount  = () => {
    const{user,loading,btnLoading,isAuth,setUser,setLoading,setIsAuth,setBtnloading}=useappdata();
    if (loading) return <Loading />;
  return (
    <>
    
<div className="min-h-screen pt-10 bg-linear-to-br from-[#f8f9ff] via-[#eef1ff] to-[#f0f4ff] dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">  
 <div className="max-w-4xl mx-auto px-4 space-y-3">
  <Info user={user} isAuthorised={true}/>
      {user?.role=="jobseeker" ? (
        <Skills user={user} isAuthorised={true}/>
      ) : (
        <Company user={user} isAuthorised={true}/>
      )}
    
    
  </div>

</div>
    </>
  )
}

export default MyAccount 