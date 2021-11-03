import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";

function Login({className}) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();

	async function onSubmit(event) {
		event.preventDefault();
		const data = {
			username: username,
			password: password,
		};
		try {
			const response = await axios.post("/auth/login", data);
			localStorage.setItem(`username`, jwt.decode(response.data.token).username);
			if (response.data.type_id === 1) {
				localStorage.setItem(`token`, JSON.stringify(response.data.token));
				history.push("/admin");
			} else {
				localStorage.setItem(`token`, JSON.stringify(response.data.token));
				history.push("/home");
			}
		} catch (error) {
			alertError(error);
		}
	}

	function alertError(error) {
		Swal.fire({
			icon: "error",
			text: "อีเมลล์ หรือ รหัสผ่านของท่าน ไม่ถูกต้อง",
			confirmButtonColor: "#005488",
		});
	}

	return (
		<div className={className}>
			<div className="parent">
				<div className="box">
					<div className="all">
						<h1>เข้าสู่ระบบ</h1>
						<form id="create-form" className="form">
							<div className="input-group">
								<input
									name="name"
									type="text"
									id="name"
									placeholder="ชื่อผู้ใช้"
									onChange={(event) => setUsername(event.target.value)}
								/>
							</div>
							<div className="input-group">
								<input
									name="password"
									type="password"
									id="password"
									placeholder="รหัสผ่าน"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</div>
							<div className="link">
								<Link to="" className="regis">
									ยังไม่มีบัญชีผู้ใช้ ?
								</Link>
								<Link to="" className="forget">
									ลืมรหัสผ่าน ?
								</Link>
							</div>
							<div className="buttonall">
								<button type="submit" className="Login" onClick={onSubmit}>
									เข้าสู่ระบบ
								</button>

								<Link to="">
									<button type="submit" className="Back">
										กลับหน้าหลัก
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

Login.propTypes = {
	className: PropTypes.string,
	username: PropTypes.string,
	password: PropTypes.string,
};

export default styled(Login)`
	height: 100vh;
	font-family: "IBM Plex Sans Thai", sans-serif;
	padding: 0;
	background-image: url("https://i.pinimg.com/originals/ec/a2/cd/eca2cd7f9b09a0b192149c755f6a1590.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	.parent {
		padding-left: 33.5rem;
		padding-top: 11rem;
	}
	.box {
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.85);
		width: 800px;
		height: 500px;
		background-color: rgba(255, 255, 255, 0.85);
		border-radius: 10px;
	}
	.all {
		margin-top: 4rem;
	}
	form input {
		padding: 15px;
		font-size: 1rem;
		line-height: 1.5;
		outline: none;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		width: 70%;
		font-family: "IBM Plex Sans Thai", sans-serif;
	}
	form input:focus {
		border: 1px solid #e47d29;
		transition: 0.5s;
	}
	form .input-group {
		margin-bottom: 1.5rem;
		justify-content: center;
	}
	.link {
		margin: 1rem 4rem 1rem 4rem;
		display: flex;
		justify-content: space-between;
	}
	a {
		color: #544e3d;
	}
	.buttonall {
		margin-top: 2.5rem;
	}
	.Back {
		font-size: 1rem;
		line-height: 1.5;
		margin-right: 1.5rem;
		padding: 0.5rem 1.7rem;
		cursor: pointer;
		color: #ffffff;
		background-color: #f8414c;
		border-radius: 0.25rem;
		border: none;
		font-family: "IBM Plex Sans Thai", sans-serif;
	}
	.Login {
		font-size: 1rem;
		line-height: 1.5;
		margin-right: 1.5rem;
		padding: 0.5rem 1.7rem;
		cursor: pointer;
		color: #ffffff;
		background-color: #5e5e5e;
		border-radius: 0.25rem;
		border: none;
		font-family: "IBM Plex Sans Thai", sans-serif;
	}
`;
