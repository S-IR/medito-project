'use client'
import {
  donationsMetadataRes,
  getDonationsMetadata,
  getNewDonor,
  getNewDonorDelayMS,
} from '@/lib/fetches/donations'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { themeAtom } from '../Nav'
import { donorData } from '@/constants/types/donation'

/**
 * This component presents the total donation goal that is  completed using a circle animation
 */
const DonationProgress = () => {
  //I've set both to 1 to avoid any divide by 0 issues
  const [donationMetadata, setDonationMetadata] =
    useState<donationsMetadataRes>({ gathered: 0, target: 0 })

  //progress will be a value from 0 to value / max in the animation. Current value will just be a value from 0 to the actual number
  const [animationProps, animationAPI] = useSpring(() => ({
    from: {
      progress: 0,
      opacity: 0, // Initial opacity
    },
    to: {
      progress : 0
    },

  }))

  //at first fetch the full metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getDonationsMetadata()
      setDonationMetadata(metadata)
      return metadata
    }
    fetchMetadata()
  }, [])

  useEffect(() => {
    if (donationMetadata.target === 0) return
    console.log('donation metadata', donationMetadata);
    console.log('donationMetadata.gathered', donationMetadata.gathered, "donationMetadata.target", donationMetadata.target, "equation", Math.max(1, donationMetadata.gathered) / donationMetadata.target);

    animationAPI.start({
      progress: Math.max(1, donationMetadata.gathered) / donationMetadata.target,
      opacity: 1,
    })
  }, [donationMetadata])

  //then IF there are subsequent coming donations (I've used react query to be able to do this fetch in any component and use the same data) change the gathered amount
  const { data: newDonorData } = useQuery({
    queryKey: ['new-donations'],
    queryFn: getNewDonor,
    refetchInterval: getNewDonorDelayMS,
  })

  useEffect(() => {
    if (
      !newDonorData ||
      !newDonorData.donation ||
      !newDonorData.donation.amount
    )
      return

    setDonationMetadata((oldMetadata) => {
      return {
        ...oldMetadata,
        gathered: oldMetadata?.gathered + newDonorData!.donation!.amount,
      }
    })
  }, [newDonorData])

  // Define the diameter and stroke of the circle
  const diameter = 250
  const strokeWidth = 3

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * (diameter / 2)



  const scrollToDonationForm = () => {
    const targetElement = document.getElementById('donation-form')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const [colorTheme] = useAtom(themeAtom)
  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className="relative">
        <animated.p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-handwriting text-5xl text-cyan-500 dark:text-cyan-300">
          {animationProps.progress.to((p) => {
            console.log('p as a number', p, 'Math.round(p*100)', Math.round(p*100));
            return `${Math.round(p*100)}%`
            
          })}
        </animated.p>
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
        >
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={diameter / 2 - strokeWidth / 2}
            fill="none"
            stroke={colorTheme === 'light' ? '#fff' : '#0C0D11'}
            strokeWidth={strokeWidth}
          />
          <animated.circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={diameter / 2 - strokeWidth / 2}
            fill="none"
            stroke={colorTheme === 'light' ? '#06b6d4' : '#67e8f9'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animationProps.progress.to(
              (p) => circumference * (1 - p)
            )}
            transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
          />
        </svg>
      </div>

      <animated.div
        style={{ opacity: animationProps.opacity }}
        className={'flex flex-col items-center'}
      >
        <div className="mt-4 flex w-full items-center justify-center font-handwriting text-2xl ">
          <animated.p
            className={
              'min-w-[100px] text-center text-cyan-500 dark:text-cyan-300'
            }
          >
            {donationMetadata?.gathered}$
          </animated.p>
          <p className={'text-cyan-500 '}>/</p>
          <p className="min-w-[100px] text-center">
            {donationMetadata?.target}$
          </p>
        </div>
        <p className="m-0 p-0 font-handwriting text-2xl">collected</p>
        <button
          onClick={scrollToDonationForm}
          className="rounded-3xl bg-cyan-400 px-8 py-4 font-handwriting text-2xl text-cyan-950 transition-all duration-300 hover:bg-cyan-300 dark:bg-cyan-800 dark:text-cyan-200 hover:dark:bg-cyan-700 lg:mt-4"
        >
          Offer your support
        </button>
      </animated.div>
    </div>
  )
}

export default DonationProgress
