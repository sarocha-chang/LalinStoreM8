const passport = require("passport");
const jwt = require("jsonwebtoken");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const {customers} = require("../model");
const {privateKey} = require("../config/config");

passport.use(passport.initialize());
passport.use(passport.session());

passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		try {
			let customer = await customers.findOne({
				where: {username: username, password: password},
			});
			if (customer) {
				done(null, customer.dataValues);
				// 	 checkPass = jwt.decode(customer.dataValues.password, privateKey, {algorithms: ["RS256"]});
				// 	 if (checkPass == password) {
				// 	 	done(null, customer.dataValues);
				// 	 } else done(null, false, {message: "Invalid password"});
			} else done(null, false, {message: "Invalid username"});
		} catch (err) {
			done(err);
		}
	}),
);

passport.use(
	"forget",
	new LocalStrategy(async (username, password, done) => {
		try {
			console.log(password);
			let customer = await customers.findOne({
				where: {username: username, email: password},
			});
			if (customer) {
				checkPass = jwt.decode(customer.dataValues.password, privateKey, {algorithms: ["RS256"]});
				if (checkPass) {
					done(null, checkPass);
				}
			} else done(null, false, {message: "Invalid username or email"});
		} catch (err) {
			done(err);
		}
	}),
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: privateKey,
			algorithms: ["RS256"],
		},
		(payload, done) => {
			if (payload) {
				done(null, payload);
			} else done(null, false, {message: "Not found user."});
		},
	),
);

module.exports = passport;
