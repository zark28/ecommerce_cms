import  Stripe from 'stripe'
const stripe =new Stripe(process.env.STRIPE_SECURITY_KEY)
// ('skQF3CtlaWfvxKbQMBUsKn2GZ1s7cFr9RnGVaNGfWkUPCnq5nUGmvZQodHj6Scm7gNJFwqKbEM4iGvs7XQpwuxu6nansH4CXjEJyUOmiZiSzf8fstVrBtCKXFN34tDwISC1ZuYGVzfWG52icnCrdJ9TrWMug0Ci4rgdkSg0dhLkhdLIjTAd8');

export default async function handler(req, res) {
  // console.log(req.body);
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params={
        submit_type:'pay',
        mode:'payment',
        payment_method_types:['card'],
        billing_address_collection:'auto',
        shipping_options:[
            {shipping_rate:"shr_1Me7ugFVfNBdBP4T3buv7xbv"},
            {shipping_rate:"shr_1Me810FVfNBdBP4TMIiD3tMI"}
        ],

        line_items: req.body.map((item)=>{
          const img =item.image[0].asset._ref
          const newImage =img.replace('image-','https://cdn.sanity.io/images/kirvlykp/production/').replace('-png','.png');
          
          return{
            price_data:{
              currency:'usd',
              product_data:{
                name:item.name,
                images:[newImage],
              },
              unit_amount:item.price*100,
            },
            adjustable_quantity:{
              enabled:true,
              minimum:1,
            },
            quantity:item.quantity
          }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed')
  }
}