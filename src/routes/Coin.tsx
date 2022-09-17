import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Helmet from 'react-helmet';
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';

interface Params {
	coinId: string;
}

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	span {
		font-size: 32px;
		color: ${(props) => props.theme.accentColor};
		text-transform: uppercase;
		font-weight: bold;
	}
`;
const CoinHeader = styled.header`
	height: 120px;
	border-bottom: 1px solid #888;
	> div {
		position: relative;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: ${(props) => props.theme.accentColor};
		font-size: 32px;
		text-transform: uppercase;
		font-weight: bold;
	}

	a {
		font-size: 32px;
		font-weight: bold;
	}
`;
const Inner = styled.div`
	max-width: 480px;
	margin: 0 auto;
`;

const Container = styled.section`
	width: 100%;
	margin-top: 20px;
`;

const InnerArea = styled.article`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 70px;
	background-color: ${(props) => props.theme.articleBg};
	padding: 10px 20px;
	border-radius: 18px;
`;

const InfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.em`
	font-size: 14px;
	color: ${(props) => props.theme.textColor};
	text-transform: uppercase;
`;

const Desc = styled.span`
	font-size: 18px;
	color: ${(props) => props.theme.textColor};
`;

const DescArea = styled.p`
	margin: 10px 0;
	padding: 0 10px;
`;

const Tabs = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: calc(50% - 20px);
		height: 40px;
		background-color: ${(props) => props.theme.articleBg};
		color: ${(props) => props.theme.textColor};
		border-radius: 10px;
		&:nth-child(2n) {
			margin-left: 20px;
		}
	}
`;
const Tab = styled.div`
	padding: 20px;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.articleBg};
	border-radius: 20px;
`;

interface IRouteState {
	name: string;
}

interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface IPriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const { coinId } = useParams<Params>();
	const { state } = useLocation<IRouteState>();
	const priceMatch = useRouteMatch('/:coinId/price');
	const chartMatch = useRouteMatch('/:coinId/chart');

	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		['info', coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickerLoading, data: tickersData } = useQuery<IPriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(coinId)
	);

	const loading = infoLoading || tickerLoading;

	return (
		<>
			{loading ? (
				<Loading>
					<span>Loading..</span>
				</Loading>
			) : (
				<div className='wrapper'>
					<Helmet>
						<title>{coinId}</title>
					</Helmet>
					<CoinHeader>
						<Inner>
							<Link to='/'>&larr;</Link>
							<h2 className='title'>{coinId}</h2>
						</Inner>
					</CoinHeader>
					<Inner>
						<Container>
							<InnerArea>
								<InfoBox>
									<Title>rank:</Title>
									<Desc>{infoData?.rank}</Desc>
								</InfoBox>
								<InfoBox>
									<Title>symbol:</Title>
									<Desc>{infoData?.symbol}</Desc>
								</InfoBox>
								<InfoBox>
									<Title>price:</Title>
									<Desc>${tickersData?.quotes.USD.price.toFixed(3)}</Desc>
								</InfoBox>
							</InnerArea>
							<DescArea>{infoData?.description}</DescArea>
							<InnerArea>
								<InfoBox>
									<Title>total suply:</Title>
									<Desc>{tickersData?.circulating_supply}</Desc>
								</InfoBox>
								<InfoBox>
									<Title>max supply:</Title>
									<Desc>{tickersData?.max_supply}</Desc>
								</InfoBox>
							</InnerArea>

							<Tabs>
								<Link to={`/${coinId}/price`}>Price</Link>
								<Link to={`/${coinId}/Chart`}>Chart</Link>
							</Tabs>

							<Switch>
								<Route path={`/${coinId}/price`}>
									<Tab>
										<Price />
									</Tab>
								</Route>
								<Route path={`/${coinId}/chart`}>
									<Tab>
										<Chart coinId={coinId} />
									</Tab>
								</Route>
							</Switch>
						</Container>
					</Inner>
				</div>
			)}
		</>
	);
}

export default Coin;
