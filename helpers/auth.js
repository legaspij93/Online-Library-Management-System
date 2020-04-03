module.exports = {
    ensureAuthenticated: function(req,res, next){
        if(req.isAuthenticated() && req.user.userType == 3){
            return next();
        }
        res.redirect("/user/login")
    }
}