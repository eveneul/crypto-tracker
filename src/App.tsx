import Router from './Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
* {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
}

*,
:after,
:before {
  box-sizing: border-box;
  flex-shrink: 0;
}

:root {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  cursor: default;
  line-height: 1.5;
  overflow-wrap: break-word;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

button {
  background: none;
  border: 0;
  cursor: pointer;
}

a {
  text-decoration: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*
    @세팅구역
*/
body {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	font-family: 'Noto Sans KR', sans-serif;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
  
}

*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.hidden,
[hidden] {
  display: none !important;
}

a {
  display: block;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
a:hover, a:focus {
  text-decoration: none;
}

button {
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}

select,
input,
textarea,
button {
  font: inherit;
  -webkit-appearance: none;
}

input[type=number] {
  -moz-appearance: textfield;
}

input:disabled {
  background-color: rgba(255, 255, 255, 0);
  cursor: not-allowed;
}

select {
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}

input,
textarea {
  border: 0;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  /* Chrome, Safari, Firefox */
  color: #444;
  opacity: 1;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  /* Chrome, Safari, Firefox */
  color: #444;
  opacity: 1;
}
input::placeholder,
textarea::placeholder {
  /* Chrome, Safari, Firefox */
  color: #444;
  opacity: 1;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* IE, Edge */
  color: #444;
  opacity: 1;
}
input[readonly]::-moz-placeholder, input:disabled::-moz-placeholder, textarea[readonly]::-moz-placeholder, textarea:disabled::-moz-placeholder {
  /* Chrome, Safari, Firefox */
  color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}
input[readonly]:-ms-input-placeholder, input:disabled:-ms-input-placeholder, textarea[readonly]:-ms-input-placeholder, textarea:disabled:-ms-input-placeholder {
  /* Chrome, Safari, Firefox */
  color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}
input[readonly]::placeholder, input:disabled::placeholder,
textarea[readonly]::placeholder,
textarea:disabled::placeholder {
  /* Chrome, Safari, Firefox */
  color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}
input[readonly]:-ms-input-placeholder, input:disabled:-ms-input-placeholder,
textarea[readonly]:-ms-input-placeholder,
textarea:disabled:-ms-input-placeholder {
  /* IE, Edge */
  color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}
input::-ms-clear, input::-ms-reveal,
textarea::-ms-clear,
textarea::-ms-reveal {
  /* IE, Edge */
  display: none;
}
input::-webkit-inner-spin-button, input::-webkit-outer-spin-button,
textarea::-webkit-inner-spin-button,
textarea::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

ul,
ol {
  list-style: none;
}
`;

function App() {
	return (
		<>
			<GlobalStyle />
			<Router />
		</>
	);
}

export default App;
