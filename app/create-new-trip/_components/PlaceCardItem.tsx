"use client"
import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'

type Props = {
  activity: Activity
}

function PlaceCardItem({ activity }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>('/placeholder.jpg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activity) {
      GetGooglePlaceDetail();
    }
  }, [activity])

  const GetGooglePlaceDetail = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/google-place-detail', {
        placeName: activity?.place_name
      });
      
      if (result.data && !result.data.error) {
        setPhotoUrl(result.data);
      } else {
        setPhotoUrl('/placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setPhotoUrl('/placeholder.jpg');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 mb-3">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <Image
            src={photoUrl}
            width={400}
            height={200}
            alt={activity.place_name}
            className="object-cover rounded-lg w-full h-full"
            onError={() => setPhotoUrl('/placeholder.jpg')}
          />
        )}
      </div>
      
      <h2 className="font-semibold text-lg mb-2 line-clamp-1">{activity?.place_name}</h2>
      <p className="text-gray-500 text-sm line-clamp-2 mb-2">{activity?.place_details}</p>
      
      <div className="space-y-1 mb-3">
        <h2 className="flex gap-2 text-blue-500 text-sm items-center">
          <Ticket className="w-4 h-4" />
          {activity.ticket_pricing || 'Free entry'}
        </h2>
        <p className="flex text-orange-400 gap-2 text-sm items-center">
          <Clock className="w-4 h-4" />
          {activity?.best_time_to_visit || 'Anytime'}
        </p>
      </div>
      
      <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name + ' ' + activity?.place_address)}`} target='_blank'>
        <Button size={'sm'} variant={'outline'} className='w-full'>
          View on Maps <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  )
}

export default PlaceCardItem