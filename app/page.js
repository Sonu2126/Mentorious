"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <header className="flex py-2.5 px-6 md:px-12 items-center justify-between bg-purple-100/80 backdrop-blur-md shadow-sm border-b border-purple-200/60 sticky top-0 z-50">
        <Link href="/dashboard" className="cursor-pointer hover:opacity-90 transition-opacity">
          <Image
            src={"/Mentorious_logo.png"}
            width={200}
            height={50}
            alt="Mentorious"
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>
        <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <li>
            <Link href="/dashboard" className="transition-all duration-200 hover:text-primary">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="transition-all duration-200 hover:text-primary">
              Questions
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="transition-all duration-200 hover:text-primary">
              Upgrade
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="transition-all duration-200 hover:text-primary">
              How it Works?
            </Link>
          </li>
        </ul>
        <Button asChild className="bg-primary hover:bg-primary/95 text-white rounded-xl px-6 h-10 text-xs font-semibold shadow-sm shadow-primary/10">
          <Link href="/dashboard">
            Get Started
          </Link>
        </Button>
      </header>

      <section className="flex flex-col items-center px-6 pt-16 pb-24 md:pt-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Smart <span className="text-primary">feedback</span> <br />
            for your dream job
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Start your AI Mock Interview. Practice with real-time AI feedback and
            improve before the big day.
          </p>

          <Link href="/dashboard" className="relative block mt-12 max-w-xl mx-auto cursor-pointer group">
            <div className="absolute inset-0 z-20" />
            
            <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Job Role / Job Position
                  </label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    className="bg-white rounded-xl h-12"
                    readOnly
                  />
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, My Sql, etc"
                    className="bg-white rounded-xl resize-none h-24"
                    readOnly
                  />
                </div>
                
                <div className="mb-8">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Years of experience
                  </label>
                  <Input
                    placeholder="Ex. 4"
                    className="bg-white rounded-xl h-12"
                    readOnly
                  />
                </div>

                <Button className="w-full h-14 text-lg font-medium rounded-xl bg-primary shadow-md group-hover:bg-primary/90 group-hover:shadow-lg transition-all cursor-pointer">
                  Start Interview
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 w-full py-8 text-center bg-purple-200/30 dark:bg-purple-950/20 border-t border-purple-200/50">
        <p className="text-zinc-600 dark:text-zinc-300 text-sm font-semibold">
          Mentorious &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
