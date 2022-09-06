import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
	height: 120px;
	border-bottom: 1px solid #888;
`;
const Inner = styled.div`
	max-width: 560px;
	margin: 0 auto;
`;

const HeaderInner = styled.div`
	height: 100%;
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
	font-size: 48px;
	font-weight: bold;
	letter-spacing: -0.025em;
	color: ${(props) => props.theme.accentColor};
	text-transform: uppercase;
`;

const coins = [
	{
		id: 'btc-bitcoin',
		name: 'Bitcoin',
		symbol: 'BTC',
		rank: 1,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'eth-ethereum',
		name: 'Ethereum',
		symbol: 'ETH',
		rank: 2,
		is_new: false,
		is_active: true,
		type: 'coin',
	},
	{
		id: 'usdt-tether',
		name: 'Tether',
		symbol: 'USDT',
		rank: 3,
		is_new: false,
		is_active: true,
		type: 'token',
	},
];

function Coins() {
	return (
		<>
			<Header>
				<HeaderInner>
					<Title>Crypto Coin Tracker</Title>
				</HeaderInner>
			</Header>
			<Inner>
				<Container>
					<CoinsList>
						{coins.map((coin) => (
							<Coin key={coin.id}>
								<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
							</Coin>
						))}
					</CoinsList>
				</Container>
			</Inner>
		</>
	);
}

export default Coins;
