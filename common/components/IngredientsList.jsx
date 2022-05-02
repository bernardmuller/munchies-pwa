import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'common/components';
import { colors, FontSizes } from 'common';
import { IoCheckboxOutline, IoCheckbox } from 'react-icons/io5';

export const IngredientsList = props => {
  const [expand, setExpand] = useState(false);
  return (
    <Container>
      <Text
        fontSize={FontSizes.Small}
        color={colors.secondary_light}
        margin="0 0 0.5rem 0"
      >
        {props.name}
      </Text>
      <ItemsContainer>
        {[1, 2, 3, 4].map((item, index) => (
          <Item key={index} data={'item name'} />
        ))}
      </ItemsContainer>
    </Container>
  );
};

const Item = props => {
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <ItemWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {}}
      checked={checked}
    >
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
        color={checked ? colors.grey_light : colors.secondary_light}
        margin="0 0 0 0.5rem"
        checked={checked}
      >
        {props.data || 'name'}
      </ItemName>

      {/* <Text>
                {props.data}
            </Text> */}
      {/* {hover &&
                <UtilButton
                    onClick={() => setShowMenu(prev => !prev)}
                >
                    <IoEllipsisVerticalSharp 
                        size={22}
                        color={colors.white}
                    />
                    {showMenu &&
                        <OptionsMenu 
                            onMouseOff={() => setShowMenu(false)}
                        />
                    }
                </UtilButton>
            } */}
    </ItemWrapper>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
`;

const ItemsContainer = styled.ul`
  width: 100%;
  /* display: grid; */
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

  &:hover {
    background-color: ${colors.white_dark};
  }
`;

const ItemName = styled.span`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
`;
