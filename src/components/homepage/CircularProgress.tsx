'use client'
import { getDonationsMetadata } from '@/lib/fetches/donations'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo } from 'react'
import { useSpring, animated } from 'react-spring'

/**
 * This component presents the total donation goal that is  completed using a circle animation
 */
const CircularProgress = () => {
  const { data } = useQuery({
    queryKey: ['donations-metadata'],
    queryFn: getDonationsMetadata,
  })

  // Define the diameter and stroke of the circle
  const diameter = 250
  const strokeWidth = 3

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * (diameter / 2)

  //progress will be a value from 0 to value / max in the animation. Current value will just be a value from 0 to the actual number
  const [animationProps, animationAPI] = useSpring(() => ({
    progress: 0,
    opacity: 0, // Initial opacity
    config: { duration: 1 },
  }))

  //starts the animation from 0 to the given value
  useEffect(() => {
    if (data === undefined || data.gathered === undefined) return

    animationAPI.start({
      progress: data.gathered / data.target,
      opacity: 1, // Target opacity
    })
  }, [data, animationAPI])

  const scrollToDonationForm = () => {
    const targetElement = document.getElementById('donation-form');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className="relative">
        <animated.p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-handwriting text-5xl text-cyan-500">
          {animationProps.progress.to((p) => `${Math.round(p * 100)}%`)}
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
            stroke="#fff"
            strokeWidth={strokeWidth}
          />
          <animated.circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={diameter / 2 - strokeWidth / 2}
            fill="none"
            stroke="#06b6d4"
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
        <div className="mt-8 flex w-full items-center justify-center font-handwriting text-2xl ">
          <animated.p className={'min-w-[100px] text-center text-cyan-500'}>
            {data?.gathered}$
          </animated.p>
          <p className={'text-cyan-500 '}>/</p>
          <p className="min-w-[100px] text-center">{data?.target}$</p>
        </div>
        <p className="m-0 p-0 font-handwriting text-2xl">collected</p>
        <button
          onClick={scrollToDonationForm}
          className="rounded-3xl lg:mt-4 bg-cyan-400 px-8 py-4 font-handwriting text-2xl text-cyan-950 transition-all duration-300 hover:bg-cyan-300"
        >
          Offer your support
        </button>
      </animated.div>
      
    </div>
  )
}

export default CircularProgress
