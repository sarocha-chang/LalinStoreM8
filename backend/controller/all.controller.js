const {items} = require("../model");

module.exports = {
	show: async (req, res, next) => {
		try {
			const item = await items.findAll();
			if (item) {
				res.status(200).json({
					message: "Get data of product success",
					item,
				});
			} else {
				res.status(404).json({
					message: "Can not get data of product",
				});
			}
		} catch (error) {
			next(error);
		}
		next();
	},

	showDetail: async (req, res, next) => {
		try {
			const item = await items.findByPk(req.params.id);
			if (item) {
				res.status(200).json({
					message: "Get product success",
					item,
				});
			} else {
				res.status(404).json({
					message: "Product not found",
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	},

	search: async (req, res, next) => {
		try {
			const {keyword} = req.params;
			let item = await items.findAll();
			item = item.filter((goods) => {
				return goods.name.toLowerCase().includes(keyword.toLowerCase());
			});
			if (item) {
				res.status(200).json({
					message: " Search product success",
					item,
				});
			} else {
				res.status(404).json({
					message: "Product not found",
				});
			}
		} catch (error) {
			next(error);
		}
		next();
	},
};
