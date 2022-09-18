import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';

const Header = styled.header`
	height: 120px;
	border-bottom: 1px solid #888;
`;
const Inner = styled.div`
	max-width: 480px;
	margin: 0 auto;
`;

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 120px);

	span {
		font-size: 28px;
		color: ${(props) => props.theme.accentColor};
		font-weight: bold;
		text-transform: uppercase;
	}
`;

const HeaderInner = styled.div`
	position: relative;
	padding: 0 20px;
	max-width: 480px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		position: absolute;
		bottom: 10px;
		right: 20px;
		font-size: 12px;
		padding: 8px;
		background-color: ${(props) => props.theme.articleBg};
		color: ${(props) => props.theme.textColor};
		border-radius: 8px;
	}
`;
const Container = styled.main``;
const CoinsList = styled.ul`
	margin-top: 10px;
	padding: 0 20px;
`;
const Coin = styled.li`
	border: 1px solid ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.textColor};
	border-radius: 18px;
	font-weight: 800;
	transition: color 0.2s ease-in;

	a {
		display: flex;
		align-items: center;
		padding: 20px;
	}

	img {
		width: 25px;
		height: 25px;
		margin-right: 10px;
	}

	&:not(:first-child) {
		margin-top: 20px;
	}

	&:hover {
		color: ${(props) => props.theme.accentColor};
		font-weight: 800;
	}
`;

const Title = styled.h1`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 80%;
	transform: translate(-50%, -50%);
	font-size: 36px;
	font-weight: bold;
	letter-spacing: -0.025em;
	color: ${(props) => props.theme.accentColor};
	text-transform: uppercase;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>('allCoin', fetchCoins);
	// useQuery로 api를 간단하게 불러올 수 있음
	const setDarkAtom = useSetRecoilState(isDarkAtom);

	return (
		<>
			<Helmet>
				<title>Crypto Coin Tracker</title>
			</Helmet>
			<Header>
				<HeaderInner>
					<Title>Crypto Coin Tracker</Title>
					<button onClick={() => setDarkAtom((current) => !current)}>
						Change Mode
					</button>
				</HeaderInner>
			</Header>
			<Inner>
				<Container>
					{isLoading ? (
						<Loading>
							<span>Loading..</span>
						</Loading>
					) : (
						<CoinsList>
							{data?.slice(0, 100).map((coin) => (
								<Coin key={coin.id}>
									<Link
										to={{
											pathname: `${process.env.PUBLIC_URL}/${coin.id}`,
											state: { name: coin.name },
										}}>
										<img
											src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
											alt={coin.name}
										/>
										{coin.name} &rarr;
									</Link>
								</Coin>
							))}
						</CoinsList>
					)}
				</Container>
			</Inner>
		</>
	);
}

export default Coins;
