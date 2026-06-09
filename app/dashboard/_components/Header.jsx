"use client"
import Image from 'next/image'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Header() {
    const path = usePathname();

  return (
    <header className="flex py-2.5 px-6 md:px-12 items-center justify-between bg-purple-100/80 backdrop-blur-md shadow-sm border-b border-purple-200/60 sticky top-0 z-50">
      <Link href="/dashboard" className="cursor-pointer hover:opacity-90 transition-opacity">
        <Image 
          src={'/Mentorious_logo.png'} 
          width={200} 
          height={50} 
          alt='Mentorious' 
          className='h-10 md:h-12 w-auto object-contain' 
          priority
        />
      </Link>
      <ul className='hidden md:flex gap-8 items-center text-sm font-medium text-zinc-600 dark:text-zinc-300'>

        <li className={`transition-all duration-200 cursor-pointer ${
          path === '/dashboard' ? 'text-primary font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-primary'
        }`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li className={`transition-all duration-200 cursor-pointer ${
          path === '/dashboard/questions' ? 'text-primary font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-primary'
        }`}>
          <Link href="/dashboard/questions">Questions</Link>
        </li>

        <li className={`transition-all duration-200 cursor-pointer ${
          path === '/dashboard/upgrade' ? 'text-primary font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-primary'
        }`}>
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        
        <li className={`transition-all duration-200 cursor-pointer ${
          path === '/dashboard/how-it-works' ? 'text-primary font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-primary'
        }`}>
          <Link href="/dashboard/how-it-works">How it Works?</Link>
        </li>
      </ul>
      <UserButton/>
    </header>
  )
}

export default Header
