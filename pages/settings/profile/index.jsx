import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ActiveViewContext } from "contexts/ActiveViewContext";
import {
	PrivateContainer,
	colors,
} from "common";
import { Header, Loader, EditProfile, UserInfo } from "common/components";
import { IoArrowBackOutline } from "react-icons/io5";
import { getUser, updateUser } from "common/actions";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Profile = (props) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(props.user);
	const activeContext = useContext(ActiveViewContext);
	const router = useRouter();

	const token = getCookie("token");

	const fetchUser = async () => {
		setLoading(true);
		await getUser(user_id, token)
			.then((data) => setUser(data))
			.catch((err) => console.log(err));
		setLoading(false);
	};

	const handleUpdate = async (data) => {
		setLoading(true);
		await updateUser(user_id, data, token)
			.catch((err) => console.log(err))
			.finally(() => fetchUser());
	};
    
    useEffect(() => {
        activeContext.dispatch({ type: "PROFILE" });
    }, [])

	return (
		<PrivateContainer>
			<Container>
				{!loading ? (
					<>
						<Header
							heading="Settings"
							LeftIcon={IoArrowBackOutline}
							onLeftButtonClick={() => router.back()}
						/>
						<UserInfo user={user} loading={loading} />
						<EditProfile
							user={user}
							onUpdate={handleUpdate}
							loading={loading}
						/>
					</>
				) : (
					<LoaderContainer>
						<Loader spinnerColor={colors.secondary} size="24px" />
					</LoaderContainer>
				)}
			</Container>
		</PrivateContainer>
	);
};

export async function getServerSideProps(context) {
	const req = context.req;
	const res = context.res;

	const token = getCookie("token", { req, res });
	const current_user = getCookie("user", { req, res });

	const user = await getUser(current_user, token);

	return {
		props: {
			user: user,
		},
	};
}

export default Profile;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const LoaderContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;