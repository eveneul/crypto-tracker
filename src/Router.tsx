import React from 'react';
import {
	BrowserRouter as Switch,
	Route,
	Link,
	BrowserRouter,
} from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

function Router() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path={`${process.env.PUBLIC_URL}/:coinId`}>
					<Coin />
				</Route>
				<Route exact path={`${process.env.PUBLIC_URL}/`}>
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
