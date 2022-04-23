// import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
	Text,
	CancelButton,
	Header,
	Confirmation
} from "common/components";

import {
	colors,
	FontSizes,
	PrivateContainer,
} from "common";

import {
	getMenus,
	createMenu,
	deleteMenu,
} from "common/actions";

import { IoAdd } from "react-icons/io5";
import { ActiveViewContext } from "contexts/ActiveViewContext";
import { getCookie } from "cookies-next";
import { IoDocumentText } from "react-icons/io5";

const Menus = (props) => {
	const [loading, setLoading] = useState(true);
	const [menus, setMenus] = useState(props.menus);
	const token = getCookie("token");
	const router = useRouter();
	const activeContext = useContext(ActiveViewContext);

	const newMenu = async () => {
		await createMenu(token).catch((err) => console.log(err));
		fetchMenus();
	};

	const fetchMenus = async () => {
		setLoading(true);
		await getMenus(token)
			.then((data) => setMenus(data))
			.catch((err) => console.log(err));
		setLoading(false);
	};

	const removeMenu = async (id) => {
		await deleteMenu(id, token).catch((err) => console.log(err));
		await fetchMenus(token);
	};

	useEffect(() => {
		activeContext.dispatch({ type: "MENUS" });
	}, [])

	return (
		<PrivateContainer>
			<Head>
				<title>Munchies - Menus</title>
			</Head>
			<Container>
				<Header
					heading="My Menus"
					onRightButtonClick={() => newMenu()}
					RightIcon={IoAdd}
				/>
				<MenusContainer>
					{menus.length > 0 &&
						menus.map((menu, index) => (
							<MenuButton
								menu={menu}
								key={index}
								onClick={() =>
									router.push(`/menus/${menu._id}`)
								}
								onDelete={() => removeMenu(menu._id)}
							/>
						))}
				</MenusContainer>
			</Container>
		</PrivateContainer>
	);
};

const MenuButton = (props) => {
	const [menuHover, setMenuHover] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [count, setCount] = useState(props.menu.meals.length);
	return (
		<>
			{showConfirmation && (
				<Confirmation
					text={`Are you sure you want to delete "${props.menu.name}"?`}
					onConfirm={() => {
						props.onDelete();
						setShowConfirmation(false);
					}}
					onCancel={() => setShowConfirmation(false)}
				/>
			)}
			<Wrapper
				onMouseEnter={() => setMenuHover(true)}
				onMouseLeave={() => setMenuHover(false)}
				height="3rem"
				style={{ backgroundColor: menuHover && "#F5F5F5" }}
			>
				<IoDocumentText size="1.4rem" color={colors.primary_dark} />
				<Menu
					onClick={() => {
						if (!menuHover) {
							setMenuHover(true);
						} else {
							props.onClick();
						}
					}}
				>
					{props.menu.name}
				</Menu>
				{menuHover && (
					<CancelButton
						color={colors.danger}
						onClick={() => setShowConfirmation(true)}
					/>
				)}
				<Text
					fontSize={FontSizes.Small}
					color={colors.grey_dark}
					style={{
						backgroundColor: colors.white_dark,
						width: "1.5rem",
						minWidth: "1.5rem",
						height: "1.5rem",
						minHeight: "1.5rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "8px",
					}}
				>
					{count}
				</Text>
			</Wrapper>
		</>
	);
};

export async function getServerSideProps(context) {
	const req = context.req;
	const res = context.res;
	const token = getCookie("token", { req, res });

	const menus = await getMenus(token);

	return {
		props: {
			menus: menus,
		},
	};
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	height: ${(props) => props.height || "3rem"};
	padding: 0 1rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 6px;
`;

const Menu = styled.button`
	width: 100%;
	padding: 0.3rem;
	display: flex;
	background: none;
	border: none;
	font-size: ${FontSizes.Small};
	padding-left: 0.5rem;
`;

const MenusContainer = styled.div`
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

export default Menus;
