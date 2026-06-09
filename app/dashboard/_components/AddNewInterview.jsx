"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle, Plus, Sparkles } from "lucide-react";
import { db } from '@/utils/db'
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { and, eq } from "drizzle-orm";

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false)
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc]=useState();
  const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const[jsonResponse,setJsonResponse]=useState([]);
  const router=useRouter();
  const{ user }=useUser();
  
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [todayCount, setTodayCount] = useState(0);

  React.useEffect(() => {
    if (user) {
      checkDailyLimit();
    }
  }, [user]);

  const checkDailyLimit = async () => {
    try {
      const today = moment().format('DD-MM-yyyy');
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          and(
            eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress),
            eq(MockInterview.createdAt, today)
          )
        );
      setTodayCount(result.length);
      if (result.length >= 3) {
        setIsLimitReached(true);
      } else {
        setIsLimitReached(false);
      }
    } catch (error) {
      console.error("Error checking daily limit:", error);
    }
  };

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+". Based on this information, provide exactly "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers. Return the output STRICTLY as a JSON array of objects with 'question' and 'answer' fields. Do not include any markdown formatting, explanations, or other text.";

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let responseText = result.response.text();
      const MockJsonResp = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

      setJsonResponse(MockJsonResp);

  
    if (MockJsonResp) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId });
      setLoading(false);

      if (resp) {
        setOpenDailog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId)
      }
    } else {
      console.error("No response from AI.");
    }
  } catch (error) {
    console.error("Error generating interview questions:", error);
  } finally {
    setLoading(false);
  }
}
  return (
    <div>
      <div
        className="p-8 md:p-10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-h-[160px] group"
        onClick={() => setOpenDailog(true)}
      >
        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Plus className="h-6 w-6" />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-gray-800 dark:text-zinc-100 text-base">New Mock Interview</h2>
          <p className="text-xs text-gray-500 mt-1">Generate tailored questions with AI</p>
        </div>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-xl rounded-2xl">
          {isLimitReached ? (
            <div className="flex flex-col items-center justify-center p-6 text-center gap-4">
              <div className="w-16 h-16 bg-amber-50/80 dark:bg-amber-950/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-200/50">
                <Sparkles className="h-8 w-8 text-amber-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Free Quota Reached!</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                You have used your free limit of <strong>3 mock interviews</strong> for today. Upgrade to the Pro Plan for unlimited mock sessions and advanced feedback.
              </p>
              <div className="flex gap-4 mt-6 w-full max-w-sm">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={() => setOpenDailog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white"
                  onClick={() => {
                    setOpenDailog(false);
                    router.push('/dashboard/upgrade');
                  }}
                >
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          ) : (
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Tell us more about your job interview
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2>
                      Add Details about your job position/role, Job description
                      and years of experience
                    </h2>

                    <div className="mt-7 my-3">
                      <label>Job Role/Job Position</label>
                      <Input placeholder="Ex. Full Stack Developer" required
                          onChange={(event)=>setJobPosition(event.target.value)}
                      />
                    </div>
                    <div className=" my-3">
                      <label>Job Description/ Tech Stack (In Short)</label>
                      <Textarea placeholder="Ex. React, Angular, NodeJs, My Sql, etc " required 
                           onChange={(event)=>setJobDesc(event.target.value)}
                      />
                    </div>
                    <div className=" my-3">
                      <label>Years of experience</label>
                      <Input placeholder="Ex.4" type="number" max="50" required 
                           onChange={(event)=>setJobExperience(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                    {loading?
                    <>
                    <LoaderCircle className='animate-spin'/>'Generating from AI'</>:'Start Interview'
                    }
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
