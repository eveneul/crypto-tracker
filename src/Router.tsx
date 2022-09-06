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
		<BrowserRouter>
			<Switch>
				<Route path='/:coinId'>
					<Coin />
				</Route>
				<Route exact path='/'>
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
