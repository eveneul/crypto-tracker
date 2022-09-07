import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
		padding: 20px;
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

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const response = await fetch('https://api.coinpaprika.com/v1/coins');
			const json = await response.json();
			setCoins(json.slice(0, 100));
			setLoading(false);
		})();
	}, []);
	// async, await을 쓰기 위해 function이 필요한데 useEffect에서 해결하려면
	// (function)()으로 쓰면 된다

	return (
		<>
			<Header>
				<HeaderInner>
					<Title>Crypto Coin Tracker</Title>
				</HeaderInner>
			</Header>
			<Inner>
				<Container>
					{loading ? (
						<Loading>
							<span>Loading..</span>
						</Loading>
					) : (
						<CoinsList>
							{coins.map((coin) => (
								<Coin key={coin.id}>
									<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
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
