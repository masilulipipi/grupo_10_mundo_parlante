const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const sequelize = db.sequelize;
let { check, validationResult, body } = require('express-validator');

// Constants
const userFilePath = __dirname + '/../data/users.json';


const controller = {
	registerForm: (req, res) => {
		
			res.render('register');
			
			
	},
	store: (req, res) => {
		let errors = (validationResult(req));
			console.log(errors);
			
		if (errors.isEmpty()) {


				const userData = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,				
					avatar: req.file.filename,
				}
				console.log(" - - - - - - - - - user data - - - - - - - - - - - - -")
				console.log(userData)

				db.Users.findOne({
					where: {
						email: req.body.email
					}
				})
				//aca convierto la contraseña en cifrado
				.then(users => {
					
					/* si no me encuentra al usuario */
					if (!users) {
						bcrypt.hash(req.body.password, 10, (err, hash) => {
							userData.password = hash
						db.Users
						.create(userData)
						.then(users => {
							
							res.render('login');
						})
						.catch(error => console.log(error));
						})
					}else{
						res.render('register', {users})
					}
				})
		
	} else {
			res.render('register', {errors: errors.errors})
		}
	},
	loginForm:(req, res) => {
			res.render('login');
		
	},
	processLogin: (req, res) => {
	
		db.Users
			.findAll({
				where: {
				  email: req.body.email,
				}
			}) 
			.then(function(user){
								
				if (user[0] != undefined) {
					
					// Al ya tener al usuario, comparamos las contraseñas
					if (bcrypt.compareSync(req.body.password, user[0].password)) {
						delete user[0].password;
						//guarda en sesion el usuario
						req.session.user = user[0];
						// Setear la cookie
						if (req.body.remember_user) {
							res.cookie('userIdCookie', user[0].id, { maxAge: 60000 * 60 });
						}		
						
						//si el mdw previous tiene product, lo suma al carrito
						if (res.locals.previousPage.includes('/productos')){

							//aca buscamos la pos del array en donde esta la url con el id del prod.
							let lastUrl = res.locals.previousPage.length - 2
							console.log("posicion URL",lastUrl);
							
							//guardamos esa url en una variable para q sea un string
							let strUrl = res.locals.previousPage[lastUrl]
							console.log("string URL", strUrl);

							//armo una nueva variable que va a contener solo los 2 ultimos digitos del string
							let prodId = strUrl.slice((strUrl.length - 2), strUrl.length);
							console.log("string SLICE", prodId);

							//le paso el id del prodcuto al carrito
							req.session.cart.push(prodId);
							console.log(req.session.cart);

							// Redireccionamos al carrito para q vea su producto
							res.redirect('/carrito'); 	
							
						}

						// Redireccionamos al visitante a su perfil
						 res.redirect('/users/profile/'+user[0].id); 	
						//}
						
					} else {
						res.render('credenciales-invalidas');
					}
				} else {
					res.render('nouser', {email: req.body.email}	);
				} 
            })                 
	},

	profile: (req, res) => {
		
		/* let userLogged = req.session.user */
		
		db.Users
			.findByPk(req.params.id)
        	.then(function(user){
                res.render('profile', {user: user});
            })
		
	},
	edit: function(req, res){
        db.Users.findByPk(req.params.id)
		
		    .then(function(user){
				
                res.render('editarUser', {user:user});
            })  
	},
	update: function(req,res){

		    db.Users.update({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			/* avatar: req.file.filename */
        },{
            where: {
                id: req.params.id
            }
        }).then(userUpdated => {
			
			res.redirect('/users/profile/'+req.params.id)
		})
		.catch(error => console.log(error));
    },
    logout: (req, res) => {
		// Destruir la session
		req.session.destroy();
		// Destruir la cookie
		res.cookie('userIdCookie', null, { maxAge: 1 });
		return res.redirect('/');
	},
	show:(req, res) => {
		db.Users
			.findAll(
				{
					order: [
					 ['id', 'DESC']
					]
				}
			)
			.then(users => {
				return res.render('listado', { users });
			})
			.catch(error => console.log(error));
	},
	borrarUser: function(req,res){
        db.Users.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect('/users/listado')
    }
}

module.exports = controller
