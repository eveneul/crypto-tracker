import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

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
	max-width: 480px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Container = styled.main``;
const CoinsList = styled.ul`
	margin-top: 10px;
	padding: 0 20px;
`;
const Coin = styled.li`
	background-color: #ededed;
	color: ${(props) => props.theme.bgColor};
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

	return (
		<>
			<Header>
				<HeaderInner>
					<Title>Crypto Coin Tracker</Title>
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
											pathname: `/${coin.id}`,
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
