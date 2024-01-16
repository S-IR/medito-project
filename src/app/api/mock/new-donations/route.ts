// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import { donationData, donorData } from '@/constants/types/donation'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

/**
 * Mock API call that gets the total amount gathered and the donation target
 * @returns
 */
export async function GET(request: NextRequest) {
  const rand = Math.random()
  if (rand < 0.5) {
    return new Response(JSON.stringify({ donation: null }))
  }

  const donor = createMockDonor()
  const randomAmount = Math.max(10, round5(Math.random() * 100))
  donor.amount += randomAmount
  const donation: donationData = {
    amount: randomAmount,
    currency: donor.currency,
    fromDonor: donor,
  }
  return new Response(JSON.stringify({ donation }))
}
function createMockDonor(): donorData {
  return {
    amount: round5(Math.random() * 100),
    currency: 'USD',
    date: new Date(),
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
function round5(x: number) {
  return Math.ceil(x / 5) * 5
}
