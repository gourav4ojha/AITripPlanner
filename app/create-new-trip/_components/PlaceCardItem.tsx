import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Link, Ticket } from 'lucide-react'
import React from 'react'
import { Activity } from './ChatBox'
import Image from 'next/image'

type Props ={
    activity:Activity
}

function PlaceCardItem({activity}:Props) {
  return (
    <div>
        <div>
<Image
  src={activity.place_image_url}
  width={400}
  height={200}
  alt={activity.place_name}
  className="object-cover rounded-xl" 
/>
                                <h2 className='font-semibold text-lg'>{activity?.place_name}</h2>
                                <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
                                <h2 className='flex gap-2 text-blue-500 line-clamp-1'><Ticket/>{activity.ticket_pricing}</h2>
                                <p className='flex text-orange-400 gap-2 line-clamp-1'><Clock/>{activity?.best_time_to_visit}</p>
                                <Link href={'https://www.google.com/maps/search/?api=1&query='+activity?.place_name} target='_blank'>
                                <Button size={'sm'} variant={'outline'} className='w-full mt-2 '>View <ExternalLink/></Button>
                                </Link>
                            </div>
    </div>
  )
}

export default PlaceCardItem