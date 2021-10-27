import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import "boxicons";

import { fetchCategory } from "../../app/Category/actions";

function Category({className, data}) {
	const [id] = React.useState(data.id);
	const dispatch = useDispatch();
	return (
		<>
			<option>{data}</option>
		</>
	);
}

Category.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default styled(Category)``;
