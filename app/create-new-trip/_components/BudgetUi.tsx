import React from 'react'

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '🍸',
    color: 'bg-purple-100 text-purple-600'
  }
]

function BudgetUi({onSelectOption}:any) {
  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col item-center text-center"
                  onClick={()=>onSelectOption(item.title+":"+item.desc)}
                >
                  <h2 className={`text-3xl p-3 rounded-full ${item.color}`}>{item.icon}</h2>
                  <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  {/* <p className="text-xs text-gray-400">{item.people}</p> */}
                </div>
              ))}
            </div>
    </div>
  )
}

export default BudgetUi