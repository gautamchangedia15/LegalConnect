import React, { useState, useEffect, useCallback } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmPayment } from "../../action/peymentAction";
const RazorpayButton = (props) => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  const [options, setOptions] = useState({});
  const [Razorpay] = useRazorpay();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log("hel;llllllllll", props.slotAmount, props.slot.price);
      const response = await axios.post(
        `http://localhost:3000/provider/razorpay/createorder`,
        {
          amount: parseInt(props.slot.price),
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            payersId: props.clientId,
            reciversId: props.providerId,
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
      amount: parseInt(props.slot.price) * 100,
      currency: "INR",
      name: "Legal Connect",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: (res) => {
        console.log(res);
        if (res && res.razorpay_payment_id) {
          setPaymentStatus(res);
          dispatch(
            confirmPayment({
              clientData: {
                providerId: props.providerId,
                clientsData: {
                  clientId: props.clientId,
                  name: props.clientName,
                  caseDetails: {},
                  slotId: props.slot.slotId,
                },
              },
              paymentData: {
                providerId: props.providerId,
                PaymentData: {
                  PaymentId: res.razorpay_payment_id,
                  slotId: props.slot.slotId,
                  clientId: props.clientId,
                },
              },
              slotData: {
                providerId: props.providerId,
                slotId: props.slot.slotId,

                bookedById: props.clientId,
              },
              servicesData: {
                providerId: props.providerId,
                clientId: props.clientId,
                serviceData: {
                  slotId: props.slot.slotId,
                  slot: props.slot,
                  PaymentId: res.razorpay_payment_id,
                },
              },
              capturePayment: {
                razorpay_payment_id: res.razorpay_payment_id,

                amount: parseInt(props.slot.price) * 100,
              },
            })
          );

          // window.location.reload();
          navigate("/client/myservices");
        }
      },
      prefill: {
        name: props.clientName,
        email: props.clientEmail,
        contact: "9999999999",
      },
      notes: {
        address: "Legal connect Office",
        providerID: props.providerID,
        slot: props.slot,
      },
      theme: {
        color: "#2E7D32",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>{props.title}</button>
    </div>
  );
};
export default RazorpayButton;
