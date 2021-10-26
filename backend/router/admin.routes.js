const router = require("express").Router();

const {
	addItem,
	deleteItem,
	updateItem,
	showCategory,
	addCategory,
	deleteCategory,
	updateCategory,
	showCustomer,
	updateCustomer,
	deleteCustomer,
} = require("../controller/admin.controller");

router.post("/addItem", addItem);
router.delete("/deleteItem/:id", deleteItem);
router.put("/updateItem/:id", updateItem);

router.get("/showCategory", showCategory);
router.post("/addCategory", addCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

router.get("/showCustomer", showCustomer);
router.put("/updateCustomer/:id", updateCustomer);
router.delete("/deleteCustomer/:id", deleteCustomer);

module.exports = router;
