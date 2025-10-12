import { PricingTable } from '@clerk/nextjs'

export default function Pricing() {
  return (
    <div className='mt-20'>
        <h2 className='text-bold text-3xl my-5 text-center'>AI-powered Trip planning-pick your plan </h2>

    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )
}