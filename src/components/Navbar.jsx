import React from 'react'
import styled from 'styled-components'
import { Badge } from '@mui/material'
import Search from '@mui/icons-material/Search'
import Cart from '@mui/icons-material/ShoppingCartOutlined'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
  height: 60px;
  @media only screen and (max-width: 380px) {
    ${mobile({ height: '50px' })}
  }
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0' })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 4px;
`

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 2px;
  outline: none;
  ${mobile({ width: '50px' })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center' })}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
  const quantity = useSelector(state=> state.cart.quantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'gray', fontSize: '16px' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>BACKSTEP</Logo>
        </Center>
        <Right>
          <Link to={'/register'} style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to={'/login'} style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>LOGIN</MenuItem>
          </Link>
          <Link to='/cart'>
          <MenuItem>
            <Badge badgeContent={quantity} color='primary'>
              <Cart />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
