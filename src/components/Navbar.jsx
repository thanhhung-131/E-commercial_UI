import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Badge } from '@mui/material'
import Search from '@mui/icons-material/Search'
import Cart from '@mui/icons-material/ShoppingCartOutlined'
import { mobile } from '../responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { publicRequest } from '../requestMethods'
import { logout, selectIsLoggedIn, selectUsername } from '../redux/userRedux'

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
  margin-left: 45px;
  padding: 5px;
  border-radius: 4px;
  position: relative;
  justify-content: space-between;
`

const Input = styled.input`
  border: none;
  border-radius: 4px;
  width: 100%;
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
  margin-left: 10px;
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

const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 35px;
  left: 4px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0;
  z-index: 10;
`

const SearchResultItem = styled.li`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ProductTitle = styled.span``

const ProductImage = styled.img`
  width: 35px;
  height: 35px;
`

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #fff;
  margin-left: 16px;
  color: #D80032;
  border: 1px solid #D80032;
  cursor: pointer;
`

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const username = useSelector(selectUsername)
  let [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await publicRequest.get(
          `/products/search?query=${query}`
        )
        setProducts(response.data)
      } catch (error) {
        console.error('Error searching products:', error)
      }
    }

    // Perform the search only if the query is not empty
    if (query.trim() !== '') {
      searchProducts()
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      query = ''
      setProducts([])
    }
  }, [query])
  useEffect(() => {
    return () => {
      setProducts([])
    }
  }, [])

  const quantity = useSelector(state => state.cart.quantity)
  const handleClick = id => {
    navigate('/product/' + id)
    setQuery('')
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <hr />
          <Logo>BACKSTEP</Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              type='text'
              placeholder='Search'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Search style={{ color: 'gray', fontSize: '16px', right: 0 }} />
            {products.length > 0 ? (
              <SearchResults>
                {products.map(product => (
                  <SearchResultItem
                    key={product._id}
                    onClick={() => handleClick(product._id)}
                  >
                    <ProductImage src={`${product.img}`} />
                    <ProductTitle>{product.title}</ProductTitle>
                  </SearchResultItem>
                ))}
              </SearchResults>
            ) : (
              ''
            )}
          </SearchContainer>
        </Center>
        <Right>
          {isLoggedIn ? (
            <>
              <div>{`${username.toUpperCase()}`}</div>
              <Link to='/cart' style={{color: '#000'}}>
                <MenuItem>
                  <Badge badgeContent={quantity} color='primary'>
                    <Cart />
                  </Badge>
                </MenuItem>
              </Link>
              <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
            </>
          ) : (
            <>
              <Link
                to={'/register'}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to={'/login'}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
