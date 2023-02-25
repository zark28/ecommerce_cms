import {loadStripe} from '@stripe/stripe-js'
let stripePromise;

const getStripe =()=>{
    if(!stripePromise){
        stripePromise=loadStripe('pk_test_51MdQXXFVfNBdBP4TgG3vFEaWETkWxbDttPOGaDTxFwJtyUITWozwMgaY8OyS5sf2aDtI8SPTHcpcDoIsXONgz5vz00UKOUwcNz');    }
    return stripePromise;
    }
export default getStripe