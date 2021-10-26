require("dotenv").config();
// require("./middlewares/auth");

const app = require("./config/express");
const db = require("./model");

let cusAdmin = require("./config/admin.json");
let cusCustomer = require("./config/customer.json");
let hairCare = require("./config/item/hair.json");
let bodyCare = require("./config/item/body.json");
let faceCare = require("./config/item/face.json");
let vitamin = require("./config/item/vitamin.json");

db.sequelize.sync({force: true}).then(async () => {
	const admin = await db.type.create({name: "admin"});
	const customer = await db.type.create({name: "customer"});
	try {
		cusAdmin = await db.customers.bulkCreate(cusAdmin, {validate: true});
		await admin.addCustomers(cusAdmin);
	} catch (error) {
		console.log(error);
	}
	try {
		cusCustomer = await db.customers.bulkCreate(cusCustomer, {validate: true});
		await customer.addCustomers(cusCustomer);
	} catch (error) {
		console.log(error);
	}

	// hairCare = await db.items.bulkCreate(hairCare, {validate: true});
	const categoryHair = await db.category.create({name: "haircare"});
	// await categoryHair.addItems(hairCare);

	// bodyCare = await db.items.bulkCreate(bodyCare, {validate: true});
	const categoryBody = await db.category.create({name: "bodycare"});
	// await categoryBody.addItems(bodyCare);

	// faceCare = await db.items.bulkCreate(faceCare, {validate: true});
	const categoryFace = await db.category.create({name: "facecare"});
	// await categoryFace.addItems(faceCare);

	vitamin = await db.items.bulkCreate(vitamin, {validate: true});
	const categoryVitamin = await db.category.create({name: "vitamin"});
	categoryVitamin.addItems(vitamin);
	// const subVitamin = await db.subcategory.create({name: "vitamin c"});
	// await categoryVitamin.addSubcategory(subVitamin);
	// await subVitamin.addItems(vitamin);
});

// db.sequelize.sync();

app.get("/", async (req, res) => {
	res.status(200).send({
		// type: await db.type.findAll(),
		// customer: await db.customers.findAll({include: {model: db.type, attributes: ["name"]}}),
		customer: await db.customers.findAll({
			include: {model: db.type},
		}),

		// item: await db.items.findAll({include: {model: db.category, attributes: ["name"]}}),
		// address: await db.address.findAll({include: {model: db.customers}}),
		//include: db.type เอาทุกอย่าง ไม่มี option อื่น
	});
});

const listener = app.listen(process.env.PORT || 8000, () => {
	console.log("Server is running on port " + listener.address().port);
});
