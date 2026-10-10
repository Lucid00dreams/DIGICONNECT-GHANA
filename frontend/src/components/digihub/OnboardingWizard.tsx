"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Rocket,
  Shuffle,
  TrendingUp,
  Search,
  ArrowLeft,
  ArrowRight,
  Shield,
  Briefcase,
  Zap,
  Cpu,
  BarChart2,
  Network,
  PenTool,
  Users,
  Check,
  Plus,
  BookOpen,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { LMSUser, completeLearnerOnboarding, getAllCourses, Course } from "@/lib/lmsStore";

interface OnboardingWizardProps {
  currentUser: LMSUser;
  onComplete: () => void;
  onExit: () => void;
}

interface GoalOption {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface RoleOption {
  id: string;
  title: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  category: "cyber" | "data" | "dev" | "general";
}

interface SkillOption {
  id: string;
  title: string;
  category: "cyber" | "data" | "dev" | "general";
}

export function OnboardingWizard({ currentUser, onComplete, onExit }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>(currentUser.careerGoal || "");
  const [selectedRole, setSelectedRole] = useState<string>(currentUser.currentRole || "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentUser.targetSkills || []);
  const [selectedEducation, setSelectedEducation] = useState<string>(currentUser.educationLevel || "");
  const [roleSearch, setRoleSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [showAllRoles, setShowAllRoles] = useState(false);

  // 1. Goal options matching Screenshot 3
  const GOALS: GoalOption[] = [
    {
      id: "start-career",
      title: "Start my career",
      icon: <Rocket className="w-8 h-8 text-white" />,
    },
    {
      id: "change-career",
      title: "Change my career",
      icon: <Shuffle className="w-8 h-8 text-white" />,
    },
    {
      id: "grow-role",
      title: "Grow in my current role",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
    },
    {
      id: "explore-topics",
      title: "Explore topics outside of work",
      icon: <Search className="w-8 h-8 text-white" />,
    },
  ];

  // 2. Roles matching Screenshot 4
  const ALL_ROLES: RoleOption[] = [
    {
      id: "cyber-spec",
      title: "Cyber Security Specialist / Technician",
      iconBg: "bg-blue-600",
      iconColor: "text-white",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      category: "cyber",
    },
    {
      id: "cyber-mgr",
      title: "Cyber Security Manager / Administrator",
      iconBg: "bg-[#0b2149]",
      iconColor: "text-white",
      icon: <Shield className="w-5 h-5 text-white" />,
      category: "cyber",
    },
    {
      id: "data-sci",
      title: "Data Scientist",
      iconBg: "bg-amber-500",
      iconColor: "text-white",
      icon: <Zap className="w-5 h-5 text-white" />,
      category: "data",
    },
    {
      id: "ml-eng",
      title: "Machine Learning Engineer",
      iconBg: "bg-amber-500",
      iconColor: "text-white",
      icon: <Cpu className="w-5 h-5 text-white" />,
      category: "data",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      iconBg: "bg-amber-500",
      iconColor: "text-white",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      category: "data",
    },
    {
      id: "net-admin",
      title: "Network / Systems Administrator",
      iconBg: "bg-blue-600",
      iconColor: "text-white",
      icon: <Network className="w-5 h-5 text-white" />,
      category: "cyber",
    },
    {
      id: "content-creator",
      title: "Content Creator",
      iconBg: "bg-[#0b2149]",
      iconColor: "text-white",
      icon: <PenTool className="w-5 h-5 text-white" />,
      category: "general",
    },
    {
      id: "dei-spec",
      title: "Diversity, Equity, and Inclusion Specialist",
      iconBg: "bg-purple-600",
      iconColor: "text-white",
      icon: <Users className="w-5 h-5 text-white" />,
      category: "general",
    },
    {
      id: "bi-analyst",
      title: "Business Intelligence Analyst",
      iconBg: "bg-amber-500",
      iconColor: "text-white",
      icon: <BarChart2 className="w-5 h-5 text-white" />,
      category: "data",
    },
    // Expandable extra roles
    {
      id: "web-dev",
      title: "Full Stack Web & Software Developer",
      iconBg: "bg-blue-600",
      iconColor: "text-white",
      icon: <Code2 className="w-5 h-5 text-white" />,
      category: "dev",
    },
    {
      id: "it-support",
      title: "IT Support Specialist & Cloud Operator",
      iconBg: "bg-teal-600",
      iconColor: "text-white",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      category: "general",
    },
  ];

  // 3. Skills matching Screenshot 5
  const ALL_SKILLS: SkillOption[] = [
    { id: "cybersecurity", title: "Cybersecurity", category: "cyber" },
    { id: "risk-mgmt", title: "Risk Management", category: "cyber" },
    { id: "info-sec", title: "Information Systems Security", category: "cyber" },
    { id: "vuln-mgmt", title: "Vulnerability Management", category: "cyber" },
    { id: "siem", title: "Security Information and Event Management (SIEM)", category: "cyber" },
    { id: "incident-mgmt", title: "Incident Management", category: "cyber" },
    { id: "web-dev", title: "Web Development & HTML/CSS/JavaScript", category: "dev" },
    { id: "python-prog", title: "Python Programming & Scripting", category: "data" },
    { id: "cloud-security", title: "Cloud Infrastructure & Security", category: "cyber" },
    { id: "data-analysis", title: "Data Analytics & SQL Querying", category: "data" },
  ];

  const toggleSkill = (skillTitle: string) => {
    if (selectedSkills.includes(skillTitle)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillTitle));
    } else {
      setSelectedSkills([...selectedSkills, skillTitle]);
    }
  };

  const handleFinishOnboarding = () => {
    // Recommend matching courses based on role & skills
    const roleLower = (selectedRole || "").toLowerCase();
    const isCyberFocus =
      roleLower.includes("cyber") ||
      roleLower.includes("network") ||
      selectedSkills.some((s) => s.toLowerCase().includes("cyber") || s.toLowerCase().includes("security"));

    const recommended: string[] = [];
    if (isCyberFocus) {
      recommended.push("cybersecurity", "coding");
    } else {
      recommended.push("coding", "cybersecurity", "python");
    }

    completeLearnerOnboarding(selectedGoal, selectedRole, selectedSkills, selectedEducation, recommended);
    onComplete();
  };

  // Filtered lists
  const filteredRoles = ALL_ROLES.filter((r) =>
    r.title.toLowerCase().includes(roleSearch.toLowerCase())
  );
  const displayedRoles = showAllRoles || roleSearch ? filteredRoles : filteredRoles.slice(0, 9);

  const filteredSkills = ALL_SKILLS.filter((s) =>
    s.title.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const courses = getAllCourses();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between text-neutral-900 font-digihub">
      {/* Top Header */}
      <header className="border-b border-neutral-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-30">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="DigiConnect Ghana"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm font-black text-neutral-900 leading-tight">
              DigiConnect Ghana
            </span>
            <span className="text-[10px] font-bold text-[#0056D2] leading-tight">
              DIGIHub Learning Academy
            </span>
          </div>
        </div>

        <button
          onClick={onExit}
          className="text-sm font-semibold text-[#0056D2] hover:text-[#00419e] hover:underline px-2 py-1 transition"
        >
          Exit
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* STEP 1: What's your goal? */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Welcome back {currentUser.name}!
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 mt-3 font-medium leading-relaxed">
                Tell me a little about yourself so I can make the best recommendations. First, what&apos;s your goal?
              </p>
            </div>

            {/* 4 Fluid Wave Goal Cards (Screenshot 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
              {GOALS.map((goal) => {
                const isSelected = selectedGoal === goal.title;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.title)}
                    className={`group relative text-left rounded-2xl border-2 transition overflow-hidden flex flex-col bg-white shadow-xs hover:shadow-md ${
                      isSelected
                        ? "border-[#0056D2] ring-2 ring-[#0056D2]/20"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {/* Blue wave graphic banner */}
                    <div className="relative h-28 sm:h-32 bg-[#0056D2] flex items-center justify-center overflow-hidden">
                      {/* Stylized background circles/waves */}
                      <div className="absolute inset-0 opacity-25">
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-4 border-white/40" />
                        <div className="absolute top-4 -left-6 w-24 h-24 rounded-full border-2 border-white/30" />
                        <div className="absolute bottom-0 right-0 w-full h-8 bg-white/10 rounded-t-full" />
                      </div>
                      <div className="relative z-10 p-3 rounded-full bg-white/15 backdrop-blur-xs group-hover:scale-105 transition transform duration-200">
                        {goal.icon}
                      </div>
                    </div>

                    {/* Card Label */}
                    <div className="p-4 sm:p-5 flex-1 flex items-center justify-center text-center">
                      <span
                        className={`text-sm sm:text-base font-semibold leading-snug ${
                          isSelected ? "text-[#0056D2] font-bold" : "text-neutral-800"
                        }`}
                      >
                        {goal.title}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 text-[#0056D2] shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <div className="flex justify-center">
              <button
                type="button"
                disabled={!selectedGoal}
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-sm transition shadow-sm active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Current Role (Screenshot 4) */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-widest text-[#0056D2] uppercase">
                Step 2 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Great! What is your current role?
              </h2>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                placeholder="Find a role"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-sm placeholder:text-neutral-400 outline-none transition"
              />
            </div>

            {/* Role Cards Grid (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {displayedRoles.map((role) => {
                const isSelected = selectedRole === role.title;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.title)}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition text-left ${
                      isSelected
                        ? "border-[#0056D2] bg-blue-50/50 ring-1 ring-[#0056D2]"
                        : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl ${role.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        {role.icon}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-semibold leading-tight line-clamp-2 ${
                          isSelected ? "text-[#0056D2]" : "text-neutral-800"
                        }`}
                      >
                        {role.title}
                      </span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition ${
                        isSelected
                          ? "bg-[#0056D2] border-[#0056D2] text-white"
                          : "border-neutral-300 text-neutral-400"
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* View More Roles */}
            {!roleSearch && (
              <div className="text-center mb-8">
                <button
                  type="button"
                  onClick={() => setShowAllRoles(!showAllRoles)}
                  className="text-xs font-semibold text-[#0056D2] hover:underline"
                >
                  {showAllRoles ? "− View fewer roles" : "+ View more roles"}
                </button>
              </div>
            )}

            {/* Back / Next Nav */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!selectedRole}
                onClick={() => setCurrentStep(3)}
                className="px-8 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-sm transition shadow-sm active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Select Skills (Screenshot 5) */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-widest text-[#0056D2] uppercase">
                Step 3 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Select the skills you&apos;d like to develop
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                These are recommended based on your role ({selectedRole || "Tech Learner"})
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Find a skill"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-sm placeholder:text-neutral-400 outline-none transition"
              />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill.title);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.title)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition text-left ${
                      isSelected
                        ? "border-[#0056D2] bg-blue-50/50 ring-1 ring-[#0056D2]"
                        : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                    }`}
                  >
                    <span
                      className={`text-xs sm:text-sm font-semibold pr-2 leading-snug ${
                        isSelected ? "text-[#0056D2]" : "text-neutral-800"
                      }`}
                    >
                      {skill.title}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition ${
                        isSelected
                          ? "bg-[#0056D2] border-[#0056D2] text-white"
                          : "border-neutral-300 text-neutral-400"
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back / Next Nav */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={selectedSkills.length === 0}
                onClick={() => setCurrentStep(4)}
                className="px-8 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-sm transition shadow-sm active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Highest Level of Education (Screenshot 1) */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-xl mx-auto w-full">
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-[#0056D2] uppercase">
                Step 4 of 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Got it! What&apos;s your highest level of education?
              </h2>
            </div>

            {/* Vertically Stacked Pill Options (Screenshot 1) */}
            <div className="space-y-3 mb-10">
              {[
                "Less than high school diploma (or equivalent)",
                "High school diploma (or equivalent)",
                "Some college, but no degree",
                "Associate Degree (e.g., AA, AS)",
                "Bachelor's degree (e.g., BA, AB, BS)",
                "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)",
                "Doctorate or professional degree (e.g., PhD, MD, JD)",
              ].map((level) => {
                const isSelected = selectedEducation === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedEducation(level)}
                    className={`w-full py-3.5 px-6 rounded-full border text-center text-xs sm:text-sm font-semibold transition shadow-2xs ${
                      isSelected
                        ? "border-[#0056D2] bg-blue-50/70 text-[#0056D2] ring-2 ring-[#0056D2]/20 font-bold"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50/50"
                    }`}
                  >
                    <span>{level}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Buttons: Back and Finish */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-sm transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!selectedEducation}
                onClick={handleFinishOnboarding}
                className="px-8 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-sm transition shadow-sm active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer minimal info */}
      <footer className="border-t border-neutral-100 py-3 text-center text-xs text-neutral-400">
        DigiConnect Ghana LMS Platform • Empowering youth across West Africa
      </footer>
    </div>
  );
}
