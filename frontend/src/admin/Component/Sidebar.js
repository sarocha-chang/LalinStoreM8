import styled from "styled-components";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {removeCustomer} from "../../app/Customer/actions";
function Sidebar({className}) {
	const dispatch = useDispatch();

	function logOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		dispatch(removeCustomer());
	}

	return (
		<>
			<nav className={className}>
				<Link to="/admin" className="brand">
					Lalin
				</Link>
				<Link to="/admin" className="menu">
					Home
				</Link>
				<Link to="/admin/item" className="menu">
					Items
				</Link>
				<Link to="/admin/category" className="menu">
					Category
				</Link>
				<Link to="/admin/customers" className="menu">
					Customers
				</Link>
			</nav>
		</>
	);
}
Sidebar.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(Sidebar)`
	margin: 0;
	background-color: #f5ece5;
	width: 225px;
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	font-family: "IBM Plex Sans Thai", sans-serif;
	border-radius: 2px;
	.brand {
		display: block;
		font-size: 30px;
		text-align: center;
		text-decoration: none;
		color: #544e3d;
		padding: 20px;
		border-bottom: 2px solid #ffffff;
	}
	.menu {
		margin-top: 1rem;
		display: block;
		font-size: 20px;
		color: #544e3d;
		padding: 20px;
		text-decoration: none;
		text-align: center;
		border-radius: 10px;
		transition: 0.5s;
	}
	.menu:hover,
	.menu:focus {
		font-weight: bold;
		background-color: white;
		color: #e47d29;
		text-decoration: underline;
		transition: 0.5s;
		border-radius: 10px;
	}
`;
