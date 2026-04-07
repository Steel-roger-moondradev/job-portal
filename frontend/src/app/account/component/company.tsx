"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  X,
  Loader2,
  Building2,
  Globe,
  Image,
  ArrowUpRight,
} from "lucide-react";
import { Company, CompanyProps } from "@/type";
import { job_service } from "@/context/AppContext";
import Link from "next/link";

const CompanyPage: React.FC<CompanyProps> = ({isAuthorised}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

 

  const fetchCompanies = async () => {
     const token = Cookies.get("token");
       if(!token) {
        toast.error("Unauthorized");
        return;
       }
    try {
      
      setLoading(true);
      const { data } = await axios.get(`${job_service}/api/job/company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAdd = async () => {
    if (!name || !website || !logo) {
      return toast.error("All required fields missing");
    }
    const token = Cookies.get("token");
       if(!token) {
        toast.error("Unauthorized");
        return;
       }
    try {  
      setLoading(true);
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("website", website);
      formdata.append("file", logo);

      const { data } = await axios.post(
        `${job_service}/api/job/add/company`,
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(data.message);
      setOpen(false);
      setName("");
      setDescription("");
      setWebsite("");
      setLogo(null);
      fetchCompanies();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Deleting this company?`)) return;
    const token = Cookies.get("token");
       if(!token) {
        toast.error("Unauthorized");
        return;
       }
    try {  
      setLoading(true);
      const { data } = await axios.put(
        `${job_service}/api/job/delete/${name}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(data.message);
      fetchCompanies();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">

      <div className="max-w-5xl mx-auto px-4 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Building2 className="text-indigo-500" size={20} />
            Companies
          </h1>

          {isAuthorised && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white 
              hover:bg-indigo-600 shadow-md hover:shadow-indigo-500/30 
              active:scale-95 transition-all duration-150"
            >
              <Plus size={16} /> Add Company
            </button>
          )}
        </div>

        {/* COMPANY LIST */}
        <div className="grid grid-cols-1 gap-6">

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
            </div>
          ) : companies.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No companies found.
            </p>
          ) : (
            companies.map((c) => (
              <div
                key={c.name}
                className="w-full flex items-center justify-between gap-6
                p-6 min-h-[110px] rounded-2xl border border-gray-200 dark:border-gray-700
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                shadow-sm hover:shadow-xl hover:shadow-indigo-500/10
                transition-all duration-300 hover:-translate-y-1"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={c.logo || "/default-logo.png"}
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                      {c.name}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {c.description || "No description"}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

          {/* WEBSITE URL */}
        <div
          onClick={() =>
            window.open(
              c.website?.startsWith("http")
                ? c.website
                : `https://${c.website}`,
              "_blank"
            )
          }
          className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-300 
          cursor-pointer hover:underline truncate max-w-[200px]"
        >
          <Globe size={14} />
          {c.website?.startsWith("http")
            ? c.website
            : `https://${c.website}`}
        </div>

        {/* ROUTE ICON */}
        <Link href={`/company/${c.company_id}`}>
        <button
          onClick={() => 
            <ArrowUpRight size={16} />
          }
          className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 
          text-indigo-600 dark:text-indigo-300 hover:scale-105 transition"
        >
          <ArrowUpRight size={16} />
        </button>
        </Link>

        {/* DELETE */}
        <button
          onClick={() => handleDelete(c.name)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900 active:scale-90 transition"
        >
          <Trash2 size={16} />
        </button>

      </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {open && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center 
    bg-black/60 backdrop-blur-md animate-[fadeIn_0.25s_ease]"
    onClick={(e) => e.target === e.currentTarget && setOpen(false)}
  >
    <div
      className="relative w-full max-w-md p-[1px] rounded-2xl
      bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500
      animate-[scaleIn_0.25s_ease]"
    >
      {/* INNER CARD */}
      <div className="rounded-2xl bg-white/90 dark:bg-[#0f1117]/90 backdrop-blur-xl 
      p-6 shadow-2xl border border-white/20 dark:border-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Plus className="text-indigo-500" size={18} />
            Add Company
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">

          {/* NAME */}
          <div className="relative">
            <input
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border 
              bg-white/70 dark:bg-gray-800/70
              focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <Building2 className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>

          {/* WEBSITE */}
          <div className="relative">
            <input
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border 
              bg-white/70 dark:bg-gray-800/70
              focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <Globe className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>

          {/* FILE */}
          <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border 
bg-white/70 dark:bg-gray-800/70">

  {/* LEFT: FILE NAME */}
  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
    <Image size={16} className="text-gray-400 shrink-0" />
    <span className="truncate">
      {logo ? logo.name : "No file chosen"}
    </span>
  </div>

  {/* RIGHT: BUTTON */}
  <label className="cursor-pointer px-3 py-1.5 text-sm rounded-lg
  bg-indigo-500 text-white hover:bg-indigo-600 transition">
    Choose File
    <input
      type="file"
      className="hidden"
      onChange={(e) =>
        setLogo(e.target.files ? e.target.files[0] : null)
      }
    />
  </label>

</div>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2.5 rounded-lg border 
            bg-white/70 dark:bg-gray-800/70
            focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleAdd}
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-500 text-white
            hover:scale-[1.02] active:scale-95
            shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Adding...
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Company
              </>
            )}
          </button>

        </div>
      </div>
    </div>

   
  </div>
)}
    </div>
  );
};

export default CompanyPage;