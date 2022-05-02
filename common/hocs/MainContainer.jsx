import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Nav, PageContainer } from 'common/components';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { colors } from 'common/constants';

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 95vh;
  position: relative;
  background-color: ${colors.secondary};
`;
export function PublicContainer({ children }) {
  return <PageContainer>{children}</PageContainer>;
}

export function ContentContainer({ children }) {
  return <Content>{children}</Content>;
}

export function PrivateContainer({ children }) {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
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
    <PageContainer>
      <Nav collapsed={menuCollapsed} onClose={() => setMenuCollapsed(true)} />
      <ContentContainer collapsed={menuCollapsed}>{children}</ContentContainer>
    </PageContainer>
  );
}
