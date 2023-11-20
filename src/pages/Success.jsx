import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { userRequest } from '../requestMethods'

const Success = () => {
  const location = useLocation()
  const data = location.state?.stripeData // Use optional chaining to prevent errors if state is undefined
  const cart = location.state?.cart
  const currentUser = useSelector(state => state.user.currentUser)
  const [orderId, setOrderId] = useState(null)
  const [orderCreated, setOrderCreated] = useState(false) // Add state variable

  useEffect(() => {
    const createOrder = async () => {
      try {
        if (!orderCreated && cart) {
          const res = await userRequest.post("/orders", {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data?.billing_details?.address,
          });
          setOrderId(res.data._id);
          setOrderCreated(true);
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };
    
    createOrder()
  }, [cart, data, currentUser, orderCreated]) // Include orderCreated in the dependency array

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Your order is being prepared...`}
      <Link to='/' style={{ textDecoration: 'none' }}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  )
}

export default Success
