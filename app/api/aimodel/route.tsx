import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});
// 6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
// 6. Special requirements or preferences (if any)
const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with response also send which UI component to display for generative UI. Return JSON with:
{
  "resp": "Your response text",
  "ui": "budget/groupSize/tripDuration/final"
}

Use "final" only when ALL required information is collected and you're ready to generate the complete trip plan.
`

const FINAL_PROMPT = `
Generate a complete Travel Plan with all the collected details. Provide:

Hotels options list with:
- Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions

Suggested itinerary with:
- placeName, Place Details, Place Image Url, Geo Coordinates
- Place address, ticket Pricing, Time travel for each location
- Each day plan and best time to visit

Return STRICT JSON format only (no explanations or extra text):

{
  "resp": "Your final response text",
  "ui": "final",
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "group_size": "string",
    "budget": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json(); 
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4.1-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: isFinal ? FINAL_PROMPT : PROMPT
        },
        ...messages
      ],
    });
    
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    const parsedContent = JSON.parse(message.content ?? '{}');
    
    return NextResponse.json(parsedContent);

  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ 
      resp: "Sorry, I encountered an error. Please try again.", 
      ui: undefined 
    });
  }
}