import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router';

import {
    Nav,
    PageContainer,
    Button,
    Header,
} from 'common/components';

import {
    FontSizes,
    colors,
} from 'common';

import { 
    ActiveViewProvider,
  } from "contexts";

import { useRouter } from 'next/router';

import { getCookie } from 'cookies-next';

// import {
//     Routes
// } from 'navigation';

// import {
//     DataStore
// } from 'common/dataStore';

const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: ${colors.secondary_light};
`

const TopBar = styled.div`
    width: 100%;
    height: 2rem;
    background-color: ${colors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index:2;
    padding: 0 5%;
`

export const PrivateContainer = (props) => {
    const [menuCollapsed, setMenuCollapsed] = useState(true);
    const router = useRouter()

    
    useEffect(() => {
        const auth = async() => {
            const token = getCookie('token');
            
            if(!token) {
                router.push('/login')
            }
        };
        
        auth()
    }, [])

    return (
        <PageContainer>
            <Nav 
                collapsed={menuCollapsed}
                onClose={() => setMenuCollapsed(true)}
            />
            <ContentContainer
                collapsed={menuCollapsed}
            >
                {props.children}
            </ContentContainer>
        </PageContainer>
    )
};

export const PublicContainer = (props) => {
    return (
        <PageContainer>

            {props.children}

        </PageContainer>
    )
};

export const ContentContainer = (props) => {
    return (
        <Content 
            {...props}
        >            
            {props.children}
        </Content>
    );
};

const Content = styled.div`
    display:flex;
    width: 100%;
    height: 95vh;
    position: relative;
    /* background-color: ${colors.secondary}; */
    /* transition: all 0.5s ease-in-out; */
`

