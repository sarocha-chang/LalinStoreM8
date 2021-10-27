import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Container({className, children}) {
	return <main className={className}>{children}</main>;
}

Container.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};

export default styled(Container)`
	margin: 0 0 0 16rem;
	font-family: "IBM Plex Sans Thai", sans-serif;
`;
