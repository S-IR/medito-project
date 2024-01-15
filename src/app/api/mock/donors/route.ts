// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import { donorData, possibleCurrency } from '@/constants/types/donation'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export const runtime = 'edge'

const now = new Date()
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
  return new Response(JSON.stringify({ donors: startingDonors }))
}

function createMockDonor(): donorData{
  return {
    amount: Math.round(Math.random() * 100),
    currency: "USD",
    date: getRandomDate(),
    id: uuidv4(),
    name: getRandomFullName(),
  }
}

/**
 * Helper function to create a random date between yesterday and 7 days ago
 */
function getRandomDate(): Date {
  const today = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)

  const todayTime = today.getTime()
  const sevenDaysAgoTime = sevenDaysAgo.getTime()
  const randomTime =
    Math.random() * (todayTime - sevenDaysAgoTime) + sevenDaysAgoTime
  return new Date(randomTime)
}
/**
 * Another helper function that gets a random name
 */
function getRandomFullName(): string {
  const randomIndex = Math.floor(Math.random() * randomNames.length)
  return randomNames[randomIndex]
}
const randomNames = [
  'Olivia Piers',
  'Liam Henderson',
  'Emma Clarkson',
  'Noah Black',
  'Ava Sinclair',
  'Oliver Stone',
  'Sophia Hartley',
  'Elijah Moore',
  'Isabella Young',
  'Charlotte Green',
  'Amelia Brown',
  "James O'Neil",
  'Mia Wallace',
  'Benjamin King',
  'Harper Lee',
  'Lucas Graham',
  'Evelyn Smith',
  'Henry Jones',
  'Luna Bright',
  'Alexander Knight',
] as const
