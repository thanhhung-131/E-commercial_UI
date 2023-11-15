import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();

  // Check if location.state is defined and has stripeData
  const stripeData = location.state?.stripeData;
  const cart = location.state?.cart;

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: stripeData?.billing_details?.address,
        });
        setOrderId(res.data._id);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    // Check if stripeData and cart are defined
    stripeData && cart && createOrder();
  }, [stripeData, cart, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfully. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
