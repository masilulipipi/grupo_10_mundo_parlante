// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//para guardar los datos en productos.json***
const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/productos');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `product_avatar_${Date.now()}${path.extname(file.originalname)}`;
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
/* GET - productos. */
router.get('/productosAdd', mainController.productosAdd);

/* POST - productos add. */
router.post('/productosAdd', upload.single('avatar'), mainController.processProductosAdd);

/* GET - detalle productos. */
router.get('/productos/detalle/:id', mainController.detalle);

/* GET - carrito. */
router.get('/carrito', mainController.carrito);

/* GET - contacto. */
router.get('/contacto', mainController.contacto);

/* GET - Quienes Somos. */
router.get('/quienes-somos', mainController.about);



module.exports = router;
