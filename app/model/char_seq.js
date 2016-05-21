var Sequelize = require("sequelize"); 

var sequelize = require("../controllers/connection.js");

var pastSites = sequelize.define("pastSites", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	site: {
		type: Sequelize.STRING,
	},
	class: {
		type: Sequelize.STRING,
	},
	HP: {
		type: Sequelize.INTEGER,
	},
	currentHP: {
		type: Sequelize.INTEGER,
	},
	STR: {
		type: Sequelize.INTEGER,
	},
	INT: {
		type: Sequelize.INTEGER,
	},
	dodge: {
		type: Sequelize.INTEGER,
	},
	ATKbuff: {
		type: Sequelize.INTEGER,
	},
	DEFbuff: {
		type: Sequelize.INTEGER,
	},
	Dodgebuff: {
		type: Sequelize.INTEGER,
	},
	special: {
		type: Sequelize.STRING,
	},
	attack: {
		type: Sequelize.INTEGER,
	},
	defend: {
		type: Sequelize.INTEGER,
	}
	},
		{
		createdAt: false,
		updatedAt: false
	});

// Syncs with DB
pastSites.sync();

module.exports = pastSites;