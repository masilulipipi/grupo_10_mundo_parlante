const fs = require('fs');
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
}

function userCookieMiddleware (req, res, next) {
	if (req.cookies.userIdCookie != undefined) {
		let user = getUserById(req.cookies.userIdCookie);
		console.log(user);
		
		req.session.user = user 
	}
	next();
}

module.exports = userCookieMiddleware;