import { NextResponse, NextRequest } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: '2023-10-16',
    })

    const products = await stripe.prices.list({
      limit: 3,
    })

    // Wrap in an object so frontend can destructure { data }
    return NextResponse.json({ data: products.data })
  } catch (error) {
    console.error('Stripe GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: '2023-10-16',
    })

    const data = await req.json()

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // Use http for localhost or your deployed domain with https
      success_url:
        'http://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/billing',
    })

    // Wrap the URL inside an object
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe POST error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
