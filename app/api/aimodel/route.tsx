import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { aj } from "../arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});


const PROMPT = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source) - no ui
2. Destination city or country - no ui
3. Group size (Solo, Couple, Family, Friends) - use groupSize ui
4. Budget (Low, Medium, High) - use budget ui
5. Trip duration (number of days) - use tripDuration ui
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with the response, also return which UI component to display for the generative UI. 
Return JSON in the following format:

Rules for 'ui':
- Use "groupSize" when asking about group size.
- Use "budget" when asking about budget.
- Use "tripDuration" when asking about trip duration.
- Use "final" only when ALL required information is collected and you're ready to generate the complete trip plan.

{
  "resp": "Your response text",
  "ui": "groupSize/budget/tripDuration/final"
}
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
`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json(); 
  const user = await currentUser()
  const {has} = await auth();
  const hasPremiumAccess = has({ plan: 'monthly' })
  const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'', requested: isFinal?5:0 }); // Deduct 5 tokens from the bucket
    //@ts-ignore
    if(decision?.reason?.remaining==0 && !hasPremiumAccess){
      return NextResponse.json({
        resp:'No Free credit Remaining',
        ui: 'limit'
      })
    }
  
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
    
    console.log('OpenAI Response:', completion.choices[0].message);
    const message = completion.choices[0].message;
    const parsedContent = JSON.parse(message.content ?? '{}');
    
    return NextResponse.json(parsedContent);

  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ 
      resp: "Sorry, I encountered an error. Please try again.", 
      ui: "error" 
    }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from 'openai';
// import { aj } from "../arcjet/route";
// import { auth, currentUser } from "@clerk/nextjs/server";

// // Remove the export keyword here
// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const PROMPT = `
// You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
// Only ask questions about the following details in order, and wait for the user's answer before asking the next:
// 1. Starting location (source) - no ui
// 2. Destination city or country - no ui
// 3. Group size (Solo, Couple, Family, Friends) - use groupSize ui
// 4. Budget (Low, Medium, High) - use budget ui
// 5. Trip duration (number of days) - use tripDuration ui
// Do not ask multiple questions at once, and never ask irrelevant questions.
// If any answer is missing or unclear, politely ask the user to clarify before proceeding.
// Always maintain a conversational, interactive style while asking questions.

// Along with the response, also return which UI component to display for the generative UI. 
// Return JSON in the following format:

// Rules for 'ui':
// - Use "groupSize" when asking about group size.
// - Use "budget" when asking about budget.
// - Use "tripDuration" when asking about trip duration.
// - Use "final" only when ALL required information is collected and you're ready to generate the complete trip plan.

// {
//   "resp": "Your response text",
//   "ui": "groupSize/budget/tripDuration/final"
// }
// `;

// const FINAL_PROMPT = `
// Generate a complete Travel Plan with all the collected details. Provide:

// Hotels options list with:
// - Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions

// Suggested itinerary with:
// - placeName, Place Details, Place Image Url, Geo Coordinates
// - Place address, ticket Pricing, Time travel for each location
// - Each day plan and best time to visit

// Return STRICT JSON format only (no explanations or extra text):

// {
//   "resp": "Your final response text",
//   "ui": "final",
//   "trip_plan": {
//     "destination": "string",
//     "duration": "string",
//     "origin": "string",
//     "group_size": "string",
//     "budget": "string",
//     "hotels": [
//       {
//         "hotel_name": "string",
//         "hotel_address": "string",
//         "price_per_night": "string",
//         "hotel_image_url": "string",
//         "geo_coordinates": {
//           "latitude": "number",
//           "longitude": "number"
//         },
//         "rating": "number",
//         "description": "string"
//       }
//     ],
//     "itinerary": [
//       {
//         "day": "number",
//         "day_plan": "string",
//         "best_time_to_visit_day": "string",
//         "activities": [
//           {
//             "place_name": "string",
//             "place_details": "string",
//             "place_image_url": "string",
//             "geo_coordinates": {
//               "latitude": "number",
//               "longitude": "number"
//             },
//             "place_address": "string",
//             "ticket_pricing": "string",
//             "time_travel_each_location": "string",
//             "best_time_to_visit": "string"
//           }
//         ]
//       }
//     ]
//   }
// }
// `;

// export async function POST(req: NextRequest) {
//   try {
//     const { messages, isFinal } = await req.json(); 
    
//     // Authentication check
//     const user = await currentUser();
//     const { has } = await auth();
    
//     if (!user) {
//       return NextResponse.json({ 
//         resp: "Please sign in to use the trip planner.", 
//         ui: "auth" 
//       }, { status: 401 });
//     }

//     const hasPremiumAccess = has({ plan: 'monthly' });
//     const decision = await aj.protect(req, { 
//       userId: user.primaryEmailAddress?.emailAddress ?? user.id, 
//       requested: isFinal ? 5 : 1 
//     });

//     // Check if user has exceeded limits
//     if (decision.isDenied() && !hasPremiumAccess) {
//       return NextResponse.json({
//         resp: 'No free credits remaining. Please upgrade to premium for unlimited access.',
//         ui: 'limit'
//       }, { status: 429 });
//     }

//     const completion = await openai.chat.completions.create({
//       model: 'openai/gpt-4.1-mini',
//       response_format: { type: 'json_object' },
//       messages: [
//         {
//           role: 'system',
//           content: isFinal ? FINAL_PROMPT : PROMPT
//         },
//         ...messages
//       ],
//     });
    
//     console.log('OpenAI Response:', completion.choices[0].message);
//     const message = completion.choices[0].message;
    
//     // Safely parse the JSON response
//     let parsedContent;
//     try {
//       parsedContent = JSON.parse(message.content ?? '{}');
//     } catch (parseError) {
//       console.error('JSON Parse Error:', parseError);
//       return NextResponse.json({ 
//         resp: "Sorry, I encountered an error processing the response.", 
//         ui: "error" 
//       }, { status: 500 });
//     }
    
//     return NextResponse.json(parsedContent);

//   } catch (e) {
//     console.error('API Error:', e);
//     return NextResponse.json({ 
//       resp: "Sorry, I encountered an error. Please try again.", 
//       ui: "error" 
//     }, { status: 500 });
//   }
// }

// // Add other HTTP methods to comply with Next.js route requirements
// export async function GET() {
//   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
// }

// export async function PUT() {
//   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
// }

// export async function DELETE() {
//   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
// }