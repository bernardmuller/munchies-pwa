import React, { useState } from 'react';
import styled from 'styled-components';
import { FontSizes, colors } from 'common';
import { H3, Input, TextArea, Button } from 'common/components';

export const EditProfile = props => {
  const [user, setUser] = useState(props.user);

  const handleSubmit = e => {
    e.preventDefault();
    props.onUpdate(user);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <H3 color={colors.white} margin="0">
        Edit Profile
      </H3>

      <Group>
        <Wrapper>
          <Label>First Name</Label>
          <Input
            placeholder="Firstname"
            value={!props.loading ? `${user.firstname}` : ''}
            onChange={e =>
              setUser(prev => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />
        </Wrapper>
        <Wrapper>
          <Label>Last Name</Label>
          <Input
            value={!props.loading ? user.lastname : ''}
            placeholder="Lastname"
            onChange={e =>
              setUser(prev => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />
        </Wrapper>
      </Group>

      <Group>
        <Wrapper>
          <Label>Profile picture</Label>
          <Input
            placeholder="Picture URL"
            value={!props.loading ? `${user.image}` : ''}
            onChange={e =>
              setUser(prev => ({
                ...prev,
                image: e.target.value,
              }))
            }
          />
        </Wrapper>
      </Group>

      <Group>
        <Wrapper>
          <Label>About Me</Label>
          <TextArea
            value={!props.loading ? `${user.bio}` : ''}
            placeholder="About Me"
            onChange={e =>
              setUser(prev => ({
                ...prev,
                bio: e.target.value,
              }))
            }
          />
        </Wrapper>
      </Group>

      <ButtonContainer>
        <Button primary type="submit" justifySelf="center" width="200px">
          Update Profile
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.form`
  display: grid;
  padding: 0 1rem;
  gap: 1rem;
  width: 100%;
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: grid;
  gap: 0.3rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${FontSizes.Small};
  color: ${colors.white_dark};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
