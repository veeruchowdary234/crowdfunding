import React from "react"
import {
    Elements
  } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Contribute from './Contribute';

export default function ContributePage() {
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
          /*...*/
        },
      };
    const stripePromise = loadStripe('pk_test_51PEUnGSFTAOEdCYwA0SxqlRBei6LjTLLlwyRcZdVn1Cz2NgL3KVoxNUP1DOakvPcHh5TxvJAPzcq1VWveLcWk5VR009kOy2IRE');
    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <Contribute />
            </Elements>
        </div>
    )
}