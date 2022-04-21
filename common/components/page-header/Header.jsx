import React from 'react'
import styled from 'styled-components';

import {    
    IoMenuOutline
} from "react-icons/io5";

import {
    Text,
    Loader
} from 'common/components';

import {
    colors, 
    FontSizes
} from 'common';

export const Header = ({RightIcon, LeftIcon, loading, heading, onRightButtonClick, onLeftButtonClick}) => {
    return (
        <HeaderContainer>
            <LeftContainer>
                {LeftIcon &&
                    <HeaderButton
                        onClick={() => onLeftButtonClick()}
                    >
                        <LeftIcon
                            size="35px"
                        />
                    </HeaderButton>
                }
            </LeftContainer>
            <Text
                color={colors.grey_dark}
                fontSize={FontSizes.Small}
            >
                {loading ? <Loader spinnerColor={colors.primary} size="22px" /> : heading || "MUNCHIES"} 
            </Text>
            <RightContainer>
                {RightIcon && 
                    <HeaderButton
                        onClick={() => onRightButtonClick()}
                        disabled={loading}
                    >
                        <RightIcon
                            size="30px"
                        />
                    </HeaderButton>
                }
            </RightContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    /* padding: 0rem 0.5rem; */
    z-index: 1;
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
`

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
`

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
`

const HeaderButton = styled.button`
	/* position: absolute; */
	/* top: 1rem; */
	/* right: 0.5rem; */
	background: none;
	border: none;
	pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    border-radius: 50%;

	&:hover {
		cursor: pointer;
	};

    &:active {
        background-color: ${colors.white_dark};
    }

	@media (min-width: 1025px) {
		display: none;
	}
`;