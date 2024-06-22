import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic()
  const [details, setDetails] = useState();


useEffect(() => {
    axiosPublic.get(`/classdetails/${id}`)
    .then(res => {
        setDetails(res.data)
    })
},[axiosPublic, id]);

console.log(details)

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">Payment</h1>
      <p className="text-lg text-center mt-1">Confirm to Enroll</p>

      <div>
        <Elements stripe={stripePromise}>
            <PaymentForm details={details}></PaymentForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
