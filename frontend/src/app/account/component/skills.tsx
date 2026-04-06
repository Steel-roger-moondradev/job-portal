"use client";

import { InfoProps } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { user_service } from "@/context/AppContext";
import Cookies from "js-cookie";

const Skills: React.FC<InfoProps> = ({ user: profileUser, isAuthorised }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const skillInputRef = useRef<HTMLInputElement>(null);
  const [adding, setAdding] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const[isAuth,setIsAuth]=useState(false);

  
  useEffect(() => {
    if (profileUser?.skills) {
      setSkills(profileUser.skills);
    }
  }, [profileUser]);

  
  const normalize = (s: string) => s.trim().toLowerCase();

  const handleAddSkill = async () => {
  const skillName = normalize(skillInput);
  if (!skillName) return;

  if (skills.some((s) => normalize(s) === skillName)) {
    toast.error("Skill already added");
    return;
  }

  const updated = [...skills, skillInput.trim()];
  setAdding(true);

  try {
    setIsAuth(true);
    const token=Cookies.get("token");
    if(!token){
    toast.error("Authentication is required");
    return;
  }
    const { data } = await axios.post(`${user_service}/api/user/add/skills`, {skillName},
      {
        headers:{
          Authorization : `Bearer ${token}`,
        }
      });

    setSkills(updated);
    setSkillInput("");
    toast.success(data.message);
  } catch {
    toast.error("Failed to add skill");
    setIsAuth(false);
  } finally {
    setAdding(false);
    skillInputRef.current?.focus();
  }
};

 const handleDeleteSkill = async (index: number) => {
  const skillName = skills[index];
  alert(`Are you sure you want to delete the skill "${skillName}"?`);
  setDeletingIndex(index);
  const token=Cookies.get("token");
  if(!token){
    toast.error("Authentication is required");
    return;
  }
  try {
    setIsAuth(true);
    const { data } = await axios.put(`${user_service}/api/user/delete/skills`, {
      skillName
    },{
    headers:{
      Authorization : `Bearer ${token}`,
    }}
  );
    setSkills((prev) => prev.filter((_, i) => i !== index));
    toast.success(data.message);
  } catch {
    toast.error("Failed to delete skill");
    setIsAuth(false);
  } finally {
    setDeletingIndex(null);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  if (profileUser?.role !== "jobseeker") return null;

  return (
<div className="w-full">
        <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
        Skills
      </label>

<div className="p-4 bg-white/85 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/70 dark:border-gray-700/50">        
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
            <Sparkles size={14} className="text-indigo-400 dark:text-indigo-500" />
          </div>

          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {skills.length === 0
              ? "No skills listed"
              : `${skills.length} skill${skills.length > 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <span className="text-sm text-gray-300 dark:text-gray-600 italic">
              No skills added yet
            </span>
          ) : (
            skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1  bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-800/50"
              >
                {skill}

                {/*  Delete button */}
                {isAuthorised && (
                  <button
                    onClick={() => handleDeleteSkill(index)}
                    disabled={deletingIndex === index}
                    className="ml-1 opacity-60 hover:opacity-100 disabled:opacity-30"
                  >
                    {deletingIndex === index ? (
                      <span className="text-[10px]">...</span>
                    ) : (
                      <X size={12} />
                    )}
                  </button>
                )}
              </span>
            ))
          )}
        </div>
      </div>

      {/*  Input only for authorised */}
      {isAuthorised && (
        <div className="flex items-center gap-2 mt-2">
          <input
            disabled={adding}
            ref={skillInputRef}
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter…"
            className="flex-1 px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo-400"
          />

          <button
            onClick={handleAddSkill}
            disabled={!skillInput.trim() || adding}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition
              ${!skillInput.trim() || adding
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
          >
            {adding ? "Adding..." : <Plus size={15} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Skills;