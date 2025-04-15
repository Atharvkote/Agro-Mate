import React from 'react'
import { Info } from 'lucide-react'

const page = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className='bg-green-100 rounded-2xl flex justify-center items-center flex-col gap-3 lg:w-1/2 lg:h-1/2 p-5'>
        <Info className='w-28 h-28 text-green-600' />
        <p className='lg:text-3xl font-bold text-green-600'>No Insights Available Right Now</p>
      </div>
    </div>
  )
}

export default page
