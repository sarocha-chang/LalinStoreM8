import PropTypes, {func} from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import "boxicons";

import {deleteCategory, editCategory} from "../../app/Category/actions";

function DetailCate({className, data}) {
	const [id] = React.useState(data.id);
	const [name, setName] = React.useState(checkCategory(data.category_id));
	const dispatch = useDispatch();

	function delete_category() {
		return Swal.fire({
			title: "โปรดยืนยัน",
			text: "ต้องการลบประเภทสินค้านี้ออกจากคลังหรือไม่",
			icon: "warning",
			showCancelButton: true,
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "ยืนยัน",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("ลบสำเร็จ", "ลบประเภทสินค้าในคลังเรียบร้อยแล้ว", "success");
				axios.delete(`/admin/deleteCategory/${id}`).then(() => {
					dispatch(deleteCategory({id: id}));
				});
			}
		});
	}
	function editCategory() {
		Swal.fire({
			title: "แก้ไขประเภทสินค้า",
			text: "กรุณากรอกชื่อประเภทสินค้า",
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
							const cate = await axios.put(`/admin/updateCategory/${id}`, data);
							console.log(data);
							dispatch(editCategory(cate));
						} else reject();
					}, 1000);
				});
			},
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "แก้ไขประเภทสินค้าสำเร็จ",
				});
				window.location.reload();
			}
		});
	}
	function checkCategory(data) {
		axios.get(`/admin/searchCategory/${data}`).then((data) => {
			setName(data.data.cate);
		});
	}
	return (
		<tr className={className}>
			<td>{data.id}</td>
			<td>{data.name}</td>
			<td>
				<Link to={`/admin/category/show/${data.id}`} className="link">
					กดเพื่อดูรายละเอียด
				</Link>
			</td>
			<td>
				<box-icon name="edit" onClick={editCategory} />
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
	.link {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	.link:hover {
		text-decoration: underline;
	}
`;
