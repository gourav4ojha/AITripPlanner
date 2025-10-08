"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"

const SelectDaysUi = ({ onSelectOption }: { onSelectOption: (value: string) => void }) => {
  const [days, setDays] = useState<number>(3)

  const increaseDays = () => setDays((prev) => prev + 1)
  const decreaseDays = () => setDays((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="mt-4 bg-white border rounded-2xl shadow-sm p-6 w-full max-w-sm text-center">
      <h3 className="text-lg font-semibold mb-4">How many days do you want to travel?</h3>

      <div className="flex items-center justify-center gap-4 mb-5">
        <button
          onClick={decreaseDays}
          className="w-10 h-10 flex items-center justify-center text-2xl rounded-full border border-gray-300 hover:bg-gray-100"
        >
          −
        </button>

        <span className="text-xl font-bold">{days} Days</span>

        <button
          onClick={increaseDays}
          className="w-10 h-10 flex items-center justify-center text-2xl rounded-full border border-gray-300 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <Button
        onClick={() => onSelectOption(`${days} Days`)}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2 font-medium"
      >
        Confirm
      </Button>
    </div>
  )
}

export default SelectDaysUi
