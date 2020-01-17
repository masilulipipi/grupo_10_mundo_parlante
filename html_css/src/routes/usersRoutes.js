// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//para guardar los datos en users.json***
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/avatars');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `user_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: storageDisk });


// ************ Controller Require ************
const usersController = require('../controllers/usersController');


/* GET - Register. */
router.get('/register', usersController.registerForm);

/* POST - Register. (con upload.single para subir un solo archivo) */
router.post('/register', upload.single('avatar'), usersController.store);

/* GET - Login. */
router.get('/login', usersController.loginForm);

/* POST - Login. */
router.post('/login', usersController.processLogin);

/* GET - Login. */
router.get('/profile', usersController.profile);

/* GET - /users/logout */
router.get('/logout', usersController.logout);


module.exports = router;