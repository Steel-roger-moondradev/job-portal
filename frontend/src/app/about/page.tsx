"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      
      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-10 animate-fadeUp">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/about.jpg"
              alt="About HireHeaven"
              className="w-full max-w-[500px] rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Our Mission At Hire
              <span className="bg-linear-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                Heaven
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed opacity-80 max-w-3xl mx-auto">
              At HireHaven, we're dedicated to revolutionizing the job search
              experience. Our mission is to create meaningful connections
              between talented individuals and forward-thinking companies,
              fostering growth and success for both.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center space-y-6 animate-fadeUp delay-200">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ready to find your dream job?
          </h2>

          <p className="text-lg md:text-xl opacity-70">
            Join thousands of successful job seekers on HireHeaven
          </p>

          <div className="pt-4">
            <Link href="/jobs">
              <Button
                size="lg"
                className="gap-2 h-12 px-8 text-base bg-linear-to-r from-purple-500 to-red-500 hover:opacity-90 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
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