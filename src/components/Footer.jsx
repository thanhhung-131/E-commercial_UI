import styled from 'styled-components'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'
import Twitter from '@mui/icons-material/Twitter'
import Pinterest from '@mui/icons-material/Pinterest'
import Map from '@mui/icons-material/Room'
import Phone from '@mui/icons-material/Phone'
import Mail from '@mui/icons-material/EmailOutlined'
import PaymentIcon from '@mui/icons-material/Payment'
import { mobile } from '../responsive'

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Logo = styled.h1``

const Description = styled.p`
  margin: 20px 0;
`

const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: 'none' })}
`

const Title = styled.h3`
  margin-bottom: 30px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: '#fff8f8' })}
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.div`
  width: 50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>BACKSTEP</Logo>
        <Description>
          The dress leaves her shoulders mostly uncovered and flows down into a
          beautiful scoop neckline. It's a close fit which covers up her
          breasts, but does so without making it look awkward or messy.
        </Description>
        <SocialContainer>
          <SocialIcon color='3B5999'>
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter />
          </SocialIcon>
          <SocialIcon color='E60023'>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Map style={{ marginRight: '10px' }} /> 123 Abc Path, South MMM 12321
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '10px' }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <Mail style={{ marginRight: '10px' }} /> contact@daiki.dev
        </ContactItem>
        <Payment>
          <PaymentIcon />
          <PaymentIcon />
          <PaymentIcon />
          <PaymentIcon />
        </Payment>
      </Right>
    </Container>
  )
}

export default Footer
