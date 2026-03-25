"use client"
import { ArrowRight, BookOpen, Briefcase, Delete, FileText, Loader2, Pencil, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from './button';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle
} from './dialog';
import { Label } from './label';
import { Input } from './input';
import { CareerGuideResponse } from '@/type';
import axios from 'axios';

const CarrerGuide = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkill] = useState<string[]>([]);
  const [currentSkills, setCurrentSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse|null>(null);
  const[result,setResult]=useState(false);

  function addskills() {
    const skill = currentSkills.trim().toLowerCase();
    if (skill && !skills.includes(skill)) {
      setSkill(prev => [...prev, skill]);
      setCurrentSkills("");
    }
  }

  function removeSkills(skillstoremove: string) {
    setSkill(skills.filter((s) => s !== skillstoremove));
  }

  function handlekeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addskills();
    }
  }
  function resetdialog() {
    setOpen(false);
    setSkill([]);
    setCurrentSkills("");
  setResult(false);
  setResponse(null);
}
function handleOpen(){
  if(response){
            setResult(true);
          }
        else{
          setOpen(true);
        }
}
 const getcarrerguide = async (): Promise<void> => {
  if (skills.length === 0) {
    alert("Write atleast one skill");
    return;
  }

  setLoading(true);

  try {
    const data: CareerGuideResponse = {
      summary:
        "You have a solid foundation in modern web technologies, making you well-suited for roles in full-stack and frontend development.",

      jobOptions: [
        {
          title: "Frontend Developer",
          responsibilities:
            "Build responsive user interfaces using React, manage state, integrate APIs, and optimize performance.",
          why:
            "Your React skills align perfectly with frontend architecture and UI development.",
        },
        {
          title: "Full Stack Developer",
          responsibilities:
            "Develop both client and server-side applications using MERN stack, manage databases, and deploy applications.",
          why:
            "Your knowledge of both frontend and backend technologies makes you a strong candidate.",
        },
      ],

      skillsToLearn: [
        {
          category: "Deepen Your Existing Stack Mastery",
          skills: [
            {
              title: "Advanced React Patterns",
              why:
                "Improves scalability and maintainability of large applications.",
              how:
                "Learn hooks deeply, context API, and explore libraries like Zustand or Redux Toolkit.",
            },
            {
              title: "TypeScript",
              why:
                "Enhances code reliability and reduces runtime errors.",
              how:
                "Refactor your current projects into TypeScript and practice typing complex objects.",
            },
          ],
        },
        {
          category: "DevOps & Cloud",
          skills: [
            {
              title: "Docker",
              why:
                "Helps in containerizing applications for consistent deployment.",
              how:
                "Dockerize your MERN project and run it locally using containers.",
            },
            {
              title: "AWS Basics",
              why:
                "Essential for deploying scalable production applications.",
              how:
                "Learn EC2, S3, and deploy a full-stack app on AWS.",
            },
          ],
        },
      ],

      learningApproach: {
        title: "How to Approach Learning",
        points: [
          "Build real-world projects instead of just watching tutorials.",
          "Focus on one concept deeply rather than switching frequently.",
          "Revise and refactor old projects with improved practices.",
          "Practice DSA alongside development for interviews.",
          "Deploy every project to understand production workflows.",
        ],
      },
    };

    setResponse(data);
    setResult(true);
    alert("Dummy data loaded");

  } catch (error: any) {
    console.log(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
           {/* HEADER */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-linear-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition hover:scale-105 dark:text-black">
          <Sparkles size={16} className="text-blue-600 animate-pulse" />
          <span className="text-sm font-medium">
            AI-Powered Career Guidance
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
          Discover Your{" "}
          <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent animate-linear">
            Career Path
          </span>
        </h2>
        <p className='text-lg opacity-70 max-w-2xl mx-auto mb-10'>
          Get personalized career guidance and learning roadmaps based on your skills
        </p>

        <Button
          onClick={handleOpen}
          className="group px-8 py-5 text-base bg-linear-to-r ml-125 from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <Sparkles className="group-hover:rotate-12 transition" />
          Get Career Guidance
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </Button>
      </div>
     
      {!response ?
      (
      <>
      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in zoom-in-95 duration-300">

          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-blue-50 shadow  dark:text-black">
                <Sparkles size={16} className="text-blue-600" />
                Enter your Skills
              </div>
            </DialogTitle>

            <DialogDescription className="text-center">
              Add your technical skills to receive personalized recommendations
            </DialogDescription>
          </DialogHeader>

          {/* INPUT */}
          <div>
            <Label htmlFor="skill">Add Skills</Label>
            <Input
              id="skill"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              onKeyDown={handlekeypress}
              placeholder="e.g React, Node"
              className="mt-3 focus:ring-2 focus:ring-indigo-500 transition"
            />

            <Button
              type="button"
              onClick={addskills}
              className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 transition"
            >
              Add Skill
            </Button>
          </div>

          {/* SKILLS LIST */}
          {skills.length > 0 && (
            <div className="space-y-3 mt-4">
              <p className="text-sm font-medium">
                Skills ({skills.length})
              </p>

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 border hover:scale-105 transition dark:text-black"
                  >
                    <span className="text-sm">{s}</span>
                    <button
                      onClick={() => removeSkills(s)}
                      className="text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <DialogFooter>
            {loading ? (
              <div className="flex items-center gap-2 text-indigo-600 animate-pulse mr-30">
                <Loader2 className="animate-spin" size={22} />
                Analyzing your skills...
              </div>
            ) : (
              <Button className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition" onClick={getcarrerguide}>
                Generate AI Recommendation
              </Button>
            )}
          </DialogFooter>

        </DialogContent>
      </Dialog>
      </>
      ):(
        <>
        <Dialog open={result} onOpenChange={setResult}>
  <DialogContent className="max-h-[90vh] flex flex-col max-w-6xl">
    <DialogHeader>
      <DialogTitle>
        Your Ai Assistance
      </DialogTitle>
    </DialogHeader>
    {/* SCROLLABLE BODY */}
    <div className="flex-1 overflow-y-auto mt-6 space-y-10 pr-2">
      
      {/* SUMMARY */}
      <div>
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <FileText className="w-5 h-5 text-indigo-500" />
        Summary
      </h3>
        <p className="text-muted-foreground">{response?.summary}</p>
      </div>

      {/* JOB OPTIONS */}
      <div>
        
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          Career Options
        </h3>
        
          {response?.jobOptions?.map((job, i) => (
            <div key={i} className="p-5 rounded-xl border shadow hover:shadow-lg transition hover:scale-[1.02] mt-6">
              <h4 className="text-lg font-semibold">Job-Title:-{job?.title}</h4>
              <p className="text-sm mt-2 opacity-80">
                Job-responsibilities:- {job?.responsibilities}
              </p>
              <p className="text-sm mt-2 text-indigo-500">
                Why: {job?.why}
              </p>
            </div>
          ))}
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Pencil className="w-6 h-6 text-indigo-500" />
          Skills to Learn
          </h3>

        {response?.skillsToLearn?.map((category, i) => (
          <div key={i} className="mb-6">
            <h4 className="text-lg font-semibold mb-2 text-indigo-500">
              Category:-{category?.category}
            </h4>

              {category?.skills?.map((skill, j) => (
                <div key={j} className="mt-4 p-4 rounded-lg border bg-muted/30 hover:scale-[1.02] transition">
                  <h5 className="font-medium">Skill:-{skill?.title}</h5>
                  <p className="text-sm mt-1 opacity-80">Why:-{skill?.why}</p>
                  <p className="text-sm mt-1 text-muted-foreground">
                    How: {skill?.how}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* LEARNING APPROACH */}
      <h3 className="text-2xl font-bold mb-4  items-center gap-2 text-black dark:text-white">
        <div className="flex items-center">
        <BookOpen className="w-6 h-6 text-indigo-500" />
          &nbsp;&nbsp;Learning Approach:- 
        </div>
    <div className="mt-3  text-indigo-500">{response?.learningApproach?.title}</div>
  </h3>
      <div className="p-6 rounded-xl border bg-linear-to-r from-blue-50 to-indigo-50">
  

  <ul className="list-disc ml-5 space-y-2">
    {response?.learningApproach?.points?.map((point, i) => (
      <li key={i} className="text-sm dark:text-black">{point}</li>
    ))}
  </ul>
</div>
    </div>

    {/* FIXED FOOTER */}
    <DialogFooter>
      <Button onClick={resetdialog} className="px-8 py-5">
        Reset
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>
      </>
      ) }

      {/* animation styles */}
      <style jsx>{`
        .animate-linear {
          background-size: 200% 200%;
          animation: linear 5s ease infinite;
        }
        @keyframes linear {
          0%, 100% { background-position: left; }
          50% { background-position: right; }
        }
      `}</style>
    </div>
  );
};

export default CarrerGuide;