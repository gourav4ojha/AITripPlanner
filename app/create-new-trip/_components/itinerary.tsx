"use client"
import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, Clock, DollarSign, Users, Star, Wallet, Ticket, ExternalLink, ArrowLeft} from 'lucide-react'
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

// Fallback image component
const SafeImage = ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) => {
  const isExternal = src.startsWith('http');
  
  if (isExternal) {
    // Use regular img tag for external images if not configured
    return (
      <img 
        src={src} 
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }
};

function Itinerary() {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(tripDetailInfo);

  useEffect(()=>{
    tripDetailInfo&&setTripData(tripDetailInfo)
  },[tripDetailInfo])

  useEffect(() => {
    if (tripDetailInfo) {
      setTripData(tripDetailInfo);
    }
  }, [tripDetailInfo]);

  const getActivityIcon = (activityName: string) => {
    if (activityName.toLowerCase().includes('beach')) return '🏖️';
    if (activityName.toLowerCase().includes('fort')) return '🏰';
    if (activityName.toLowerCase().includes('church') || activityName.toLowerCase().includes('basilica')) return '⛪';
    if (activityName.toLowerCase().includes('restaurant') || activityName.toLowerCase().includes('shack')) return '🍽️';
    return '📍';
  };

  const data = tripData ? [
    {
      title: "Trip Overview",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">Your {tripData.duration} Adventure</h2>
            <p className="text-blue-100">From {tripData.origin} to {tripData.destination}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{tripData.group_size}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>{tripData.budget} Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{tripData.duration}</span>
              </div>
            </div>
          </div>
        </div>
      ),
    }, 
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData.hotels?.map((hotel, index) => (
            <div key={index}>
              <HotelCardItem hotel={hotel}/>
            </div>
          ))} 
        </div>
      ),
    },
    ...(tripData.itinerary?.map((dayData: { day: any; best_time_to_visit_day: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; activities: any[]; }) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div>
          <p className="text-gray-600 mb-4">Best Time: {dayData.best_time_to_visit_day}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {dayData.activities?.map((activity, index) => (
              <div key={index}>
                <PlaceCardItem activity={activity}/>
              </div>
            ))}
          </div>
        </div>
      )
    })) || []),
    {
      title: "Budget Summary",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Accommodation</h3>
            <p className="text-2xl font-bold text-blue-600">
              {tripData.hotels?.[0]?.price_per_night || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 mt-1">per night</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Group Size</h3>
            <p className="text-2xl font-bold text-green-600">{tripData.group_size}</p>
            <p className="text-sm text-gray-600 mt-1">Traveler</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
            <p className="text-2xl font-bold text-purple-600">{tripData.duration}</p>
            <p className="text-sm text-gray-600 mt-1">Trip Length</p>
          </div>
        </div>
      ),
    }
  ] : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ?<Timeline data={data} tripData={tripData}/>
      :
      <div>
        <h2 className='flex text-3xl text-white left-20 gap-2 items-center absolute bottom-10'> <ArrowLeft/>Getting to know you to build perfect trip hear..</h2>
         <Image src={'/image.png'} alt='travel' width={'400'} height={'200'} className='w-full h-full object-cover rounded-3xl'/>
      </div>
      }
    </div>
  );
}

export default Itinerary