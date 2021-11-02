import {Switch, Route} from "react-router-dom";
import "boxicons";
import GlobalStyle from "./GlobalStyle";
import Admin from "./admin/Admin";
import Registration from "./registration/Registration";
import User from "./user/User";

function App() {
	return (
		<>
			<GlobalStyle />
			<Switch>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/" exact>
					<User />
				</Route>

				<Route path="">
					<Registration />
				</Route>
			</Switch>
		</>
	);
}

export default App;
