/* const fs = require('fs');
const userFilePath = __dirname + '/../data/users.json';

function getAllUsers () {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
} 

function getUserById(id) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
} */
const db = require('../database/models');
const sequelize = db.sequelize;


function userCookieMiddleware (req, res, next) {
	if (req.cookies.userIdCookie != undefined) {
		/* let user = getUserById(req.cookies.userIdCookie); */
		 /* console.log(user); */
		 db.Users.findByPk(req.cookies.userIdCookie)
	.then(resultado => {
	
	return req.session.user = resultado.Users.dataValues});
		/* let user = resultado */
	}
	next();
}

module.exports = userCookieMiddleware;