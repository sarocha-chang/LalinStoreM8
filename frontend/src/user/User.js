import React from "react";
import {Switch, Route} from "react-router-dom";

import List from "./showBook/List";
import NavBar from "./Component/Navbar";
import Container from "./Component/Container";

export default function User() {
	return (
		<Switch>
			<Route path="/book-detail/:id">
				<NavBar />
				<Container>
					<BookDetail />
				</Container>
				<Footer />
			</Route>

			<Route path="/cart">
				<NavBar />
				<Container>
					<Cart />
				</Container>
			</Route>

			<Route path="/payment">
				<NavBar />
				<Container>
					<Payment />
				</Container>
				<Footer />
			</Route>

			<Route path="/home">
				<NavBar />
				<Container>
					<List />
				</Container>
				<Footer />
			</Route>
		</Switch>
	);
}
