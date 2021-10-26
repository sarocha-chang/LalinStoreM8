const jwt = require("jsonwebtoken");
const passport = require("passport");

const {privateKey} = require("../config/config");
const {customers} = require("../model");

module.exports = {
	register: async (req, res, next) => {},

	login: (req, res, next) => {},
};
