import styled from 'styled-components';

const Title = styled.h1`
	font-size: 22px;
	font-weight: bold;
	color: ${(props) => props.theme.accentColor};
`;

function Coins() {
	return (
		<>
			<Title>타이틀</Title>
		</>
	);
}

export default Coins;
