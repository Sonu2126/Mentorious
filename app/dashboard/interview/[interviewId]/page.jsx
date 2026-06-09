"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="max-w-4xl mx-auto py-2 flex-col">
      <h2 className="font-extrabold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">Let's Get Started</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl gap-4 shadow-sm">
            <h2 className="text-base text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold block text-xs uppercase tracking-wider mb-1">Job Role / Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-base text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold block text-xs uppercase tracking-wider mb-1">Job Description / Tech Stack:</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-base text-zinc-700 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold block text-xs uppercase tracking-wider mb-1">Years of Experience:</strong>
              {interviewData?.jobExperience} {interviewData?.jobExperience === 1 ? 'Year' : 'Years'}
            </h2>
          </div>
          
          <div className="p-5 border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl shadow-sm">
            <h2 className="flex gap-2 items-center text-amber-800 dark:text-amber-400 font-bold text-sm">
              <Lightbulb className="h-4.5 w-4.5 text-amber-600" />
              Information
            </h2>
            <p className="mt-2.5 text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed font-medium">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-sm min-h-[300px]">
          {webCamEnabled ? (
            <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-inner">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                audio={true}
                muted={true}
                style={{
                  height: 300,
                  width: 300,
                }}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <WebcamIcon className="h-40 w-40 p-8 text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60" />
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 font-semibold text-xs text-zinc-700 dark:text-zinc-300 h-10 shadow-sm"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
          <Button className="rounded-xl px-8 py-5 text-sm font-semibold shadow-md shadow-primary/20">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
