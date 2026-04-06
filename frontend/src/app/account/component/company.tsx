"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Plus, Trash2, ExternalLink, X } from "lucide-react";
import { Company, InfoProps } from "@/type";
import { job_service } from "@/context/AppContext";
import { clear } from "console";



const CompanyPage:React.FC<InfoProps> = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
 const[name,setName]=useState("");
 const[description,setDescription]=useState("");
 const[website,setWebsite]=useState("");
  const[logo,setLogo]=useState<File|null>(null);

  const token = Cookies.get("token");
  const isAuthorised = !!token;

  // ================= FETCH =================
  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/company`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      cleardata();
      console.log(data);
      setCompanies(data.companies);
    } catch (err) {
      console.error(err);
    }
  };

  const cleardata = () => {
    setName("");
    setDescription("");
    setWebsite("");
    setLogo(null);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ================= ADD =================
  const handleAdd = async () => {
    if (!name || !website || !logo) {
      return toast.error("All required fields missing");
    }

    try {
      setLoading(true);
      const formdata=new FormData();
      formdata.append("name",name);
      formdata.append("description",description);
      formdata.append("website",website);
      formdata.append("file",logo);
      const { data } = await axios.post(
        `${job_service}/api/job/add/company`,
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data.message);
      setOpen(false);
      cleardata();
      fetchCompanies();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (name: string) => {
    if (!confirm(`Deleting this company?`)) return;

    try {
            setLoading(true);
      const { data } = await axios.put(
        `${job_service}/api/job/delete/${name}`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(data.message);
      cleardata();
      fetchCompanies();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-6 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Companies
        </h1>

        {isAuthorised && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            <Plus size={16} /> Add Company
          </button>
        )}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!companies ? (
          <p className="text-gray-500 dark:text-gray-400">
            No companies found.
          </p>
        ) : (
          companies.map((c,index) => (
            <div
              key={c.name}
              className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
            >
              {/* HEADER */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={c.logo || "/default-logo.png"}
                alt={c.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h2 className="font-semibold text-gray-700 dark:text-gray-200">
                {c.name}
              </h2>
            </div>

            {/* DESC */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {c.description || "No description"}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-between items-center">
              <a
                href={c.website?.startsWith("http") ? c.website : `https://${c.website}`}
                target="_blank"
                className="flex items-center gap-1 text-indigo-500 hover:underline text-sm"
              >
                Visit <ExternalLink size={14} />
              </a>

              {isAuthorised && (
                <button
                  onClick={() => handleDelete(c.name)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        )))}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200">
                Add Company
              </h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />

              <input
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input"
              />

              <input
                placeholder="Logo URL"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setLogo(e.target.files ? e.target.files[0] : null)
                }
                className="input"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="input"
              />

              <button
                onClick={handleAdd}
                disabled={loading}
                className="mt-2 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
              >
                {loading ? "Adding..." : "Add Company"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: transparent;
        }
        .dark .input {
          border-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default CompanyPage;