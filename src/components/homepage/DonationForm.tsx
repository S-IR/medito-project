'use client'
import {
  possibleCurrencies,
  possibleCurrency,
  possibleIntervals,
} from '@/constants/types/donation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { atom, useAtom } from 'jotai'
import { loadStripe } from '@stripe/stripe-js'
import getStripe from '@/lib/utils/get-stripe'
import Stripe from 'stripe'
import { useTransition, animated, useSpring, useInView } from 'react-spring'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'

const possibleDurations = [
  {
    label: 'one time',
    value: 'one-time',
  },
  {
    label: 'monthly',
    value: 'month',
  },
  {
    label: 'yearly',
    value: 'year',
  },
] as const
const possibleAmounts = [5, 10, 15, 20, 'custom'] as const
export const formAmountAtom = atom<(typeof possibleAmounts)[number]>('custom')

const formSchema = z.object({
  amount: z
    .number()
    .int('This number must be an integer')
    .gt(0, 'Value must be greater than 0'),
  currency: z.enum(possibleCurrencies),
  interval: z.enum(possibleIntervals),
})
type formSubmit = z.infer<typeof formSchema>
/**
 * A donation form that allows that redirects the user to stripe.
 */
export default function DonationForm() {
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    watch,
    formState: { errors },
  } = useForm<formSubmit>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      currency: 'USD',
      interval: 'one-time',
    },
  })

  //amountSetByPage is a variable that can be set by any component
  const [amountSetByPage] =
    useAtom<(typeof possibleAmounts)[number]>(formAmountAtom)

  const [chosenAmount, setChosenAmount] =
    useState<(typeof possibleAmounts)[number]>(amountSetByPage)

  const [isStripeLoading, setIsStripeLoading] = useState(false)
  const onSubmit = async (data: formSubmit) => {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    const stripe = await loadStripe(STRIPE_PK)

    const result = await fetch('/api/checkout-sessions', {
      method: 'POST',
      body: JSON.stringify(data, null),
      headers: {
        'content-type': 'application/json',
      },
    })
    // step 4: get the data and redirect to checkout using the sessionId
    const responseData = (await result.json()) as Stripe.Checkout.Session

    const sessionId = responseData.id!
    stripe?.redirectToCheckout({ sessionId })
  }

  //if amountPerPage changes then update the form
  useEffect(() => {
    if (
      !possibleAmounts.includes(
        amountSetByPage as (typeof possibleAmounts)[number]
      )
    )
      return

    setChosenAmount(amountSetByPage)
    if (amountSetByPage === 'custom') return
    setFormValue('amount', amountSetByPage)
  }, [amountSetByPage])

  const currentInterval = watch('interval')
  const currentCurrency = watch('currency')

  useTransition

  return (
    <form
      id={'donation-form'}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[90vw] flex-col gap-y-6 rounded-3xl bg-teal-100 px-8 py-6  shadow-md shadow-stone-400 dark:bg-teal-900 dark:shadow-stone-950 lg:max-w-[600px]"
    >
      <p className="font-handwriting text-3xl font-light text-teal-950 dark:text-teal-200 lg:my-2 lg:w-full lg:text-center lg:text-5xl ">
        Begin Contributing
      </p>
      <div className=" flex w-full items-center justify-center gap-x-2">
        {possibleDurations.map((duration) => (
          <button
            type="button"
            className={`lg:text-smp lg:text-base w-full rounded-md px-4 py-1 text-xs text-teal-900 shadow-md shadow-stone-400  hover:text-black dark:text-teal-200 dark:shadow-stone-950 lg:px-10 ${currentInterval === duration.value ? `bg-cyan-200 dark:bg-cyan-800 hover:dark:bg-cyan-700` : `bg-white transition-all duration-300 dark:bg-teal-800 hover:dark:bg-teal-700 `} `}
            key={duration.value}
            onClick={() => setFormValue('interval', duration.value)}
          >
            {duration.label}
          </button>
        ))}
      </div>
      <div className="flex w-full justify-center gap-1">
        {possibleAmounts.map((amount) => (
          <button
            type="button"
            className={`lg:text-smp lg:text-base w-full rounded-md px-2 py-1 text-xs text-teal-900 shadow-md shadow-stone-400 hover:text-black  dark:text-teal-200 dark:shadow-stone-950  lg:px-6 ${chosenAmount === amount ? `bg-cyan-200 dark:bg-cyan-800 hover:dark:bg-cyan-700` : `bg-white transition-all duration-300 dark:bg-teal-800 hover:dark:bg-teal-700 `} `}
            key={amount}
            onClick={() => {
              setChosenAmount(amount)
              if (amount === 'custom') {
                setFormValue('amount', 0)
              } else {
                setFormValue('amount', amount)
              }
            }}
          >
            {typeof amount === 'number' ? `${amount}$` : amount}
          </button>
        ))}
      </div>
      <div className={`min-h-[70px] w-full `}>
        <div className="relative mt-4 w-full ">
          {chosenAmount === 'custom' && (
            <>
              <div className="flex h-8 max-w-[200px] rounded-md shadow-md shadow-stone-400 dark:shadow-stone-950 ">
                <Select
                  onValueChange={(e) =>
                    setFormValue('currency', e as possibleCurrency)
                  }
                >
                  <SelectTrigger className="h-full w-12 rounded-l-md bg-cyan-100 text-xs text-cyan-500 dark:bg-neutral-900 dark:text-cyan-700 ">
                    {currentCurrency}
                  </SelectTrigger>
                  <SelectContent className="dark:bg-teal-950">
                    {possibleCurrencies.map((currency) => (
                      <SelectItem
                        className="hover:dark:bg-cyan-600"
                        key={currency}
                        value={currency}
                      >
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <input
                  min={1}
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="h-full w-full rounded-r-md pl-2 dark:bg-teal-800 dark:text-cyan-300"
                />
              </div>
              <p className="absolute right-0  top-0 max-w-[25vw] text-right text-xs text-cyan-600 dark:text-cyan-400 ">
                minimum is the equivalent of 1 USD
              </p>
            </>
          )}
        </div>
      </div>

      {/* This is some filler space for any legal related text if needed. you can always remove it */}
      <p className="w-full  text-cyan-800 dark:text-cyan-500">
        {`
          This Collective's Fiscal Host is a registered 501(c)(3) non-profit organization. Your contribution will be tax-deductible in the US, to the extent allowed by the law.`}
      </p>
      <button
        type="submit"
        disabled={isStripeLoading}
        className="mx-auto disabled:bg-gray-800 mt-4 rounded-3xl bg-cyan-500 px-12 py-2 font-handwriting text-2xl text-cyan-900 transition-all duration-300 hover:bg-cyan-400 dark:bg-cyan-800 dark:text-cyan-200 hover:dark:bg-cyan-700"
      >
        Donate
      </button>
    </form>
  )
}
