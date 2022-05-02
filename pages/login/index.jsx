import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import bg from 'assets/images/login_bg.jpg';
import { colors, FontSizes, appVersion, DataStore } from 'common';
import { Button, H1, H2, Text, Input } from 'common/components';
import { apiEndpoint } from 'common/constants';
import { setCookies } from 'cookies-next';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1;
  gap: 1.5rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
`;

const Label = styled.label`
  font-size: ${FontSizes.Regular};
  margin: 0.3rem 0;
`;

const Footer = styled.div`
  text-align: center;

  a {
    text-decoration: none;
    color: grey;
    font-family: sans-serif;
    font-size: 0.9rem;
  }
`;

const Version = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
`;

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

  & > img {
    position: absolute;
    left: 0;
    z-index: 0;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #080d08;
  opacity: 0.9;

  @media (max-width: 767px) {
    display: none;
  }
`;

const LoginCardContainer = styled.div`
  background-color: white;
  height: 100vh;
  width: 33.333%;
  padding: 4rem 5%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 375px;
  position: relative;

  @media (max-width: 1280px) {
    padding: 4rem 5%;
    min-width: 450px;
  }

  @media (max-width: 767px) {
    padding: 2rem 10%;
    width: 100%;
    min-width: 375px;
  }
`;

function Login() {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const [error, setError] = useState('');
  const router = useRouter();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      const res = await fetch(`${apiEndpoint}auth/login`, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include',
        headers,
        body: JSON.stringify({
          email: enteredEmail.current.value,
          password: enteredPassword.current.value,
        }),
      });
      const data = await res.json();

      if (data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }

      await DataStore.set('MUNCHIES_USER', data.user);
      setCookies('token', data.token);
      setCookies('user', data.user);

      if (data.user) {
        router.push('/meals');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Background />

      <LoginCardContainer>
        <div>
          <H1>MUNCHIES</H1>

          <H2 margin="0" fontSize={FontSizes.Regular}>
            <strong>Log</strong> in
          </H2>

          {error && (
            <h4 style={{ color: 'red', border: '1px solid red' }}>{error}</h4>
          )}
        </div>

        <Form id="login-form">
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              type="email"
              id="email"
              name="email"
              ref={enteredEmail}
              placeholder="eg. email@email.com"
              required
            />
          </div>

          {emailError && <Text color={colors.danger}>{emailError}</Text>}

          <div>
            <Label htmlFor="password">Password</Label>

            <Input
              type="password"
              id="password"
              name="password"
              ref={enteredPassword}
              placeholder="*******"
              required
            />
          </div>

          {passwordError && <Text color={colors.danger}>{passwordError}</Text>}

          <Button
            primary
            height="3rem"
            type="submit"
            disabled={false}
            // eslint-disable-next-line react/jsx-no-bind
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
          <Text fontSize={FontSizes.Small} color={colors.grey_light}>
            {appVersion}
          </Text>
        </Version>
      </LoginCardContainer>
    </Container>
  );
}

export default Login;
