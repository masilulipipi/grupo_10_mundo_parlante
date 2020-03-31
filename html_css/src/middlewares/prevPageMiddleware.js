const prevPageMiddleware = (req, res, next) => {
   
    console.log("-------------------PASE POR EL MIDDLE PREVIOUS PAGE----------------------");
    
if(res.locals.isAuthenticated == false){

    if (!req.session.previousPage){
        /* creamos el array vacio para guardar los productos */
        req.session.previousPage = [];
    console.log("------------------ CREE EL ARRAY DE PREVIOUS PAGE ---------------------");
        }
        
        if(req.originalUrl == '/productos/js/popper.js'){
            req.session.previousPage = req.session.previousPage
        } else if (req.originalUrl == '/productos/js/bootstrap.min.js'){
            req.session.previousPage = req.session.previousPage
        } else if (req.originalUrl == '/productos/js/jquery.js'){
            req.session.previousPage = req.session.previousPage
        } else if (req.originalUrl == '/js/popper.min.js.map'){
            req.session.previousPage = req.session.previousPage
        } else if (req.originalUrl == '/js/bootstrap.min.js.map'){
            req.session.previousPage = req.session.previousPage
        } else {
            req.session.previousPage.push(req.originalUrl)
            console.log("-------------------GUARDE LA URL----------------------");
            console.log(req.session.previousPage);
        }
        
        res.locals.previousPage = req.session.previousPage
        console.log("-------------------previousPage en LOCALS!----------------------");
        console.log(req.session.previousPage);
}
    next();
}

module.exports = prevPageMiddleware;