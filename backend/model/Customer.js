module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define(
		// วงเล็บ define(ชื่อเล่น , ข้อมูลคอลัม , ออฟชั่น)
		"customers", //ชื่อตาราง ที่ตั้งเป็น alias เป็นเหมือนชื่อเล่น
		{
			firstname: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					check: (value) => {
						if (!/^[a-zA-Zก-๙]*$/.test(value)) {
							throw new Error("กรุณากรอก ชื่อ ให้ถูกต้อง");
						} else return true;
					},
				},
			},
			lastname: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					check: (value) => {
						if (!/^[a-zA-Zก-๙]*$/.test(value)) {
							throw new Error("กรุณากรอก นามสกุล ให้ถูกต้อง");
						} else return true;
					},
				},
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
					len: [6],
				},
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
					len: [8],
				},
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					check: (value) => {
						if (!/^[0][689]\d{8}/.test(value)) {
							throw new Error("กรุณากรอก เบอร์โทรศัพท์ ให้ถูกต้อง");
						} else return true;
					},
				},
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
					isEmail: true,
					isEmail: {
						msg: "กรุณากรอกอีเมลล์ของท่านให้ถูกต้อง",
					},
				},
			},
		},
		{
			timestamps: false, // ปิดตัวบอกเวลา add , update
			// tableName: "customers", //บอกชื่อตารางที่จะสร้าง
		},
	);
	return Customer;
};
