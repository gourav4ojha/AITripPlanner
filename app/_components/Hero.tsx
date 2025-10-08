"use client"
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Globe2, Plane, Landmark, ArrowDown } from 'lucide-react'
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const suggestions = [
  {
    title: 'Create New Trip',
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: 'Plan a Weekend Getaway',
    icon: <Plane className="text-green-500 h-5 w-5" />,
  },
  {
    title: 'Business Trip Planner',
    icon: <Landmark className="text-orange-500 h-5 w-5" />,
  },
  {
    title: 'Adventure Travel',
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
]

function Hero() {
  const {user} = useUser();
  const router = useRouter();
  const onSend =()=>{
     if(!user){
      router.push('/sign-in')
      return;
     }
     // Nvigate to create trip planner web page  
     router.push('/create-new-trip')
  }
  return (
    <div className="mt-24 w-full flex justify-center px-4">
      {/* content */}
      <div className="text-center max-w-3xl w-full space-y-6 ">
        <h1 className="text-2xl md:text-5xl font-bold">
          Hey, I'm your personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
          planner – all in seconds.
        </p>

        {/* Input Box */}
        
        <div className="border rounded-2xl p-4 flex items-center gap-2">
          <Textarea
            placeholder="Create a trip from Paris to India"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />
          <Button size="icon" className="shrink-0" onClick={()=>onSend()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggestion list */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {suggestions.map((suggestions, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition transform hover:scale-105"
            >
              {suggestions.icon}
              <h2 className="text-sm font-medium">{suggestions.title}</h2>
            </div>
          ))}
        </div>


        {/* Video section (placeholder) */}
        <div className="mt-8 flex justify-center items-center flex-col">
          <h2 className='my-7 mt-14 flex gap-2 text-center'>Not Sure where to start ? <strong>See how it works</strong> <ArrowDown /> </h2>
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
