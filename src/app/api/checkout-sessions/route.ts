import {
  possibleCurrencies,
  possibleIntervals,
} from '@/constants/types/donation'
import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const product = 'prod_PO1AuTRpFRVaSM'

const bodySchema = z.object({
  amount: z.number().int().gte(1),
  currency: z.enum(possibleCurrencies),
  interval: z.enum(possibleIntervals),
})

type reqBody = z.infer<typeof bodySchema>

export async function POST(req: Request) {
  const body = (await req.json()) as reqBody

  //use zod to check the body of the request before proceeding
  let parseRes
  try {
    parseRes = bodySchema.parse(body)
  } catch (error) {
    return NextResponse.json({ error })
  }

  const origin = req.headers.get('origin') || 'http://localhost:3000'
  const success_url = `${origin}/thankyou`
  const cancel_url = `${origin}/cancel`


  try {
    const session = await stripe.checkout.sessions.create({
      mode: body.interval === 'one-time' ? 'payment' : 'subscription',
      line_items: [
        {
          price_data: {
            currency: body.currency.toLowerCase(),
            recurring:
              body.interval === 'one-time'
                ? undefined
                : {
                    interval: body.interval,
                  },
                  //I multiplied this with 100 to convert cents to 1 dollar (stripe expects the value to be in cents)
            unit_amount: body.amount * 100,
            product,
          },
          quantity: 1
        },
      ],
      success_url,
      cancel_url,
    })
    return NextResponse.json(session)
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error
      return NextResponse.json({ message }, { status: error.statusCode })
    }
  }
}
