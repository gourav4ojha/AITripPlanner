import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { placeName } = await req.json();
  const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACE_API_KEY,
      'X-Goog-FieldMask': [
        'places.photos',
        'places.displayName',
        'places.id',
        'places.formattedAddress',
        'places.rating',
        'places.userRatingCount'
      ]
    }
  };

  try {
    const result = await axios.post(
      BASE_URL,
      {
        textQuery: placeName,
        maxResultCount: 1
      },
      config
    );

    // Check if we have places and photos
    if (result?.data?.places?.[0]?.photos?.[0]) {
      const photo = result.data.places[0].photos[0];
      const photoReference = photo.name; // This contains the photo reference
      
      // Extract just the photo reference ID from the full name
      const photoRefId = photoReference.split('/').pop();
      
      // Construct the photo URL
      const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=400&maxWidthPx=400&key=${process.env.GOOGLE_PLACE_API_KEY}`;
      
      return NextResponse.json(photoUrl);
    } else {
      // Return a placeholder if no photo found
      return NextResponse.json('/placeholder.jpg');
    }
  } catch (e: any) {
    console.error('Google Places API error:', e.response?.data || e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
