import React, {useState} from "react";
import styled from "styled-components";

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
export default styled(Modal)`
	.modalBackground {
		float: left;
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
