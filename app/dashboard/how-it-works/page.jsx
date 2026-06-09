import React from 'react'

function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto py-2">
      <h2 className="font-extrabold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">How it Works?</h2>
      <p className="text-zinc-500 mt-1 text-sm">Follow these simple steps to ace your next interview.</p>
      
      <div className="mt-8 space-y-8 max-w-3xl">
        <div className="flex gap-6 items-start">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">1</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Provide Job Details</h3>
            <p className="text-gray-600 mt-2">Enter your target job position, a brief job description or tech stack, and your years of experience. Our AI will generate tailored questions based on these details.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">2</div>
          <div>
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Answer Questions</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm leading-relaxed">Turn on your camera and microphone, or use voice-only mode. Record your answers directly. You can also type your answers if you prefer.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">3</div>
          <div>
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Get AI Feedback</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm leading-relaxed">After finishing the interview, review your performance. Our advanced AI provides a rating and constructive feedback for each answer, along with the expected ideal answer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
