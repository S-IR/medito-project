'use client'
import hydrationData from '@/constants/homepage/DonorRewards.json'
import { useAtom } from 'jotai'
import { useRouter, useSearchParams } from 'next/navigation'
import { formAmountAtom } from '@/components/homepage/DonationForm'

interface TierComponentProps {
  tier: (typeof hydrationData)['tiers'][number]
}
export default function TierComponent({ tier }: TierComponentProps) {
  //this form amount atom is used to set the donor's form amount when the scrolling to that part of the page happens
  const [, setFormAmountAtom] = useAtom(formAmountAtom)

  const scrollToDonationForm = (amount: number) => {
    setFormAmountAtom(amount as any) // Set the value of the atom (I decided not to export the type. This is 'any' in order to make the typescript compiler happy)
    const targetElement = document.getElementById('donation-form')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex h-[300px] w-[400px] flex-col rounded-3xl  bg-white dark:bg-neutral-950 dark:shadow-stone-950 p-4 shadow-md shadow-stone-400">
      <p className="mt-6 w-full text-center font-handwriting text-6xl text-cyan-800 dark:text-cyan-400 ">{`${tier.value}$`}</p>
      <ul className=" mt-4 flex list-none flex-col">
        {tier.rewards.map((point) => (
          <li className=" flex items-center" key={point}>
            <span className="mr-2">•</span> {/* Custom bullet */}
            {point}
          </li>
        ))}
      </ul>
      <button
        onClick={() => scrollToDonationForm(tier.value)}
        className="mx-auto mt-auto w-min whitespace-nowrap rounded-3xl bg-cyan-500 dark:bg-cyan-800 dark:text-cyan-200 hover:dark:bg-cyan-700 px-8 py-2 font-handwriting text-xl text-cyan-950 transition-all duration-300 hover:bg-cyan-400 "
      >{`Donate ${tier.value}$`}</button>
    </div>
  )
}
