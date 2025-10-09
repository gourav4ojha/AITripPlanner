// "use client";
// import { Globe2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import React from "react";

// interface FinalUiProps {
//   viewTrip: () => void;
//   disabled?: boolean;
// }

// function FinalUi({ viewTrip, disabled = false }: FinalUiProps) {
//   return (
//     <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl shadow-md">
//       <Globe2 className="text-primary text-4xl animate-bounce" />

//       <h2 className="mt-3 text-lg font-semibold text-primary">
//         {disabled ? "✈️ Planning your dream trip..." : "✅ Your trip is ready!"}
//       </h2>

//       <p className="text-gray-500 text-sm text-center mt-1">
//         {disabled 
//           ? "Gathering best destinations, activities, and travel details for you."
//           : "Your personalized travel plan has been created successfully."
//         }
//       </p>

//       <Button
//         disabled={disabled}
//         onClick={viewTrip}
//         className="mt-2 w-full bg-primary text-white rounded-xl hover:bg-primary/90 transition"
//       >
//         {disabled ? "Planning..." : "View Trip"}
//       </Button>

//       {disabled && (
//         <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
//           <div className="h-2 bg-primary animate-pulse w-3/4"></div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FinalUi;

"use client";
import { Globe2, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface FinalUiProps {
  viewTrip: () => void;
  disabled?: boolean;
  tripData?: any; // Optional: if you want to show trip preview
}

function FinalUi({ viewTrip, disabled = false, tripData }: FinalUiProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl shadow-md border">
      {/* Animated Icon */}
      <div className="relative">
        <Globe2 className="text-primary text-4xl animate-bounce" />
        {!disabled && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>

      {/* Title */}
      <h2 className="mt-3 text-lg font-semibold text-primary text-center">
        {disabled ? "✈️ Planning your dream trip..." : "✅ Your trip is ready!"}
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-sm text-center mt-1 max-w-xs">
        {disabled 
          ? "Gathering best destinations, activities, and travel details for you."
          : "Your personalized travel plan has been created successfully."
        }
      </p>

      {/* Optional Trip Preview */}
      {!disabled && tripData && (
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{tripData.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{tripData.duration} days</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        disabled={disabled}
        onClick={viewTrip}
        className="mt-4 w-full bg-primary text-white rounded-xl hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2"
        size="lg"
      >
        {disabled ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Planning...
          </>
        ) : (
          <>
            <MapPin className="h-4 w-4" />
            View Trip
          </>
        )}
      </Button>

      {/* Progress Bar for Loading State */}
      {disabled && (
        <div className="w-full mt-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-primary animate-pulse w-3/4 transition-all duration-1000"></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            This may take a few moments...
          </p>
        </div>
      )}
    </div>
  );
}

export default FinalUi;
