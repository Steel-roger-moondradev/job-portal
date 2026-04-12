"use client";
import { job_service, useappdata, user_service } from "@/context/AppContext";
import { Application, Job } from "@/type";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle,
  DollarSign,
  Loader2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import  { toast } from "react-hot-toast";
import axios from "axios";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { user, btnLoading,setBtnloading } = useappdata();
 const [applied, setApplied] = useState(false);
  const[applications,setApplications]=useState<Application[]>([]);


 
  const applyJobHandler = async (id: number) => {
        setBtnloading(true);
        try {
            const token=Cookies.get("token");
            if(!token){
                toast.error("You need to login to apply for job");
                return;
            }
            const {data} = await axios.post(`${user_service}/api/user/apply`,{job_id:id},{headers: {Authorization: `Bearer ${token}`}});
            toast.success(data.message);
            setApplied(true);
            }
            catch (error: any) {            toast.error(error.response.data.message);
        }finally{
            setBtnloading(false);
        }
  };


  const fetchApplications = async () => {
    setBtnloading(true);

    try {
      const token = Cookies.get("token");
        if (!token) {
            toast.error("You need to login to view applications");
            return;
        }
      const { data } = await axios.get(
        `${user_service}/api/user/allapplications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(data);
    }
    catch (error: any) {      toast.error(error.response.data.message);
    }
    finally{
        setBtnloading(false);
    }
}

useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);


  useEffect(() => {
    if (applications && job.job_id) {
      applications.forEach((item: any) => {
        if (item.job_id === job.job_id) setApplied(true);
      });
    }
  }, [applications, job.job_id]);

  return (
    
    <Card className="w-full max-w-[380px] rounded-2xl border border-transparent bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group hover:border-purple-400/40">
  
  <CardHeader className="space-y-4 pb-4">
    
    <div className="flex items-start justify-between gap-3">
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
          {job.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Building2 size={16} className="opacity-70" />
          <span className="truncate">{job.company_name}</span>
        </div>
      </div>

      <Link href={`/company/${job.company_id}`} className="shrink-0">
        <div className="w-14 h-14 rounded-xl overflow-hidden border bg-white dark:bg-black shadow-sm group-hover:scale-110 transition-transform duration-300">
          <img
            src={job.company_logo || "/default-logo.png"}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

    </div>

    <div className="space-y-3">
      
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600">
          <MapPin size={14} />
          <span className="font-medium">{job.location}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-base font-semibold">
        <DollarSign size={18} className="text-green-500" />
        <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
          ₹ {job.salary} P.A
        </span>
      </div>

    </div>

  </CardHeader>

  <CardContent className="flex flex-col gap-3 pt-4 border-t border-gray-200/40 dark:border-white/10">
    
    <div className="flex w-full gap-2">

      <Link href={`/jobs/${job.job_id}`} className="flex-1">
        <Button 
          variant={"outline"} 
          className="w-full gap-2 rounded-lg border-purple-400/40 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300 group/btn"
        >
          View Details
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Button>
      </Link>

      {user && user.role === "jobseeker" && (
        <>

         {btnLoading ?(
          <div className="flex-1 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
          </div>
        ):(<>
          {applied ? (
            <div className="flex-1 flex items-center justify-center gap-2 text-green-600 font-medium text-sm bg-green-100 dark:bg-green-900/30 rounded-lg px-3 py-2 animate-fadeIn">
              <CheckCircle size={15} />
              Applied
            </div>
          ) : (
            <>
              {job.is_active !== false && (
                <Button
                  disabled={btnLoading}
                  onClick={() => applyJobHandler(job.job_id)}
                  className="flex-1 gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Briefcase size={16} />
                  Apply
                </Button>
              )}
            </>
          )}
        
        </>)}


          
        </>
      )}

    </div>

    {job.is_active === false && (
      <div className="w-full text-center text-sm text-red-600 bg-red-100 dark:bg-red-900/30 rounded-lg px-3 py-2 font-medium animate-pulse">
        Position Closed
      </div>
    )}

  </CardContent>
</Card>
  );
};

export default JobCard;
