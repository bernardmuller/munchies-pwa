import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";

// import { 
//   login 
// } from 'actions'

import bg from 'assets/images/login_bg.jpg'

import { 
  Button,
  H1,
  H2,
  Text,
  Input,
 } from "common/components";

import {
  colors,
  FontSizes, 
  appVersion,
  DeviceMediaQueries
} from 'common';

import { 
  DataStore
} from 'common'

import { setCookies } from 'cookies-next';

const Login = () => {

  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const [error, setError] = useState("");
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit (e) {
    e.preventDefault();

    try {      
      setError("");
      setLoading(true);

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const res = await fetch('https://munchies-api-5fqmkwna4q-nw.a.run.app/auth/login', {
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          credentials: 'include', 
          headers: headers,
          body: JSON.stringify({
              email: enteredEmail.current.value,
              password: enteredPassword.current.value
          })
      });
      const data = await res.json();
      
      if(data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }

      await DataStore.set("MUNCHIES_USER", data.user)
      setCookies('token', data.token)
      setCookies('user', data.user)
      
      if(data.user) {
        router.push('/meals')
      }

    } catch (err) {
      console.log(err)
    }

    setLoading(false);
  }  
  return (
    <Container>


        <Background />

        <LoginCardContainer>


          <Header>
            <H1>MUNCHIES</H1>

            <H2
              margin="0"
              fontSize={FontSizes.Regular}
            >
              <strong>Log</strong> in
            </H2>

              {error && <h4 style={{color: "red", border: '1px solid red', }}>{error}</h4>}

          </Header>

          <Form
            id="login-form"
          >

              <div>

                <Label
                  htmlFor="email"
                >
                  Email
                </Label>

                <Input
                  type="email"
                  id="email"
                  name="email"
                  ref={enteredEmail}
                  placeholder="eg. email@email.com"
                  required
                />         

              </div>


              {emailError && 
                <Text
                  color={colors.danger}
                >
                  {emailError}
                </Text>
              }

              <div>
                <Label
                  htmlFor="password"
                >
                  Password
                </Label>

                <Input
                  type="password"
                  id="password"
                  name="password"
                  ref={enteredPassword}
                  placeholder="*******"
                  required
                />    
              </div>

              {passwordError && 
                <Text
                  color={colors.danger}
                >
                  {passwordError}
                </Text>
              }


            <Button  
              primary
              height="3rem"
              type="submit"
              disabled={false}
              onClick={handleSubmit}
              width="100%"
              margin="1rem 0 0 0"
              fontSize="1.2rem"
            >
              Log In
            </Button>

          </Form>

          <Footer>
            <a to="/forgot-password">Forgot Password?</a>
          </Footer>

          <div>
            Need an account? <a to="/auth/register">Sign up</a>
          </div>

          <Version>
            <Text
              fontSize={FontSizes.Small}
              color={colors.grey_light}
            >
              {appVersion}
            </Text>
          </Version>
          

        </LoginCardContainer>
        
    </Container>
  )
}


const Version = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
`

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-image: url(${bg});
    background-size: 750px;
    background-color: black;

    &>img {
      position: absolute;
      left: 0;
      z-index: 0;
    }
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #080d08;
  /* background-image: linear-gradient(to right, #000000, #242424); */
  opacity: 0.9;

  @media (max-width: 767px) {
      display: none;
  }
`

const LoginCardContainer = styled.div`
    background-color: white;
    height: 100vh;
    width: 33.333%;
    padding: 4rem 5%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    /* justify-content: space-between; */
    min-width: 375px;
    position:relative;

    @media (max-width: 1280px) {
      padding: 4rem 5%;
      min-width: 450px;
    }

    @media (max-width: 767px) {
      padding: 2rem 10%;
      width: 100%;
      min-width: 375px;
    }
`

const Header = styled.div`
  /* @media (max-width: 767px) {
    h2 {
      font-size: 2.25rem;
    }
  } */
`

const GoogleButton = styled.button`
  width: 100%;
  height: 3.5rem;
  /* box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px; */
  border-radius: 6px;
  border: none;
color: ${colors.grey};
  font-size: ${FontSizes.Regular};
  padding: 0.4rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &>img {
    height: 90%;
    position: relative;
    left: 0;
    top: 0;
    align-self: center;
  }

  &> span {
    vertical-align: middle;
  }

  &:hover {
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  }
`

const Form = styled.form`
    display: grid;
    grid-template-columns: 1;
    gap: 1.5rem;

    div {
      display: flex;
      flex-direction: column;
      gap:0.1rem;
    }
`

const Label = styled.label`
  font-size: ${FontSizes.Regular};
  /* padding: 0 0 0.7rem 0; */
  margin: 0.3rem 0;
`

const Footer = styled.div`
  text-align: center;

  a {
    text-decoration: none;
    color: grey;
    font-family: sans-serif;
    font-size: 0.9rem;
  }
`

const Heading = styled.h1`
  color: ${colors.secondary};
  background: none;
  margin: 0;

  @media ${DeviceMediaQueries.laptop} {
    position: Fixed;
    color: white;
    font-weight: bold;
    font-size: 2.5rem;
    top: 3rem;
    right: 4rem;
    z-index: 3;
  }
`

const Or = styled.div`
  display: flex;
  align-items: center;
  &> div {
    border-top: 1px solid grey;
    width: 100%;
  }

  &> span {
    padding: 0 0.5rem;
  }
`

const Munchies = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;

  @media (min-width: 767px) {
      display: none;
  }

  strong {
    font-weight: bold;
    font-size: 3.2rem;
  }
`

export default Login