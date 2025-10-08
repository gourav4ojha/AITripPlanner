import React from 'react'
import Image from 'next/image'
import { Star, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hotel } from './ChatBox'
import Link from 'next/link'

type Props={
    hotel:Hotel
}

function HotelCardItem({hotel}:Props) {
  return (
    <div>
        <div className='flex flex-col gap-1'>
                        <Image 
                          src={hotel.hotel_image_url} 
                          alt={hotel.hotel_name}
                          width={500}
                          height={300}
                          className="rounded-xl shadow object-cover mb-2"
                        />
                        <h2 className='font-semibold text-lg'>{hotel?.hotel_name}</h2>
                        <h2 className='text-gray-500'>{hotel?.hotel_address}</h2>
                        <div className='flex justify-between items-center'>
                        <p className='flex gap-2 text-green-600'> <Wallet/> {hotel?.price_per_night}</p>
                        <p className='text-yellow-500 flex gap-2'><Star/>{hotel?.rating}</p>
                        </div>
                        <p className='line-clamp-2 text-gray-400'>{hotel?.description}</p>
                        <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name} target='_blank'>
                        <Button variant={'outline'} className='mt-1 w-full'>View</Button>
                        </Link>
                      </div>
    </div>
  )
}

export default HotelCardItem