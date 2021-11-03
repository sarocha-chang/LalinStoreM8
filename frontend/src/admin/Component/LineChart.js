import {Line} from "react-chartjs-2";
import styled from "styled-components";

function LineChart({className}) {
	const data = {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [
			{
				label: "ยอดขาย",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55],
			},
		],
	};
	return (
		<div className={className}>
			<div className="contain">
				<h2 className="top">ยอดขายเดือนมกราคม - มิถุนายน พ.ศ. 2564</h2>
				<div className="detail">
					<p>***สรุปจากไตรมาสแรก เดือนที่มียอดขายเยอะที่สุด คือเดือนเมษายน จำนวน 81 ออเดอร์</p>
					<p>เดือนที่มียอดขายน้อยที่สุด คือ เดือน มิถุนายน จำนวน 55 ออเดอร์</p>
				</div>
			</div>
			<div className="chart">
				<Line data={data} />
			</div>
		</div>
	);
}
export default styled(LineChart)`
	padding-top: 3rem;
	padding-left: 1rem;
	.contain {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.detail {
			margin-top: 1rem;
			padding: 12px;
			text-align: right;
			margin-right: 2.2rem;
		}
	}
	.chart {
		width: 95%;
		padding: 10px;
		border: 1px solid black;
	}
`;
