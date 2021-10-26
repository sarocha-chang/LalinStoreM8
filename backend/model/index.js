const {Sequelize} = require("sequelize");

const {database} = require("../config/config");

const sequelize = new Sequelize(
	database.database,
	database.user,
	database.password,
	database.option,
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.customers = require("./Customer")(sequelize, Sequelize);
db.type = require("./Type")(sequelize, Sequelize);
db.items = require("./Item")(sequelize, Sequelize);
db.category = require("./Category")(sequelize, Sequelize);
db.subcategory = require("./Subcategory")(sequelize, Sequelize);

db.type.hasMany(db.customers, {foreignKey: "type_id"});
db.customers.belongsTo(db.type, {foreignKey: "type_id"});

db.subcategory.hasMany(db.items, {foreignKey: "subcategory_id"});
db.items.belongsTo(db.subcategory, {foreignKey: "subcategory_id"});

db.category.hasMany(db.subcategory, {foreignKey: "categories_id"});
db.subcategory.belongsTo(db.category, {foreignKey: "categories_id"});

module.exports = db;
