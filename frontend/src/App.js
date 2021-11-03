import {Switch, Route} from "react-router-dom";
import "boxicons";
import GlobalStyle from "./GlobalStyle";
import Admin from "./admin/Admin";
import Registration from "./registration/Registration";

function App() {
	return (
		<>
			<GlobalStyle />
			<Switch>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/" exact>
					<Registration />
				</Route>
			</Switch>
		</>
	);
}

export default App;
