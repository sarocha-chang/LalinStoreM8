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

	showCategory: async (req, res, next) => {
		try {
			const categories = await category.findAll();
			if (categories) {
				res.status(200).json({
					message: "ดึงข้อมูลของประเภทสินค้าสำเร็จ!",
					categories,
				});
			} else {
				res.status(404).json({
					message: "ไม่พบข้อมูลของประเภทสินค้าในระบบ!",
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

	addCategory: async (req, res, next) => {
		try {
			const cate = await category.findAll({where: {name: req.body.name}});
			if (cate.length) {
				console.log(5);
				res.status(200).json({
					message: "ประเภทสินค้าซ้ำ!",
				});
			} else {
				const categories = await category.create(req.body);
				if (categories) {
					res.status(200).json({
						message: "เพิ่มประเภทสินค้าในระบบ!",
						categories,
					});
				} else {
					res.status(500).json({
						message: "ไม่พบประเภทสินค้านี้ในระบบ!",
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
		next();
	},

	deleteCategory: async (req, res, next) => {
		try {
			const categories = await category.findByPk(req.params.id);
			const item = await items.findAll({where: {category_id: categories.id}});
			if (item) {
				await items.destroy({
					where: {
						category_id: categories.id,
					},
				});

				await categories.destroy({
					where: {
						id: categories.id,
					},
				});

				res.status(200).json({
					message: "ลบประเภทสินค้าสำเร็จ!",
				});
			} else {
				res.status(404).json({
					message: "ไม่พบประเภทสินค้านี้ในระบบ!",
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

	updateCategory: async (req, res, next) => {
		try {
			const categories = await category.findByPk(req.params.id);
			if (categories) {
				await categories.update(req.body);
				res.status(200).json({
					message: "อัพเดทประเภทสินค้าสำเร็จ!",
					categories,
				});
			} else {
				res.status(404).json({
					message: "ไม่มีประเภทสินค้าในระบบ",
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
	showCustomer: async (req, res, next) => {
		try {
			const customer = await customers.findAll();
			if (customer) {
				res.status(200).json({
					message: "ดึงข้อมูลของลูกค้าสำเร็จ!",
					customer,
				});
			} else {
				res.status(404).json({
					message: "ไม่พบข้อมูลของลูกค้าในระบบ!",
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

	deleteCustomer: async (req, res, next) => {
		try {
			const customer = await customers.findByPk(req.params.id);
			if (customer) {
				await customer.destroy({
					where: {
						id: customer.id,
					},
				});
				res.status(200).json({
					message: "ลบข้อมูลของลูกค้าสำเร็จ!",
				});
			} else {
				res.status(404).json({
					message: "ไม่พบข้อมูลลูกค้าในระบบ!",
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

	updateCustomer: async (req, res, next) => {
		try {
			const customer = await customers.findByPk(req.params.id);
			if (customer) {
				await customer.update(req.body);
				res.status(200).json({
					message: "แก้ไชข้อมูลของลูกค้าสำเร็จ!",
				});
			} else {
				res.status(404).json({
					message: "ไม่พบข้อมูลลูกค้าในระบบ!",
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
};
