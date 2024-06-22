import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import useAuth from "../../Hooks/useAuth";
import PropTypes from 'prop-types';

const PaymentForm = ({details}) => {
  const [error, setError] = useState("");
  // const [clientSecret, setClientSecret] = useState("");
  // const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  // const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  // //   const [cart, refetch] = useCart();
  // const navigate = useNavigate();
  console.log(details.title)
  // //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // useEffect(() => {
  //   if (totalPrice > 0) {
  //     axiosSecure.post("/create-payment-intent", { price: totalPrice }).then((res) => {
  //       console.log(res.data.clientSecret);
  //       setClientSecret(res.data.clientSecret);
  //     });
  //   }
  // }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: card,
    //     billing_details: {
    //       email: user?.email || "anonymous",
    //       name: user?.displayName || "anonymous",
    //     },
    //   },
    // });

    // if (confirmError) {
    //   console.log("from confirm payment", confirmError);
    // } else {
    //   console.log("from confirm payment", paymentIntent);
    //   if (paymentIntent.status === "succeeded") {
    //     console.log("transaction id", paymentIntent.id);
    //     setTransactionId(paymentIntent.id);

    //     // now save the payment in datebase
    //     const payment = {
    //       email: user.email,
    //       price: totalPrice,
    //       transactionId: paymentIntent.id,
    //       date: new Date(), //utc  date convert, use monent js
    //       name: user.displayName,
    //       cartIds: cart.map((item) => item._id),
    //       menuItemIds: cart.map((item) => item.menuId),
    //       status: "pending",
    //     };

    //     const res = await axiosSecure.post("/payments", payment);
    //     console.log("payment save", res.data);
    //     refetch();
    //     if (res.data?.result?.insertedId) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Payment Successfully",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       navigate("/dashboard/payhistory");
    //     }
    //   }
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <p className="text-red-600">{error}</p>
        {/* {transactionId && <p className="text-green-500">Your Transaction Id: {transactionId}</p>} */}
        {/* <button type="submit" className="btn text-black" disabled={!stripe || !clientSecret}>
          Pay
        </button> */}
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  details: PropTypes.object
};

export default PaymentForm;
