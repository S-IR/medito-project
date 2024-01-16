'use client'
import {
  getDonors,
  getNewDonor,
  getNewDonorDelayMS,
} from '@/lib/fetches/donations'
import { useQuery } from '@tanstack/react-query'
import { FaQuestion } from 'react-icons/fa'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { donorData, getCurrencySymbol } from '@/constants/types/donation'
import { timeSinceNow } from '@/lib/date-functions'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/components/ui/use-toast'
import { useTransition, animated, config } from 'react-spring'

const ListOfDonors = () => {
  const [donors, setDonors] = useState<undefined | donorData[]>(undefined)
  const [isFirstRun, setIsFirstRun] = useState(true)

  useEffect(() => {
    async function fetchDonors() {
      const donors = await getDonors()
      setDonors(donors.slice(0, 4))
    }
    fetchDonors()
  }, [])

  const { toast } = useToast()

  const { data: newDonorData } = useQuery({
    queryKey: ['new-donations'],
    queryFn: getNewDonor,
    refetchInterval: getNewDonorDelayMS,
  })

  //when a new donor comes through
  useEffect(() => {
    if (!newDonorData || !newDonorData.donation) return

    toast({
      title: `A new donation from ${newDonorData.donation.fromDonor.name}!`,
      description: `Thank you for your donation of ${newDonorData.donation.amount}${getCurrencySymbol(newDonorData.donation.currency)}.`,
      className: 'dark:bg-neutral-950 dark:border-slate-800 ',
    })

    setDonors((donors) => {
      if (donors === undefined) {
        return [newDonorData.donation?.fromDonor!]
      } else {
        return [newDonorData.donation?.fromDonor!, ...donors].slice(0, 4)
      }
    })
  }, [newDonorData])

  //handles the animation
  const transitions = useTransition(donors, {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    config: {duration: 300, ...config.gentle},
    keys: (donor) => donor!.id,
  })

  return (
    <section className="mt-12 flex w-full animate-fadeIn flex-col items-center justify-center gap-y-6 px-6 align-middle font-handwriting xl:absolute xl:right-0 xl:top-[45%] xl:max-w-[450px]">
      <h4 className="!mb-8 text-center font-handwriting text-3xl text-cyan-900 dark:text-cyan-500">
        Recent Supporters
      </h4>
      {donors === undefined ? (
        <div className="flex w-full items-center justify-center align-middle">
          <ClipLoader
            color={'#DAF9FB'}
            loading={donors === undefined}
            size={36}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        transitions((styles, donor, t, i) => (
          <animated.div className={"w-full"} style={styles}>
            <DonorRow key={donor!.id} donor={donor!} />
          </animated.div>
        ))
      )}
    </section>
  )
}

export default ListOfDonors

const DonorRow = ({ donor }: { donor: donorData }) => {
  const currencySymbol = useMemo(
    () => getCurrencySymbol(donor.currency),
    [donor.currency]
  )
  const time = useMemo(() => timeSinceNow(donor.date), [donor.date])
  return (
    <div className="flex w-full items-center gap-x-4  ">
      <div className="!m-0 h-[50px] w-[50px] rounded-full !p-0">
        {donor.profileUrl ? (
          <Image
            alt={`profile picture for ${donor.name} `}
            src={donor.profileUrl}
            fill
          />
        ) : (
          // if there is no profile picture this code will get a random color from the array below depending on the donor's id (so that the donor will always have the same color every time). Then it will use that color to create a circle
          <div
            className="!m-0 flex h-[50px] w-[50px] items-center justify-center rounded-full !p-0 align-middle"
            style={{ backgroundColor: randomColorForId(donor.id) }}
          >
            <FaQuestion className="opacity-30" size={24} />
          </div>
        )}
      </div>
      <div className="relative flex h-16 w-full grow flex-col border-l-[1px] border-cyan-500 py-2 pl-4  font-serif">
        <p className="text-lg">{donor.name}</p>
        <p className="text-sm">{`${currencySymbol}${donor.amount}`}</p>
        <p className="absolute right-0 top-2  text-xs text-stone-300">{time}</p>
      </div>
    </div>
  )
}
function randomColorForId(id: string): string {
  const seed = id.charCodeAt(0)
  const index = seed % randomColors.length
  return randomColors[index]
}
const randomColors = [
  '#D9D9D9',
  '#F2ACAC',
  '#FEDA1B',
  '#9FFCF1',
  '#F2FEC3',
  '#FEEEC3',
  '#C3DEFE',
  '#C3FEED',
  '#F7D9FF',
  '#FFD9E5',
] as const
