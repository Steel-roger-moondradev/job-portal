"use client";
import { useappdata } from '@/context/AppContext';
import React, { useEffect } from 'react'
import Info from './component/info';
import Skills from './component/skills';
import Company from './component/company';
import Loading from '@/components/ui/loading';
import AppliedJobs from './component/application';
import { useRouter } from "next/navigation";
import Jobstatus from './component/jobstatus';


const MyAccount  = () => {
  
  const{user,loading,isAuth,applications,fetchIndividualApplication}=useappdata();

        const router = useRouter();
        useEffect(() => {
    if (!loading && !isAuth) {
      router.replace("/login");
    }
  }, [loading, isAuth, router]);

  if (loading) return <Loading />;

  if (!isAuth) return null;

    if (loading) return <Loading />
  return (
    <>
<div className="min-h-screen pt-10 pb-16 bg-linear-to-br  from-[#f8f9ff] via-[#eef1ff] to-[#f0f4ff] dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">  
 <div className="max-w-4xl mx-auto px-4 space-y-3">
  <Info user={user} isAuthorised={true}/>
      {user?.role=="jobseeker" ? (
        <>
        <Skills user={user} isAuthorised={true}/>
        <AppliedJobs applications={applications}/>
        </>
        
      ) : (
        <Company  isAuthorised={true}/>
      )}

    
    
  </div>

</div>
    </>
  )
}

export default MyAccount 