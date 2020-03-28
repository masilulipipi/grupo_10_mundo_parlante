const locals = (req, res, next) => {
    res.locals.isAuthenticated = false;

    console.log(req.session.user);
    

    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;   
        
        //aca voy a poner que lea el rol de usuario
        res.locals.userRole = req.session.user.role

    }


    next();
}

module.exports = locals;