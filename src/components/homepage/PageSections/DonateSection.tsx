'use client'
import { possibleCurrencies } from '@/constants/types/donation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { usePathname } from 'next/navigation'
import { atom, useAtom } from 'jotai'
import { useSpring, animated } from 'react-spring'

const possibleDurations = ['one time', 'monthly', 'yearly'] as const
const possibleAmounts = [5, 10, 15, 20, 'custom'] as const


export const formAmountAtom = atom<(typeof possibleAmounts)[number]>('custom')
/**
 * This section is a wrapper around the donation form.
 * @returns
 */
function DonateSection() {
  return (
    <article className="my-[15vh] flex w-full items-center justify-center align-middle">
      <DonationForm />
    </article>
  )
}
export default DonateSection

const formSchema = z.object({
  value: z
    .number()
    .int('This number must be an integer')
    .gt(0, 'Value must be greater than 0'),
  currency: z.enum(possibleCurrencies),
})
type formSubmit = z.infer<typeof formSchema>
/**
 * A donation form that allows that redirects the user to stripe. Can be extracted from here if needed
 * @returns
 */
function DonationForm() {
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
  } = useForm<formSubmit>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      currency: 'USD',
    },
  })
  const [amountSetByPage] =
    useAtom<(typeof possibleAmounts)[number]>(formAmountAtom)

  const [chosenDuration, setChosenDuration] =
    useState<(typeof possibleDurations)[number]>('monthly')
  const [chosenAmount, setChosenAmount] =
    useState<(typeof possibleAmounts)[number]>(amountSetByPage)

  const onSubmit = (data: formSubmit) => {
    console.log(data)
    // Handle form submission here
  }



  useEffect(() => {
    if (
      !possibleAmounts.includes(
        amountSetByPage as (typeof possibleAmounts)[number]
      )
    )
      return
    setChosenAmount(amountSetByPage)
    if (amountSetByPage === 'custom') return
    setFormValue('value', amountSetByPage)
  }, [amountSetByPage, setFormValue])

  return (
    <form
      id={'donation-form'}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-y-6 rounded-3xl bg-teal-100 dark:bg-teal-900 px-8  py-6 shadow-md shadow-stone-400 dark:shadow-stone-950 lg:max-w-[600px]"
    >
      <p className="font-handwriting text-3xl font-light text-teal-950 dark:text-teal-200 lg:my-2 lg:w-full lg:text-center lg:text-5xl ">
        Begin Contributing
      </p>
      <div className=" flex w-full items-center justify-center gap-x-2">
        {possibleDurations.map((duration) => (
          <button
            type="button"
            className={`w-full  rounded-md px-10 py-1 text-teal-900  dark:text-teal-200 shadow-md dark:shadow-stone-950 shadow-stone-400 hover:text-black ${chosenDuration === duration ? `bg-cyan-200 dark:bg-cyan-800 hover:dark:bg-cyan-700` : `bg-white dark:bg-teal-800 hover:dark:bg-teal-700 transition-all duration-300 `} `}
            key={duration}
            onClick={() => setChosenDuration(duration)}
          >
            {duration}
          </button>
        ))}
      </div>
      <div className="flex w-full justify-center gap-1">
        {possibleAmounts.map((amount) => (
          <button
            type="button"
            className={`w-full rounded-md px-6 py-1 text-sm text-teal-900 shadow-md  dark:text-teal-200 dark:shadow-stone-950  shadow-stone-400 hover:text-black ${chosenAmount === amount ? `bg-cyan-200 dark:bg-cyan-800 hover:dark:bg-cyan-700` : `bg-white hover:dark:bg-teal-700 dark:bg-teal-800 transition-all duration-300 `} `}
            key={amount}
            onClick={() => {
              setChosenAmount(amount)
              if (amount === 'custom') {
                setFormValue('value', 0)
              } else {
                setFormValue('value', amount)
              }
            }}
          >
            {typeof amount === 'number' ? `${amount}$` : amount}
          </button>
        ))}
      </div>
      <div 
      className={`min-h-[60px] w-full `}>
        {chosenAmount === 'custom' && (
          <div className="relative mt-4 w-full ">
            <div className="flex h-8 max-w-[200px] rounded-md shadow-md shadow-stone-400 dark:shadow-stone-950 ">
              <select
                {...register('currency')}
                className="h-full w-12 rounded-l-md bg-cyan-100 text-xs text-cyan-500 dark:bg-neutral-900 dark:text-cyan-700 "
              >
                {possibleCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <input
                min={0}
                type="number"
                {...register('value', { valueAsNumber: true })}
                className="h-full w-full dark:bg-teal-800 dark:text-cyan-300 rounded-r-md pl-2"
              />
            </div>
            <p className="absolute right-0 top-0 text-right text-xs text-cyan-600 dark:text-cyan-400 ">
              minimum is the equivalent of 1 USD
            </p>
          </div>
        )}
      </div>

      {/* This is some filler space for any legal related text if needed. you can always remove it */}
      <p className="w-full text-cyan-800 dark:text-cyan-500">
        {`
        This Collective's Fiscal Host is a registered 501(c)(3) non-profit organization. Your contribution will be tax-deductible in the US, to the extent allowed by the law.`}
      </p>
      <button
        type="submit"
        className="mx-auto mt-4 rounded-3xl bg-cyan-500 dark:bg-cyan-800 hover:dark:bg-cyan-700 dark:text-cyan-200 px-12 py-2 font-handwriting text-2xl text-cyan-900 transition-all duration-300 hover:bg-cyan-400"
      >
        Donate
      </button>
    </form>
  )
}
