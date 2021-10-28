import PropTypes from "prop-types";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import {fetchCategory} from "../../app/Category/actions";
import DetailCate from "./DetailCate";

function Category({className}) {
	const [user] = useState(JSON.parse(localStorage.getItem("token")));
	const history = useHistory();
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		async function get() {
			await axios.get("/admin/showCategory").then((res) => {
				let cate = res.data.categories;
				dispatch(fetchCategory(cate));
			});
		}
		get();
	}, [dispatch]);

	// if (!user) {
	// 	Swal.fire({
	// 		icon: "error",
	// 		title: "กรุณาล็อคอิน",
	// 	});
	// 	return <Redirect to="/home" />;
	// }

	// function useSearch(event) {
	// 	setKeyword(event.target.value);
	// 	axios
	// 		.get(`/all/search/${keyword}`)
	// 		.then((res) => {
	// 			dispatch(fetchCategory(res.data.item));
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	function onClick() {
		// history.push("/admin/add-item");
	}

	return (
		<div className={className}>
			<h1 className="top">ข้อมูลประเภทสินค้า</h1>
			<form className="form-inline">
				<input
					type="text"
					className="search"
					placeholder="Search by category's name"
					// onChange={useSearch}
					value={keyword}
				/>
			</form>
			<div className="table">
				<button className="add" onClick={onClick}>
					เพิ่มประเภทสินค้า +
				</button>
				<table className="ShowItem">
					<thead>
						<tr>
							<th>id</th>
							<th>ชื่อประเภทสินค้า</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{category ? (
							category.map((data) => {
								return <DetailCate data={data} key={data.id} />;
							})
						) : (
							<div>Loading products....</div>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

Category.propTypes = {
	className: PropTypes.string.isRequired,
	category: PropTypes.node,
};

export default styled(Category)`
	margin-bottom: 50px;
	width: 98%;
	h1.top {
		font-family: "IBM Plex Sans Thai", sans-serif;
		padding-top: 40px;
		margin-top: 0px;
		font-weight: bold;
		font-size: 26px;
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.add {
		margin-left: 83%;
		margin-bottom: 1rem;
		padding: 7px;
		border-radius: 5px;
		background-color: #81bc9f;
		color: white;
		border: 1px solid #81bc9f;
		transition: 0.5s;
		position: relative;
		box-shadow: 2px 2px #888888;
	}
	.add:hover {
		border: 1px solid black;
		transition: 0.5s;
		background-color: #6aaa8b;
		color: white;
	}
	.ShowItem {
		border-collapse: collapse;
		border-radius: 15px;
		width: 85%;
		table-layout: fixed;
		border: 1px solid #e5e5e5;
		margin-left: 8rem;
		color: #544e3d;
		thead tr th {
			padding: 10px;
			text-align: center;
			font-size: 20px;
			font-weight: bold;
			padding-top: 20px;
			padding-bottom: 30px;
			border-bottom: 1px solid #e5e5e5;
		}

		td {
			color: black;
			font-size: 18px;
			text-align: center;
			padding: 25px 10px 10px 10px;
		}
	}
	form.form-inline {
		text-align: center;
		margin-bottom: 2rem;
	}
	input.search {
		font-family: "IBM Plex Sans Thai", sans-serif;
		padding: 5px;
		border-radius: 12px;
		font-size: 16px;
		width: 40%;
		justify-content: center;
		transition: border 0.3s;
	}
	input.search:focus {
		outline: none;
		border-radius: 12px;
		border: 2px solid #e47d29;
		transition: border 0.3s;
		font-family: "IBM Plex Sans Thai", sans-serif;
		padding: 5px;
		font-size: 16px;
		width: 40%;
		justify-content: center;
	}
`;
