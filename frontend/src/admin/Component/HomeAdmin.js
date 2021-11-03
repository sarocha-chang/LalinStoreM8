import PropTypes from "prop-types";
import styled from "styled-components";
import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import Swal from "sweetalert2";

import LineChart from "./LineChart";
import {getCustomer} from "../../app/Customer/actions";
import {fetchItem} from "../../app/Item/actions";
import {fetchCategory} from "../../app/Category/actions";

function Homes({className}) {
	const [user] = useState(JSON.parse(localStorage.getItem("token")));
	const customer = useSelector((state) => state.customers);
	const items = useSelector((state) => state.items);
	const category = useSelector((state) => state.category);

	const dispatch = useDispatch();
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
		async function get() {
			await axios.get("/all/show").then((res) => {
				dispatch(fetchItem(res.data.item));
			});
		}
		get();
	}, [dispatch]);

	useEffect(() => {
		async function get() {
			let cate = await axios.get("/admin/showCategory");
			cate = cate.data.categories;
			dispatch(fetchCategory(cate));
		}
		get();
	}, [dispatch]);

	if (!user) {
		Swal.fire({
			icon: "error",
			title: "กรุณาล็อคอิน",
		});
		return <Redirect to="/login" />;
	}

	return (
		<div className={className}>
			<div className="container">
				<div className="chart">
					<LineChart />
				</div>
				<div className="box">
					<div className="cus">
						<h3>สมาชิก</h3>
						<h2>{customer.length}</h2>
					</div>
					<div className="cate">
						<h3>หมวดหมู่สินค้า</h3>
						<h2>{category.length}</h2>
					</div>
					<div className="items">
						<h3>สินค้า</h3>
						<h2>{items.length}</h2>
					</div>
					<div className="sum">
						<h3>ยอดขายเฉลี่ย</h3>
						<h2>66</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

Homes.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(Homes)`
	.container {
		display: flex;
		flex-direction: row;
	}
	.chart {
		width: 95%;
	}
	.box {
		width: 15%;
		float: right;
		margin-right: 4rem;
		margin-top: 13rem;
		.cus,
		.cate,
		.items,
		.sum {
			width: 180px;
			padding: 5px;
			text-align: center;
			border-radius: 5px;
			margin-bottom: 1rem;
			background-color: #f5ece5;
			border: 2px solid #f5ece5;
			:hover {
				background-color: white;
				border: 2px solid #f5ece5;
				color: #e47d29;
				transition: 0.75s;
				box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
			}
		}
	}
`;
