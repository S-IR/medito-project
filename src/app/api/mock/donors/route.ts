// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import { donorData, possibleCurrency } from '@/constants/types/donation'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const now = new Date(Date.now())
const millisecondsPerHour = 60 * 60 * 1000
const startingDonors: donorData[] = [
  {
    amount: 56,
    currency: "USD",
    date: new Date(new Date(now.getTime() - 16 * millisecondsPerHour)),
    id: '29869711-b58b-4ad3-87eb-92f4a9baf604',
    name: 'Ava Sinclair',
  },
  {
    amount: 32,
    currency: "USD",
    date: new Date(new Date(now.getTime() - 8 * millisecondsPerHour)),
    id: 'fa82036b-b660-48cd-9c1d-6094041a3598',
    name: 'Oliver Stone',
  },
  {
    amount: 64,
    currency: "USD",
    date: new Date(new Date(now.getTime() - 8 * millisecondsPerHour)),
    id: '0d7ae349-086c-4558-9b4b-b185f5bf00ff',
    name: 'Evelyn Smith',
  },
  {
    amount: 12,
    currency: "USD",
    date: new Date(new Date(now.getTime() - 8 * millisecondsPerHour)),
    id: '9e16eb38-073e-40bc-84d8-c4f481248ee0',
    name: 'Luna Bright',
  },
]

/**
 * Mock API call that gets the total amount gathered and the donation target
 * @returns
 */
export async function GET(request: NextRequest) {

  //I did this new date because I was running some issues in production with the dates
  return new Response(JSON.stringify({ donors: startingDonors.map((donor)=> {
    return {
      ...donor,
      date : new Date(Date.now()  -  millisecondsPerHour  * Math.round(Math.random() * 10))
    }
  }) }))
}

