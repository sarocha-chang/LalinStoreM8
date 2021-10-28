const router = require("express").Router();

const {
	addItem,
	deleteItem,
	updateItem,
	showCategory,
	searchCategory,
	addCategory,
	deleteCategory,
	updateCategory,
	showCustomer,
	updateCustomer,
	deleteCustomer,
	showCustomerDetail,
} = require("../controller/admin.controller");

router.post("/addItem", addItem);
router.delete("/deleteItem/:id", deleteItem);
router.put("/updateItem/:id", updateItem);

router.get("/showCategory", showCategory);
router.get("/searchCategory/:id", searchCategory);
router.post("/addCategory", addCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

router.get("/showCustomer", showCustomer);
router.get("/showCustomerDetail/:id", showCustomerDetail);
router.put("/updateCustomer/:id", updateCustomer);
router.delete("/deleteCustomer/:id", deleteCustomer);

module.exports = router;
