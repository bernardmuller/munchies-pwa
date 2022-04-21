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
    SaveButton, 
    EditButton,
    CancelButton,
} from 'common/components';

import {
    FontSizes,
    colors,
    PrivateContainer,
    Button
} from 'common';

// import { 
//     MealDirections
// } from './components/MealDirections';
// import { 
//     MealInfo
// } from './components//MealInfo';

// import {
//     DataStore
// } from 'common/dataStore';
import { MealCard } from 'common/components/card/MealCard';

import { IoArrowBackOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';

import { Confirmation } from '../components/Confirmation';
import mealimg from 'assets/images/sushi_bg.jpg';

import { 
    GroceryList,
} from '../components/GroceryList';

import {
    getMenu,
    deleteMenu
} from 'common/actions';

import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';

import { 
    ActiveViewContext
  } from "contexts/ActiveViewContext";
import Link from 'next/link';

const MenuDetail = props => {
    const token = getCookie("token");
    const activeContext = useContext(ActiveViewContext);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(props.menu)
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    console.log(menu)
    
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

            {showConfirmation && 
                <Confirmation 
                    text="Are you sure you want to delete this meal?"
                    onConfirm={removeMeal}
                    onCancel={() => setShowConfirmation(false)}
                />
            }
            <Content

            >
                <Name 
                    name={menu && menu.name}
                    onRename={handleRename}
                />

                <Period 
                    period={{}}
                />

                <Text
                    color={colors.grey}
                    fontSize={FontSizes.Small}
                    margin="0"
                >
                    Creator: {menu && menu.createdBy.firstname || "username"}
                </Text>


            </Content>
                <Wrapper>
                    <H4
                        fontSize={FontSizes.Regular}
                    >
                        Meals
                    </H4>

                    <Link
                        href={`/menus/${menu._id}/meals`}
                    >
                        {/* <a href={`/menus/${menu.id}/meals`}>edit</a> */}
                        <a>edit</a>
                    </Link>

                </Wrapper>

                <WeekContainer>
                    <MealsContainer>
                        {menu && menu.meals.map((meal, index) => (
                            <MealCard 
                                img={meal.image} 
                                name={meal.name || "Meal Name"}
                                season={"Season"}
                                count={2}
                                key={index}
                                secondary
                                onClick={() => {
                                    
                                }}
                            />
                        ))}
                    </MealsContainer>
                </WeekContainer>
            
            <Content>

                <GroceryList 
                    meal_items={menu.grocerylist.meal_items}
                />

            </Content>
            
        </Container>
    )
};

const Name = props => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [edit, setEdit] = useState(false);
    const [hover, setHover] = useState(false);
    const [name, setName] = useState(props.name);


    const cancel =() => {
        setName(props.name);
        setEdit(false);
    }
    
    console.log(props.name)
    return (
        <TitleWrapper
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!edit ? (
                <>
                    <H2
                        color={colors.secondary}
                        fontSize={FontSizes.Big}
                        margin="0"
                        onClick={() => setEdit(true)}
                    >
                        {name || "menu name"}
                    </H2>
                    {/* {hover && !edit && 
                        <EditButton 
                            onClick={() => setEdit(true)}
                        />
                    } */}
                </>
            ) : (
                <NameForm
                    onSubmit={handleSubmit(props.onRename)}
                >
                    <Input 
                        placeholder="Menu name"
                        height="2.5rem"
                        value={name}
                        {...register("name", {
                            onChange: e => {setName(e.target.value)},
                            required: "Name field can not be empty"
                        })}
                    />
                    <SaveButton />
                    <CancelButton 
                        onClick={cancel}
                    />
                </NameForm>
            )}
            
        </TitleWrapper>
    )
}

const Period = props => {
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
                    <Text
                        fontSize={FontSizes.Small}
                        color={colors.grey_dark}
                    >
                        Menu period / Date
                    </Text>

                    {hover && !edit && 
                        <EditButton 
                            onClick={() => setEdit(true)}
                        />
                    }
                </>
            ) : (
                <NameForm>
                    <Input  
                        type="date"
                        height="2.5rem"
                    />
                    <Text
                        color={colors.grey_light}
                        margin="0 0.5rem 0 0.5rem"
                    >
                        to
                    </Text>
                    <Input  
                        type="date"
                        height="2.5rem"
                    />
                    <SaveButton 
                        onClick={() => {}}
                    />
                    <CancelButton 
                        onClick={() => setEdit(false)}
                    />
                </NameForm>
            )}
            
        </TitleWrapper>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`


export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    console.log(context)
    const token = getCookie("token", { req, res });
    const menu = await getMenu(context.params.id, token);
    console.log("menu: ", menu)
    return {
        props: {
            menu: menu
        }
    }
}

export default MenuDetail;

const Content = styled.div`
    width: 100%;
	padding: 0.5rem 1rem;
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
    height: ${props => props.height || "2rem"};
    padding: 0 1rem;
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
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    padding-right: 2rem;
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