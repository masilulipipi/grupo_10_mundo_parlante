const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../database/models');
const sequelize = db.sequelize;

// Constants
const userFilePath = __dirname + '/../data/users.json';


const controller = {
	registerForm: (req, res) => {
        
            res.render('register',);
	},
	store: (req, res) => {
		/* let userFinalData = {
			id: generateUserId(),
			name: req.body.first_name,
			lastname: req.body.last_name,
			email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
			bio:req.body.bio,
			avatar: req.file.filename
		};
		
		// Guardar al usario
		storeUser(userFinalData);
		
		// Redirección al login
		res.redirect('/users/login');
		console.log(userFinalData); */
		db.Users
		.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),				
			avatar: req.file.filename,
		})
		.then(userSaved => {
			
			res.redirect('/users/login');
		})
		.catch(error => console.log(error)); 
	},
	loginForm:(req, res) => {
	
		/* let userLogged = getUserById(req.session.userId); */
		/* let userLogged = db.Users.findByPk(req.session.userId)
		.then(resultado => {
			return req.session.user = resultado}); */
		//res.send('Página de login'); ** ESTO ES PARA COMPROBAR SI ANDA
		res.render('login');
		
	},
	processLogin: (req, res) => {
		/* const isLogged = req.session.userId ? true : false; */
		// Buscar usuario por email
		/* let user = getUserByEmail(req.body.email); */
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
						//hace disponible el usuario a las vistas
						/* res.locals.user = req.session.user; */
						// Setear la cookie
						if (req.body.remember_user) {
							res.cookie('userIdCookie', user[0].id, { maxAge: 60000 * 60 });
						}		
						
						// Redireccionamos al visitante a su perfil
						 res.redirect('/users/profile/'+user[0].id); 	
						 
						
					} else {
						res.render('credenciales-invalidas');
					}
				} else {
					res.render('nouser');
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
				return res.render('listadoUsers', { users });
			})
			.catch(error => console.log(error));
	}
}

module.exports = controller
