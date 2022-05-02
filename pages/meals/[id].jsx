import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  Header,
  Confirmation,
  MealDirections,
  MealInfo,
} from 'common/components';
import { IoArrowBackOutline, IoTrashOutline } from 'react-icons/io5';
import { getMeal, deleteMeal } from 'api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ActiveViewContext } from 'contexts/ActiveViewContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MealDetail = ({ data, onClose }) => {
  const token = getCookie('token');
  const activeContext = useContext(ActiveViewContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(data);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    activeContext.dispatch({ type: 'MEALS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMeal = async () => {
    setShowConfirmation(false);
    setLoading(true);
    await deleteMeal(meal._id, token).then(() => {
      router.push('/meals');
      setLoading(false);
    });
  };

  const fetchMeal = async () => {
    setLoading(true);
    await getMeal(meal._id, token)
      .then(res => setMeal(res))
      .catch(err => console.log(err));
    setLoading(false);
  };

  return (
    <Container>
      <Header
        heading="Meal Detail"
        onLeftButtonClick={() => router.back()}
        onRightButtonClick={() => setShowConfirmation(true)}
        RightIcon={IoTrashOutline}
        LeftIcon={IoArrowBackOutline}
        loading={loading}
      />

      {showConfirmation && (
        <Confirmation
          text="Are you sure you want to delete this meal?"
          onConfirm={removeMeal}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {meal && (
        <>
          <MealInfo
            meal={meal}
            onClose={onClose}
            onReload={() => fetchMeal()}
          />

          <MealDirections meal={meal} onReload={() => fetchMeal()} />
        </>
      )}
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { res } = context;

  const token = getCookie('token', { req, res });
  const data = await getMeal(context.params.id, token);

  return {
    props: {
      data,
    },
  };
}

export default MealDetail;
