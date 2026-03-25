export interface JobOptions {
  title:string;
  responsibilities: string;
  why: string;
}

export interface SkillsToLearn {
  title: string;
  why: string;
  how: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillsToLearn[];
}

export interface LearningApproach {
  title: string;
  points: string[];
}

export interface CareerGuideResponse {
  summary: string;
  jobOptions: JobOptions[];
  skillsToLearn: SkillCategory[];
  learningApproach: LearningApproach;
}
export interface Dummy{
  score:number;
  feedback:string;
}
export interface scoreBreakdown{
  formatting:Dummy;
  keywords:Dummy;
  structure:Dummy;
  readability:Dummy;
}

export interface suggestions{
  category:string;
  issue:string;
  recommendation:string;
  priority:"high"|"medium"|"low";
}
export interface ResumeAnalysisResponse{
  atsScore:number;
  scoreBreakdown:scoreBreakdown;
  suggestions:suggestions[];
  strengths:string[];
  summary:string;
}