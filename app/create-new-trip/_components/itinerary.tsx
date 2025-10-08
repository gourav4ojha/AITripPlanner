import React from 'react'
import { MapPin, Calendar, Clock, DollarSign, Users, Star, Wallet, Ticket, ExternalLink} from 'lucide-react'
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { title } from 'process';
import { Content } from 'next/font/google';
import { div } from 'motion/react-m';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';

const TRIP_DATA = {
  destination: "Goa, India",
  duration: "3 Days",
  origin: "Mumbai, India",
  budget: "Medium",
  group_size: "Solo",
  hotels: [
    {
      hotel_name: "The Bucket List Hostel, Goa",
      hotel_address: "House No. 1290/1, Soranto, Anjuna, Goa 403509",
      price_per_night: "INR 500 - 800",
      hotel_image_url: "https://cdn.dummyjson.com/product-images/hostel1.jpg",
      geo_coordinates: { latitude: 15.5898, longitude: 73.7431 },
      rating: 4.5,
      description:
        "A lively hostel for solo travelers featuring comfortable dorms, communal spaces, and a fun social environment near Anjuna Beach."
    },
    {
      hotel_name: "Fairfield by Marriott Goa Benaulim",
      hotel_address: "Benaulim Beach Road, South Goa 403716",
      price_per_night: "INR 6000 - 8500",
      hotel_image_url: "https://cdn.dummyjson.com/product-images/hotel2.jpg",
      geo_coordinates: { latitude: 15.2615, longitude: 73.9188 },
      rating: 4.6,
      description:
        "A modern beachfront property offering luxury amenities, swimming pool, and easy access to Benaulim Beach."
    },
    {
      hotel_name: "Taj Exotica Resort & Spa",
      hotel_address: "Benaulim Beach, Goa 403716",
      price_per_night: "INR 16000 - 25000",
      hotel_image_url: "https://cdn.dummyjson.com/product-images/hotel3.jpg",
      geo_coordinates: { latitude: 15.2612, longitude: 73.9201 },
      rating: 4.8,
      description:
        "A five-star luxury resort featuring private villas, spa services, fine dining, and stunning views of the Arabian Sea."
    }
  ],
  itinerary: [
    {
      day: 1,
      day_plan: "Explore North Goa beaches and nightlife",
      best_time_to_visit_day: "Morning for beaches, Evening for nightlife",
      activities: [
        {
          place_name: "Anjuna Beach",
          place_details:
            "Famous for its rocky coastline, beach shacks, and Wednesday flea market.",
          place_image_url: "https://cdn.dummyjson.com/product-images/beach1.jpg",
          geo_coordinates: { latitude: 15.5678, longitude: 73.7403 },
          place_address: "Anjuna Beach, North Goa",
          ticket_pricing: "Free",
          time_travel_each_location: "30 minutes from hostel",
          best_time_to_visit: "7:00 AM - 10:00 AM"
        },
        {
          place_name: "Chapora Fort",
          place_details:
            "Historic fort offering panoramic views of the Arabian Sea, famous from the movie Dil Chahta Hai.",
          place_image_url: "https://cdn.dummyjson.com/product-images/fort1.jpg",
          geo_coordinates: { latitude: 15.6136, longitude: 73.7392 },
          place_address: "Chapora Fort, Vagator, Goa",
          ticket_pricing: "Free",
          time_travel_each_location: "15 minutes from Anjuna Beach",
          best_time_to_visit: "4:00 PM - 6:00 PM for sunset"
        },
        {
          place_name: "Curlies Beach Shack",
          place_details:
            "Iconic beach shack known for its seafood, drinks, and live music.",
          place_image_url: "https://cdn.dummyjson.com/product-images/restaurant1.jpg",
          geo_coordinates: { latitude: 15.5632, longitude: 73.7514 },
          place_address: "Curlies, Anjuna Beach, Goa",
          ticket_pricing: "INR 800 - 1200 for dinner",
          time_travel_each_location: "10 minutes from Chapora Fort",
          best_time_to_visit: "7:00 PM onwards"
        }
      ]
    },
    {
      day: 2,
      day_plan: "South Goa cultural experience and relaxation",
      best_time_to_visit_day: "Morning for churches, Afternoon for beaches",
      activities: [
        {
          place_name: "Basilica of Bom Jesus",
          place_details:
            "UNESCO World Heritage Site and historic Catholic church housing the remains of St. Francis Xavier.",
          place_image_url: "https://cdn.dummyjson.com/product-images/church1.jpg",
          geo_coordinates: { latitude: 15.5007, longitude: 73.9116 },
          place_address: "Old Goa Road, Bainguinim, Goa 403402",
          ticket_pricing: "Free",
          time_travel_each_location: "45 minutes from North Goa",
          best_time_to_visit: "9:00 AM - 11:00 AM"
        },
        {
          place_name: "Colva Beach",
          place_details:
            "Beautiful white sand beach in South Goa, less crowded and perfect for relaxing.",
          place_image_url: "https://cdn.dummyjson.com/product-images/beach2.jpg",
          geo_coordinates: { latitude: 15.2792, longitude: 73.9142 },
          place_address: "Colva Beach, South Goa",
          ticket_pricing: "Free",
          time_travel_each_location: "20 minutes from Basilica",
          best_time_to_visit: "2:00 PM - 5:00 PM"
        },
        {
          place_name: "Martin's Corner",
          place_details:
            "Famous restaurant known for authentic Goan cuisine and seafood specialties.",
          place_image_url: "https://cdn.dummyjson.com/product-images/restaurant2.jpg",
          geo_coordinates: { latitude: 15.2934, longitude: 73.9652 },
          place_address: "Binwaddo, Betalbatim, Goa 403713",
          ticket_pricing: "INR 1000 - 1500 for dinner",
          time_travel_each_location: "10 minutes from Colva Beach",
          best_time_to_visit: "7:00 PM - 10:00 PM"
        }
      ]
    },
    {
      day: 3,
      day_plan: "Adventure and Local Shopping",
      best_time_to_visit_day: "Morning for adventure, Evening for shopping",
      activities: [
        {
          place_name: "Grande Island Scuba Diving",
          place_details:
            "Enjoy scuba diving, snorkeling, and dolphin watching in the crystal-clear waters of Grande Island.",
          place_image_url: "https://cdn.dummyjson.com/product-images/scuba1.jpg",
          geo_coordinates: { latitude: 15.381, longitude: 73.784 },
          place_address: "Grande Island, Vasco da Gama, Goa",
          ticket_pricing: "INR 3500 - 5000 per person",
          time_travel_each_location: "1 hour from Colva",
          best_time_to_visit: "8:00 AM - 12:00 PM"
        },
        {
          place_name: "Mapusa Market",
          place_details:
            "Popular local market known for souvenirs, spices, and Goan handicrafts.",
          place_image_url: "https://cdn.dummyjson.com/product-images/market1.jpg",
          geo_coordinates: { latitude: 15.593, longitude: 73.813 },
          place_address: "Mapusa Market, North Goa",
          ticket_pricing: "Free entry",
          time_travel_each_location: "45 minutes from Grande Island",
          best_time_to_visit: "5:00 PM - 8:00 PM"
        }
      ]
    }
  ]
};


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
  
  return (
    <Image 
      src={src} 
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

function Itinerary() {
  const getActivityIcon = (activityName: string) => {
    if (activityName.toLowerCase().includes('beach')) return '🏖️';
    if (activityName.toLowerCase().includes('fort')) return '🏰';
    if (activityName.toLowerCase().includes('church') || activityName.toLowerCase().includes('basilica')) return '⛪';
    if (activityName.toLowerCase().includes('restaurant') || activityName.toLowerCase().includes('shack')) return '🍽️';
    return '📍';
  };

  const data = [
    {
      title: "Trip Overview",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">Your {TRIP_DATA.duration} Adventure</h2>
            <p className="text-blue-100">From {TRIP_DATA.origin} to {TRIP_DATA.destination}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{TRIP_DATA.group_size}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>{TRIP_DATA.budget} Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{TRIP_DATA.duration}</span>
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
          {TRIP_DATA.hotels.map((hotel, index) => (
            <div key={index}>
              <HotelCardItem hotel={hotel}/>
            </div>
          ))} 
        </div>
      ),
    },
    ...TRIP_DATA?.itinerary.flatMap((dayData) => ({
        title:`Day ${dayData?.day}`,
        Content:(
            <div>
                <p>Best Time:{dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-col-1 md:grid-cols-2 gap-4'>

                {dayData?.activities.map((activity,index)=>(
                  <div key={index}>

                    <PlaceCardItem activity={activity}/>
                  </div>
                ))}
                </div>
            </div>
        )
    })
    ),
    {
      title: "Budget Summary",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Accommodation</h3>
            <p className="text-2xl font-bold text-blue-600">{TRIP_DATA.hotels[0].price_per_night}</p>
            <p className="text-sm text-gray-600 mt-1">per night</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Group Size</h3>
            <p className="text-2xl font-bold text-green-600">{TRIP_DATA.group_size}</p>
            <p className="text-sm text-gray-600 mt-1">Traveler</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Duration</h3>
            <p className="text-2xl font-bold text-purple-600">{TRIP_DATA.duration}</p>
            <p className="text-sm text-gray-600 mt-1">Trip Length</p>
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      <Timeline data={data} tripData={TRIP_DATA}/>
    </div>
  );
}

export default Itinerary