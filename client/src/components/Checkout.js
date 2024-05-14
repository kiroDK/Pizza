import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder, getUserOrders } from "../actions/orderActions";
import Success from "./Success";
import Error from "./Error";
import Loading from "./Loading";
export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();
  // Add this useEffect to dispatch getUserOrders after placing an order successfully
  useEffect(() => {
    if (success) {
      dispatch(getUserOrders()); // Dispatch the getUserOrders action after successful order placement
    }
  }, [success, dispatch]);
  function tokenHandler(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something wnet wrong" />}
      {success && <Success success="Your order placed successfully" />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51NYsCySA451Nv2E6yWC9LCxVPsNc5GM4bA6n6ROefvwD06ubGSL27IhC5UvAAee0EBumJ0CTe8qtksfCYPeQj4TK00bc9B5E1q"
        currency="INR"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
