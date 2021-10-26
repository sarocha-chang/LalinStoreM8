const fs = require("fs");
const privateKey = fs.readFileSync("jwtRS256.key", "utf8");
const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

module.exports = {
	privateKey,
	publicKey,
	database: {
		database: process.env.DATABASE || "lalinstore",
		user: process.env.USER || "sarochachang",
		password: process.env.PASSWORD || "c157857c*",
		option: {
			dialect: "mysql",
			host: process.env.HOST || "localhost",
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
		},
	},
};
