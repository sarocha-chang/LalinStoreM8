import React from "react";
import {Switch, Route} from "react-router-dom";

import ShowItem from "./Component/ShowItem";

export default function Admin() {
	return (
		<Switch>
			<Route path="/admin">
					<ShowItem />
			</Route>
		</Switch>
	);
}
