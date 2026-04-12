"use client";

import { FileEdit, Mail, Phone, BookOpen, Plus, X, Sparkles, RefreshCcw, AlertTriangle, CheckCircle2, Crown } from "lucide-react";
import {InfoProps, LoginResponse} from "../../../type"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useappdata, user_service,} from "@/context/AppContext";
import { useRouter } from "next/navigation";

const Info : React.FC<InfoProps>= ({ user:profileUser, isAuthorised }) => {
    const[open,setOpen]=useState(false);
    const profileupdate=useRef<HTMLInputElement>(null);
    const resumeupdate=useRef<HTMLInputElement>(null);
    const[email,setEmail]=useState("");
    const[phone_number,setPhone_number]=useState("");
    const[name,setName]=useState("");
    const[bio,setBio]=useState("");
    const router=useRouter();
    const{profileUpdatepic,ResumeUpdate,profileUpdate,btnloadingR,btnLoading,btnLoadingE}=useappdata();

    const ResumeButton =()=>{
      resumeupdate?.current?.click()
    }

    const handleProfileUpdates =async(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e?.target?.files?.[0];
      if(file){
      const formData=new FormData();
      formData.append("file",file);
        profileUpdatepic(formData);
      }
    }

    const handleResumeUpdates =async(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e?.target?.files?.[0];
      if(file){
      const formData=new FormData();
      formData.append("file",file);
      ResumeUpdate(formData)}
    }

    const SubmitChanges=async ()=>{
       profileUpdate(name,phone_number,bio,email);
    }

    const editprofile=async()=>{
      setName(profileUser!.name);
      setEmail(profileUser!.email);
      setBio(profileUser? profileUser.bio ? profileUser.bio:"" :"")
      setPhone_number(profileUser!.phone_number);
    }

    const isyourAccount=isAuthorised;

  return (
<div className="w-full p-6 bg-linear-to-br from-[#f8f9ff] via-[#eef1ff] to-[#f0f4ff] dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">
  <div className="w-full max-w-4xl bg-white/85 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(99,102,241,0.10)] dark:shadow-[0_8px_40px_rgba(99,102,241,0.15)] rounded-3xl p-6 border border-white/70 dark:border-gray-700/50">

    {/* Header */}
    <div className="flex justify-between items-center mb-3">
      {isAuthorised ?
      <>
      <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tracking-tight">
        My Profile
      </h1>
      </>:
      <>
      <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tracking-tight">
        {profileUser?.name}'s Profile
      </h1>
      </>
    }

    {
        isAuthorised ?
        <>
            {/* Dialog Trigger */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
  <button
    onClick={editprofile}
    disabled={btnLoadingE}
    className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
      ${btnLoading 
        ? "bg-gray-400 cursor-not-allowed shadow-none" 
        : "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)] active:scale-95"
      }`}
  >
    {btnLoadingE ? (
      <>
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        Updating...
      </>
    ) : (
      <>
        <FileEdit size={15} />
        Edit Profile
      </>
    )}
  </button>
</DialogTrigger>

        <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 shadow-[0_20px_60px_rgba(99,102,241,0.18)] dark:shadow-[0_20px_60px_rgba(99,102,241,0.25)]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Username</Label>
              <Input
                type="text"
                placeholder="Enter username"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>

              
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</Label>
              <Input
                type="text"
                placeholder="Enter phone number"
                value={phone_number}
                onChange={(e)=>{setPhone_number(e.target.value)}}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            {profileUser?.role === "jobseeker" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bio</Label>
                <Input
                  type="text"
                  placeholder="Enter Bio"
                  value={bio}
                onChange={(e)=>{setBio(e.target.value)}}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>)}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => { SubmitChanges(); setOpen(false); }}
                className="bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-xl shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:opacity-95 active:scale-97 transition-all"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
        </>
        :
        <></>
    }
      
    </div>

    {/* Profile Section */}
    <div className="flex items-center gap-8 mb-8 p-6 bg-linear-to-r from-indigo-50/80 to-violet-50/80 dark:from-indigo-950/40 dark:to-violet-950/40 rounded-2xl border border-indigo-100/60 dark:border-indigo-800/30">
      {isAuthorised ?
      <>
       <div className="relative group flex-shrink-0" onClick={()=>{!btnLoading&&profileupdate?.current?.click()}}>
        <img
          src={profileUser?.profile_pic ? `${profileUser?.profile_pic}?t=${Date.now()}`: "/profile.jpg"}
          className={`w-24 h-24 rounded-full object-cover border-3 border-white dark:border-gray-800 shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all duration-300 ${btnLoading ? "opacity-50" : "group-hover:scale-105"}` }
        />
        <input type="file" className="hidden" accept="image/*" ref={profileupdate} onChange={(e)=>{handleProfileUpdates(e)}}></input>
        <div className="absolute bottom-0.5 right-0.5 bg-indigo-500 w-7 h-7 flex items-center justify-center rounded-full shadow-[0_2px_8px_rgba(99,102,241,0.4)] group-hover:scale-110 transition text-white text-xs">
          ✎
        </div>
        {btnLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white text-xs">
            Uploading...
          </div>
        )}
      </div>
      </> :
      <>
      <div className="relative group flex-shrink-0">
        <img
          src={profileUser?.profile_pic ? `${profileUser?.profile_pic}?t=${Date.now()}`: "/profile.jpg"}
          className="w-24 h-24 rounded-full object-cover border-3 border-white dark:border-gray-800 shadow-[0_4px_16px_rgba(99,102,241,0.2)] group-hover:scale-105 transition-all duration-300"
        />
      </div>
      </>}

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{profileUser?.name}</h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100/70 dark:bg-indigo-900/40 px-3 py-1 rounded-full w-fit">
          {profileUser?.role}
        </span>
      </div>
    </div>

    {
        isAuthorised ?
        <>
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

  {profileUser?.email && (
    <div>
      <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
        Email
      </label>
      <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 text-sm font-medium">
        <Mail size={15} className="text-indigo-300 dark:text-indigo-500 flex-shrink-0" />
        {profileUser.email}
      </div>
    </div>
  )}

  {profileUser?.phone_number && (
    <div>
      <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
        Phone
      </label>
      <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 text-sm font-medium">
        <Phone size={15} className="text-indigo-300 dark:text-indigo-500 flex-shrink-0" />
        {profileUser.phone_number}
      </div>
    </div>
  )}

</div>
          

          {/* Bio Section */}
          {profileUser?.role === "jobseeker" && (
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                Bio
              </label>
              <div className="group flex items-center gap-3.5 p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all duration-200">

              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors duration-200">
                <BookOpen size={14} className="text-indigo-400 dark:text-indigo-500" />
              </div>

              <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                {profileUser?.bio || "Empty bio"}
              </div>

            </div>
          </div>)}

          {/* Resume Section */}
          {profileUser?.role === "jobseeker" && (
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Resume</label>
              <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800/60 rounded-xl border-2 border-dashed border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-900 rounded-xl flex items-center justify-center text-lg">
                    📄
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">Current Resume</p>
                  <a href={profileUser?.resume ?? ""}>
                    {profileUser?.resume
                      ? <span className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 hover:underline">Resume.pdf</span>
                      : <span className="text-sm text-gray-300 dark:text-gray-600">No resume uploaded</span>
                    }
                  </a>
                </div>
              </div>
                
              { !btnloadingR ? <>
               <input type="file" accept=".pdf,.doc,.docx" id="resumeUpload" className="hidden" ref={resumeupdate} onChange={handleResumeUpdates}  />
              <button onClick={ResumeButton}
                className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-xl shadow-[0_3px_10px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(99,102,241,0.4)] active:scale-95 transition-all duration-200 flex-shrink-0"
              >
                Update Resume
              </button>
              </>
              :
              <>
               <button
                  disabled={btnloadingR}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl flex-shrink-0 transition-all duration-200 "bg-gray-400 text-gray-200 cursor-not-allowed opacity-70 shadow-none"hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(99,102,241,0.4)] active:scale-95"
                  `}
                >
                  {"Updating..."}
                </button>
              </>
               }
            </div>
          </div>)}
          
        </>
        :
        <>

          {/* Info Grid */}
          {
            isAuthorised && (
              <> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
              <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all">
                <Mail size={15} className="text-indigo-300 dark:text-indigo-500 flex-shrink-0" />
                {profileUser?.email}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Phone</label>
              <div className="flex items-center gap-2.5 p-3.5 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all">
                <Phone size={15} className="text-indigo-300 dark:text-indigo-500 flex-shrink-0" />
                {profileUser?.phone_number}
              </div>
            </div>
          </div>
              </>
            )
          }
          


          {/* Resume Section */}
          {profileUser?.role === "jobseeker" && (
            <div>
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Resume</label>
              <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800/60 rounded-xl border-2 border-dashed border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-indigo-50 to-violet-100 dark:from-indigo-950 dark:to-violet-900 rounded-xl flex items-center justify-center text-lg">
                    📄
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5">Current Resume</p>
                  <a href={profileUser?.resume ?? ""}>
                    {profileUser?.resume
                      ? <span className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 hover:underline">Resume.pdf</span>
                      : <span className="text-sm text-gray-300 dark:text-gray-600">No resume uploaded</span>
                    }
                  </a>
                </div>
              </div>
            </div>
          </div>)}

          {/* Bio Section for non-authorised view */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
              Bio
            </label>
            <div className="group flex items-start gap-3.5 p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700/60 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.07)] dark:hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)] transition-all duration-200">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mt-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors duration-200">
                <BookOpen size={14} className="text-indigo-400 dark:text-indigo-500" />
              </div>
              <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                {profileUser?.bio || "Empty bio"}
              </div>
            </div>
          </div>
        </>
    }

    {/* subscription section */}
    {
  profileUser && isAuthorised && (
  <>
    {profileUser.role === "jobseeker" && (
      <div className="mt-10 animate-in fade-in duration-500">
        <h2 className="text-xl font-semibold mt-4 flex items-center gap-2 tracking-tight">
          <Crown size={22} className="text-blue-600 animate-pulse" />
          Subscription Status
        </h2>

        <div className="mt-4 p-6 rounded-2xl 
        bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 
        dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20
        shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/40 dark:border-white/10 backdrop-blur-sm">

          {!profileUser.subscription ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-lg mb-1">
                    No Active Subscription
                  </p>
                  <p className="text-sm opacity-70">
                    Subscribe to unlock premium features and benefits
                  </p>
                </div>

                <Button
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                  hover:scale-105 hover:shadow-lg transition-all duration-300"
                  onClick={() => router.push("/subscribe")}
                >
                  <Crown size={18} />
                  Subscribe Now
                </Button>
              </div>
            </>
          ) : new Date(profileUser.subscription).getTime() > Date.now() ? (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2
                    size={22}
                    className="text-green-600 animate-bounce"
                  />
                  <p className="font-semibold text-lg text-green-600">
                    Active Subscription
                  </p>
                </div>

                <p className="text-sm opacity-70">
                  Valid until:{" "}
                  {new Date(profileUser.subscription).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 px-5 py-2 rounded-full 
              bg-green-600 text-white font-medium shadow-md 
              hover:scale-105 transition-all duration-300">
                <CheckCircle2 size={18} />
                Subscribed
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle
                      size={22}
                      className="text-red-600 animate-pulse"
                    />
                    <p className="font-semibold text-lg text-red-600">
                      Subscription Expired
                    </p>
                  </div>

                  <p className="text-sm opacity-70">
                    Expired On:{" "}
                    {new Date(profileUser.subscription).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <Button
                  variant={"destructive"}
                  className="gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300"
                  onClick={() => router.push("/subscribe")}
                >
                  <RefreshCcw size={18} />
                  Renew Subscription
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </>
)}

  </div>
</div>
  );
};

export default Info;
