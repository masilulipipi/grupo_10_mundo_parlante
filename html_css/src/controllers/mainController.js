const fs = require('fs');
/*const path = require('path');*/

// Constants
const userFilePath = __dirname + '/../data/users.json';
/*const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));*/

// ************ Function to Read an HTML File ************
/*function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}*/
function getAllUsers () {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
}

function storeUser (newUserData) {
	let allUsers = getAllUsers();
	allUsers.push(newUserData);
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
}

function generateUserId () {
	let allUsers = getAllUsers();
	if (allUsers.length == 0) {
		return 1;
	}
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

const controller = {
	root: (req, res) => {
		res.render('index');
	},
	productos:(req, res) => {
		res.render('productos');
	},
	contacto:(req, res) => {
		res.render('contacto');
	},
	about:(req, res) => {
		res.render('quienes-somos');
	},
	registerForm: (req, res) => {
        //res.send('Página de Registro'); ** ESTO ES PARA COMPROBAR SI ANDA
        res.render('register');
	},
	store: (req, res) => {
		let userFinalData = {
			id: generateUserId(),
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
            //password: bcrypt.hashSync(req.body.password, 10),
			password: req.body.password,
			bio:req.body.bio,
			avatar: req.file.filename
		};
		
		// Guardar al usario
		storeUser(userFinalData);
		
		// Redirección al login
		res.redirect('/login');
	},
	loginForm:(req, res) => {
        //res.send('Página de login'); ** ESTO ES PARA COMPROBAR SI ANDA
        res.render('login');
	}
}

module.exports = controller
