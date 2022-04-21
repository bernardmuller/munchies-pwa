import React, {
    useState
} from 'react';
import styled from 'styled-components'

import Image from "next/image";

import {
    H2,
    Button,
    Text,
    SaveButton,
    EditButton,
    CancelButton,
    Input
} from 'common/components';

import { 
    FontSizes,
    colors,
    DeviceMediaQueries
} from 'common';

import { IoAlertCircleOutline, IoFlaskOutline, IoTrashOutline} from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import DropdownList from "react-widgets/DropdownList";
import Multiselect from "react-widgets/Multiselect";

import { useForm } from 'react-hook-form';

import { 
    updateMeal,
    deleteMeal
} from 'common/actions';

import food from 'assets/images/food_ph.png';
import { Confirmation } from './Confirmation';
import { getCookie } from 'cookies-next';

const url = "https://api.cloudinary.com/v1_1/munchiesapp/meals/upload";
// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "docs_upload_example_us_preset");

//     fetch(url, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });

const Name = props => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [edit, setEdit] = useState(false);
    const [hover, setHover] = useState(false);
    const [name, setName] = useState(props.data.name)
    const token = getCookie('token')

    const handleUpdateName = async(data) => {
        await updateMeal(props.data._id, data, token)
        .then(async() => {
            setEdit(false)
            props.onReload();
        })
        .catch(err => console.log(err));
    };

    const onSubmit = (data) => {
        handleUpdateName(data);
    };

    console.log(props.data)

    return (
        <Wrapper
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            // onClick={() => setEdit(true)}
        >
            {!edit ? (
                <>
                    <H2
                        color={colors.secondary}
                        fontSize={FontSizes.Big}
                        margin="0.6rem 0 0 0"
                        onClick={() => setEdit(true)}
                    >
                        {name}
                    </H2>
                    {hover && !edit && 
                        <EditButton 
                            onClick={() => setEdit(true)}
                        />
                    }
                </>
            ) : (
                <NameForm
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input 
                        placeholder="Meal name"
                        height="2.5rem"
                        value={name}
                        {...register("name", {
                            onChange: e => {setName(e.target.value)}
                        })}
                    />
                    <SaveButton />
                    <CancelButton 
                        onClick={() => setEdit(false)}
                    />
                </NameForm>
            )}
            
        </Wrapper>
    )
};

export const MealInfo = props => {
    const [buttonHover, setButtonHover] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [uploadFile, setUploadFile] = useState(null)
    const token = getCookie('token')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const removeMeal = async() => {
        setShowConfirmation(false)
        await deleteMeal(props.meal._id, token)
        .then(() => props.onHardReload())
    };

    const uploadImageURL = async() => {
        await updateMeal(
            props.meal._id, 
            {image: imageURL},
            token
        )
        .then(() => props.onReload())
    };

    const handleUpload = async(e) => {
        e.preventDefault()
        console.log('check')

        // const formData = new FormData();
        // formData.append("file", uploadFile);
        // formData.append("upload_preset", "docs_upload_example_us_preset");

        // await fetch(url, {
        //     method: "POST",
        //     body: formData
        // })
        // .then((response) => {
        //     return response.text();
        // })
    }

    return (
        <Container>

            {showConfirmation && 
                <Confirmation 
                    text="Are you sure you want to delete this meal?"
                    onConfirm={removeMeal}
                    onCancel={() => setShowConfirmation(false)}
                />
            }

            <MealImageContainer>
                {props.meal.image ? (
                    <>  
                        {/* <ImageWrapper> */}
                            <Image 
                                src={props.meal.image} 
                                layout="fill"
                                objectFit='cover'
                                // width="100px"
                                // height="100px"
                            />
                        {/* </ImageWrapper> */}
                    </>
                ) : (
                    <Placeholder
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                    >
                        <Image src={food} alt="meal" />  
                        {/* {buttonHover && */}
                            <UploadButtonWrapper
                                enctype="multipart/form-data"
                                onSubmit={handleSubmit(uploadImageURL)}
                            >
                                <Input 
                                    type="text" 
                                    placeholder="Image URL"
                                    height="2rem"
                                    {...register("image", {
                                        onChange: e => {setImageURL(e.target.value)},
                                        required: "Please provide URL"
                                    })}
                                />
                            </UploadButtonWrapper>
                        {/* } */}

                    </Placeholder>
                )}
            </MealImageContainer>

            <InfoContainer>
                {/* <Header> */}
                    <Name 
                        data={props.meal}
                        onReload={() => {
                            props.onReload();
                        }}
                    />
                {/* </Header> */}

                <Text 
                    color={colors.grey_light} 
                    fontSize={FontSizes.Smaller}
                    margin="0"
                >
                    Creator: {props.meal.createdBy.firstname}
                </Text>

                <MealStats 
                    meal={props.meal}
                />

                {/* <ButtonsContainer>
                    <Button
                        primary
                        width="180px"
                        height="3rem"
                    >
                        Add
                    </Button>

                    <Button
                        primary
                        width="3rem"
                        height="3rem"
                        onClick={() => setShowConfirmation(true)}
                    >
                        <IoTrashOutline
                            size={25} 
                        />
                    </Button>
                </ButtonsContainer> */}

                <Seasons
                    meal={props.meal}
                    id={props.meal._id}
                    onReload={() => {
                        props.onReload();
                    }}
                />

                

               

            </InfoContainer>

            

        </Container>
    )
};

const Tags = props => {
    return (
        <TagsContainer>
            {props.tags ? (
                props.tags.map((tag, index) => (
                    <TagWrapper
                        key={index}
                    >
                        <Text 
                            color={colors.primary_dark}
                            fontSize={FontSizes.Smaller}
                            fontWeight="bold"
                        >
                            {tag}
                        </Text>
                    </TagWrapper>
                ))
            ) : (
                // <TagWrapper>
                    <Button 
                        color="#B4D5AB"
                        fontSize={FontSizes.Small}
                        margin="0"
                        primary
                        style={{borderRadius: '20px'}}
                    >
                        Select seasons
                    </Button>
                // </TagWrapper>
            )}
        </TagsContainer>
    )
}

const MealStats = props => {
    const ingredients = props.meal.ingredients;
    return (
        <StatsContainer>
            <Stat>
                <Text
                    color={colors.secondary}
                    fontSize={FontSizes.Big}
                    margin="0"
                >
                    {props.meal.ingredients.length || "0"} 
                </Text>
                <Text
                    color="#ABBBC2"
                    fontSize={FontSizes.Smaller}
                    margin="0"
                >
                    Ingredients
                </Text>
            </Stat>
            <Stat
                borders
            >
                <Text
                    color={colors.grey}
                    fontSize={FontSizes.Big}
                    margin="0"
                >
                    20
                </Text>
                <Text
                    color="#ABBBC2"
                    fontSize={FontSizes.Smaller}
                    margin="0"
                >
                    Prep time
                </Text>
            </Stat>
            <Stat>
                <Text
                    color={colors.grey}
                    fontSize={FontSizes.Big}
                    margin="0"
                >
                    40
                </Text>
                <Text
                    color="#ABBBC2"
                    fontSize={FontSizes.Smaller}
                    margin="0"
                >
                    Serve in
                </Text>
            </Stat>
        </StatsContainer>
    )
};

const Seasons = props => {
    const [seasons, setSeasons] = useState(props.meal.seasons);
    const [edit, setEdit] = useState(false);
    const [hover, setHover] = useState(false);
    const token = getCookie('token')

    const handleUpdateSeason = async(e) => {
        e.preventDefault();
        await updateMeal(props.id, {'seasons' : seasons}, token)
        .then(async() => {
            setEdit(false)
            props.onReload();
        })
        .catch(err => console.log(err));
    };

    return (
        <Container>
            {!edit ? (
                <Container
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {seasons.length > 0 ? (
                        <Wrapper>
                            <Tags 
                                tags={seasons}
                            />
                            {hover && !edit && 
                                <EditButton 
                                    onClick={() => setEdit(true)}
                                />
                            }
                        </Wrapper>
                    ):(
                        <Button 
                            fontSize={FontSizes.Smaller}
                            tertiary
                            height="2rem"
                            borderRadius="4px"
                            onClick={() => setEdit(true)}
                        >
                            Select seasons
                        </Button>
                    )}
                    
                </Container>
            ) : (
                <SeasonForm
                    onSubmit={handleUpdateSeason}
                >
                    <Multiselect 
                        placeholder="Select season/s"
                        value={seasons}
                        data={["Summer", "Autumn", "Winter", "Spring", "All Year"]}
                        onChange={val => setSeasons(val)}
                    />
                    <SaveButton 
                        margin="0 0 0 0.5rem"
                    />
                    <CancelButton 
                        onClick={() => setEdit(false)}
                    />
                </SeasonForm>
            )}
        </Container>
    )
};



const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: ${props => props.height || ""};
`

const NameForm = styled.form`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
`

const StatsContainer = styled.div`
    height: 4.5rem;
    width: 100%;
    display: flex;
    border: 1px solid ${colors.white_dark};
    padding:0.3rem;
    border-radius: 8px;
`

const Stat = styled.div`
    flex: 0.333;
    /* border-left: ${props => props.borders ? '1px solid grey' : ''}; */
    /* border-right: ${props => props.borders ? '1px solid grey' : ''}; */
    display: grid;
    text-align: center;
    /* padding: 1rem; */
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`

const MealImageContainer = styled.div`
    width: 87.5%;
    height: 14rem;
    overflow: hidden;
    border-radius: 20px;
    background-color: ${colors.grey};
    position: relative;
    /* max-width: 300px; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30%;
    align-self: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media ${DeviceMediaQueries.tablet} {
        /* width: 50%; */
        max-height: 20rem;
    }
`

const InfoContainer = styled.div`
    padding: 0 1.5rem;
    width: 100%;
    display: grid;
    align-items: space-between;
    gap:0.4rem;
`

const Header = styled.div`
    width: 100%;
    display: flex;
`

const ButtonsContainer = styled.div`
    display:flex;
    width: 100%;
    gap: 1rem;

`

const TagsContainer = styled.div`
    display:flex;
    width: 100%;
    gap: 0.3rem;
    /* height: 2.5rem; */
` 
const TagWrapper = styled.div`
    height: 1.5rem;
    /* width: 80px; */
    padding: 0 1rem;
    border-radius: 1.25rem;
    background-color: rgb(104, 191, 80, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
` 

const Placeholder = styled.div`
    height: 100%;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    /* padding: 10%; */

    img {
        width: 170px;
    }
`

const UploadButton = styled.button`
    width: 100%;
    height: 100%;
    background: none;
    outline: none;
    border: none;
    color: ${colors.white};
`

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const SeasonForm = styled.form`
    width: 100%;
    display: flex;
`

const UploadButtonWrapper = styled.form`
    position: absolute;
    width: 100%;
    height: 20%;
    background-color: rgb(104, 191, 80, 0.9);
    z-index: 100;
    bottom: 0;
    font-size: ${FontSizes.Small};
    color: ${colors.white};
    /* outline: none; */
    /* border: none; */
    padding: 0.3rem 1rem;
    align-items: center;
    input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        /* width: 100%; */
        /* height: 100%; */
        &:hover {
            cursor: pointer;
        }
    }

    input[type="text"] {
        background-color: rgb(255, 255, 255, 0.7);
    }
`
