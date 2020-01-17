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
function storeProduct (newProductData) {
	let allProducts = getAllProducts();
	allProducts.push(newProductData);
	fs.writeFileSync(userFilePath, JSON.stringify(allProducts, null, ' '));
}

function generateProductId () {
	let allProducts = getAllProducts();
	if (allProducts.length == 0) {
		return 1;
	}
	let lastProduct = allProducts.pop();
	return lastProduct.id + 1;
}
function getProductById(id) {
	let allProducts = getAllProducts();
	let ProductToFind = allProducts.find(oneProduct => oneProduct.id == id);
	return ProductToFind;
}


const controller = {
	root: (req, res) => {
		
		res.render('index',);
	},
	productos:(req, res) => {
		
		res.render('productos', {
			productos //esto es para poder usar la variable en el EJS
		});
	},
	productosAdd:(req, res) => {
		
		res.render('productosAdd',);
	},
	processProductosAdd: (req, res) => {
		let productFinalData = {
			id: generateProductId(),
			name: req.body.name,
			marca: req.body.marca,
			modelo: req.body.modelo,
            precio: req.body.precio,
			descripcion :req.body.descripcion,
			foto: req.file.filename
		};
		
		// Guardar el producto
		storeProduct(productFinalData);
		
		// Redirección al login
		res.redirect('/productos');
	},
	carrito:(req, res) => {
		res.render('carrito');
	},
	contacto:(req, res) => {
		
		res.render('contacto');
	},
	about:(req, res) => {
		
		res.render('quienes-somos',);
	},
	detalle: (req, res) => {
	
		let productLoged = getProductById(req.params.id);

		res.render('detalle', { productos: productLoged});
	}
}

module.exports = controller
