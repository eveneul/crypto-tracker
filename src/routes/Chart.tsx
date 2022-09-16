import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IchartProps {
	coinId: string;
}

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart({ coinId }: IchartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId)
	);
	return (
		<div>
			{isLoading ? (
				<>
					<span>Loading..</span>
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
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
