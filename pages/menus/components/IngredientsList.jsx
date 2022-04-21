import React, {useState} from 'react';
import styled from 'styled-components';

import {
    Text,
    Button,
    Input,
    SaveButton, 
    EditButton,
    CancelButton
} from 'common/components';

import {
    colors,
    FontSizes
} from 'common';

import { 
    IoChevronDownOutline,
    IoChevronUpOutline,
    IoEllipsisVerticalSharp,
    IoCheckboxOutline,
    IoCheckbox
 } from "react-icons/io5";

import {useForm} from 'react-hook-form';

export const IngredientsList = props => {
    const [expand, setExpand] = useState(false);
    return (
        <Container>
            {/* <ButtonContainer
                type="button"
                onClick={() => setExpand(prev => !prev)}
                expand={expand}
            > */}
                <Text
                    fontSize={FontSizes.Small}
                    color={colors.secondary_light}
                    margin="0 0 0.5rem 0"
                >
                    {props.name}
                </Text>
                {/* {expand ? (
                    <IoChevronUpOutline 
                        size={24}
                        style={{ color: colors.grey_light}}
                    />
                ) : (
                    <IoChevronDownOutline 
                        size={24}
                        style={{ color: colors.grey_light}}
                    />
                )} */}
                
            {/* </ButtonContainer> */}
            {/* {expand && */}
                <ItemsContainer>
                    {[1,2,3,4].map((item, index) => (
                        <Item
                            key={index}
                            data={"item name"}
                        />
                    ))}
                    {/* <AddItem /> */}
                </ItemsContainer>
            {/* } */}
        </Container>
    )
};

const Item = props => {
    const [hover, setHover] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
                    {props.data || "name"}
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
    )
};


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 0 0 0.5rem 0;

    &:hover {
        background-color: ${colors.secondary_dark};
    }
`

const Form = styled.form`
    display: flex;
    width: 100%;
    align-items: center;
`   

const UtilityWrapper = styled.div`
    display: flex;
    align-items:center;
    margin-left: 0.5rem;
`

const Container = styled.div`
    width: 100%;
    display: grid;
`

const ButtonContainer = styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 3%;
    outline: none;
    background: none;
    border: none;
    /* border-bottom: 1px solid ${colors.grey_dark};  */
    /* border-top: 1px solid ${colors.grey_dark};  */
`

const ItemsContainer = styled.ul`
    width: 100%;
    /* display: grid; */
    display: flex;
    margin:0;
    flex-direction: column;
    padding: 0;
    gap:0.4rem;
`

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
    box-shadow: ${props => props.checked ? null : "rgba(0, 0, 0, 0.16) 0px 1px 4px"};

    &:hover {
        background-color: ${colors.white_dark};
    }
`

const ItemName = styled(Text)`
    text-decoration: ${props => props.checked ? "line-through": ""};
`

const UtilButton = styled.button`
    outline: none;
    border: none;
    background: none;
    position: relative;
`

const MenuContainer = styled.div`
    position: absolute;
    width: 200px;
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    display:grid;
    top: -0.1rem;
    right: -0.6rem;;
`

const MenuButton = styled.button`
    outline: none;
    border: none;
    background: none;
    width: 100%;
    padding: 0.3rem 0;
    &:hover {
        background-color: ${colors.white_dark};
    }
`