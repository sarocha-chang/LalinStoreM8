import React from "react";
import {Switch, Route} from "react-router-dom";

import ShowItem from "./Component/ShowItem";
import Sidebar from "./Component/Sidebar";
import Container from "./Component/Container";
import EditItem from "./Component/EditItem";
import AddItem from "./Component/AddItem";
import ShowCategory from "./Component/ShowCategory";
import ShowCustomer from "./Component/ShowCustomer";
import EditCustomer from "./Component/EditCustomer";
import ShowItemInCate from "./Component/ShowItemInCate";
import HomeAdmin from "./Component/HomeAdmin";
export default function Admin() {
	return (
		<Switch>
			<Route path="/admin/edit-customer/:id">
				<Sidebar />
				<Container>
					<EditCustomer />
				</Container>
			</Route>
			<Route path="/admin/customers">
				<Sidebar />
				<Container>
					<ShowCustomer />
				</Container>
			</Route>
			<Route path="/admin/category/show/:id">
				<Sidebar />
				<Container>
					<ShowItemInCate />
				</Container>
			</Route>
			<Route path="/admin/category">
				<Sidebar />
				<Container>
					<ShowCategory />
				</Container>
			</Route>
			<Route path="/admin/add-item">
				<Sidebar />
				<Container>
					<AddItem />
				</Container>
			</Route>
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
					<HomeAdmin />
				</Container>
			</Route>
		</Switch>
	);
}
