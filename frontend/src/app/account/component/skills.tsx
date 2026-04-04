"use client"

import { InfoProps } from '@/type'
import React, { useRef, useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'

const Skills: React.FC<InfoProps> = ({ user: profileUser, isAuthorised }) => {
    const[skills,setSkills]=useState<string[]>(profileUser?.skills || []);
        const[skillInput,setSkillInput]=useState("");
        const[removingIndex,setRemovingIndex]=useState<number|null>(null);
        const[addingSkill,setAddingSkill]=useState(false);
        const skillInputRef=useRef<HTMLInputElement>(null);

         // Skill handlers — logic left empty for you to wire up
            const handleAddSkill = () => {
              const trimmed = skillInput.trim();
              if (!trimmed || skills.includes(trimmed)) return;
              setAddingSkill(true);
              setTimeout(() => {
                setSkills(prev => [...prev, trimmed]); // TODO: call your API here
                setSkillInput("");
                setAddingSkill(false);
              }, 150);
            };
        
            const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            };
        
            const handleDeleteSkill = (index: number) => {
              setRemovingIndex(index);
              setTimeout(() => {
                setSkills(prev => prev.filter((_, i) => i !== index)); // TODO: call your API here
                setRemovingIndex(null);
              }, 300);
            };

  if (profileUser?.role !== "jobseeker") return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
  <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
    Skills
  </label>

<div className="p-6 bg-white/85 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/70 dark:border-gray-700/50 shadow-[0_8px_40px_rgba(99,102,241,0.10)] dark:shadow-[0_8px_40px_rgba(99,102,241,0.15)] hover:shadow-[0_12px_50px_rgba(99,102,241,0.18)] dark:hover:shadow-[0_12px_50px_rgba(99,102,241,0.25)] transition-all duration-300">        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
            <Sparkles size={14} className="text-indigo-400 dark:text-indigo-500" />
          </div>

          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {skills.length === 0
              ? "No skills listed"
              : `${skills.length} skill${skills.length > 1 ? "s" : ""}`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {skills.length === 0 ? (
            <span className="text-sm text-gray-300 dark:text-gray-600 italic">
              No skills added yet
            </span>
          ) : (
            skills.map((skill: string, index: number) => (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-800/50 shadow-[0_1px_4px_rgba(99,102,241,0.12)]"
              >
                {skill}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Add skill input — only when isAuthorised */}
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            ref={skillInputRef}
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)} // TODO: wire up if needed
                            onKeyDown={handleSkillInputKeyDown}
                            placeholder="Type a skill and press Enter…"
                            className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                          />
                          {skillInput.trim() && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 dark:text-gray-600 pointer-events-none">
                              ↵ Enter
                            </span>
                          )}
                        </div>
                        <button
                          onClick={handleAddSkill} // TODO: wire up API call inside handleAddSkill
                          disabled={!skillInput.trim() || addingSkill}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0
                            ${!skillInput.trim() || addingSkill
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                              : "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-[0_3px_10px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_5px_16px_rgba(99,102,241,0.4)] active:scale-95"
                            }`}
                        >
                          <Plus size={15} strokeWidth={2.5} />
                          Add
                        </button>
                      </div>
    </div>
  );
};

export default Skills;


