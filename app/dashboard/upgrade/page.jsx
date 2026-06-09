import React from 'react'

function Upgrade() {
  return (
    <div className="max-w-4xl mx-auto py-2">
      <h2 className="font-extrabold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">Upgrade Plan</h2>
      <p className="text-zinc-500 mt-1 text-sm">Unlock premium features and unlimited mock interviews.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">Free Plan</h3>
          <p className="text-zinc-500 mt-2 text-sm">Perfect for getting started</p>
          <div className="mt-4 text-4xl font-extrabold text-primary">$0<span className="text-lg font-medium text-gray-400">/mo</span></div>
          <ul className="mt-6 space-y-3 text-gray-600 dark:text-zinc-300 text-sm">
            <li>✔️ 3 Mock Interviews per month</li>
            <li>✔️ Basic Feedback</li>
            <li>✔️ Standard Questions</li>
          </ul>
          <button className="mt-8 w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-xl font-semibold cursor-not-allowed text-sm">Current Plan</button>
        </div>

        <div className="p-8 bg-gradient-to-br from-primary to-purple-700 text-white rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
          <h3 className="text-2xl font-bold">Pro Plan</h3>
          <p className="text-purple-200 mt-2">For serious job seekers</p>
          <div className="mt-4 text-4xl font-extrabold">$9.99<span className="text-lg font-medium text-purple-300">/mo</span></div>
          <ul className="mt-6 space-y-3 text-purple-100">
            <li>✔️ Unlimited Mock Interviews</li>
            <li>✔️ Advanced AI Feedback & Insights</li>
            <li>✔️ Domain-specific Questions</li>
            <li>✔️ Priority Support</li>
          </ul>
          <button className="mt-8 w-full py-2.5 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm">Coming Soon</button>
        </div>
      </div>
    </div>
  )
}

export default Upgrade
