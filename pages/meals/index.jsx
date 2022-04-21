// import type { NextPage } from "next";
import React, { 
    useContext,
    useEffect,
    useState
} from 'react';
import Head from "next/head";
// import Image from "next/image";
// import { PrivateContainer } from "../../common/hocs";
// import styles from "../styles/Home.module.css";
import styled from 'styled-components';
import { getCookie } from 'cookies-next';

import {
    MealCardList,
    // MealsCollectionHeading,
    Text,
    // H3,
    // Loader,
    Button,
    Header
} from 'common/components';

import {
    createMeal,
    getMeals
} from 'common/actions';


import {
    // PrivateContainer,
    Images,
    colors,
    FontSizes,
    PrivateContainer,
    DeviceMediaQueries
} from 'common';

import { IoAdd } from "react-icons/io5";

import { useRouter } from 'next/router';

// import noodle from 'assets/mp4/noodle.mp4'

import { 
    ActiveViewContext
  } from "contexts/ActiveViewContext";

function Meals(props) {
    const token = getCookie('token');
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [meals, setMeals] = useState(props.meals);
    const [searchText, setSearchText] = useState('');
    const [filterText, setFilterText] = useState('');

    const activeContext = useContext(ActiveViewContext);
    const [viewMeal, setViewMeal] = useState(false);
    const [mealId, setMealId] = useState();
    // const [user, setUser] = useState(DataStore.get("LOGGED_IN_USER"))
    const [creatingMeal, setCreatingMeal] = useState(false);

    const fetchData = async() => {
        setLoading(true)
        const res = await getMeals(token)
        setMeals(res)
        setLoading(false)
    };

    useEffect(() => {
        // fetchData();
        activeContext.dispatch({ type: "MEALS" });
    }, []);

    const handleViewMeal = id => {
        // setViewMeal(false);
        // setMealId(id);

        // setViewMeal(true);
    };

    const handleCreateMeal = async() => {
        setCreatingMeal(true);
        const res = await createMeal(token);
        if(res) fetchData();
        setCreatingMeal(false);
    };

	return (
        <PrivateContainer>
        <Head>
            <title>Munchies - Meals</title>
        </Head>
		<Container>
            <Header 
                heading="My Meals"
                onRightButtonClick={() => handleCreateMeal()}
                RightIcon={IoAdd}
                // LeftIcon={""}
            />
            <MealsContainer>
                {meals.length > 0 ?( meals.map((meal, index) => (
                    <MealCardList 
                        image={meal.image} 
                        name={meal.name}
                        seasons={meal.seasons}
                        count={false}
                        key={index}
                        onClick={() => router.push(`/meals/${meal._id}`)}
                    />
                ))):(
                    <>
                        <Text
                            fontSize={FontSizes.Small}
                            color={colors.grey_light}
                            textAlign="center"
                        >
                            You don't have any meals in your collection.
                        </Text>
                        <Text
                            fontSize={FontSizes.Small}
                            color={colors.grey_light}
                            textAlign="center"
                        >
                            Create one by clicking the icon above.
                        </Text>
                    </>
                )}

            </MealsContainer>
            {/* <CreateButton>
                <Button 
                    primary
                    width="100%"
                    height="3rem"
                >
                    <Text
                        fontSize={FontSizes.Small}
                    >
                        Create Meal
                    </Text>
                </Button>
            </CreateButton> */}
		</Container>
        </PrivateContainer>
	);
};

// const token = DataStore.get("LOGGED_IN_USER").token;

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    const token = getCookie("token", { req, res });

    const meals = await getMeals(token);

    // const meals = response.data.map((meal) => ({
    //     img: meal.image,
    //     name : meal.name,
    //     _id: meal._id.toString(),
    //     seasons: meal.seasons
    // }));

    return {
        props: {
            meals: meals
        },
    };
}

const MealsContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    width: 100%;
    height: 100%;
    /* flex-wrap: wrap; */
    overflow-y: scroll;
    padding: 1rem 1rem 2rem 1rem;
    gap: 0.5rem;
    ::-webkit-scrollbar { width: 0 !important }
`
const Container = styled.div`
    display: Flex;
    flex-direction: column;
    top: 0;
    width: 100%;
    height: 100%;
    /* padding: 0 1.2rem; */
    background-color: ${colors.white};
    /* overflow-y: scroll; */
`

const LeftWrapper = styled.div`
    height: 100%;
    width: 25%;
    background-color: ${colors.white};
    min-width: 400px;
`
const RightWrapper = styled.div`
    height: 100%;
    width: calc(100% - 25%);
    padding: 1.5rem;
    overflow-y:scroll;
`
const CreateButton = styled.div`
    display: none;

    @media ${DeviceMediaQueries.laptop} {
        display:grid;
        width: 100%;
    }
`

export default Meals;