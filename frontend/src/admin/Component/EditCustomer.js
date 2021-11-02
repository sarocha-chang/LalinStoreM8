import axios from "axios";
import styled from "styled-components";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link, useParams, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import {editCustomer} from "../../app/Customer/actions";
import withReactContent from "sweetalert2-react-content";

import Error from "./Error";

function EditCustomer({className}) {
	const {id} = useParams();
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [type, setType] = useState("");

	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		axios.get(`/admin/showCustomerDetail/${id}`).then((res) => {
			console.log(res.data);
			let {firstname, lastname, username, email, phone, type_id} = res.data.customer;
			setFirstName(firstname);
			setLastName(lastname);
			setUsername(username);
			setEmail(email);
			setPhone(phone);
			setType(type_id);
		});
	}, [id]);

	async function onSubmit(event) {
		event.preventDefault();
		const data = {
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			phone: phone,
			type_id: type,
		};
		try {
			const item = await axios.put(`/admin/updateCustomer/${id}`, data);
			dispatch(editCustomer(item.data));
			alertSubmit();
			history.push("/admin/customers");
		} catch (error) {
			if (error.response.data) {
				const warn = error.response.data;
				const textError = warn.map((error) => {
					return error.message;
				});
				alertError(textError);
			} else console.log(error);
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
			<h1 className="top"> แก้ไขข้อมูลสมาชิก </h1>
			<form className="add">
				<div className="row">
					<div className="col-10">
						<label> ชื่อ: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกชื่อ"
							className="medium"
							onChange={(event) => setFirstName(event.target.value)}
							value={firstname}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> นามสกุล: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกนามสกุล"
							className="medium"
							onChange={(event) => setLastName(event.target.value)}
							value={lastname}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> ชื่อผู้ใช้: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกชื่อผู้ใช้"
							className="short"
							onChange={(event) => setUsername(event.target.value)}
							value={username}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> อีเมลล์: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกอีเมลล์"
							className="medium"
							onChange={(event) => setEmail(event.target.value)}
							value={email}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> เบอร์โทรศัพท์: </label>
					</div>
					<div className="col-90">
						<input
							type="text"
							placeholder="กรุณากรอกเบอร์โทรศัพท์"
							className="short"
							onChange={(event) => setPhone(event.target.value)}
							value={phone}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-10">
						<label> ประเภท: </label>
					</div>
					<div className="col-90">
						<select onChange={(event) => setType(event.target.value)} value={type}>
							<option value="1"> admin </option> <option value="2"> customer </option>
						</select>
					</div>
				</div>
				<div className="butt">
					<button type="submit" className="submit" onClick={onSubmit}>
						ยืนยัน
					</button>
					<Link to="/admin/customers">
						<button type="cancel" className="cancel">
							ยกเลิก
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
EditCustomer.propTypes = {
	className: PropTypes.string.isRequired,
	customers: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

function alertSubmit() {
	Swal.fire({
		title: "แก้ไขข้อมูลสำเร็จ",
		text: "แก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว",
		confirmButtonColor: "#005488",
	});
}

export default styled(EditCustomer)`
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
			width: 12%;
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
