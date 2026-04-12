"use client";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { job_service, useappdata } from "@/context/AppContext";
import { Company, Job } from "@/type";
import axios from "axios";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Laptop,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/ui/loading";

const CompanyPage = () => {
  const { id } = useParams();
  const token = Cookies.get("token");

  const { user, isAuth } = useappdata();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);

  async function fetchCompany() {
    setLoading(true);
    try {
      
      const { data } = await axios.get(`${job_service}/api/job/all/${id}`);
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const isRecruiterOwner =
    user && company && user.user_id === company.recruiter_id;

  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const addModalRef = useRef<HTMLButtonElement>(null);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [salary, setsalary] = useState("");
  const [location, setlocation] = useState("");
  const [openings, setopenings] = useState("");
  const [job_type, setjob_type] = useState("");
  const [work_location, setwork_location] = useState("");
  const [is_active, setis_active] = useState(true);

  const clearInput = () => {
    settitle("");
    setdescription("");
    setrole("");
    setsalary("");
    setlocation("");
    setopenings("");
    setjob_type("");
    setwork_location("");
    setis_active(true);
  };

  const addJobHandler = async () => {
    setBtnLoading(true);
    try {
      const jobData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        company_id: id,
      };

      await axios.post(`${job_service}/api/job/add/job`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("New job posted successfully");
      fetchCompany();
      clearInput();
      addModalRef.current?.click();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };


  const handleOpenUpdateModal = (job: Job) => {
    setSelectedJob(job);
    settitle(job.title);
    setdescription(job.description);
    setrole(job.role);
    setsalary(String(job.salary || ""));
    setlocation(job.location || "");
    setopenings(String(job.openings));
    setjob_type(job.job_type);
    setwork_location(job.work_location);
    setis_active(job.is_active);
    setIsUpdatedModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdatedModalOpen(false);
    setSelectedJob(null);
    clearInput();
  };

  const updateJobHandler = async () => {
    if (!selectedJob) return;

    setBtnLoading(true);
    try {
      const updateData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        is_active,
      };

      await axios.put(
        `${job_service}/api/job/update/${selectedJob.job_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job updated successfully");
      fetchCompany();
      handleCloseUpdateModal();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <Loading />;
if (company==null) return null;

if (company.jobs==null) {
  return <Loading />;
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {company && (
        <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-up">
          {/* Company Card */}
          <Card className="overflow-hidden shadow-md border border-gray-200 dark:border-white/10 mb-4 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 bg-white/90 dark:bg-white/5 backdrop-blur-xl rounded-2xl hover:-translate-y-0.5">
  
  {/* subtle top accent instead of empty strip */}
  <div className="h-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 dark:from-indigo-400/20 dark:via-purple-500/20 dark:to-indigo-400/20 animate-gradient"></div>

  <div className="px-6 pb-6">
    <div className="flex flex-col md:flex-row gap-5 items-start md:items-end -mt-12">

      <div className="w-24 h-24 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-md bg-white dark:bg-gray-800 shrink-0 ring-2 ring-indigo-200 dark:ring-indigo-500/20 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/20 animate-float-slow">
        <img
          src={company.logo || "/profile.jpeg"}
          onError={(e) => {
            e.currentTarget.src = "/profile.jpeg";
          }}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 md:mb-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
          {company.name}
        </h1>

        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mt-2">
          {company.description}
        </p>
      </div>

      <Link href={company?.website ? company.website.startsWith('http') ? company.website : `https://${company.website}` : "#"} target="_blank" className="md:mb-2">
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 text-sm px-5 py-2 rounded-lg border-gray-300 dark:border-white/20 bg-white/70 dark:bg-white/5 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 hover:border-indigo-400 dark:hover:border-indigo-500/40 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Globe size={14} />
          Visit Website
        </Button>
      </Link>

    </div>
  </div>
</Card>

          {/* STATS */}
      <div className="flex justify-center items-center gap-14 mt-10 mb-12 flex-wrap text-center animate-fade-up-delay">

        <div className="group">
          <p className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {company.jobs?.filter(j => j.is_active).length || 0}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Active Jobs
          </p>
        </div>

        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-white/10 hidden md:block" />

        <div className="group">
          <p className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            {company.jobs?.reduce((sum, j) => sum + (j.is_active ? j.openings : 0), 0) || 0}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Openings
          </p>
        </div>

      </div>

          <Dialog>
            {/* Job section */}
            <Card className="shadow-lg border border-indigo-100/70 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3.5 animate-gradient">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} className="text-white animate-pulse" />
                    <h2 className="text-base font-bold text-white">Open Positions</h2>
                  </div>
                  <p className="text-xs text-white/80">
                    {company.jobs?.length || 0} active job{company.jobs?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {isRecruiterOwner && (
                <div className="p-3.5 border-b border-indigo-100 dark:border-white/10 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20">
                  <DialogTrigger asChild>
                    <Button className="gap-1.5 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg text-xs px-3 py-1.5 h-auto">
                      <Plus size={13} />
                      Post New Job
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-10 duration-300 border border-indigo-100 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
                    <DialogHeader>
                      <DialogTitle className="text-xl flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                        <Briefcase size={20} className="text-indigo-500" />
                        Post a new Job
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="title" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                          <Briefcase size={12} /> Job Title
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Enter Job title"
                          className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="description" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                          <FileText size={12} /> Description
                        </Label>
                        <Input
                          id="description"
                          type="text"
                          placeholder="Enter Description"
                          className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="role" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                          <Building2 size={12} /> Role/Department
                        </Label>
                        <Input
                          id="role"
                          type="text"
                          placeholder="Enter Job Role"
                          className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                          value={role}
                          onChange={(e) => setrole(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="salary" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                            <DollarSign size={12} /> Salary
                          </Label>
                          <Input
                            id="salary"
                            type="number"
                            placeholder="Enter salary"
                            className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                            value={salary}
                            onChange={(e) => setsalary(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="openings" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                            <Users size={12} /> Openings
                          </Label>
                          <Input
                            id="openings"
                            type="number"
                            placeholder="Eg. 5"
                            className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                            value={openings}
                            onChange={(e) => setopenings(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="location" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                          <MapPin size={12} /> Location
                        </Label>
                        <Input
                          id="location"
                          type="text"
                          placeholder="Enter location"
                          className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                          value={location}
                          onChange={(e) => setlocation(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="job_type" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                            <Clock size={12} /> Job Type
                          </Label>
                          <Select value={job_type} onValueChange={setjob_type}>
                            <SelectTrigger className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">full-time</SelectItem>
                              <SelectItem value="part-time">part-time</SelectItem>
                              <SelectItem value="contract">contract</SelectItem>
                              <SelectItem value="internship">internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="work_location" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                            <Laptop size={12} /> Work Location
                          </Label>
                          <Select value={work_location} onValueChange={setwork_location}>
                            <SelectTrigger className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="on-site">on-site</SelectItem>
                              <SelectItem value="remote">remote</SelectItem>
                              <SelectItem value="hybrid">hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button ref={addModalRef} variant="outline" className="transition-all duration-300 hover:scale-105 text-sm border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button disabled={btnLoading} onClick={addJobHandler} className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30">
                        {btnLoading ? "Posting..." : "Post Job"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </div>
              )}

              <div className="p-3.5">
                {
                 loading ?(
                        <div className="p-3 rounded-lg border border-indigo-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-slate-900/70">
                          <Loading />
                        </div>)
                        :
                        (
                          <>
                          {company.jobs && company.jobs.length > 0 ? (
                  <div className="space-y-2">
                    {company.jobs.map((j) => (
                      <div
                        key={j.job_id}
                        className="p-3 rounded-lg border border-indigo-100 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-slate-900/70"
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <h3 className="text-base font-semibold text-gray-800 dark:text-slate-100">{j.title}</h3>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1 transition-all duration-300 ${
                                  j.is_active
                                    ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300"
                                    : "bg-gray-100 text-gray-600 dark:bg-slate-700/40 dark:text-slate-300"
                                }`}
                              >
                                {j.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                {j.is_active ? "Active" : "Inactive"}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 dark:text-slate-300">
                              <div className="flex items-center gap-1 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-300">
                                <Building2 size={11} />
                                <span>{j.role}</span>
                              </div>
                              <div className="flex items-center gap-1 transition-all duration-300 hover:text-green-600 dark:hover:text-green-300">
                                <DollarSign size={11} />
                                <span>{j.salary ? `₹ ${j.salary.toLocaleString()}` : "Not Disclosed"}</span>
                              </div>
                              <div className="flex items-center gap-1 transition-all duration-300 hover:text-red-600 dark:hover:text-red-300">
                                <MapPin size={11} />
                                <span>{j.location}</span>
                              </div>
                              <div className="flex items-center gap-1 transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-300">
                                <Laptop size={11} />
                                <span className="capitalize">{j.work_location} ({j.job_type})</span>
                              </div>
                              <div className="flex items-center gap-1 transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-300">
                                <Users size={11} />
                                <span>{j.openings} openings</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Link href={`/jobs/${j.job_id}`}>
                              <Button variant="outline" size="sm" className="gap-1 rounded-md h-7 text-[11px] transition-all duration-300 hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-400/40 hover:text-indigo-600 dark:hover:text-indigo-300 border-gray-300 dark:border-white/20">
                                <Eye size={11} /> View
                              </Button>
                            </Link>

                            {isRecruiterOwner && (
                              <Button
                                onClick={() => handleOpenUpdateModal(j)}
                                variant="outline"
                                size="sm"
                                className="gap-1 rounded-md h-7 text-[11px] transition-all duration-300 hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:border-purple-300 dark:hover:border-purple-400/40 hover:text-purple-600 dark:hover:text-purple-300 border-gray-300 dark:border-white/20"
                              >
                                <Pencil size={11} />
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 transition-all duration-300 hover:scale-105">
                    <Briefcase className="w-10 h-10 mx-auto text-gray-300 dark:text-slate-500 mb-2 animate-pulse" />
                    <p className="text-sm text-gray-500 dark:text-slate-300">No jobs posted yet</p>
                  </div>
                )}
                          </>
                        )
                }
              </div>
            </Card>
          </Dialog>

          {/* Update Job Modal */}
          <Dialog open={isUpdatedModalOpen} onOpenChange={setIsUpdatedModalOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-10 duration-300 border border-indigo-100 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  <Pencil size={20} className="text-indigo-500" />
                  Update Job
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3 py-2">
                <div className="space-y-1">
                  <Label htmlFor="edit-title" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                    <Briefcase size={12} /> Job Title
                  </Label>
                  <Input
                    id="edit-title"
                    type="text"
                    placeholder="Enter Job title"
                    className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="edit-description" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                    <FileText size={12} /> Description
                  </Label>
                  <Input
                    id="edit-description"
                    type="text"
                    placeholder="Enter Description"
                    className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="edit-role" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                    <Building2 size={12} /> Role/Department
                  </Label>
                  <Input
                    id="edit-role"
                    type="text"
                    placeholder="Enter Job Role"
                    className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="edit-salary" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                      <DollarSign size={12} /> Salary
                    </Label>
                    <Input
                      id="edit-salary"
                      type="number"
                      placeholder="Enter salary"
                      className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                      value={salary}
                      onChange={(e) => setsalary(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="edit-openings" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                      <Users size={12} /> Openings
                    </Label>
                    <Input
                      id="edit-openings"
                      type="number"
                      placeholder="Eg. 5"
                      className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                      value={openings}
                      onChange={(e) => setopenings(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="edit-location" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                    <MapPin size={12} /> Location
                  </Label>
                  <Input
                    id="edit-location"
                    type="text"
                    placeholder="Enter location"
                    className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="edit-job_type" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                      <Clock size={12} /> Job Type
                    </Label>
                    <Select value={job_type} onValueChange={setjob_type}>
                      <SelectTrigger className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="edit-work_location" className="text-xs font-medium flex items-center gap-1 text-gray-700 dark:text-slate-300">
                      <Laptop size={12} /> Work Location
                    </Label>
                    <Select value={work_location} onValueChange={setwork_location}>
                      <SelectTrigger className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-700 dark:text-slate-300">Status</Label>
                    <Select
                      value={is_active ? "true" : "false"}
                      onValueChange={(value) => setis_active(value === "true")}
                    >
                      <SelectTrigger className="h-9 text-sm bg-white dark:bg-slate-950/70 border-gray-200 dark:border-white/10 text-gray-900 dark:text-slate-100 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-400">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="transition-all duration-300 hover:scale-105 text-sm border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10">Cancel</Button>
                </DialogClose>
                <Button disabled={btnLoading} onClick={updateJobHandler} className="transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30">
                  {btnLoading ? "Updating..." : "Update Job"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out both;
        }
        .animate-fade-up-delay {
          animation: fadeUp 0.75s ease-out both;
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyPage;