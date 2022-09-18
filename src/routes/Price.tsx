import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinTickers } from '../api';

const InnerTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	span {
		text-transform: uppercase;
		color: ${(props) => props.theme.textColor};
	}
`;

const InnerBottom = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30px 0;

	span {
		font-size: 26px;
		color: ${(props) => props.theme.textColor};
		font-weight: bold;
	}
`;

interface IChartProps {
	coinId: string;
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

function Price({ coinId }: IChartProps) {
	const { isLoading, data } = useQuery<IPriceData>(['price', coinId], () =>
		fetchCoinTickers(coinId)
	);
	return (
		<>
			<InnerTop>
				<span>{coinId}</span>
				<span>{data?.last_updated}</span>
			</InnerTop>
			<InnerBottom>
				<span className='price'>${data?.quotes.USD.price.toFixed(3)}</span>
			</InnerBottom>
		</>
	);
}

export default Price;
