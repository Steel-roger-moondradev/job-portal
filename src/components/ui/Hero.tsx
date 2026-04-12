"use client"

import { Briefcase, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "./button"
import { useEffect, useState } from "react";
import { Company, Job, User } from "@/type";
import axios from "axios";
import { auth_service, job_service, user_service } from "@/context/AppContext";
import Cookies from "js-cookie";
import Loading from "./loading";




const Hero = () => {
  const[usercount,setUsercount]=useState<number|null>(null);
const[companycount,setCompanyCount]=useState<number|null>(null);
const[jobcount,setJobcount]=useState<number|null>(null);
const[loading,setLoading]=useState(false);


async function fetchAllJobcount(){
  setLoading(true);
  try{
    const {data}=await axios.get<number>(`${job_service}/api/job/getjobcount`);
    setJobcount(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  finally{
    setLoading(false);
  }
  setLoading(false);
}

async function fetchAllCompanyCount(){
  setLoading(true);
  try{
    const {data}=await axios.get<number>(`${job_service}/api/job/getcompanycount`)
    setCompanyCount(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  finally{
    setLoading(false);
  }

  setLoading(false);
}

async function fetchAllUserCount(){
  setLoading(true);
  try{
    const {data}=await axios.get<number>(`${auth_service}/api/auth/getusercount`)
    setUsercount(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  finally{
    setLoading(false);
  }

  setLoading(false);
}

useEffect(()=>{
  fetchAllJobcount();
  fetchAllCompanyCount();
  fetchAllUserCount();
},[]);
if(!usercount||!companycount||!jobcount)return <Loading/>
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background to-muted/40">

      {/* animated blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-200"></div>
      </div>

<div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-24 relative"> 
         <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* LEFT */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">

            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md shadow-sm hover:shadow-md transition">
              <TrendingUp size={16} className="text-indigo-500" />
              <span className="text-sm font-medium">
                #1 Job Platform 
              </span>
            </div>

            {/* heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Find Your Dream Job at{" "}
              <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Work Sphere
              </span>
            </h1>

            {/* description */}
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
              Discover curated opportunities, connect with verified companies, and accelerate your career growth.
            </p>

            {/* stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 w-full">
              {[
                [jobcount, "Active Jobs"],
                [companycount, "Companies"],
                [usercount, "Candidates"],
              ].map(([value, label], i) => (
                <div
                  key={i}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    {value}
                  </h2>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* buttons */}
            <div className="pt-6 flex justify-center md:justify-start gap-3">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="text-base px-8 h-12 gap-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all"
                >
                  <Search size={18} />
                  Browse Jobs
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 h-12 gap-2 hover:bg-muted/50 transition"
                >
                  <Briefcase size={18} />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* trust */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-4 flex-wrap">
              <span className="flex items-center gap-1">✔ Free</span>
              <span>•</span>
              <span className="flex items-center gap-1">✔ Verified</span>
              <span>•</span>
              <span className="flex items-center gap-1">✔ Secure</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 relative">
            <div className="relative group">

              {/* glow */}
              <div className="absolute inset-4 bg-linear-to-r from-indigo-500 to-purple-500 opacity-20 blur-2xl group-hover:opacity-30 transition"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-muted">
                <img
                  src="/hero.jpeg"
                  alt="hero"
                  className="object-cover w-full h-full transform transition duration-700 group-hover:scale-105 group-hover:-translate-y-1"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero