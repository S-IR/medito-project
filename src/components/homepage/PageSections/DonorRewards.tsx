import React from 'react'
import hydrationData from '@/constants/homepage/DonorRewards.json'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import TierComponent from '../TierComponent'


/**
 * Displays all of the donor rewards that a donor gets depending on how much did he pay
 */
const DonorRewards = () => {
  return (
    <article className="py-6 rounded-3xl flex  w-full  flex-col items-center justify-center bg-gradient-to-r lg:rounded-[60px]align-middle">
      <h5 className="max-w-[80vw] lg:max-w-[500px] mt-16 font-handwriting text-5xl text-cyan-900 dark:text-cyan-300 ">
        {hydrationData.title}
      </h5>
      <h6 className="my-8 max-w-[80vw] lg:max-w-[550px] text-center font-serif text-xl">
        {hydrationData.subtitle}
      </h6>

      <div className="mt-8 flex flex-col gap-y-8 lg:grid lg:grid-cols-2 lg:gap-12 ">
        {hydrationData.tiers.map((tier) => (
          <TierComponent key={tier.value} tier={tier} />
        ))}
      </div>
    </article>
  )
}

export default DonorRewards
