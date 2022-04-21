import React, {
    useState,
    useEffect,
    useContext
} from 'react';
import styled from 'styled-components';

import {
    Text,
    Loader,
    Header,
    H2,
    H4,
    Input, 
    Button
} from 'common/components';

import {
    FontSizes,
    colors,
    PrivateContainer,
} from 'common';

import { MealCard } from 'common/components/card/MealCard';

import { IoArrowBackOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';

// import { Confirmation } from '../components/Confirmation';
import mealimg from 'assets/images/sushi_bg.jpg';

import {
    getMenu,
    getMeals,
    deleteMenu,
    addMealsToMenu
} from 'common/actions';

import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';

import { 
    ActiveViewContext
  } from "contexts/ActiveViewContext";
import Link from 'next/link';

const MenuMeals = props => {
    const token = getCookie("token");
    const activeContext = useContext(ActiveViewContext);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState(props.meals)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [menu, setMenu] = useState(props.menu)
    const [selectedMeals, setSelectedMeals] = useState(props.menu_meals);

    useEffect(() => {
        activeContext.dispatch({ type: "MEALS" });
    }, []);

    const removeMeal = async() => {
        setShowConfirmation(false)
        setLoading(true)
        await deleteMenu(menu._id, token)
        .then(() => {
            router.push('/meals')
            setLoading(false)
        })
    };

    const fetchMenu = async() => {
        // setLoading(true);
        await getMenu(menu._id, token)
        .then(data => setMenu(data))
        .catch((err) => console.log(err))
        // setLoading(false)
    };

    const handleRename = async(data) => {
        // setLoading(true);
        await updateMenu(menu._id, data, token)
        // .then(res => setMenu(res))
        .catch((err) => console.log(err))
        await fetchMenu(menu._id, token)
        // props.onReload()
        // setLoading(false)
    };

    const saveNewMeals = async() => {
        console.log('check')
        await addMealsToMenu(menu._id, { meals: selectedMeals}, token)
            .catch((err) => console.log(err))
            .finally(() => router.back())
    }
    
    return (
        <Container>
            <Header 
                heading="Menu Meals"
                onLeftButtonClick={() => router.back()}
                // onRightButtonClick={() => setShowConfirmation(true)}
                // RightIcon={IoTrashOutline}
                LeftIcon={IoArrowBackOutline}
                // loading={loading}
            />

            <Content

            >
            

            </Content>

            <Wrapper>
                <H4
                    fontSize={FontSizes.Regular}
                >
                    Select Meals
                </H4>

                <Button
                    primary
                    width="6rem"
                    disabled={selectedMeals.length == 0}
                    gap="0.5rem"
                    onClick={saveNewMeals}
                >
                    Save
                    <Count
                        disabled={selectedMeals.length == 0}
                    >
                        {selectedMeals.length || "0"}
                    </Count>
                </Button>

            </Wrapper>

            <Waterfall>
                <MealsContainer>
                    {meals && meals.map((meal, index) => (
                        <MealCard 
                            img={meal.image || index %2 == 0 && mealimg} 
                            name={meal.name || "Meal Name"}
                            active={selectedMeals.includes(meal._id)}
                            season={meal.seasons}
                            count={2}
                            key={index}
                            secondary
                            onClick={() => {
                                if(selectedMeals.includes(meal._id)) {

                                    let temp = selectedMeals.filter(function(item) {
                                        return item !== meal._id
                                    })
                                    setSelectedMeals(temp);

                                } else {
                                    setSelectedMeals([...selectedMeals, meal._id])
                                };
                            }}
                        />
                    ))}
                </MealsContainer>
            </Waterfall>
            
        </Container>
    )
};



const Container = styled.div`
    width: 100%;
    /* height: 100%; */
`


export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    const token = getCookie("token", { req, res });
    const meals = await getMeals(token);
    const menu = await getMenu(context.params.id, token)

    console.log(menu)

    let menu_meals = [];
    for(const meal of menu.meals) {
        console.log(meal)
        menu_meals.push(meal._id);
    };

    console.log(menu_meals)

    return {
        props: {
            menu_id: context.params.id,
            meals: meals,
            menu: menu,
            menu_meals: menu_meals
        }
    }
}

export default MenuMeals;

const Content = styled.div`
    width: 100%;
	padding: 0rem 1rem;
`
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${props => props.height || "2rem"};
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${props => props.height || "3.5rem"};
    padding:  1rem;
`

const Count = styled.div`
    background-color: ${props => props.disabled ? colors.grey : colors.primary_dark};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 0.4rem;
`

const Waterfall = styled.div`
    width: 100%;
    height: 85vh;
    overflow-y: scroll;
`

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
`

const NameForm = styled.form`
    display: flex;
    align-items: center;
`

const LeftWrapper = styled.div`
    height: 100%;
    width: 25%;
    min-width: 400px;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.2rem;
`
const RightWrapper = styled.div`
    height: 100%;
    width: 100%;
    width: auto;
    flex-grow: 1;
    padding: 2rem 4rem;
    overflow-y: scroll;
`

// const Container = styled.div`
//     display: Flex;
//     flex-direction: column;
//     top: 0;
//     width: 100%;
//     background-color: ${colors.white};
//     overflow-y: scroll;
//     position: relative;
//     height: 100%;
// `

const WeekContainer = styled.div`
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    overflow-x: scroll;
    /* background-color: ${colors.secondary_light}; */
    padding: 1rem 1rem;
    border-radius: 8px;
`

const MealsContainer = styled.div`
    /* width: 100%; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 0.5rem;
    padding: 0 1rem;
`

// const Header = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     padding: 0 1rem;
// `
const Menu = styled.button`
    width: 100%;
    padding: 0.3rem;
    display: flex;
    background: none;
    border: none;

    
`