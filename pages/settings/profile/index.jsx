import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import { PrivateContainer, colors } from 'common';
import { Header, Loader, EditProfile, UserInfo } from 'common/components';
import { IoArrowBackOutline } from 'react-icons/io5';
import { getUser, updateUser } from 'api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${colors.secondary_dark};
`;

const Profile = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(data);
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();

  const token = getCookie('token');

  const fetchUser = async () => {
    setLoading(true);
    await getUser(user._id, token)
      .then(res => setUser(res))
      .catch(err => console.log(err));
    setLoading(false);
  };

  const handleUpdate = async updateData => {
    setLoading(true);
    await updateUser(user._id, updateData, token)
      .catch(err => console.log(err))
      .finally(() => fetchUser());
  };

  useEffect(() => {
    activeContext.dispatch({ type: 'PROFILE' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header
        heading="Settings"
        LeftIcon={IoArrowBackOutline}
        onLeftButtonClick={() => router.back()}
      />
      <UserInfo user={user} loading={loading} />
      <EditProfile data={user} onUpdate={handleUpdate} loading={loading} />
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;

  const token = getCookie('token', { req, res });
  const currentUser = getCookie('user', { req, res });

  const user = await getUser(currentUser, token);

  return {
    props: {
      data: user,
    },
  };
}

export default Profile;
