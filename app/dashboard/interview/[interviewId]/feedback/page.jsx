"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  ChevronsUpDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  const overallRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
          feedbackList.length
        ).toFixed(1)
      : 0;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="font-bold text-2xl text-gray-600">
            No Feedback Available
          </h2>
          <p className="text-gray-400 mt-2">
            Complete the interview first to get your feedback here.
          </p>
          <Button className="mt-6" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
          <h2 className="text-lg text-gray-500 mt-1">
            Here is your interview feedback
          </h2>

          <div className="flex items-center gap-2 mt-4 mb-8">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-primary text-lg">
              Overall Rating: <strong>{overallRating}/10</strong>
            </h2>
          </div>

          <div className="space-y-4">
            {feedbackList.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-medium text-gray-800">
                    {item.question}
                  </span>
                  <ChevronsUpDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-yellow-600">
                        Rating: {item.rating}
                      </span>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-700 mb-1">
                        Your Answer:
                      </p>
                      <p className="text-sm text-red-600">
                        {item.userAns || "Not answered"}
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-700 mb-1">
                        Expected Answer:
                      </p>
                      <p className="text-sm text-green-600">
                        {item.correctAns}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        Feedback:
                      </p>
                      <p className="text-sm text-blue-600">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button onClick={() => router.replace("/dashboard")}>
              Go Home
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
