import Stripe from "stripe"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        peyment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LdqroFim1hcZrYeDYe9mYOY" },
          { shipping_rate: "shr_1Ldqt3Fim1hcZrYeHg7btkTh" }
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset_ref
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/kr7ndcea/production/"
            )
            .replace("-webp", ".webp")
          console.log("image", newImage)

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success==true`,
        cancel_url: `${req.headers.origin}/?canceled==true`
      }

      const session = await stripe.checkout.session.create(params)
      res.status(200).json(session)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method not Allowed")
  }
}
