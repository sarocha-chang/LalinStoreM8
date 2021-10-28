import PropTypes, {func} from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import "boxicons";

import {deleteCustomer} from "../../app/Customer/actions";

function DetailCustomer({className, data}) {
	const [id] = React.useState(data.id);
	const dispatch = useDispatch();

	function delete_customer() {
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
				axios.delete(`/admin/deleteCustomer/${id}`).then(() => {
					dispatch(deleteCustomer({id: id}));
				});
			}
		});
	}

	return (
		<tr className={className}>
			<td>{data.id}</td>
			<td>{data.firstname}</td>
			<td>{data.lastname}</td>
			<td>{data.username}</td>
			<td>{data.phone}</td>
			<td>{data.email}</td>
			<td></td>
			<td>{data.type_id}</td>
			<td>
				<Link to={`/admin/edit-customer/${data.id}`}>
					<box-icon name="edit" />
				</Link>
				<box-icon name="trash" type="solid" color="#f04e4e" onClick={delete_customer} />
			</td>
		</tr>
	);
}

DetailCustomer.propTypes = {
	className: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default styled(DetailCustomer)`
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
`;
