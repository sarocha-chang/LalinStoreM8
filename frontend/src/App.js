import {Switch, Route} from "react-router-dom";
import "boxicons";
import GlobalStyle from "./GlobalStyle";
import Admin from "./admin/Admin";

function App() {
	return (
		<>
			<GlobalStyle />
			<Switch>
				<Route path="/admin">
					<Admin />
				</Route>
			</Switch>
		</>
	);
}

export default App;
