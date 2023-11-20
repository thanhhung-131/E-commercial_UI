import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/apiCalls"
import { Link } from "react-router-dom"


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
      center;
      background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: '75%' })}
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

// const Link = styled.a`
//   margin: 5px 0;
//   text-decoration: underline;
//   cursor: pointer;
// `

const Error = styled.span`
  color: red;

`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector(state => state.user)

  const handleClick = (e) => {
    e.preventDefault();
    if (!isFetching) {
      login(dispatch, { username, password });
    }
    else {
      throw error
    }
  };
  return (
    <Container>
        <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder='username' onChange={(e)=> setUsername(e.target.value)} required={true}/>
          <Input placeholder='password' type="password" onChange={(e)=> setPassword(e.target.value)} required={true}/>
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>{error.response?.data || 'Something went wrong...'}</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to={'/register'}>CREATE AN NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login