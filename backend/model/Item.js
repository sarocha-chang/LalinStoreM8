module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define(
		"items",
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			image: {
				type: Sequelize.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			price: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					// isEven: true,
					notNull: true,
					isInt: true,
					not: /^[0]+$/,
					check: (value) => {
						if (parseInt(value) > 0) {
							return true;
						} else throw new Error("กรุณากรอกราคาให้ถูกต้อง");
					},
				},
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					isInt: true,
					check: (value) => {
						if (value >= 0) {
							return true;
						} else throw new Error("กรุณากรอกจำนวนสินค้าให้ถูกต้อง");
					},
				},
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "ยอดนิยม" || "มาใหม่" || "ปกติ",
				validate: {
					notEmpty: true,
					check: (value) => {
						if (value == "ยอดนิยม" || value == "มาใหม่" || value == "ปกติ" || value == "หมด") {
							return true;
						} else
							throw new Error("กรุณากรอกสถานะของสินค้าให้ถูกต้อง [ปกติ , มาใหม่ , ยอดนิยม , หมด]");
					},
				},
			},
			rating: {
				type: Sequelize.FLOAT(2, 1),
				allowNull: false,
				validate: {
					notNull: true,
					isFloat: true,
					check: (value) => {
						if (value >= 0 && value <= 5) {
							if (
								value == "0" ||
								value == "0.5" ||
								value == "1" ||
								value == "1.5" ||
								value == "2" ||
								value == "2.5" ||
								value == "3" ||
								value == "3.5" ||
								value == "4" ||
								value == "4.5" ||
								value == "5"
							) {
								return true;
							} else {
								throw new Error(
									"กรุณากรอกคะแนนความนิยมของสินค้าให้ถูกต้อง [0 , 0.5 , 1 , 1.5 , 2 ,2.5 ,3 ,3.5 ,4 , 4.5 ,5]",
								);
							}
						} else
							throw new Error(
								"กรุณากรอกคะแนนความนิยมของสินค้าให้ถูกต้อง [0 , 0.5 , 1 , 1.5 , 2 ,2.5 ,3 ,3.5 ,4 , 4.5 ,5]",
							);
					},
				},
			},
		},
		{
			timestamps: false, // ปิดตัวบอกเวลา add , update
		},
	);
	return Item;
};
