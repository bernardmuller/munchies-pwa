import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IoPersonSharp, IoExitOutline } from 'react-icons/io5';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import { PrivateContainer, colors, appVersion, FontSizes } from 'common';
import { Header, Text } from 'common/components';
import { removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const Link = styled.a`
  width: 100%;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Settings = () => {
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();

  const handleLogout = () => {
    removeCookies('user');
    removeCookies('token');
    router.push('/login');
  };

  useEffect(() => {
    activeContext.dispatch({ type: 'PROFILE' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PrivateContainer>
      <Container>
        <>
          <Header
            heading="My Menus"
            onRightButtonClick={() => handleLogout()}
            RightIcon={IoExitOutline}
          />

          <Wrapper>
            <Text
              color={colors.grey}
              margin="1rem 0"
              fontSize={FontSizes.Smaller}
            >
              App version:
            </Text>
            <Text
              color={colors.grey}
              margin="1rem 0"
              fontSize={FontSizes.Smaller}
            >
              {appVersion}
            </Text>
          </Wrapper>

          <Link href="/settings/profile">
            <IoPersonSharp size="18px" />
            <Text fontSize={FontSizes.Small}>My Profile</Text>
          </Link>
        </>
      </Container>
    </PrivateContainer>
  );
};

export default Settings;
