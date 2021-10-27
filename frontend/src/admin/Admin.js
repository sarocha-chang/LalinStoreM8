import React from "react";
import {Switch, Route} from "react-router-dom";

import ShowItem from "./Component/ShowItem";
import Sidebar from "./Component/Sidebar";
import Container from "./Component/Container";
import EditItem from "./Component/EditItem";

export default function Admin() {
	return (
		<Switch>
			<Route path="/admin/edit-item/:id">
				<Sidebar />
				<Container>
					<EditItem />
				</Container>
			</Route>
			<Route path="/admin/item">
				<Sidebar />
				<Container>
					<ShowItem />
				</Container>
			</Route>
			<Route path="/admin">
				<Sidebar />
				<Container>
					<ShowItem />
				</Container>
			</Route>
		</Switch>
	);
}
