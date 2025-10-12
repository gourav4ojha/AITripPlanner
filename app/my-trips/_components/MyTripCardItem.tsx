// "use client"
// import React, { Activity, useEffect, useState } from 'react'
// import Image from 'next/image'
// import { Trip } from '../page'
// import axios from 'axios'
// import { ArrowBigRightIcon } from 'lucide-react';
// import Link from 'next/link'; 
// import { useTripDetail } from '@/app/provider'

// type Props={
//     trip:Trip
// }

// function MyTripCardItem({trip}:Props) {

//   const[photoUrl,setPhotoUrl]=useState<string>();
//   useEffect(()=>{
//     trip && GetGooglePlaceDetail();
//   },[trip])

//   const GetGooglePlaceDetail=async ()=>{
//     const result=await axios.post('/api/google-place-detail',{
//       placeName:trip?.tripDetail?.destination 
//     })
//     if(result?.data.e){
//       return
//     }
//     setPhotoUrl(result?.data)
//   }
  

//   return (
//         <Link href={'/view-trip/'+trip?.tripId} className='p-5 shadow rounded-2xl'>
//               {/* <Image src={photoUrl?photoUrl:'/placeholder.jpg'} alt={trip.tripId} width={400} height={400} className='rouded-xl object-cover w-full h-[270px]'/> */}
//               <Image src={'/placeholder.jpg'} alt={trip.tripId} width={400} height={400} className='rouded-xl object-cover w-full h-[270px]'/>
//               <h2 className='flex gap-2 font-semibold text-xl mt-5'>{trip?.tripDetail?.origin}<ArrowBigRightIcon/>{trip?.tripDetail?.destination}</h2>
//               <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget</h2>

//             </Link>
//   )
// }

// export default MyTripCardItem


"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trip } from '../page'
import axios from 'axios'
import { ArrowBigRightIcon } from 'lucide-react';
import Link from 'next/link'; 

type Props = {
    trip: Trip
}

function MyTripCardItem({ trip }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>('/placeholder.jpg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip?.tripDetail?.destination) {
      GetGooglePlaceDetail();
    }
  }, [trip])

  const GetGooglePlaceDetail = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/google-place-detail', {
        placeName: trip.tripDetail.destination
      });
      
      console.log('Photo result:', result.data);
      
      if (result.data && !result.data.error && result.data !== '/placeholder.jpg') {
        setPhotoUrl(result.data);
      } else {
        setPhotoUrl('/placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching destination photo:', error);
      setPhotoUrl('/placeholder.jpg');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={'/view-trip/' + trip?.tripId} className='p-5 shadow rounded-2xl hover:shadow-lg transition-shadow duration-300 block'>
      <div className="relative w-full h-[270px] mb-4">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <Image 
            src={photoUrl} 
            alt={`${trip.tripDetail.destination} trip`} 
            fill
            className="rounded-xl object-cover"
            onError={() => setPhotoUrl('/placeholder.jpg')}
          />
        )}
      </div>
      
      <h2 className='flex gap-2 font-semibold text-xl mt-2 items-center'>
        {trip?.tripDetail?.origin}
        <ArrowBigRightIcon className="w-5 h-5" />
        {trip?.tripDetail?.destination}
      </h2>
      <p className='mt-2 text-gray-500'>
        {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget
      </p>
      <p className='text-sm text-gray-400 mt-1'>
        Group: {trip?.tripDetail?.group_size}
      </p>
    </Link>
  )
}

export default MyTripCardItem