import axios from "axios";
import styled from "styled-components";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link, useParams, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import {addItem} from "../../app/Item/actions";
import withReactContent from "sweetalert2-react-content";

import Error from "./Error";

function AddItem({className}) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [image, setImage] = useState("");
	const [status, setStatus] = useState("");
	const [rating, setRating] = useState("");
	const [cate, setCate] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	const [type, setType] = useState([]);

	useEffect(() => {
		const getType = async () => {
			try {
				const nameType = await axios.get(`/admin/showCategory`);
				setType(nameType.data.categories);
			} catch (error) {
				console.log(error.response);
			}
		};
		getType();
	}, []);

	async function onSubmit(event) {
		event.preventDefault();
		const data = {
			name: name,
			description: description,
			price: price,
			quantity: quantity,
			image: image,
			category_id: cate,
			status: status,
			rating: rating,
		};
		try {
			const items = await axios.post(`/admin/addItem/`, data);
			console.log(items);
			dispatch(addItem(items.data));
			alertSubmit(image);
			history.push("/admin/item");
		} catch (error) {
			const warn = error.response.data;
			const textError = warn.map((error) => {
				return error.message;
			});
			alertError(textError);
		}
	}

	function alertError(textError) {
		const err = new Array(...textError);
		const swal = withReactContent(Swal);
		swal.fire({
			icon: "warning",
			title: "ERROR INPUT",
			width: 800,
			html: <Error err={err}></Error>,
			confirmButtonColor: "#005488",
		});
	}
	return (
		<div className={className}>
			<h1 className="top"> เพิ่มสินค้า </h1>
			<form className="add">
				<div className="row">
					<div className="col-10">
						<label> ชื่อสินค้า: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกชื่อสินค้า"
							className="medium"
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> คำอธิบาย: </label>
					</div>
					<div className="col-90">
						<textarea
							type="text"
							placeholder="กรุณากรอกคำอธิบาย. . . . . . . . . ."
							className="long"
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> ประเภท: </label>
					</div>
					<div className="col-90">
						<select onChange={(event) => setCate(event.target.value)}>
							<option value="DEFAULT" hidden>
								กรุณาเลือกประเภทสินค้า
							</option>
							{type ? (
								type.map((data) => {
									return (
										<option key={data.id} value={data.id}>
											{data.name}
										</option>
									);
								})
							) : (
								<div>Loading category....</div>
							)}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> ราคา: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกราคา"
							className="short"
							onChange={(event) => setPrice(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> จำนวน: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกจำนวนสินค้า"
							className="short"
							onChange={(event) => setQuantity(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> ลิงค์รูปภาพ: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกลิงค์รูปภาพ"
							className="medium"
							onChange={(event) => setImage(event.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> สถานะ: </label>
					</div>
					<div className="col-90">
						<select onChange={(event) => setStatus(event.target.value)}>
							<option value="DEFAULT" hidden>
								กรุณาเลือกสถานะสินค้า
							</option>
							<option> ปกติ </option> <option> มาใหม่ </option>
							<option> ยอดนิยม </option>
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> คะแนน: </label>
					</div>
					<div className="col-90">
						<select onChange={(event) => setRating(event.target.value)}>
							<option value="DEFAULT" hidden>
								กรุณาเลือกคะแนนความนิยมของสินค้า
							</option>
							<option> 0 </option> <option> 0.5 </option>
							<option> 1 </option> <option> 1.5 </option>
							<option> 2 </option> <option> 2.5 </option>
							<option> 3 </option> <option> 3.5 </option>
							<option> 4 </option> <option> 4.5 </option>
							<option> 5 </option>
						</select>
					</div>
				</div>
				<div className="butt">
					<button type="submit" className="submit" onClick={onSubmit}>
						ยืนยัน
					</button>
					<Link to="/admin/item">
						<button type="cancel" className="cancel">
							ยกเลิก
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
AddItem.propTypes = {
	className: PropTypes.string.isRequired,
};

function alertSubmit(imageUrl) {
	Swal.fire({
		title: "เพิ่มสินค้าสำเร็จ",
		text: "เพิ่มสินค้าในคลังเรียบร้อยแล้ว",
		confirmButtonColor: "#005488",
		imageUrl: imageUrl,
		imageHeight: 200,
		imageAlt: "Custom image",
	});
}

export default styled(AddItem)`
	font-family: "IBM Plex Sans Thai", sans-serif;
	h1.top {
		font-family: "IBM Plex Sans Thai", sans-serif;
		font-size: 26px;
		font-weight: bold;
		text-align: center;
		margin-top: 0;
		padding-top: 45px;
		margin-bottom: 2rem;
	}
	form.add {
		border: 1px solid #ccc;
		width: 80%;
		border-radius: 5px;
		padding: 1rem;
		margin-left: 8rem;
		margin-bottom: 4rem;
	}
	div.row {
		padding: 15px 10px 15px 10px;
		.col-10 {
			float: left;
			width: 15%;
			margin-top: 16px;
		}
		.col-90 {
			float: left;
			width: 85%;
			margin-top: 16px;
		}
		label {
			font-size: 20px;
			font-weight: bold;
			vertical-align: top;
			display: inline-block;
		}
		input,
		textarea {
			font-family: "IBM Plex Sans Thai", sans-serif;
			border-radius: 5px;
			padding: 8px;
			font-size: 16px;
			border: 1px solid #ccc;
		}
		input.short {
			width: 25%;
		}
		input.medium {
			width: 55%;
		}
		textarea.long {
			width: 65%;
			padding-bottom: 8rem;
		}
		select {
			font-family: "IBM Plex Sans Thai", sans-serif;
			width: 28%;
			border-radius: 5px;
			padding: 8px;
			font-size: 16px;
			border: 1px solid #ccc;
		}
	}
	div.butt {
		text-align: center;
	}
	div.butt button {
		margin-top: 3rem;
		text-align: center;
		font-family: "IBM Plex Sans Thai", sans-serif;
		font-size: 18px;
		padding: 5px;
		width: 8%;
		border-radius: 10px;
		margin-bottom: 1rem;
	}
	button.cancel {
		border: 1px solid #3c3d3e;
		background-color: white;
		margin-left: 3rem;
		color: gray;
	}
	button.submit {
		background-color: #3366dd;
		border: 1px solid #3366dd;
		margin-left: 3rem;
		margin-right: 3rem;
		color: white;
	}
	button.submit:hover {
		border: 1px solid #3366dd;
		background-color: white;
		transition: all 0.3s;
		color: black;
	}
	button.cancel:hover {
		background-color: #3c3d3e;
		border: 1px solid #3c3d3e;
		transition: all 0.3s;
		color: white;
	}
`;
