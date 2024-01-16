import React from 'react'
import hydrationData from '@/constants/homepage/HeroSection.json'
import CircularProgress from '../CircularProgress'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getDonationsMetadata, getDonors } from '@/lib/fetches/donations'
import ListOfDonors from '../ListOfDonors'

/**
 * This section should appear at the top on the homepage ("/")
 */
export default async function HeroSection() {
  const donationMetadataQueryClient = new QueryClient()

  await donationMetadataQueryClient.prefetchQuery({
    queryKey: ['donations-metadata'],
    queryFn: getDonationsMetadata,
  })

  const donorsQueryClient = new QueryClient()

  await donorsQueryClient.prefetchQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  })


  return (
    <article className="relative w-full py-[15vh] lg:py-[4vh] ">
      <div className="mb-12 animate-fadeIn lg:mb-8 flex w-full flex-col items-center justify-center space-y-12 lg:space-y-6 align-middle ">
        <h1 className="w-full animate-fadeIn max-w-[350px] dark:text-cyan-200 text-center  font-handwriting text-5xl text-cyan-900   lg:max-w-[450px] lg:text-6xl  ">
          {hydrationData.title}
        </h1>
        <h2 className="max-w-[300px] text-center font-serif text-xl text-white font-thin lg:max-w-[550px] lg:font-light ">
          {hydrationData.subTitle}
        </h2>
      </div>
      <HydrationBoundary state={dehydrate(donationMetadataQueryClient)}>
        <CircularProgress />
      </HydrationBoundary>
      <div className="mt-20 animate-fadeIn flex w-full flex-col items-center lg:items-baseline ">
        <div className="w-[95vw] rounded-3xl bg-cyan-100 dark:bg-neutral-900 px-2 py-4 text-xl shadow-md dark:shadow-stone-950 shadow-stone-300 lg:ml-[2vw] lg:w-auto lg:max-w-[60vw]">
          <h3 className="p-2 font-serif">{hydrationData.description}</h3>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(donationMetadataQueryClient)}>
        <ListOfDonors />
      </HydrationBoundary>
    </article>
  )
}
