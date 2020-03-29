const prevPageMiddleware = (req, res, next) => {
   
    console.log("-------------------PASE POR EL MIDDLE PREVIOUS PAGE----------------------");
    
if(res.locals.isAuthenticated == false){

    if (!req.session.previousPage){
        /* creamos el array vacio para guardar los productos */
        req.session.previousPage = [];
    console.log("------------------ CREE EL ARRAY DE PREVIOUS PAGE ---------------------");
        }
        
        req.session.previousPage.push(req.originalUrl)
        console.log("-------------------GUARDE LA URL----------------------");
        console.log(req.session.previousPage);
        
        res.locals.previousPage = req.session.previousPage
        console.log("-------------------previousPage en LOCALS!----------------------");
        console.log(req.session.previousPage);
}
    next();
}

module.exports = prevPageMiddleware;