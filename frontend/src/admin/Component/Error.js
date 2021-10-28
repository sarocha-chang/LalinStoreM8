import React from "react";

export default function Error({err}) {
	return (
		<>
			{err ? (
				err.map((data) => {
					return (
						<p style={{textAlign: "left"}} key={data}>
							{data}
						</p>
					);
				})
			) : (
				<div>Loading products....</div>
			)}
		</>
	);
}
