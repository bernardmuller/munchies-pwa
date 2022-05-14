import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'common/components';
import { colors, FontSizes } from 'common';
import { IoCheckboxOutline, IoCheckbox } from 'react-icons/io5';

const Container = styled.div`
  width: 100%;
  display: grid;
`;

const ItemsContainer = styled.ul`
  width: 100%;
  display: flex;
  margin: 0;
  flex-direction: column;
  padding: 0;
  gap: 0.4rem;
`;

const ItemWrapper = styled.li`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  display: flex;
  border-radius: 4px;
  align-items: center;
  box-shadow: ${props =>
    props.checked ? null : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  background-color: ${props =>
    props.checked ? colors.secondary : colors.secondary_light};
`;

const ItemName = styled.span`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
  color: ${props => props.color};
  margin: ${props => props.margin};
`;

const Item = ({ data }) => {
  const [checked, setChecked] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <ItemWrapper onClick={() => {}} checked={checked}>
      {checked ? (
        <IoCheckbox
          color={colors.primary}
          onClick={() => setChecked(prev => !prev)}
          size="22px"
        />
      ) : (
        <IoCheckboxOutline
          color={colors.grey_light}
          onClick={() => setChecked(prev => !prev)}
          size={22}
        />
      )}
      <ItemName
        fontSize={FontSizes.Small}
        color={checked ? colors.grey_dark : colors.grey}
        margin="0 0 0 0.5rem"
        checked={checked}
      >
        {data || 'name'}
      </ItemName>
    </ItemWrapper>
  );
};

export const IngredientsList = ({ name }) => {
  return (
    <Container>
      <Text
        fontSize={FontSizes.Small}
        color={colors.white}
        margin="0 0 0.5rem 0"
      >
        {name}
      </Text>
      <ItemsContainer>
        {[1, 2, 3, 4].map(item => (
          <Item key={item + Math.random()} data="item name" />
        ))}
      </ItemsContainer>
    </Container>
  );
};
