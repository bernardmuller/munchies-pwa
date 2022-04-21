import React from 'react';
import styled from 'styled-components';

import {
    colors
} from 'common';

import {
    Text
} from 'common/components'

// import { DeviceMediaQueries } from 'common';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;

    /* @media ${DeviceMediaQueries.laptop} {
        display: none;
    } */
`

const DevSpan = styled.span`
    display: none;
    width: 100%;
    justify-content: center;
    padding: 2rem;

    /* @media ${DeviceMediaQueries.laptop} {
        display: flex;
    } */
`

const Content = styled.div`
    display:flex;
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: ${colors.secondary};
`

const ContentCenter = styled.div`
    display:flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    /* padding: 0 5%; */
    /* padding-top: 2rem; */
`

export const PageContainer = (props) => {
    return (
        <>
            <DevSpan>WEB VERSION UNDER CONSTRUCTION</DevSpan>
            <Page>            
                {props.children}
            </Page>
        </>   
    );
};

export const ContentContainer = (props) => {
    return (
        <Content props>            
            {props.children}
        </Content>
    );
};

export const ContentCenterContainer = (props) => {
    return (
        <ContentCenter>            
            {props.children}
        </ContentCenter>
    )
};