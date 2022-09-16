import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface chartProps {
	coinId: string;
}

function Chart({ coinId }: chartProps) {
	const { isLoading, data } = useQuery(['ohlcv', coinId], () =>
		fetchCoinHistory(coinId)
	);
	return <div>랄랄라라라랄 얼울ㅇ냘얀렁ㄴㄹ</div>;
}

export default Chart;
