import React from "react";
import {Switch, Route} from "react-router-dom";

import List from "./showBook/List";
// import Container from "./Component/Container";

export default function User() {
	return (
		<Switch>
			<Route path="/">
				<List />
			</Route>
		</Switch>
	);
}
