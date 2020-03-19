const originalUrl = (req, res, next) => {
    
    req.session.referrer = req.protocol + '://' + req.get('host') + req.originalUrl;
  
    console.log("- - - - - - - - - - - - - - "+req.session.referrer);
    
    next();
}
module.exports = originalUrl;
