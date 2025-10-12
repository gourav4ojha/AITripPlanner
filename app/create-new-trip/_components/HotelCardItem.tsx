"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star, Wallet, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hotel } from './ChatBox'
import Link from 'next/link'
import axios from 'axios'

type Props = {
  hotel: Hotel
}

function HotelCardItem({ hotel }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>('/placeholder.jpg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel) {
      GetGooglePlaceDetail();
    }
  }, [hotel])

  const GetGooglePlaceDetail = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/google-place-detail', {
        placeName: hotel?.hotel_name
      });
      
      if (result.data && !result.data.error) {
        setPhotoUrl(result.data);
      } else {
        setPhotoUrl('/placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching hotel photo:', error);
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
            alt={hotel.hotel_name}
            width={500}
            height={300}
            className="rounded-lg object-cover w-full h-full"
            onError={() => setPhotoUrl('/placeholder.jpg')}
          />
        )}
      </div>
      
      <h2 className="font-semibold text-lg mb-1 line-clamp-1">{hotel?.hotel_name}</h2>
      <p className="text-gray-500 text-sm mb-2 line-clamp-1">{hotel?.hotel_address}</p>
      
      <div className="flex justify-between items-center mb-2">
        <p className="flex gap-2 text-green-600 text-sm items-center">
          <Wallet className="w-4 h-4" />
          {hotel?.price_per_night || 'Price not available'}
        </p>
        <p className="text-yellow-500 flex gap-2 text-sm items-center">
          <Star className="w-4 h-4" />
          {hotel?.rating || 'N/A'}
        </p>
      </div>
      
      <p className="line-clamp-2 text-gray-400 text-sm mb-3">{hotel?.description}</p>
      
      <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name + ' ' + hotel?.hotel_address)}`} target='_blank'>
        <Button variant={'outline'} className='w-full'>
          View on Maps <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  )
}

export default HotelCardItem