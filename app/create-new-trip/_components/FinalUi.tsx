"use client";
import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface FinalUiProps {
  viewTrip: () => void;
  disabled?: boolean;
}

function FinalUi({ viewTrip, disabled = false }: FinalUiProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl shadow-md">
      <Globe2 className="text-primary text-4xl animate-bounce" />

      <h2 className="mt-3 text-lg font-semibold text-primary">
        {disabled ? "✈️ Planning your dream trip..." : "✅ Your trip is ready!"}
      </h2>

      <p className="text-gray-500 text-sm text-center mt-1">
        {disabled 
          ? "Gathering best destinations, activities, and travel details for you."
          : "Your personalized travel plan has been created successfully."
        }
      </p>

      <Button
        disabled={disabled}
        onClick={viewTrip}
        className="mt-2 w-full bg-primary text-white rounded-xl hover:bg-primary/90 transition"
      >
        {disabled ? "Planning..." : "View Trip"}
      </Button>

      {disabled && (
        <div className="w-48 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-2 bg-primary animate-pulse w-3/4"></div>
        </div>
      )}
    </div>
  );
}

export default FinalUi;

