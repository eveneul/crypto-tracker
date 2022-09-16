import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';

interface IchartProps {
	coinId: string;
}

interface IHistorical {
	time_open: string;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

const LoadingWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingMsg = styled.span`
	font-size: 18px;
	color: ${(props) => props.theme.textColor};
`;

function Chart({ coinId }: IchartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId)
	);
	return (
		<div>
			{isLoading ? (
				<>
					<LoadingWrap>
						<LoadingMsg>Loading..</LoadingMsg>
					</LoadingWrap>
				</>
			) : (
				<ApexChart
					type='line'
					series={[
						{
							name: 'sales',
							data: data?.map((price) => price.close) as number[],
						}, // 데이터가 없으면 숫자를 받아와야 하는데 undefinded가 나와서 as number[]로 처리
					]}
					options={{
						chart: {
							height: 500,
							width: 500,
							toolbar: { show: false },
							background: 'transparent',
						},
						theme: { mode: 'dark' },
						grid: { show: false },
						yaxis: { show: false },
						xaxis: {
							labels: { show: false },
							axisTicks: { show: false },
							axisBorder: { show: false },
							type: 'datetime',
							categories: data?.map((price) => price.time_close * 1000),
						},
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
						},
						colors: ['#0fbcf9'],
						tooltip: {
							y: { formatter: (value) => `$${value.toFixed(3)}` },
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
