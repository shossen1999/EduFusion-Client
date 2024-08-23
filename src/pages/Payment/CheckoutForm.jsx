import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ id }) => {
    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth();
    const [transactionId, setTransactionId] = useState('')


    const { data = [], isPending } = useQuery({
        queryKey: ['classDetails', { id }],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`)
            return res.data
        }
    })

    if (isPending) {
        <div>Loading....</div>
    }


    const aClass = data.length > 0 ? data[0] : {};



    const totalPrice = parseFloat(aClass?.price);
    // console.log(totalPrice)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault()
        // setLoading(true)

        if (!stripe || !elements) {
            // setLoading(false)
            return;
        }

        // const card = elements.getElement(CardElement)
        const card = elements.getElement(CardElement)

        if (card === null) {
            // setLoading(false)
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // setLoading(false)
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment-method', paymentMethod)
            // setLoading(false)
            setError('')
        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // setLoading(false)
            console.log('confirm-error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transactionId', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the payment in the database

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    classId: id,
                    date: new Date(),
                }

                const res = await axiosSecure.post('/payment', payment)
                console.log('payment-saved', res.data)
                if (res.data?.paymentResult?.insertedId) {
                    Swal({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // setLoading(false)

                    // navigate('/dashboard/myEnrolledClass')
                }


            }
        }

    }
    return (
        <div className="flex items-center justify-center md:py-24">
            <form className="min-w-[400px] space-y-6 m-10 bg-gray-100 p-6 border border-cyan-300 rounded-lg" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white my-4"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>

                <p className="text-red-400">{error}</p>
                {
                    transactionId && <p className="text-green-400">Transaction ID : {transactionId}</p>
                }

            </form>
        </div>
    );
};

export default CheckoutForm;