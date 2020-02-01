const fs = require('fs');
const bcrypt = require('bcrypt');

// Constants
const userFilePath = __dirname + '/../data/users.json';

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
function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
}
const controller = {
	registerForm: (req, res) => {
        
            res.render('register',);
	},
	store: (req, res) => {
		let userFinalData = {
			id: generateUserId(),
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
			bio:req.body.bio,
			avatar: req.file.filename
		};
		
		// Guardar al usario
		storeUser(userFinalData);
		
		// Redirección al login
		res.redirect('/users/login');
		console.log(userFinalData);
		
	},
	loginForm:(req, res) => {
        
        //res.send('Página de login'); ** ESTO ES PARA COMPROBAR SI ANDA
        res.render('login');
	},
	processLogin: (req, res) => {
       
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
                delete user.password;
                //guarda en sesion el usuario
                req.session.user = user;
                //hace disponible el usuario a las vistas
                res.locals.user = req.session.user;
                // Setear la cookie
				if (req.body.remember_user) {
					res.cookie('userIdCookie', user.id, { maxAge: 60000 * 60 });
                }				
                // Redireccionamos al visitante a su perfil
				res.redirect(`/users/profile`);
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	profile: (req, res) => {
		

		res.render('profile',);
    },
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userIdCookie', null, { maxAge: 1 });
		return res.redirect('/');
	}
}

module.exports = controller
