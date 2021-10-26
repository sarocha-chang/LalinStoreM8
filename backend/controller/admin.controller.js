const {items, category, customers} = require("../model");
module.exports = {
	addItem: async (req, res, next) => {
		try {
			const item = await items.create(req.body);
			if (item) {
				res.status(200).json({
					message: "เพิ่มสินค้าสำเร็จ!",
					item,
				});
			} else {
				res.status(500).json({
					message: "ไม่สามารถเพิ่มสินค้าได้!",
				});
			}
		} catch (error) {
			if (error.errors) {
				error.errors = error.errors.map((err) => [err.message, err.path, err.instance[err.path]]);
				error.errors = error.errors.map((err) => {
					return {
						message: err[0],
						path: err[1],
						value: err[2],
					};
				});
				res.status(500).json(error.errors);
			} else {
				res.status(500).json(error);
			}
		}
		next();
	},

	deleteItem: async (req, res, next) => {
		try {
			const item = await items.findByPk(req.params.id);
			if (item) {
				await item.destroy({
					where: {
						id: item.id,
					},
				});
				res.status(200).json({
					message: "ลบสินค้าสำเร็จ!",
				});
			} else {
				res.status(404).json({
					message: "ไม่พบสินค้าในระบบ!",
				});
			}
		} catch (error) {
			if (error.errors) {
				error.errors = error.errors.map((err) => [err.message, err.path, err.instance[err.path]]);
				error.errors = error.errors.map((err) => {
					return {
						message: err[0],
						path: err[1],
						value: err[2],
					};
				});
				res.status(500).json(error.errors);
			} else {
				res.status(500).json(error);
			}
		}
		next();
	},

	updateItem: async (req, res, next) => {
		try {
			const item = await items.findByPk(req.params.id);
			if (item) {
				await item.update(req.body);
				res.status(200).json({
					message: "อัพเดทข้อมูลสินค้าเรียบร้อย!",
					item,
				});
			} else {
				res.status(404).json({
					message: "ไม่พบสินค้าในระบบ!",
				});
			}
		} catch (error) {
			if (error.errors) {
				error.errors = error.errors.map((err) => [err.message, err.path, err.instance[err.path]]);
				error.errors = error.errors.map((err) => {
					return {
						message: err[0],
						path: err[1],
						value: err[2],
					};
				});
				res.status(500).json(error.errors);
			} else {
				res.status(500).json(error);
			}
		}
		next();
	},

	showCategory: async (req, res, next) => {},

	addCategory: async (req, res, next) => {},

	deleteCategory: async (req, res, next) => {},

	updateCategory: async (req, res, next) => {},

	showCustomer: async (req, res, next) => {},

	deleteCustomer: async (req, res, next) => {},

	updateCustomer: async (req, res, next) => {},
};
