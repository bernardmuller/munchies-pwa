import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { IoPersonSharp, IoExitOutline } from "react-icons/io5";
import { ActiveViewContext } from "contexts/ActiveViewContext";
import { PrivateContainer, colors, appVersion, FontSizes } from "common";
import { Header, Loader, Text } from "common/components";
import { getUser, updateUser } from "common/actions";
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";

const Settings = (props) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(props.user);
	const activeContext = useContext(ActiveViewContext);
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState({});
	const token = getCookie("token");

	const fetchUser = async () => {
		setLoading(true);
		await getUser(currentUser, token)
			.then((data) => setUser(data))
			.catch((err) => console.log(err));
		setLoading(false);
	};

	const handleUpdate = async (data) => {
		setLoading(true);
		await updateUser(currentUser, data, token)
			.catch((err) => console.log(err))
			.finally(() => fetchUser());
	};

	const handleLogout = () => {
		removeCookies("user");
		removeCookies("token");
		router.push("/login");
	};

	useEffect(() => {
		setCurrentUser(getCookie("user"));
		activeContext.dispatch({ type: "PROFILE" });
	}, [])

	return (
		<PrivateContainer>
			<Container>
				{!loading ? (
					<>
						<Header
							heading="My Menus"
							onRightButtonClick={() => handleLogout()}
							RightIcon={IoExitOutline}
						/>

						<Wrapper>
							<Text
								color={colors.grey}
								margin="1rem 0"
								fontSize={FontSizes.Smaller}
							>
								App version:
							</Text>
							<Text
								color={colors.grey}
								margin="1rem 0"
								fontSize={FontSizes.Smaller}
							>
								{appVersion}
							</Text>
						</Wrapper>

						<Link href={`/settings/profile`}>
							<IoPersonSharp size="18px" />
							<Text fontSize={FontSizes.Small}>My Profile</Text>
						</Link>
					</>
				) : (
					<Loader spinnerColor={colors.secondary} size="24px" />
				)}
			</Container>
		</PrivateContainer>
	);
};

export default Settings;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
`;

const Link = styled.a`
	width: 100%;
	padding: 1rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 0.4rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
