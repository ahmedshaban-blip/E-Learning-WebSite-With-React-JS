



import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { enrollCourseForUser, getCurrentUser } from "../lib/firebase";
import { addCourseToLocal } from "../lib/localStorage";

const PAYPAL_CLIENT_ID = "AfRmOOCW11OKIFMth_edpRxSIxXXFULLnbgN34hI-8T-8Tm9w-K6VSQu5okxwZeMj5FFVN79SnFPUR1A"; 
const CURRENCY = "USD";

// Load PayPal script
function usePayPalScript(clientId, currency) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!clientId) return;
    if (loadedRef.current || window.paypal) return;

    const script = document.createElement("script");
    script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons&intent=capture&disable-funding=card,credit,venmo`;

    script.async = true;
    script.onload = () => {
      loadedRef.current = true;
    };
    document.body.appendChild(script);
  }, [clientId, currency]);
}

export default function PayPalCheckout() {
  const { state } = useLocation();
  const buttonsRef = useRef(null);
  const navigate = useNavigate();

  usePayPalScript(PAYPAL_CLIENT_ID, CURRENCY);

  useEffect(() => {
    if (!window.paypal || !state?.course || !PAYPAL_CLIENT_ID || !buttonsRef.current)
      return;

    const buttons = window.paypal.Buttons({
      //Create order in browser
      createOrder: (_, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: String(state.course.price || 0) },
              description: state.course.title,
            },
          ],
        });
      },
      // Capture payment 
      onApprove: async (_, actions) => {
        const details = await actions.order.capture();

        const user = getCurrentUser();
        const enrolled = {
          courseId: state.course.id,
          title: state.course.title,
          imageUrl: state.course.imageUrl,
          price: state.course.price,
          enrolledAt: new Date().toISOString(),
          paymentId: details?.id,
        };

        if (user?.uid) {
          await enrollCourseForUser(user.uid, enrolled);
          addCourseToLocal(user.uid, enrolled);
        } else {
          addCourseToLocal("guest", enrolled);
        }

        navigate("/my-courses", { replace: true });
      },
      onError: (err) => {
        console.error("PayPal Error", err);
        alert("Payment failed. Please try again.");
      },
      // [ADDED]: Restrict button to PayPal only
      fundingSource: window.paypal.FUNDING.PAYPAL,
    });

    buttons.render(buttonsRef.current);

    return () => {
      try {
        buttons.close();
      // eslint-disable-next-line no-empty, no-unused-vars
      } catch (_) {}
    };
  }, [state]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold">{state?.course?.title}</h2>
        <p className="text-gray-700 mt-2">
          {CURRENCY} ${state?.course?.price}
        </p>
      </div>
      <div ref={buttonsRef} />
    </div>
  );
}
