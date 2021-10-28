import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import "boxicons";

import {fetchCategory} from "../../app/Category/actions";

function Category({className, data}) {
	const [user] = useState(JSON.parse(localStorage.getItem("token")));
	const category = useSelector((state) => state.category);
	console.log(category);
	const dispatch = useDispatch();
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		function get() {
			axios.get("/admin/showCategory").then((res) => {
				dispatch(fetchCategory(res.categories));
			});
		}
		get();
	}, [dispatch]);

	return <h1>1</h1>;
}

Category.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default styled(Category)``;
