import React, { useState, useEffect, useCallback } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
const RazorpayButton = () => {
  const [orderId, setOrderId] = useState(null);
  const [options, setOptions] = useState({});
  const [Razorpay] = useRazorpay();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/provider/razorpay/createorder`,
        {
          amount: 50000,
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            payersId: "dbcaiudbciaubdbca",
            reciversId: "akjdcuabdabdvkkjj",
          },
        },
        { withCredentials: true }
      );
      console.log("order created", response.data.data.id);
      setOrderId(response.data.data.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePayment = useCallback(() => {
    handleSubmit();
    const options = {
      key: "rzp_test_jMEoKevGY6dLBs",
      amount: "5000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "any@gm.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
};
export default RazorpayButton;
