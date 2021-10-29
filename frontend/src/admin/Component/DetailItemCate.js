import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import React from "react";
import "boxicons";

function DetailItemCate({className, data}) {
	const [id] = React.useState(data.id);
	const [name, setName] = React.useState(checkCategory(data.category_id));

	function checkCategory(data) {
		axios.get(`/admin/searchCategory/${data}`).then((data) => {
			setName(data.data.cate);
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
			<td>{name}</td>
			<td>{data.price}</td>
			<td>{data.status}</td>
			<td>{data.rating}</td>
		</tr>
	);
}

DetailItemCate.propTypes = {
	className: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default styled(DetailItemCate)`
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
