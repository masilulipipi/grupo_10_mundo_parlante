const fs = require('fs');
const bcrypt = require('bcrypt');

// Constants
const userFilePath = __dirname + '/../data/users.json';
const productosFilePath = __dirname + '/../data/productos.json';
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8')); //una vez declarada usarla en el controlador de la pagina en la q va a ser usada, tipo tirar la variable productos abajo del controller de la pagina 'productos'

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

/// FUNCIONES para productos
function getAllProducts () {
	let productsFileContent = fs.readFileSync(productosFilePath, 'utf-8');
	let finalProducts = productsFileContent == '' ? [] : JSON.parse(productsFileContent); 
	return finalProducts;
}
function getProductById(id) {
	let allProducts = getAllProducts();
	let ProductToFind = allProducts.find(oneProduct => oneProduct.id == id);
	return ProductToFind;
}

const controller = {
	root: (req, res) => {
		res.render('index');
	},
	productos:(req, res) => {
		res.render('productos', {
			productos //esto es para poder usar la variable en el EJS
		});
	
	},
	carrito:(req, res) => {
		res.render('carrito');
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
            password: bcrypt.hashSync(req.body.password, 10),
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
	},
	processLogin: (req, res) => {
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
				// Redireccionamos al visitante a su perfil
				res.redirect(`/profile/${user.id}`);
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	profile: (req, res) => {
		let userLoged = getUserById(req.params.id);

		res.render('profile', { user: userLoged });
	},
	detalle: (req, res) => {
		let productLoged = getProductById(req.params.id);

		res.render('detalle', { productos: productLoged });
	}
}

module.exports = controller
