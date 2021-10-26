const router = require("express").Router();

const admin = require("./admin.routes");
const all = require("./all.routes");
const auth = require("./auth.routes");
const customer = require("./customer.routes");

router.use("/admin", admin);
router.use("/all", all);
router.use("/auth", auth);
router.use("/customer", customer);

module.exports = router;
