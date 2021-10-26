module.exports = (sequelize, Sequelize) => {
	const Type = sequelize.define(
		"types",
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			timestamps: false, // ปิดตัวบอกเวลา add , update

			// tableName: "type",
		},
	);
	return Type;
};
