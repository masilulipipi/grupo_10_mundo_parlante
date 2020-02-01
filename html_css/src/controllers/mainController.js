const fs = require('fs');
const bcrypt = require('bcrypt');

// Constants

const productosFilePath = __dirname + '/../data/productos.json';
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8')); //una vez declarada usarla en el controlador de la pagina en la q va a ser usada, tipo tirar la variable productos abajo del controller de la pagina 'productos'

/// FUNCIONES para productos
function getAllProducts () {
	let productsFileContent = fs.readFileSync(productosFilePath, 'utf-8');
	let finalProducts = productsFileContent == '' ? [] : JSON.parse(productsFileContent); 
	return finalProducts;
}
function storeProduct (newProductData) {
	let allProducts = getAllProducts();
	allProducts.push(newProductData);
	fs.writeFileSync(productosFilePath, JSON.stringify(allProducts, null, ' '));
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
			nombre: req.body.name,
			marca: req.body.marca,
			modelo: req.body.modelo,
            precio: req.body.precio,
			descripcion: req.body.descripcion,
			/* Lo que dive ('avatar') es el name del campo en la vista */
			avatar: req.file.filename
		};
		
		// Guardar el producto
		storeProduct(productFinalData);
		
		// Redirección al login
		res.redirect('/productos');
		console.log(productFinalData);
		
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
