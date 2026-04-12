"use client";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service, useappdata, user_service } from "@/context/AppContext";
import { Application, Job } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  DollarSign,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import  { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";







const JobPage = () => {
  const { id } = useParams();
  const { user,  btnLoading,setBtnloading ,isAuth,loading:authloading} = useappdata();
  const router = useRouter();

  useEffect(() => {
    if (authloading) return;
    if (!isAuth) {
      router.replace('/login');
    }
  }, [authloading, isAuth, router]);

  const [job, setJob] = useState<Job | null>(null);

  const [applied, setApplied] = useState(false);
const[applications,setApplications]=useState<Application[]>([]);


    const applyJob = async (id: number) => {
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
        catch (error) {
            toast.error("Failed to apply for job");
        }
        finally {
            setBtnloading(false);
        }
    };


    useEffect(() => {
        if(user){
            fetchApplications();
        }
    }, [user]);


  useEffect(() => {
    if (applications && id) {
      applications.forEach((item: any) => {
        if (item.job_id.toString() === id) setApplied(true);
      });
    }
  }, [applications, id]);

  const applyJobHandler = (id: number) => {
    applyJob(id);
  };

  const [loading, setLoading] = useState(true);

  async function fetchSingleJob() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${job_service}/api/job/single/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleJob();
  }, [id]);

  const [jobApplications, setJobApplications] = useState<Application[]>([]);

  const token = Cookies.get("token");

  async function fetchJobApplications() {
    setBtnloading(true);
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/getalljobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobApplications(data.applications);
    } catch (error) {
      console.log(error);
    }
    finally{
      setBtnloading(false);
    }
  }

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recruiter_id) {
      fetchJobApplications();
    }
  }, [user, job]);

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredApplications =
    filterStatus === "All"
      ? jobApplications
      : jobApplications.filter((app) => app.status === filterStatus);

  const [value, setValue] = useState("");

  const updateApplicationHandler = async (id: number) => {
    if (value === "") return toast.error("Please give valid value");
    setBtnloading(true);
    try {
      const { data } = await axios.put(
        `${job_service}/api/job/select/${id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchJobApplications();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }finally {
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
      const { data } = await axios.get(`${user_service}/api/user/allapplications`,
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
  return (
  <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/40 text-foreground">
  {loading ? (
    <Loading />
  ) : (
    <>
      {job && (
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Button
            variant={"ghost"}
            className="mb-6 gap-2 hover:scale-105 transition-all duration-300 hover:bg-muted/60"
            onClick={() => router.back()}
          >
            <ArrowRight size={18} /> Back to jobs
          </Button>

          <Card className="overflow-hidden shadow-xl border border-border/60 backdrop-blur-md bg-background/70 mb-8 transition-all duration-500 hover:shadow-2xl">

            {/* HEADER */}
            <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 p-8 border-b border-border/40">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-sm font-medium backdrop-blur-md shadow-sm ${
                        job.is_active
                          ? "bg-green-500/15 text-green-600 dark:text-green-400"
                          : "bg-red-500/15 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {job.is_active ? "Open" : "Closed"}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                    {job.title}
                  </h1>

                  <div className="flex items-center gap-2 text-base text-white/80 mb-2">
                    <Building2 size={18} />
                    <span>Company Name</span>
                  </div>
                </div>
{btnLoading ?(
     <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
):(<>
                {user && user.role === "jobseeker" && (
                  <div className="shrink-0">
                    {applied ? (
                      <div className="flex items-center bg-white dark:bg-gray-800 gap-2 px-6 py-3 rounded-xl bg-green-500/15 text-green-600 dark:text-green-400 font-medium shadow-md backdrop-blur-md border border-green-500/30">
                        <CheckCircle2 size={20} />
                        Already Applied
                      </div>
                    ) : (
                      <>
                        {job.is_active && (
                          <Button
                            onClick={() => applyJobHandler(job.job_id)}
                            disabled={btnLoading}
                            className="gap-2 h-12 px-8 bg-white dark:bg-gray-800 rounded-xl bg-background text-indigo-600 dark:text-indigo-400 font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 border border-border/60"
                          >
                            <Briefcase size={18} />
                            {btnLoading ? "Applying..." : "Easy Apply"}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                )}
                </>)}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                
                {/* CARD ITEM */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 text-white shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs opacity-70 font-medium mb-1">
                      Location
                    </p>
                    <p className="font-semibold">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 text-white shadow-md">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-xs opacity-70 font-medium mb-1">
                      Salary
                    </p>
                    <p className="font-semibold">₹{job.salary} P.A</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 text-white shadow-md">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs opacity-70 font-medium mb-1">
                      Openings
                    </p>
                    <p className="font-semibold">{job.openings} postions</p>
                  </div>
                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  <Briefcase size={24} />
                  Job Description
                </h2>

                <div className="p-6 rounded-xl bg-background/60 backdrop-blur-md border border-border/60 shadow-inner">
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )}

  {/* APPLICATION SECTION */}
  {user && job && user.user_id === job.posted_by_recruiter_id && (
    <div className="w-[90%] md:w-2/3 container mx-auto mt-10 mb-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          All Applications
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="filter-status" className="text-sm font-medium">
            Filter:
          </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-border rounded-lg bg-background/60 backdrop-blur-md shadow-sm text-foreground"
          >
            <option value="All">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {
       ( btnLoading || jobApplications==null)?(
          <div className="p-5 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
            <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
            </div>
        ):(
        <>
      {jobApplications && jobApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((e) => (
            <div
              className="p-5 rounded-xl border border-border/60 bg-background/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
              key={e.application_id}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    e.status === "hired"
                      ? "bg-green-500/15 text-green-600 dark:text-green-400"
                      : e.status === "rejected"
                      ? "bg-red-500/15 text-red-600 dark:text-red-400"
                      : "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
                  }`}
                >
                  {e.status}
                </span>
              </div>

              <div className="flex gap-3 mb-3">
                <Link
                  target="_blank"
                  href={e.resume}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Resume
                </Link>

                <Link
                  target="_blank"
                  href={`/account/${e.applicant_id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Profile
                </Link>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 p-2 border border-border rounded-lg bg-background/60 backdrop-blur-md text-foreground"
                >
                  <option value="">Update status</option>
                  <option value="submitted">Submitted</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>

                <Button
                  disabled={btnLoading}
                  onClick={() =>
                    updateApplicationHandler(e.application_id)
                  }
                  className="bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-all duration-300"
                >
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 opacity-70">
          No application Yet.
        </p>
      )}</>)
      }
    </div>
  )}
</div>
  );
};

export default JobPage;
