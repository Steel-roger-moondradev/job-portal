"use client";
import { Job } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { job_service, useappdata } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Briefcase, Filter, MapPin, Search, X } from "lucide-react";
import Loading from "@/components/ui/loading";
import JobCard from "@/components/ui/jobcard";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


const JobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const{isAuth, loading: authLoading}=useappdata();
const router = useRouter();

useEffect(() => {
  if (authLoading) return;
  if (!isAuth) {
    router.push("/login");
  }
}, [isAuth, authLoading, router]);


  const token = Cookies.get("token");
  const ref = useRef<HTMLButtonElement>(null);

  async function fetchJobs() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/all?title=${title}&location=${location}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(()=>{
        fetchJobs();
  },[title,location])

  const clickEvent = () => {
    ref.current?.click();
  };

  const clearFilter = () => {
    setTitle("");
    setLocation("");
    fetchJobs();
    ref.current?.click();
  };

  const hasActiveFilters = title || location;
  return (
  <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/40 text-foreground">
  <div className="max-w-7xl mx-auto px-4 py-12">
    
    <div className="mb-10">
      
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Explore{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              Opportunities
            </span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {jobs.length} 
            {jobs.length===1 ? " job" : " jobs"}
          </p>
        </div>

        <Button
          className="gap-2 h-11 px-5 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.03] active:scale-95 transition-all duration-300"
          onClick={clickEvent}
        >
          <Filter size={18} /> Filters
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-background text-indigo-600 dark:text-indigo-400 text-xs font-semibold shadow-sm border border-border/60">
              Active
            </span>
          )}
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap mb-5 animate-fadeIn">
          <span className="text-sm text-muted-foreground">
            Active Filters:
          </span>

          {title && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-background/60 backdrop-blur-md 
            border border-border/60 shadow-md 
            text-indigo-600 dark:text-indigo-400 text-sm hover:scale-105 transition-all duration-300">
              <Search size={14} />
              {title}
              <button
                onClick={() => setTitle("")}
                className="hover:bg-muted rounded-full p-0.5 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {location && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-background/60 backdrop-blur-md 
            border border-border/60 shadow-md 
            text-indigo-600 dark:text-indigo-400 text-sm hover:scale-105 transition-all duration-300">
              <MapPin size={14} />
              {location}
              <button
                onClick={() => setLocation("")}
                className="hover:bg-muted rounded-full p-0.5 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          {jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {jobs.map((job) => (
                    <div key={job.job_id} className="flex justify-center group animate-fadeInUp transition-all duration-500 hover:-translate-y-2">
                  <JobCard job={job} />
                    </div>
                
              ))}
            </div>
          ) : (
            <div className="text-center py-24 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
              bg-linear-to-br from-muted to-background 
              mb-5 shadow-inner animate-pulse">
                <Briefcase size={40} className="opacity-40" />
              </div>

              <h3 className="text-2xl font-semibold mb-2 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                No Jobs found
              </h3>
            </div>
          )}
        </>
      )}
    </div>

    <Dialog>
      <DialogTrigger asChild>
        <Button ref={ref} className="hidden"></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-2xl 
      bg-background/80 backdrop-blur-xl 
      shadow-2xl border border-border/60 
      animate-scaleIn">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            <Filter />
            Filter Jobs
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Search size={16} />
              Search by job title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter job title"
              className="h-11 rounded-lg border border-border bg-background/70 
              focus:ring-2 focus:ring-indigo-400 focus:border-transparent 
              transition-all duration-300 shadow-sm hover:shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin size={16} />
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter location"
              className="h-11 rounded-lg border border-border bg-background/70 
              focus:ring-2 focus:ring-indigo-400 focus:border-transparent 
              transition-all duration-300 shadow-sm hover:shadow-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

        </div>

        <DialogFooter className="gap-2">
          <Button
            variant={"outline"}
            onClick={clearFilter}
            className="flex-1 rounded-lg border-indigo-400/40 
            hover:bg-linear-to-r hover:from-indigo-500 hover:to-purple-500 
            hover:text-white transition-all duration-300"
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </div>
</div>
  );
};

export default JobsPage;
