const locals = (req, res, next) => {
    res.locals.isAuthenticated = false;
    res.locals.userID = "";
    res.locals.userAvatar ="";
    res.locals.userName = "";
    console.log(req.session.user);
    

    if (req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;   
        
        //aca voy a poner que lea el rol de usuario
        res.locals.userRole = req.session.user.role
        res.locals.userID = req.session.user.id
        res.locals.userAvatar = req.session.user.avatar
        res.locals.userName = req.session.user.first_name
    }


    next();
}

module.exports = locals;