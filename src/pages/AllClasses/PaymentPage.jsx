import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`https://edu-fusion-server.vercel.app/classes/${id}`);
                const data = await response.json();
                setClassDetails(data);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [id]);

    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        // Here, you would handle the payment process
        // For now, we'll just log to the console
        console.log('Processing payment for class:', id);
        // Redirect or show a success message after payment processing
    };

    if (!classDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment for {classDetails.title}</h2>
            <p className="text-gray-700 mb-2">Teacher: {classDetails.name}</p>
            <p className="text-gray-700 mb-2">Price: ${classDetails.price}</p>
            <p className="text-gray-700 mb-2">Description: {classDetails.description}</p>
            <form onSubmit={handlePaymentSubmit} className="mt-4">
                {/* <label className="block mb-2">
                    Card Number:
                    <input type="text" name="cardNumber" className="border p-2 w-full" required />
                </label>
                <label className="block mb-2">
                    Expiration Date:
                    <input type="text" name="expDate" className="border p-2 w-full" required />
                </label>
                <label className="block mb-2">
                    CVV:
                    <input type="text" name="cvv" className="border p-2 w-full" required />
                </label> */}
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                     Pay
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
