import axios from "axios";
import {useEffect} from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Categories from "./Categories";
import CategoriesAll from "./CategoriesAll";
import {fetchBooks} from "../../app/Book/actions";

function List({className}) {
	const book = useSelector((state) => state.books);
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get("/all/show").then((res) => {
			dispatch(fetchBooks(res.data.book));
		});
	}, [dispatch]);

	return (
		<div className={className}>
			{
				<Navbar bg="gray" variant="light" style={{background: "#e65100", height: "60px"}}>
					<Container>
						<Nav className="me-auto" style={{marginBottom: "20px", marginLeft: "400px"}}>
							<Nav.Link href="#" style={{marginRight: "80px", color: "#fff"}}>
								นวนิยาย
							</Nav.Link>
							<Nav.Link href="#" style={{marginRight: "80px", color: "#fff"}}>
								การ์ตูน
							</Nav.Link>
							<Nav.Link href="#" style={{marginRight: "80px", color: "#fff"}}>
								ศิลปะ
							</Nav.Link>
							<Nav.Link href="#" style={{marginRight: "80px", color: "#fff"}}>
								ความรู้
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			}

			<div className="row">
				<div className="rowtwo">
					<h1>หนังสือมาใหม่</h1>
					<div className="new">
						{book ? (
							book
								.filter((x) => x.status === "มาใหม่")
								.map((data) => {
									return <Categories key={data.id} data={data} />;
								})
						) : (
							<div>Loading books....</div>
						)}
					</div>
				</div>
				<div className="rowtwo">
					<h1>ยอดนิยม</h1>

					<div className="hit">
						{book ? (
							book
								.filter((x) => x.status === "ยอดนิยม")
								.map((data) => {
									return <Categories key={data.id} data={data} />;
								})
						) : (
							<div>Loading books....</div>
						)}
					</div>
				</div>
			</div>
			<div className="col-70">
				<h1>หนังสือทั้งหมด</h1>
				<div className="all">
					{book ? (
						book
							.filter((x) => x.status === "ปกติ")
							.map((data) => {
								return <CategoriesAll key={data.id} data={data} />;
							})
					) : (
						<div>Loading books....</div>
					)}
				</div>
			</div>
		</div>
	);
}

List.propTypes = {
	className: PropTypes.string,
	books: PropTypes.object,
};

export default styled(List)`
	overflow: hidden;
	width: 100%;
	.row {
		display: flex;
		padding-top: 1rem;
		justify-content: center;
	}
	.rowtwo {
		margin-left: 15%;
		h1 {
			margin-top: 2rem;
			font-size: 22px;
			font-weight: bold;
		}
		.new,
		.hit {
			display: flex;
			flex-direction: row;
		}
		.hit {
		}
	}
	.col-70 {
		border-top: 1px solid #d4caca;
		padding-top: 5rem;
		margin: 3rem 8rem 8rem 8rem;
		h1 {
			font-size: 28px;
			font-weight: bold;
		}
		.all {
			display: flex;
			flex-wrap: wrap;
			border: 1px solid #d4caca;
			border-radius: 10px;
			padding: 10px;
		}
	}
`;
