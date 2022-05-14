import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, FontSizes } from 'common';
import mealimg from 'assets/images/meal.png';
import { MealCard, Button, Text, H3 } from 'common/components';
import { getMeals, addMealsToMenu } from 'api';
import { Loader } from 'common/components/loader/Loader';
import { getCookie } from 'cookies-next';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
`;

const MealsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const AddMealsTab = ({ id, data, onCancel }) => {
  const [meals, setMeals] = useState(data);
  const [loading, setLoading] = useState(false);
  const [newMeals, setNewMeals] = useState([]);

  const addMeal = idData => {
    const temp = newMeals;
    temp.push(idData);
    setNewMeals(temp);
    console.log(temp);
  };

  const saveNewMeals = async () => {
    setLoading(true);
    await addMealsToMenu(id, { meals: newMeals })
      .then(() => onCancel())
      .catch(err => console.log(err));
    setLoading(false);
  };

  // useEffect(async() => {
  //     setFetching(true);
  //     await getMeals()
  //     .then(data => setMeals(data))
  //     .catch((err) => console.log(err))
  //     setFetching(false);
  // }, [])

  return (
    <Container>
      <Header>
        <H3 color={colors.grey}>Add Meals</H3>

        <ButtonsContainer>
          <Button secondary width="120px" onClick={() => onCancel()}>
            Cancel
          </Button>

          <Button primary width="120px" onClick={saveNewMeals}>
            {loading ? (
              <Loader spinnerColor={colors.white} size="20px" />
            ) : (
              <Text fontSize={FontSizes.Small} color={colors.white}>
                Save
              </Text>
            )}
          </Button>
        </ButtonsContainer>
      </Header>
      <MealsContainer>
        {meals && meals.length > 0 ? (
          meals.map(meal => (
            <MealCard
              img={meal.image || mealimg}
              name={meal.name}
              season={meal.season}
              count={2}
              key={meal + Math.random() + Math.random()}
              secondary
              onClick={() => {
                addMeal(meal._id);
              }}
            />
          ))
        ) : (
          <Container>
            <Text fontSize={FontSizes.Small} color={colors.grey}>
              Yout do not have any meals in your collection to add to a menu.
            </Text>
          </Container>
        )}
      </MealsContainer>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;
  const token = getCookie('token', { req, res });

  const meals = await getMeals(token);

  return {
    props: {
      data: meals,
    },
  };
}
