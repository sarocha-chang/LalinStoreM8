module.exports = (sequelize, Sequelize) => {
	const Subcategory = sequelize.define(
		"subcategories",
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
	return Subcategory;
};
