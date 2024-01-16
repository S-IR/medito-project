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
import DonationForm from '../DonationForm'




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
