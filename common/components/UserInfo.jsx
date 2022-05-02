import React, { useState } from 'react';
import styled from 'styled-components';
import pp from 'assets/images/user.png';
import { colors, FontSizes } from 'common';
import { H2, Text, Loader } from 'common/components';
import Image from 'next/image';

export const UserInfo = props => {
  const [user, setUser] = useState(props.user);
  return (
    <Container>
      {!props.loading && user.image ? (
        <ImageContainer>
          <Image
            src={user.image}
            alt="profile picture"
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
      ) : (
        <Placeholder>
          <Image src={pp} alt="user image" layout="fill" objectFit="cover" />
        </Placeholder>
      )}
      <H2 fontSize={FontSizes.Bigger} textAlign="center" margin="1rem 0 0 0">
        {!props.loading ? (
          user.firstname &&
          user.lastname &&
          `${props.user.firstname || ''} ${props.user.lastname || ''}`
        ) : (
          <Loader spinnerColor={colors.grey_light} size="18px" />
        )}
      </H2>

      <Text
        fontSize={FontSizes.Smaller}
        color={colors.grey}
        margin="0 0 1rem 0"
      >
        {!props.loading && user.email}
      </Text>

      <StatsContainer>
        <Stat>
          <Text color={colors.black} fontSize={FontSizes.Big}>
            {!props.loading ? (
              user.menus && user.menus.length
            ) : (
              <Loader spinnerColor={colors.grey_light} size="18px" />
            )}
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Menus
          </Text>
        </Stat>
        <Stat borders>
          <Text color={colors.black} fontSize={FontSizes.Big}>
            {!props.loading ? (
              user.meals && user.meals.length
            ) : (
              <Loader spinnerColor={colors.grey_light} size="18px" />
            )}
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Meals
          </Text>
        </Stat>
        <Stat>
          <Text color={colors.black} fontSize={FontSizes.Big}>
            N/A
          </Text>
          <Text color={colors.grey} fontSize={FontSizes.Smaller}>
            Favourites
          </Text>
        </Stat>
      </StatsContainer>
    </Container>
  );
};

const ImageContainer = styled.div`
  height: 150px;
  width: 150px;
  overflow: hidden;
  position: relative;
  background-color: ${colors.grey};
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StatsContainer = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Stat = styled.div`
  flex: 0.333;
  border-left: ${props => (props.borders ? '1px solid grey' : '')};
  border-right: ${props => (props.borders ? '1px solid grey' : '')};
  display: grid;
  text-align: center;
  padding: 0.5rem;
`;

const Placeholder = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey};
  border-radius: 50%;

  img {
    padding: 10%;
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
`;
