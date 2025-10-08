import { suggestions } from '@/app/_components/Hero';
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='mt-7'>

        <div className='font-bold text-3xl text-center'>Start planning new <strong className='text-primary'>Trip</strong> using AI</div>
        <p className='text-center text-gray-400 mt-2'>Discover personalized travel itineraries, finding the best destinations, nd plan your dream vacation effortlessly with the power of AI. Let our smart assistent to the hard work while you enjoy the juarny</p>

        <div className="flex flex-col justify-center gap-5 mt-4">
                  {suggestions.map((suggestions: { icon: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, index: React.Key | null | undefined) => (
                    <div
                      key={index}
                      onClick={()=>onSelectOption(suggestions.title)}
                      className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary transition transform hover:scale-105"
                    >
                      {suggestions.icon}
                      <h2 className="text-lg font-medium">{suggestions.title}</h2>
                    </div>
                  ))}
                </div>
    </div>
  )
}

export default EmptyBoxState