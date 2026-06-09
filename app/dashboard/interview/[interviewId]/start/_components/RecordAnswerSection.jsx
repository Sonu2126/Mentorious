"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, StopCircleIcon, Video, AudioLines, LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import moment from 'moment';
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { Textarea } from "@/components/ui/textarea";



function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const [interviewMode, setInterviewMode] = useState('video');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSpeechSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript;
            }
          }
          if (transcript) {
            setUserAnswer((prevAns) => prevAns + ' ' + transcript);
          }
        };

        recog.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          if (event.error === 'not-allowed') {
            toast.error("Microphone permission denied. Please allow microphone access.");
          } else if (event.error !== 'no-speech') {
            toast.error("Speech Recognition Error: " + event.error);
          }
          setIsRecording(false);
        };

        recog.onend = () => {
          setIsRecording(false);
        };

        setRecognition(recog);
      }
    }
  }, []);

  const StartStopRecording = async () => {
    if (isRecording) {
      if (recognition) {
        recognition.stop();
      }
      setIsRecording(false);
    } else {
      try {
        // Explicitly request microphone stream to ensure permission is active
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Release the microphone device immediately after testing
        stream.getTracks().forEach((track) => track.stop());
        
        if (recognition) {
          recognition.start();
          setIsRecording(true);
        } else {
          toast.error("Speech recognition is not supported in this browser.");
        }
      } catch (err) {
        console.error("Microphone permission error:", err);
        toast.error("Microphone access is required. Please grant mic permission in your browser settings.");
      }
    }
  };


  const UpdateUserAnswer = async () => {
    setLoading(true)
    const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer: " + userAnswer + ". Based on the question and the user's answer, provide a rating and constructive feedback as areas of improvement in 3 to 5 lines. Return the output STRICTLY as a JSON object with 'rating' (number) and 'feedback' (string) fields. Do not include any markdown formatting or other text.";

    try {
      const result=await chatSession.sendMessage(feedbackPrompt);
      let responseText = result.response.text();
      const mockJsonResp = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const JsonFeedbackRes = JSON.parse(mockJsonResp);

      if (interviewData.mockId) {
        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackRes?.feedback,
          rating: JsonFeedbackRes?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        })
        if (resp) {
          toast('User Answer recorded successfully')
        }
      }
      setUserAnswer('');
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }



  }


  return (
    <div className="flex items-center justify-center flex-col">

      {/* Mode Toggle */}
      <div className="flex gap-3 mb-6 mt-4">
        <Button
          variant={interviewMode === 'video' ? 'default' : 'outline'}
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setInterviewMode('video')}
        >
          <Video className="w-4 h-4" /> Video Interview
        </Button>
        <Button
          variant={interviewMode === 'voice' ? 'default' : 'outline'}
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setInterviewMode('voice')}
        >
          <AudioLines className="w-4 h-4" /> Voice Only
        </Button>
      </div>

      {/* Video Mode */}
      {interviewMode === 'video' && (
        <div className="flex flex-col justify-center items-center bg-black rounded-lg p-4 relative mt-2 max-h-[250px]">
          <Image
            src={"/webcam.png"}
            width={180}
            height={180}
            className="absolute h-50 w-50"
            alt="webcam overlay"
          />
          <Webcam
            mirrored={true}
            audio={true}
            muted={true}
            style={{
              height: 220,
              width: "100%",
              zIndex: 10,
            }}
          />
        </div>
      )}

      {/* Voice Only Mode */}
      {interviewMode === 'voice' && (
        <div className="flex flex-col justify-center items-center bg-gray-50 rounded-lg p-5 mt-2 border-2 border-dashed border-gray-200 w-full max-w-sm">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-all ${
            isRecording ? 'bg-red-100 animate-pulse' : 'bg-primary/10'
          }`}>
            <Mic className={`w-8 h-8 ${isRecording ? 'text-red-500' : 'text-primary'}`} />
          </div>
          <p className="text-gray-500 text-sm text-center">
            {isRecording ? 'Listening...' : 'Voice-only mode active'}
          </p>
        </div>
      )}

      {/* Transcribed/Typed Answer Textarea */}
      <div className="w-full max-w-lg mt-4 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-500">Your Answer (Edit or Type directly if Speech recognition has issues):</label>
        <Textarea
          placeholder="Start recording your answer or type it here manually..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-md shadow-inner bg-white text-gray-800"
        />
      </div>

      <div className="flex gap-4 items-center">
        {isSpeechSupported ? (
          <Button
            disabled={loading}
            variant="outline"
            className="my-4"
            onClick={StartStopRecording}
          >
            {isRecording ? (
              <h2 className='text-red-600 flex gap-2 items-center'>
                <StopCircleIcon />Stop Recording
              </h2>
            ) : (
              <h2 className='text-primary flex gap-2 items-center'><Mic/>Record Answer</h2>
            )}
          </Button>
        ) : (
          <div className="my-5 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm text-center max-w-md">
            ⚠️ Speech-to-text is only supported in Google Chrome. Please type your answer directly in the text area above.
          </div>
        )}

        {userAnswer && userAnswer.trim().length > 0 && (
          <Button
            disabled={loading}
            onClick={UpdateUserAnswer}
            className="my-4"
          >
            {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
            Save Answer
          </Button>
        )}
      </div>
    </div>

)
};



export default RecordAnswerSection;