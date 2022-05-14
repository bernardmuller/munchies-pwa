import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  Text,
  Header,
  H2,
  H4,
  Input,
  SaveButton,
  EditButton,
  CancelButton,
  Confirmation,
  GroceryList,
} from 'common/components';
import { FontSizes, colors } from 'common';
import { MealCard } from 'common/components/card/MealCard';
import { IoTrashOutline, IoArrowBackOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { getMenu, deleteMenu, updateMenu } from 'api';
import { getCookie } from 'cookies-next';
import { Router, useRouter } from 'next/router';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import Link from 'next/link';

const Container = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0.5rem 1rem;
  background-color: ${colors.secondary_dark};
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${colors.secondary};
  border-radius: 0.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${props => props.height || '2rem'};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.height || '2rem'};
  padding: 0rem 1rem;
  margin: 1rem 0;
`;

const NameForm = styled.form`
  display: flex;
  align-items: center;
`;

const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  padding: 1rem 1rem;
  border-radius: 8px;
`;

const MealsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  padding-right: 2rem;
`;

const Name = ({ name, onRename }) => {
  const { register, handleSubmit } = useForm();

  const [edit, setEdit] = useState(false);
  const [menuName, setMenuName] = useState(name);

  const cancel = () => {
    setMenuName(name);
    setEdit(false);
  };

  const onSubmit = data => {
    onRename(data);
    setEdit(false);
  };

  return (
    <TitleWrapper>
      {!edit ? (
        <H2
          color={colors.white}
          fontSize={FontSizes.Big}
          margin="0"
          onClick={() => setEdit(true)}
        >
          {menuName || 'menu name'}
        </H2>
      ) : (
        <NameForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Menu name"
            height="2.5rem"
            value={menuName}
            {...register('name', {
              onChange: e => {
                setMenuName(e.target.value);
              },
              required: 'Name field can not be empty',
            })}
          />
          <SaveButton />
          <CancelButton onClick={cancel} />
        </NameForm>
      )}
    </TitleWrapper>
  );
};

const Period = () => {
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <TitleWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      height="2rem"
    >
      {!edit ? (
        <>
          <Text fontSize={FontSizes.Small} color={colors.grey_dark}>
            Menu period / Date
          </Text>

          {hover && !edit && <EditButton onClick={() => setEdit(true)} />}
        </>
      ) : (
        <NameForm>
          <Input type="date" height="2.5rem" />
          <Text color={colors.grey_light} margin="0 0.5rem 0 0.5rem">
            to
          </Text>
          <Input type="date" height="2.5rem" />
          <SaveButton onClick={() => {}} />
          <CancelButton onClick={() => setEdit(false)} />
        </NameForm>
      )}
    </TitleWrapper>
  );
};

const MenuDetail = ({ data }) => {
  const token = getCookie('token');
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(data);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMenu = async () => {
    setShowConfirmation(false);
    setLoading(true);
    await deleteMenu(menu._id, token).then(() => {
      router.push('/menus');
      setLoading(false);
    });
  };

  const fetchMenu = async () => {
    await getMenu(menu._id, token)
      .then(res => setMenu(res))
      .catch(err => console.log(err));
  };

  const handleRename = async renameData => {
    setLoading(true);
    await updateMenu(menu._id, renameData, token).catch(err =>
      console.log(err)
    );
    await fetchMenu(menu._id, token);
    setLoading(false);
  };

  return (
    <Container>
      <Header
        heading="Menu Detail"
        onLeftButtonClick={() => router.back()}
        onRightButtonClick={() => setShowConfirmation(true)}
        RightIcon={IoTrashOutline}
        LeftIcon={IoArrowBackOutline}
        loading={loading}
      />

      {showConfirmation && (
        <Confirmation
          text="Are you sure you want to delete this meal?"
          onConfirm={removeMenu}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      <Content>
        <Name
          name={menu && menu.name}
          loading={loading}
          onRename={handleRename}
        />

        <Period period={{}} />

        <Text color={colors.grey} fontSize={FontSizes.Small} margin="0">
          Creator: {(menu && menu.createdBy.firstname) || 'username'}
        </Text>
      </Content>
      <Wrapper>
        <H4 color={colors.white} fontSize={FontSizes.Regular}>
          Meals
        </H4>

        <Link href={`/menus/${menu._id}/meals`} passHref>
          <Text color={colors.primary}>edit</Text>
        </Link>
      </Wrapper>

      <WeekContainer style={menu.meals.length < 1 && { display: 'none' }}>
        <MealsContainer>
          {menu &&
            menu.meals.map(meal => (
              <MealCard
                img={meal.image}
                name={meal.name || 'Meal Name'}
                season="Season"
                count={2}
                key={meal}
                secondary
                onClick={() => {}}
              />
            ))}
        </MealsContainer>
      </WeekContainer>

      <Content>
        <GroceryList meal_items={menu.grocerylist.meal_items} />
      </Content>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;

  const token = getCookie('token', { req, res });
  const menu = await getMenu(context.params.id, token);

  return {
    props: {
      data: menu,
    },
  };
}

export default MenuDetail;
