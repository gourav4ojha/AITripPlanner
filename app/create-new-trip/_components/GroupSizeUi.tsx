import React from 'react'

export const SelectTravellersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveller in exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travellers in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '⛺',
    people: '5 to 10 People'
  }
]

function GroupSizeUi({onSelectOption}:any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {SelectTravellersList.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer"
          onClick={()=>onSelectOption(item.title+":"+item.people)}
        >
          <h2 className="text-2xl">{item.icon}</h2>
          <h2 className="font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.desc}</p>
          <p className="text-xs text-gray-400">{item.people}</p>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUi
