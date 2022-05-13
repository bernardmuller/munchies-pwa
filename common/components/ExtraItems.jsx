import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Text,
  Button,
  Input,
  SaveButton,
  CancelButton,
} from 'common/components';
import { colors, FontSizes } from 'common';
import {
  IoEllipsisVerticalSharp,
  IoCheckboxOutline,
  IoCheckbox,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 0.5rem 0;

  &:hover {
    background-color: ${colors.secondary_dark};
  }
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;

const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  padding-top: 0.5rem;
`;

const ItemName = styled.span`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
  color: ${colors.grey};
  margin-left: 0.5rem;
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const UtilButton = styled.button`
  outline: none;
  border: none;
  background: none;
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 200px;
  background-color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  display: grid;
  top: -0.1rem;
  right: -0.6rem; ;
`;

const MenuButton = styled.button`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  padding: 0.3rem 0;
  &:hover {
    background-color: ${colors.white_dark};
  }
`;

const OptionsMenu = () => {
  return (
    <MenuContainer>
      <MenuButton inline>Rename</MenuButton>
      <MenuButton inline>Edit</MenuButton>
      <MenuButton inline style={{ color: 'red' }}>
        Delete
      </MenuButton>
    </MenuContainer>
  );
};

const Item = ({ data }) => {
  const [hover, setHover] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <ItemWrapper checked={checked}>
      {checked ? (
        <IoCheckbox
          color={colors.primary}
          onClick={() => setChecked(prev => !prev)}
          size={22}
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
        color={colors.grey}
        margin="0 0 0 0.5rem"
        checked={checked}
      >
        {data.name || 'name'}
      </ItemName>

      {hover && (
        <UtilButton onClick={() => setShowMenu(prev => !prev)}>
          <IoEllipsisVerticalSharp size={22} color={colors.white} />
          {showMenu && <OptionsMenu onMouseOff={() => setShowMenu(false)} />}
        </UtilButton>
      )}
    </ItemWrapper>
  );
};

const AddItem = () => {
  const { handleSubmit } = useForm();
  const [add, setAdd] = useState(false);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Wrapper>
      {!add ? (
        <Button inline onClick={() => setAdd(true)}>
          <Text fontSize={FontSizes.Small} color={colors.grey_dark}>
            + Add item
          </Text>
        </Button>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input height="2rem" width="20rem" placeholder="Item Name" />
          <UtilityWrapper>
            <SaveButton onClick={() => {}} />

            <CancelButton onClick={() => setAdd(false)} />
          </UtilityWrapper>
        </Form>
      )}
    </Wrapper>
  );
};

export const ExtraItems = ({ name, data }) => {
  return (
    <Container>
      <Text
        fontSize={FontSizes.Small}
        color={colors.white}
        margin="0 0 0.4rem 0"
      >
        {name}
      </Text>
      <ItemsContainer>
        {data.map(item => (
          <Item key={item + Math.random()} data={item} />
        ))}
        <AddItem />
      </ItemsContainer>
    </Container>
  );
};
