import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Nav, PageContainer } from 'common/components';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { colors } from 'common/constants';
import { DeviceMediaQueries } from 'common/device';

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 95vh;
  position: relative;
  background-color: ${colors.secondary_dark};
`;

const Temp = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;

  @media ${DeviceMediaQueries.laptop} {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }
`;

export function PublicContainer({ children }) {
  return <PageContainer>{children}</PageContainer>;
}

export function ContentContainer({ children }) {
  return <Content>{children}</Content>;
}

export function PrivateContainer({ children }) {
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      const token = getCookie('token');

      if (!token) {
        router.push('/login');
      }
    };

    auth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Temp>
      <Nav />
      <ContentContainer>{children}</ContentContainer>
    </Temp>
  );
}
