const jwt = require("jsonwebtoken");
const passport = require("passport");

const {privateKey} = require("../config/config");
const {customers} = require("../model");

module.exports = {
	register: async (req, res, next) => {
		try {
			let {password} = req.body;
			if (!password) {
				res.status(422).send("Please input password");
			} else {
				if ([...password].length < 8) {
					res.status(500).send({
						name: "SequelizeValidationError",
						errors: [
							{
								message: "Validation len on password failed",
								path: "password",
								value: password,
							},
						],
					});
				} else {
					password = jwt.sign(password, privateKey, {algorithm: "RS256"});
					if (password) {
						req.body.password = password;
						let customer;
						if (req.body.type) {
							customer = await customers.create(req.body);
						} else {
							customer = await customers.create({...req.body, type: "customer"});
						}
						if (customer) res.status(200).json(customer);
						else res.status(500).send("Internal Server error Occurred");
					} else res.status(500).send("Internal Server error Occurred");
				}
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
				res.status(500).json({errors: error.errors});
			} else {
				res.status(500).json(error);
			}
			next();
		}
	},

	login: (req, res, next) => {
		passport.authenticate("login", (err, user, info) => {
			if (err) return next(err);
			if (user) {
				const token = jwt.sign(user, privateKey, {algorithm: "RS256", expiresIn: "6h"});
				return res.json({message: "Login success..", token, type_id: user.type_id});
			} else {
				return res.status(422).json(info);
			}
		})(req, res, next);
	},
};
