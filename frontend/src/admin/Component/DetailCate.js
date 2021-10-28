import PropTypes, {func} from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import React, {useState} from "react";
import "boxicons";

import {deleteCategory} from "../../app/Category/actions";

function DetailCate({className, data}) {
	const [id] = React.useState(data.id);
	const [name, setName] = React.useState(checkCategory(data.category_id));
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	function delete_category() {
		return Swal.fire({
			title: "โปรดยืนยัน",
			text: "ต้องการลบประเภทสินค้านี้ออกจากคลังหรือไม่",
			icon: "warning",
			showCancelButton: true,
			cancelButtonText: "ไม่",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "ใช่",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("ลบสำเร็จ", "ลบประเภทสินค้าในคลังเรียบร้อยแล้ว", "success");
				axios.delete(`/admin/deleteCategory/${id}`).then(() => {
					dispatch(deleteCategory({id: id}));
				});
			}
		});
	}

	function checkCategory(data) {
		axios.get(`/admin/searchCategory/${data}`).then((data) => {
			setName(data.data.cate);
		});
	}
	function Modal({className, setOpenModal}) {
		return (
			<div className={className}>
				<div className="modalBackground">
					<div className="modalContainer">
						<div className="titleCloseBtn">
							<button
								onClick={() => {
									setOpenModal(false);
								}}>
								X
							</button>
						</div>
						<div className="title">
							<h1>Are You Sure You Want to Continue?</h1>
						</div>
						<div className="body">
							<p>The next page looks amazing. Hope you want to go there!</p>
						</div>
						<div className="footer">
							<button
								onClick={() => {
									setOpenModal(false);
								}}
								id="cancelBtn">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<tr className={className}>
			<td>{data.id}</td>
			{modalOpen && <Modal setOpenModal={setModalOpen} />}

			<td
				onClick={() => {
					setModalOpen(true);
				}}>
				{data.name}
			</td>
			<td>
				<Link to={`/admin/edit-item/${data.id}`}>
					<box-icon name="edit" />
				</Link>
				<box-icon name="trash" type="solid" color="#f04e4e" onClick={delete_category} />
			</td>
		</tr>
	);
}

DetailCate.propTypes = {
	className: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default styled(DetailCate)`
	border-bottom: 1px solid #e0e0e0;
	td.des {
		width: 200px;
		span.text-overflow {
			display: block;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.imgItem {
		width: 100px;
	}

	box-icon {
		width: 50px;
	}
	.modalBackground {
		background-color: white;
		border: 1px solid black;
		border-radius: 10px;
	}
	.modalContainer {
		width: 600px;
		border-radius: 12px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		display: flex;
		flex-direction: column;
		padding: 25px;
	}

	.modalContainer .title {
		display: inline-block;
		text-align: center;
		font-size: 10px;
	}

	.titleCloseBtn {
		display: flex;
		justify-content: flex-end;
	}

	.titleCloseBtn button {
		background-color: transparent;
		border: none;
		font-size: 10px;
		cursor: pointer;
	}

	.modalContainer .body {
		font-size: 16px;
		text-align: center;
	}

	.modalContainer .footer button {
		width: 100px;
		height: 35px;
		border: none;
		background-color: cornflowerblue;
		color: white;
		border-radius: 8px;
		font-size: 16px;
		cursor: pointer;
	}

	#cancelBtn {
		background-color: crimson;
	}
`;
