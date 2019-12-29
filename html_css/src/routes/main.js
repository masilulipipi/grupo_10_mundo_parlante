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
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);
/* GET - productos. */
router.get('/productos', mainController.productos);
/* GET - detalle productos. */
router.get('/detalle/:id', mainController.detalle);
/* GET - carrito. */
router.get('/carrito', mainController.carrito);
/* GET - contacto. */
router.get('/contacto', mainController.contacto);
/* GET - Quienes Somos. */
router.get('/quienes-somos', mainController.about);
/* GET - Register. */
router.get('/register', mainController.registerForm);
/* POST - Register. (con upload.single para subir un solo archivo) */
router.post('/register', upload.single('avatar'), mainController.store);
/* GET - Login. */
router.get('/login', mainController.loginForm);
/* POST - Login. */
router.post('/login', mainController.processLogin);
/* GET - Login. */
router.get('/profile/:id', mainController.profile);


module.exports = router;
