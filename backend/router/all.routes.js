const router = require("express").Router();

const {show, showDetail, search} = require("../controller/all.controller");

router.get("/show", show);

router.get("/showDetail/:id", showDetail);

router.get("/search/:keyword", search);

module.exports = router;
