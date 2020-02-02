const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const sequelize = db.sequelize;

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
	}/* ,
	productos:(req, res) => {
		
		res.render('productos', {
			productos //esto es para poder usar la variable en el EJS
		});
	} */,
	productos:(req, res) => {
		
		db.Products
			.findAll({
				include: ['brand', 'user']
			})
			.then(products => {
				return res.render('productos', { products });
			})
			.catch(error => console.log(error));
	},/* 
	productosAdd:(req, res) => {
		
		res.render('productosAdd',);
	}, */
	/* 
	processProductosAdd: (req, res) => {
		let productFinalData = {
			id: generateProductId(),
			nombre: req.body.name,
			marca: req.body.brand,
			modelo: req.body.model,
            precio: req.body.price,
			descripcion: req.body.description,
			Lo que dive ('image') es el name del campo en la vista 
			image: req.file.filename
		};
		
		// Guardar el producto
		storeProduct(productFinalData);
		
		// Redirección al login
		res.redirect('/productos');
		console.log(productFinalData);
		
	}, */
	
	create: (req, res) => {
		
		db.Brands
			.findAll()
			.then(brands => {
				return res.render('productosAdd', { brands});
					})
			.catch(error => console.log(error));
			
	},
	store: (req, res) => {
		
		 //return res.send(req.body);
		// req.body.user_id = req.session.user.id;
		/* req.body.user_id = req.session.user.id;*/
		db.Products
			.create({
				name: req.body.name,
				price: req.body.price,
				image: req.file.filename,
				brand_id: req.body.brand_id,
				model: req.body.model,
				description: req.body.description,
				user_id: req.session.user.id,				
			})
			.then(productSaved => {
				// let categories = req.body.categories;
				// for (const oneCategory of categories) {
				// 	// Guardar en la tabla pivot
				// 	db.CategoriesProducts
				// 		.create({
				// 			product_id: productSaved.id,
				// 			category_id: oneCategory
				// 		})
				// }
				res.redirect('productos');
			})
			.catch(error => console.log(error)); 
	},
	edit: function(req, res){
        let pedidoProduct = db.Products.findByPk(req.params.id);
		
        let pedidoBrand = db.Brands.findAll();

		   Promise.all([pedidoProduct, pedidoBrand])
		   	 .then(function([product, brand]){
				
                res.render('editar', {product:product, brand:brand});
            })  
	},
	update: function(req,res){

		/* no se porque pero esta es la que anda aunq no me deja cambiar la imagen */
		let filename = '';
		if (req.body.image == undefined){
			filename = req.body.currentImage
			} else{
			filename = req.body.image
			}
        db.Products.update({
			name: req.body.name,
			price: req.body.price,
			image: filename,
			brand_id: req.body.brand_id,
			model: req.body.model,
			description: req.body.description,
			user_id: req.session.user.id,
        },{
            where: {
                id: req.params.id
            }
        });
        res.redirect('/productos/detalle/'+req.params.id)
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
	detalle: function (req,res){
		db.Products
			.findByPk(req.params.id, {
            	include: [{association: "brand"}, {association: "user"}] 
        })
        	.then(function(product){
                res.render('detalle', {product: product});
            })
    },
    borrar: function(req,res){
        db.Products.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect('/productos')
    }
}

module.exports = controller
