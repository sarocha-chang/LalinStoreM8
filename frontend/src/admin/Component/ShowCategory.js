import PropTypes from "prop-types";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import {addCategory, fetchCategory} from "../../app/Category/actions";
import DetailCate from "./DetailCate";

function Category({className}) {
	const [user] = useState(JSON.parse(localStorage.getItem("token")));
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		async function get() {
			let cate = await axios.get("/admin/showCategory");
			cate = cate.data.categories;
			dispatch(fetchCategory(cate));
		}
		get();
	}, [dispatch]);

	useEffect(() => {
		async function search() {
			if (keyword.length > 0) {
				await axios
					.get(`/admin/searchCateName/${keyword}`)
					.then((res) => {
						let cate = res.data.cate;
						dispatch(fetchCategory(cate));
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				async function get() {
					let cate = await axios.get("/admin/showCategory");
					cate = cate.data.categories;
					dispatch(fetchCategory(cate));
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

	function onClick() {
		addCate();
	}

	function addCate() {
		Swal.fire({
			title: "เพิ่มประเภทสินค้า",
			text: "กรุณากรอกประเภทสินค้า",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "ยืนยัน",
			cancelButtonText: "ยกเลิก",
			showLoaderOnConfirm: true,
			preConfirm: async function (input) {
				return new Promise(function (resolve, reject) {
					setTimeout(async function () {
						if (input) {
							resolve();
							let name = input;
							const data = {
								name: name,
							};
							const category = await axios.post(`/admin/addCategory/`, data);
							dispatch(addCategory(category));
						} else {
							reject();
						}
					}, 1000);
				});
			},
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "เพิ่มประเภทสินค้าสำเร็จ",
				});
				window.location.reload();
			}
		});
	}

	return (
		<div className={className}>
			<h1 className="top">ข้อมูลประเภทสินค้า</h1>
			<form className="form-inline">
				<input
					type="text"
					className="search"
					id="input"
					placeholder="Search by category's name"
					onChange={(key) => {
						setKeyword(key.target.value);
					}}
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
							<th>สินค้าในประเภท</th>
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
		cursor: pointer;
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
