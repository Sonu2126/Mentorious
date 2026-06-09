"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {
  const router = useRouter()

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview?.mockId + '/feedback')
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[180px]">
      <div>
        <h2 className="font-extrabold text-lg text-primary tracking-tight leading-snug">{interview?.jobPosition}</h2>
        <h2 className="text-sm font-medium text-gray-600 dark:text-zinc-400 mt-1">
          {interview?.jobExperience} {interview?.jobExperience == 1 ? 'Year' : 'Years'} of Experience
        </h2>
        <h2 className="text-xs text-gray-400 dark:text-zinc-500 mt-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700"></span>
          Created: {interview?.createdAt}
        </h2>
      </div>
      <div className="flex justify-between mt-6 gap-3">
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-xl border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 text-xs font-semibold text-gray-700 dark:text-zinc-300 h-9"
          onClick={onFeedback}
        >
          View Feedback
        </Button>
        <Button
          size="sm"
          className="w-full rounded-xl bg-primary text-white hover:bg-primary/95 text-xs font-semibold h-9 shadow-sm shadow-primary/15"
          onClick={onStart}
        >
          Start Practice
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
