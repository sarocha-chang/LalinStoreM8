import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import "boxicons";

import {deleteItem} from "../../app/Item/actions";

function DetailTable({className, data}) {
	const [id] = React.useState(data.id);
	const dispatch = useDispatch();

	function delete_item() {
		return Swal.fire({
			title: "โปรดยืนยัน",
			text: "ต้องการสินค้านี้ออกจากคลังหรือไม่",
			icon: "warning",
			showCancelButton: true,
			cancelButtonText: "ไม่",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "ใช่",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("ลบสำเร็จ", "ลบสินค้าในคลังเรียบร้อยแล้ว", "success");
				axios.delete(`/admin/deleteItem/${id}`).then(() => {
					dispatch(deleteItem({_id: id}));
				});
			}
		});
	}

	return (
		<tr className={className}>
			<td>{data.id}</td>
			<td>
				<img src={data.image} alt={data.name} className="imgItem" />
			</td>
			<td>{data.name}</td>
			<td>{data.quantity}</td>
			<td className="des">
				<span className="text-overflow">{data.description}</span>
			</td>
			<td>{data.category_id}</td>
			<td>{data.price}</td>
			<td>{data.status}</td>
			<td>{data.rating}</td>
			<td>
				<Link to={`/admin/edit-item/${data.id}`}>
					<box-icon name="edit" />
				</Link>
				<box-icon name="trash" type="solid" color="#f04e4e" onClick={delete_item} />
			</td>
		</tr>
	);
}

DetailTable.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default styled(DetailTable)`
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
