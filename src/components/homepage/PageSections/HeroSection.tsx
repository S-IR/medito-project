import React from 'react'
import hydrationData from '@/constants/homepage/HeroSection.json'
import DonationProgress from '../DonationProgress'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getDonationsMetadata, getDonors } from '@/lib/fetches/donations'
import ListOfDonors from '../ListOfDonors'

/**
 * The section that should appear first at the top of the homepage 
 */
export default async function HeroSection() {
  const donorsQueryClient = new QueryClient()

  await donorsQueryClient.prefetchQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  })

  return (
    <article className="relative w-full py-[15vh] lg:py-[4vh] ">
      <div className="mb-12 flex w-full animate-fadeIn flex-col items-center justify-center space-y-12 align-middle lg:mb-8 lg:space-y-6 ">
        <h1 className="w-full max-w-[80vw] animate-fadeIn text-center font-handwriting   text-5xl text-cyan-900 dark:text-cyan-200 md:text-6xl   xl:max-w-[40vw] lg:text-8xl  ">
          {hydrationData.title}
        </h1>
        <h2 className="max-w-[300px] text-center lg:text-3xl font-serif text-xl font-thin text-white lg:max-w-[50vw] xl:font-light ">
          {hydrationData.subTitle}
        </h2>
      </div>
      <DonationProgress />
      <div className="mt-20 flex w-full animate-fadeIn flex-col items-center lg:items-baseline ">
        <div className="w-[95vw] rounded-3xl bg-cyan-100 px-2 py-4 text-xl shadow-md shadow-stone-300 dark:bg-neutral-900 dark:shadow-stone-950 lg:ml-[2vw] lg:w-auto xl:max-w-[45vw]">
          <h3 className="p-2 font-serif">{hydrationData.description}</h3>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(donorsQueryClient)}>
        <ListOfDonors />
      </HydrationBoundary>
    </article>
  )
}
