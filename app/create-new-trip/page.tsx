"use client"
import React, { useEffect, useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/itinerary'
import { useTripDetail } from '../provider';
import GlobalMap from './_components/GlobalMap';
import { Globe2, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function CreateNewTrip() {
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [activeIndex, setActiveIndex] = useState(1);
  useEffect(() => {
    setTripDetailInfo(null)
  }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10 '>
      <div>
        <ChatBox />
      </div>
      <div className='col-span-2 relative '>
        {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size={'lg'} 
              onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)} 
              className='bg-black hover:bg-gray-700 absolute bottom-5 left-[50%] rounded-2xl'
            >
              {activeIndex == 0 ? <Plane /> : <Globe2 />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Switch Between Map and Trip
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export default CreateNewTrip