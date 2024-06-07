import React, { useState } from 'react';
import SaveToBlockChain from './SaveToBlockChain';
import {
    useStripe,
    useElements,
    PaymentElement,
    Elements,
  } from '@stripe/react-stripe-js';
import { Button, TextInput } from 'flowbite-react';

const Contribute = () => {
    const [amount, setAmount] = React.useState('');
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null || stripe == null) {
        return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
            return;
        }

        const price = 12;

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await fetch('http://localhost:3000/api/payment/createpayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'inr',
                amount: amount,
                paymentMethodType: "card"
            }),
        });
        console.log(res)
        const { client_secret, payment_id } = await res.json();
        console.log(client_secret, payment_id)
        console.log("yes")
        // const { error } = await stripe.confirmPayment({
        //     elements: elements,
        //     clientSecret: client_secret,
        //     confirmParams: {
        //         return_url: `${window.location.origin}/success`,
        //     },
        // });

        await SaveToBlockChain(payment_id, amount)

        // if (error) {
        // setErrorMessage(error.message);
        // } else {
        // }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h1 className="text-4xl font-bold mb-8">Contribute Funds</h1>
            <TextInput
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-4 w-64"
            />
            <PaymentElement />
            <Button onClick={(e) => handleSubmit(e)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pay Now
            </Button>
        </div>
    );
};

export default Contribute;
