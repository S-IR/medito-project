
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import type { NextRequest } from 'next/server'



/**
 * Mock API call that gets the total amount gathered and the donation target
 * @returns 
 */
export async function GET(request: NextRequest) {

    const gathered = 15000
    const target = 20000
  return new Response(JSON.stringify({ gathered, target}))
}
