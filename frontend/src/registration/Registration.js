import React from "react";
import {Switch, Route} from "react-router-dom";
import Container from "./components/ContainerForLogin";
import Login from "./components/Login";
import Register from "./components/Register";

export default function Registration() {
	return (
		<Switch>
			<Route path="/register">
				<Container>
					<Register />
				</Container>
			</Route>

			<Route path="/login">
				<Login />
			</Route>
		</Switch>
	);
}
