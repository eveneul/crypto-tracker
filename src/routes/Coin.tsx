import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const Container = styled.article`
	width: 100%;
`;

interface RouteState {
	name: string;
}

function Coin() {
	const { coinId } = useParams<Params>();
	const [loading, setLoading] = useState(false);
	const { state } = useLocation<RouteState>();
	// 이미 API를 가지고 있으니까 따로 API를 호출할 이유가 없음
	// useEffect(() => {}, []);

	return (
		<>
			{loading ? (
				<Loading>
					<span>Loading..</span>
				</Loading>
			) : (
				<div className='wrapper'>
					<CoinHeader>
						<Inner>
							<Link to='/'>&larr;</Link>
							<h2 className='title'>{state?.name || 'Loading..'}</h2>
						</Inner>
					</CoinHeader>
					<Inner>
						<Container>{coinId}</Container>
					</Inner>
				</div>
			)}
		</>
	);
}

export default Coin;
