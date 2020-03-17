const db = require('../database/models');
const sequelize = db.sequelize;
 
/* Aca, adentro de las llaves va lo que hace el controlador */
const controller = {

/* aca definimos lo q hace el metodo USERS que pusimos en el Router */
    users:(req, res) => {
        /* Busca todos los usuarios en la base de datos */
     db.Users
       .findAll(
        
           {
               order: [
                ['id', 'DESC']
               ],
               attributes: ['first_name', 'last_name', 'email']
           }
       )
       .then(users => {
           /* En el resultado tambien le ponemos la URL de donde sacamos los datos y cuantos hay */
           let result = {  
               metadata: {
                   url: req.originalUrl,
                   quantity: users.length
               },
               /* Aca le decimos que nos traiga los datos encontrados */
               data: users
           }
           /* llamamos a result en el send, para que nos muestre los datos y lo q esta en metadata */
           return res.send(result);
       })
       .catch(error => console.log(error)); 
},
productos:(req, res) => {
        
    let totalAmount = ''
    
    db.Products
       .findAll(
        {
            order: [ ['id', 'DESC']],
            attributes: ['name', 'price', 'model', 'description', 'image'],
        }
       )
       
       
       .then(productos => {
           
        let result = {  
            metadata: {
                url: req.originalUrl,
                quantity: productos.length,                             
            },
            data: productos
        }
           return res.send(result);
       })
       .catch(error => console.log(error)); 
}



}


module.exports = controller