"use client";
import { Card } from "@/components/ui/card";
import { useappdata, user_service } from "@/context/AppContext";
import { Application } from "@/type";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import Loading from "@/components/ui/loading";

interface AppliedJobsProps {
  applications: Application[]|null;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
    const {loading,setApplications} = useappdata();

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return {
          icon: CheckCircle2,
          color: "text-green-600 dark:bg-green-900/30",
          bg: "bg-green-100 dark:bg-green-900/30",
          border: "border-green-200 dark:border-green-800",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600 dark:bg-red-900/30",
          bg: "bg-red-100 dark:bg-red-900/30",
          border: "border-red-200 dark:border-red-800",
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-600 dark:bg-yellow-900/30",
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          border: "border-yellow-200 dark:border-yellow-800",
        };
    }
  };


  
  if(loading||applications==null) return <Loading />;
  return (
  <>
  {applications ? (
  <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
    <Card className="shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden rounded-2xl backdrop-blur bg-white/70 dark:bg-gray-900/70">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-md">
            <Briefcase size={20} className="text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Your Applied Jobs
        </h1>

        <p className="text-sm opacity-90 mt-1">
          {applications.length} applications submitted
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {applications && applications.length > 0 ? (
          <div className="space-y-5">
            {applications.map((a, index) => {
              const statusConfig = getStatusConfig(a.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={a.application_id}
                  className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1 animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    
                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {a.job_title}
                      </h3>

                      <div className="flex flex-wrap gap-3 items-center">
                        
                        {/* Salary */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">
                          <DollarSign size={14} />
                          ₹ {a.job_salary}
                        </div>

                        {/* Status */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${statusConfig.bg} ${statusConfig.border}`}
                        >
                          <StatusIcon
                            size={14}
                            className={`${statusConfig.color}`}
                          />
                          <span className={statusConfig.color}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <Link
                      href={`/jobs/${a.job_id}`}
                      className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <Eye size={16} />
                      View Job
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              No Applications Yet
            </p>
          </div>
        )}
      </div>
    </Card>
  </div>
) : (
  <Loading />
)}
    </>
  );
};

export default AppliedJobs;
