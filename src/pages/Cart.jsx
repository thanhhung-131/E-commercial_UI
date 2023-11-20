import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'
import {
  clearCart,
  toggleSelect
} from '../redux/cartRedux'
import { Checkbox } from '@mui/material'

// const KEY = process.env.REACT_APP_STRIPE
// console.log(KEY)

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === 'filled' && 'none'};
  background-color: ${props =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${props => props.type === 'filled' && 'white'};
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ${mobile({ flexDirection: 'column' })}
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-size: ${props => props.type === 'total' && '24px'};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null)
  const currentUser = useSelector(state => state.user.currentUser)
  const [data, setData] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [orderCreated, setOrderCreated] = useState(false)
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(cart.products)

  const onToken = token => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total
        })
        setData(res.data)
        // console.log(res.data)
      } catch {}
    }
    // Trong Cart.js
const createOrder = async () => {
  try {
    if (!orderCreated && cart) {
      const res = await userRequest.post('/orders', {
        userId: currentUser._id,
        products: cart.products.map(item => ({
          productId: item._id,
          quantity: item._quantity
        })),
        amount: cart.total,
        address: data?.billing_details?.address
      });

      setOrderId(res.data._id);
      setOrderCreated(true);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
    stripeToken && makeRequest()
    try {
      createOrder();
      if (orderId !== null && !alertShown) {
        alert(`Ordered successfully. Your order id is ${orderId}`);
        setAlertShown(true); // Set the state to true after showing the alert
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    }
  }, [
    stripeToken,
    navigate,
    cart.total,
    cart,
    currentUser,
    orderCreated,
    data?.billing_details?.address,
    orderId,
    dispatch,
    alertShown,
    data.products
  ])
  // console.log(stripeToken)
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  const handleReturn = () => {
    navigate('/')
  }
  const handleCheckboxChange = (id, size, color) => {
    dispatch(toggleSelect({ id, size, color }))
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleReturn}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(2)</TopText>
          </TopTexts>
          <TopButton type='filled' onClick={handleClearCart}>
            Clear all
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={index}>
                <Checkbox
                  checked={product.selected}
                  onChange={() =>
                    handleCheckboxChange(
                      product.id,
                      product.size,
                      product.color
                    )
                  }
                />
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>{product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>OREDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimasted Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {cart.total > 0 ? (
              <StripeCheckout
                name='Daiki Shop'
                image='https://i.pinimg.com/564x/2f/40/66/2f4066d8bf21246ae73055e7709f3db3.jpg'
                billingAddress
                shippingAddress
                description={`Your total is ${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey='pk_test_51NjI35LtxMLrCM1HD7CEKdUcAweXpoBrlB65gB1n5fOSSeZu4geOn0jVzWuw5HyjA3X0DegLliOETdfXqm8CxSEM00DriZDctr'
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            ) : (
              ''
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
