import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Nav, PageContainer } from "common/components";
import { colors } from "common";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export const PrivateContainer = (props) => {
	const [menuCollapsed, setMenuCollapsed] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const auth = async () => {
			const token = getCookie("token");

			if (!token) {
				router.push("/login");
			}
		};

		auth();
	}, []);

	console.log("check");

	return (
		<PageContainer>
			<Nav
				collapsed={menuCollapsed}
				onClose={() => setMenuCollapsed(true)}
			/>
			<ContentContainer collapsed={menuCollapsed}>
				{props.children}
			</ContentContainer>
		</PageContainer>
	);
};

export const PublicContainer = (props) => {
	return <PageContainer>{props.children}</PageContainer>;
};

export const ContentContainer = (props) => {
	return <Content {...props}>{props.children}</Content>;
};

const Content = styled.div`
	display: flex;
	width: 100%;
	height: 95vh;
	position: relative;
	/* background-color: ${colors.secondary}; */
	/* transition: all 0.5s ease-in-out; */
`;
