import React from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";

function CategoriesAll({className, data}) {
	const [user] = React.useState(JSON.parse(localStorage.getItem("token")));
	const [quantity] = React.useState(1);

	async function onSubmit(e, data_detail) {
		e.preventDefault();
		if (user) {
			let data = {
				book_id: data_detail,
				quantity: quantity,
			};
			const config = {
				headers: {Authorization: `Bearer ${user}`},
			};
			try {
				await axios.post(`/customer/addCart`, data, config)
				await Swal.fire("เพิ่มสินค้าเสร็จสิ้น")
			} catch (error) {
				Swal.fire(error.response.data.message);
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "กรุณาล็อคอินก่อนทำรายการ",
			});
		}
	}

	return (
		<div className={className}>
			<div className="box">
				<img src={data.image} alt={data.name} className="imgBookk" />
				<Link to={`/book-detail/${data.id}`}>
					<h2>{data.name}</h2>{" "}
				</Link>
				<h3>{data.price} บาท </h3>
				<button onClick={(e) => onSubmit(e, data.id)}>เพิ่มไปยังตระกร้า</button>
			</div>
		</div>
	);
}

CategoriesAll.propTypes = {
	data: PropTypes.object.isRequired,
	className: PropTypes.string,
};

export default styled(CategoriesAll)`
	overflow: hidden;
	margin: 5px;
	border-bottom: 1px solid #ccc;
	div.box {
		padding: 20px;
		text-align: center;
		width: 24rem;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
		.imgBookk {
			padding: 5px;
			width: 150px;
			height: 220px;
			box-shadow: 0px 0px 4px black;
			transition: 0.5s;
		}
		.imgBookk:hover {
			padding: 5px;
			width: 210px;
			height: 290px;
			box-shadow: 0px 0px 6px black;
			transition: 0.7s;
		}
		h2 {
			padding-top: 15px;
			font-size: 16px;
			font-weight: bold;
		}
		a {
			color: black;
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
		h3 {
			font-size: 14px;
		}
		button {
			font-size: 14px;
			padding: 8px;
			border: 1px solid #005488;
			border-radius: 5px;
			background-color: white;
			bottom: 500px;
		}
		button:hover {
			border: 1px solid white;
			background-color: #005488;
			color: white;
			transition: 0.5s;
		}
	}
`;
