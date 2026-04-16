"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white dark:from-black dark:via-zinc-900 dark:to-black">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-20 md:py-28">
        <div className="text-center space-y-6 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Work Sphere
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A focused platform to explore jobs, understand requirements clearly,
            and apply without unnecessary steps.
          </p>
        </div>
      </section>

      {/* Image (Centered, Controlled Width) */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="animate-fadeInUp">
          <img
            src="/about.jpg"
            alt="Platform preview"
            className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Content Block */}
      <section className="max-w-3xl mx-auto px-4 py-10 space-y-6 animate-fadeInUp">
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          This platform is built to simplify job discovery and application
          tracking. Instead of scattered listings and repetitive workflows, it
          provides a structured way to explore roles, review requirements, and
          apply efficiently.
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          The focus is on clarity—clear job descriptions, straightforward
          application flow, and minimal friction between discovering a role and
          applying for it.
        </p>
      </section>

      {/* Features (Constrained Width + Better Alignment) */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Browse Jobs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View roles with clear descriptions and expectations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Apply Efficiently
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Submit applications without redundant steps.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Track Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor all applications in one place.
            </p>
          </div>

        </div>
      </section>

      {/* Secondary Section (Split but Narrow + Better Balance) */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="space-y-5 animate-fadeInLeft">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Designed for Simplicity
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The interface prioritizes essential information—job details,
              requirements, and actions—without unnecessary clutter.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Navigation and interactions follow a predictable structure,
              reducing effort and improving consistency across devices.
            </p>
          </div>

          <div className="animate-fadeInRight">
            <img
              src="/about.jpg"
              alt="Workflow"
              className="w-full h-[260px] object-cover rounded-xl shadow-md"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-purple-100/40 via-white to-indigo-100/40 dark:from-zinc-900 dark:via-black dark:to-zinc-900">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6 animate-fadeInUp">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Start exploring opportunities
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse roles, review details, and apply in a structured way.
          </p>

          <div className="pt-4">
            <Link href="/jobs">
              <Button
                size="lg"
                className="gap-2 h-12 px-10 text-base bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600 hover:opacity-90 shadow-xl dark:shadow-purple-900/40 transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;