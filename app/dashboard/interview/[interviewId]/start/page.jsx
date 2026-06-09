"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), {
  ssr: false,
});



function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  const router = useRouter();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      
      if (result && result[0]) {
        let cleanJson = result[0].jsonMockResp;
        if (typeof cleanJson === 'string') {
          cleanJson = cleanJson.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        const jsonMockResp = JSON.parse(cleanJson);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error loading or parsing interview details:", error);
    }
  };
  


  
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 &&
          <Button onClick={() => { setActiveQuestionIndex(activeQuestionIndex - 1) }}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 &&
          <Button onClick={() => { setActiveQuestionIndex(activeQuestionIndex + 1) }}>Next Question</Button>}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 &&
          <Button onClick={() => router.push('/dashboard/interview/' + params.interviewId + '/feedback')}>
            End Interview
          </Button>}
      </div>
    </div>
  )
}

export default StartInterview;
