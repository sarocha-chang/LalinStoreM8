module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define(
		"categories",
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

		},
	);
	return Category;
};
