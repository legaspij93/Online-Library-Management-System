module.exports = {
    ensureAuthenticated: function(req,res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else {
            res.redirect("/user/login")
        }
    },
    ensureAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.userType == 1){
            return next()
        }
        res.redirect("/user/logout")
    },
    ensureManager: function(req,res,next){
        if(req.isAuthenticated() && req.user.userType == 2){
            return next()
        }
        res.redirect("/user/logout")
    }
}