function authMiddleware (req, res, next) {
	if (req.session.userd == undefined) {
		return res.redirect('/');
	}
	next();
}

module.exports = authMiddleware;