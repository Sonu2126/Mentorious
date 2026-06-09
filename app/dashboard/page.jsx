"use client"
import React, { useEffect, useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewItemCard from "./_components/InterviewItemCard";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";

function Dashboard() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  return (
    <div className="py-6">
      <div>
        <h2 className="font-extrabold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard</h2>
        <h2 className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          Create and start your personalized AI Mock Interview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <AddNewInterview />
      </div>

      {interviewList.length > 0 && (
        <div className="mt-12">
          <h2 className="font-bold text-xl tracking-tight text-zinc-800 dark:text-zinc-200 mb-5">
            Previous Mock Interviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewList.map((interview, index) => (
              <InterviewItemCard key={index} interview={interview} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
