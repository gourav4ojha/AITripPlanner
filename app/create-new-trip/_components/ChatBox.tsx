// "use client"
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import axios from 'axios'
// import { Loader, Send } from 'lucide-react'
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import EmptyBoxState from './EmptyBoxState'
// import GroupSizeUi from './GroupSizeUi'
// import BudgetUi from './BudgetUi'
// import FinalUi from './FinalUi'
// import SelectDaysUi from './SelectDaysUi'
// import { useMutation } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { useTripDetail, useUserDetail } from '@/app/provider'
// import { v4 as uuidv4 } from 'uuid'

// export type Message = {
//   role: string,
//   content: string,
//   ui?: string
// }

// export type TripInfo = {
//   budget: string,
//   destination: string,
//   duration: string,
//   group_size: string,
//   origin: string,
//   hotels: Hotel[],
//   itinerary: Itinerary
// }

// export type Hotel = {
//   hotel_name: string,
//   hotel_address: string,
//   price_per_night:string,
//   hotel_image_url:string,
//   geo_coordinates:{
//     latitude:number,
//     longitude:number
//   };
//   rating:number,
//   description:string
// }
// export type Activity={
//   place_name: string,
//   place_details: string,
//   place_image_url:string,
//   geo_coordinates:{
//     latitude:number,
//     longitude:number
//   };
//   place_address: string,
//   ticket_pricing: string,
//   time_travel_each_location:string,
//   best_time_to_visit:string

// }
// export type Itinerary ={
//     [x: string]: any
//     day:number;
//     day_plan:string;
//     best_time_to_visit_day:string;
//     activities:Activity[];
// }

// function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [isFinal, setIsFinal] = useState(false);
//   const [showFinalUi, setShowFinalUi] = useState(false); 
//   const [tripDetail, setTripDetail] = useState<TripInfo>();
//   const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
//   const { userDetail, setUserDetail } = useUserDetail();
//   const {tripDetailInfo,setTripDetailInfo} = useTripDetail();

//   const viewTrip = () => {
//     console.log("View trip clicked - Trip details:", tripDetail);
//     // You can add navigation or modal display here
//     alert('Trip details ready! Check console for data.');
//   };

//   const onSend = async (autoSendText?: string) => {
//     const textToSend = autoSendText || userInput;
    
//     if (!textToSend?.trim()) return;
//     setLoading(true);
    
//     if (!autoSendText) {
//       setUserInput('');
//     }

//     const newMsg: Message = {
//       role: 'user',
//       content: textToSend
//     };

//     const updatedMessages = [...messages, newMsg];
//     setMessages(updatedMessages);

//     try {
//       const result = await axios.post('/api/aimodel', {
//         messages: updatedMessages,
//         isFinal: isFinal
//       });

//       if (!isFinal) {
//         setMessages((prev: Message[]) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content: result?.data?.resp,
//             ui: result?.data?.ui
//           }
//         ]);
//       } else {
//         // Handle final response with trip data
//         const tripData = result?.data?.trip_plan;
//         setTripDetail(tripData);
//         setTripDetailInfo(tripData);
        
//         // Save trip details to database
//         if (tripData && userDetail?._id) {
//           const tripId = uuidv4();
//           try {
//             await SaveTripDetail({
//               tripDetail: tripData,
//               tripId: tripId,
//               uid: userDetail._id
//             });
//             console.log('Trip details saved successfully');
//           } catch (saveError) {
//             console.error('Failed to save trip details:', saveError);
//           }
//         }
        
//         setMessages((prev: Message[]) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content: result?.data?.resp || "Your trip plan is ready!",
//             ui: result?.data?.ui
//           }
//         ]);
//       }

//       console.log('API Response:', result.data);
//     } catch (error) {
//       console.error('API Error:', error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: "Error: Failed to fetch response. Please try again."
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const RenderGenerativeUi = (ui: string | undefined) => {
//     if (ui === 'budget') {
//       return <BudgetUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
//     } else if (ui === 'groupSize') {
//       return <GroupSizeUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
//     } else if (ui === 'tripDuration') {
//       return <SelectDaysUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
//     } else if (ui === 'final') {
//       return <FinalUi viewTrip={viewTrip} disabled={!tripDetail} />
//     }
//     return null;
//   }

//   useEffect(() => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg?.ui === 'final' && !isFinal) {
//       console.log('Final UI triggered, switching to final mode');
//       setIsFinal(true);
//     }
//   }, [messages, isFinal]);

//   useEffect(() => {
//     if (isFinal && !tripDetail) {
//       console.log('Sending final request to generate trip plan...');
//       onSend('Generate my trip plan with all the details collected.');
//     }
//   }, [isFinal]);

//   // If we're showing the final UI with trip details, render it prominently
//   if (showFinalUi && tripDetail) {
//     return (
//       <div className="h-[85vh] flex flex-col items-center justify-center p-6">
//         <FinalUi viewTrip={viewTrip} disabled={!tripDetail} />
        
//         <Button 
//           variant="outline" 
//           className="mt-4"
//           onClick={() => {
//             setShowFinalUi(false);
//             setIsFinal(false);
//           }}
//         >
//           Continue Planning
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[85vh] flex flex-col border shadow rounded-2xl p-5">
//       {messages.length === 0 && (
//         <EmptyBoxState 
//           onSelectOption={(v: string) => {
//             setUserInput(v); 
//             onSend();
//           }} 
//         />
//       )}

//       {/* Display Messages */}
//       <section className="flex-1 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           msg.role === 'user' ? (
//             <div className="flex justify-end mt-2" key={index}>
//               <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
//                 {msg.content}
//               </div>
//             </div>
//           ) : (
//             <div className="flex justify-start mt-2" key={index}>
//               <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
//                 {msg.content}
//                 {RenderGenerativeUi(msg.ui)}
                
//                 {/* Show FinalUi in chat when trip is ready */}
//                 {msg.ui === 'final' && tripDetail && (
//                   <div className="mt-4">
//                     <FinalUi viewTrip={() => setShowFinalUi(true)} disabled={false} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )
//         ))}

//         {loading && (
//           <div className="flex justify-start mt-2">
//             <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg flex items-center gap-2">
//               <Loader className="animate-spin" />
//               <span>{isFinal ? "Creating your trip plan..." : "Thinking..."}</span>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* User Input */}
//       <section>
//         <div className="border rounded-2xl p-4 flex items-center gap-2">
//           <Textarea
//             placeholder="Start typing here..."
//             className="w-full h-15 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
//             onChange={(event) => setUserInput(event.target.value)}
//             value={userInput}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 onSend();
//               }
//             }}
//             disabled={loading}
//           />
//           <Button 
//             size="icon" 
//             className="shrink-0" 
//             onClick={() => onSend()} 
//             disabled={loading || !userInput.trim()}
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default ChatBox;


"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useState, useEffect } from 'react';
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import FinalUi from './FinalUi'
import SelectDaysUi from './SelectDaysUi'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail, useTripDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'

export type Message = {
  role: string,
  content: string,
  ui?: string
}

export type TripInfo = {
  budget: string,
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary
}

export type Hotel = {
  hotel_name: string,
  hotel_address: string,
  price_per_night: string,
  hotel_image_url: string,
  geo_coordinates: {
    latitude: number,
    longitude: number
  };
  rating: number,
  description: string
}

export type Activity = {
  place_name: string,
  place_details: string,
  place_image_url: string,
  geo_coordinates: {
    latitude: number,
    longitude: number
  };
  place_address: string,
  ticket_pricing: string,
  time_travel_each_location: string,
  best_time_to_visit: string
}

export type Itinerary = {
  [x: string]: any
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [showFinalUi, setShowFinalUi] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const { userDetail } = useUserDetail();
  const { setTripDetailInfo } = useTripDetail(); // Fixed: using correct hook

  const viewTrip = () => {
    console.log("View trip clicked - Trip details:", tripDetail);
    // You can add navigation or modal display here
    alert('Trip details ready! Check console for data.');
  };

  const onSend = async (autoSendText?: string) => {
    const textToSend = autoSendText || userInput;
    
    if (!textToSend?.trim()) return;
    setLoading(true);
    
    if (!autoSendText) {
      setUserInput('');
    }

    const newMsg: Message = {
      role: 'user',
      content: textToSend
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    try {
      const result = await axios.post('/api/aimodel', {
        messages: updatedMessages,
        isFinal: isFinal
      });

      if (!isFinal) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: 'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui
          }
        ]);
      } else {
        // Handle final response with trip data
        const tripData = result?.data?.trip_plan;
        setTripDetail(tripData);
        setTripDetailInfo(tripData); // This should now work correctly
        
        // Save trip details to database
        if (tripData && userDetail?._id) {
          const tripId = uuidv4();
          try {
            await SaveTripDetail({
              tripDetail: tripData,
              tripId: tripId,
              uid: userDetail._id
            });
            console.log('Trip details saved successfully');
          } catch (saveError) {
            console.error('Failed to save trip details:', saveError);
          }
        }
        
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: 'assistant',
            content: result?.data?.resp || "Your trip plan is ready!",
            ui: result?.data?.ui
          }
        ]);
      }

      console.log('API Response:', result.data);
    } catch (error) {
      console.error('API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Error: Failed to fetch response. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const RenderGenerativeUi = (ui: string | undefined) => {
    if (ui === 'budget') {
      return <BudgetUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'groupSize') {
      return <GroupSizeUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'tripDuration') {
      return <SelectDaysUi onSelectOption={(v: string) => { setUserInput(v); onSend(); }} />
    } else if (ui === 'final') {
      return <FinalUi viewTrip={viewTrip} disabled={!tripDetail} />
    }
    return null;
  }

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === 'final' && !isFinal) {
      console.log('Final UI triggered, switching to final mode');
      setIsFinal(true);
    }
  }, [messages, isFinal]);

  useEffect(() => {
    if (isFinal && !tripDetail) {
      console.log('Sending final request to generate trip plan...');
      // onSend('Generate my trip plan with all the details collected.');
    }
  }, [isFinal]);

  // If we're showing the final UI with trip details, render it prominently
  // if (showFinalUi && tripDetail) {
  //   return (
  //     <div className="h-[85vh] flex flex-col items-center justify-center p-6">
  //       <FinalUi viewTrip={viewTrip} disabled={!tripDetail} />
        
  //       <Button 
  //         variant="outline" 
  //         className="mt-4"
  //         onClick={() => {
  //           setShowFinalUi(false);
  //           setIsFinal(false);
  //         }}
  //       >
  //         Continue Planning
  //       </Button>
  //     </div>
  //   );
  // }
if (showFinalUi && tripDetail) {
  return (
    <div className="h-[85vh] flex flex-col items-center justify-center p-6">
      <FinalUi 
        viewTrip={viewTrip} 
        disabled={false} // Since tripDetail exists, it's not disabled
        tripData={tripDetail} // Pass the trip data for preview
      />
      
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => {
          setShowFinalUi(false);
          // Don't reset isFinal here if you want to keep the trip data
          // setIsFinal(false);
        }}
      >
        Continue Planning
      </Button>
    </div>
  );
}
  return (
    <div className="h-[85vh] flex flex-col border shadow rounded-2xl p-5">
      {messages.length === 0 && (
        <EmptyBoxState 
          onSelectOption={(v: string) => {
            setUserInput(v); 
            onSend();
          }} 
        />
      )}

      {/* Display Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          msg.role === 'user' ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUi(msg.ui)}
                
                {/* Show FinalUi in chat when trip is ready */}
                {msg.ui === 'final' && tripDetail && (
                  <div className="mt-4">
                    <FinalUi viewTrip={() => setShowFinalUi(true)} disabled={false} />
                  </div>
                )}
              </div>
            </div>
          )
        ))}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg flex items-center gap-2">
              <Loader className="animate-spin" />
              <span>{isFinal ? "Creating your trip plan..." : "Thinking..."}</span>
            </div>
          </div>
        )}
      </section>

      {/* User Input */}
      <section>
        <div className="border rounded-2xl p-4 flex items-center gap-2">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-15 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={loading}
          />
          <Button 
            size="icon" 
            className="shrink-0" 
            onClick={() => onSend()} 
            disabled={loading || !userInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ChatBox;