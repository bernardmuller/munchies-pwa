import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { getCookie } from "cookies-next";
import { MealCardList, Text, Header } from "common/components";
import { createMeal, getMeals } from "common/actions";
import { colors, FontSizes, PrivateContainer } from "common";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/router";
import { ActiveViewContext } from "contexts/ActiveViewContext";

function Meals(props) {
	const token = getCookie("token");
	const router = useRouter();
	const [meals, setMeals] = useState(props.meals);

	const activeContext = useContext(ActiveViewContext);
	const [creatingMeal, setCreatingMeal] = useState(false);
	const [loading, setLoading] = useState(false)

	const fetchData = async () => {
		setLoading(true);
		const res = await getMeals(token);
		setMeals(res);
		setLoading(false);
	};

	useEffect(() => {
		activeContext.dispatch({ type: "MEALS" });
	}, [])

	const handleCreateMeal = async () => {
		setCreatingMeal(true);
		const res = await createMeal(token);
		if (res) fetchData();
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
				/>
				<MealsContainer>
					{meals.length > 0 ? (
						meals.map((meal, index) => (
							<MealCardList
								image={meal.image}
								name={meal.name}
								seasons={meal.seasons}
								count={false}
								key={index}
								onClick={() =>
									router.push(`/meals/${meal._id}`)
								}
							/>
						))
					) : (
						<>
							<Text
								fontSize={FontSizes.Small}
								color={colors.grey_light}
								textAlign="center"
							>
								You do not have any meals in your collection.
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
			</Container>
		</PrivateContainer>
	);
}

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
			meals: meals,
		},
	};
}

const MealsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding: 1rem 1rem 2rem 1rem;
	gap: 0.5rem;
	::-webkit-scrollbar {
		width: 0 !important;
	}
`;
const Container = styled.div`
	display: Flex;
	flex-direction: column;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${colors.white};
`;

export default Meals;