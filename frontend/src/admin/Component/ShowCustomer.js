import PropTypes from "prop-types";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import {getCustomer} from "../../app/Customer/actions";
import DetailCustomer from "./DetailCustomer";

function Customers({className}) {
	const [user] = useState(JSON.parse(localStorage.getItem("token")));
	const customer = useSelector((state) => state.customers);
	const dispatch = useDispatch();
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		async function get() {
			await axios.get("/admin/showCustomer").then((res) => {
				let cus = res.data.customer;
				dispatch(getCustomer(cus));
			});
		}
		get();
	}, [dispatch]);

	useEffect(() => {
		async function search() {
			if (keyword.length > 0) {
				await axios
					.get(`/admin/searchCustomer/${keyword}`)
					.then((res) => {
						let cus = res.data.customer;
						dispatch(getCustomer(cus));
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				async function get() {
					await axios.get("/admin/showCustomer").then((res) => {
						let cus = res.data.customer;
						dispatch(getCustomer(cus));
					});
				}
				get();
			}
		}
		search();
	}, [dispatch, keyword]);

	if (!user) {
		Swal.fire({
			icon: "error",
			title: "กรุณาล็อคอิน",
		});
		return <Redirect to="/login" />;
	}

	return (
		<div className={className}>
			<h1 className="top">ข้อมูลสมาชิก</h1>
			<form className="form-inline">
				<input
					type="text"
					className="search"
					placeholder="Search by customer's name"
					onChange={(key) => {
						setKeyword(key.target.value);
					}}
					value={keyword}
				/>
			</form>
			<div className="table">
				<table className="ShowItem">
					<thead>
						<tr>
							<th>id</th>
							<th>ชื่อ</th>
							<th>นามสกุล</th>
							<th>ชื่อผู้ใช้</th>
							<th>เบอร์โทรศัพท์</th>
							<th>อีเมลล์</th>
							<th></th>
							<th>ประเภท</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{customer ? (
							customer.map((data) => {
								return <DetailCustomer data={data} key={data.id} />;
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

Customers.propTypes = {
	className: PropTypes.string.isRequired,
	customers: PropTypes.node,
};

export default styled(Customers)`
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
		margin-left: 86%;
		margin-bottom: 1rem;
		padding: 7px;
		border-radius: 5px;
		background-color: #81bc9f;
		color: white;
		border: 1px solid #81bc9f;
		transition: 1s;
		position: relative;
		box-shadow: 2px 2px #888888;
	}
	.add:hover {
		border: 1px solid black;
		transition: 1s;
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
