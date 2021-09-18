module.exports = {
    auth : (req, res, next) => {
       if(req.isAuthenticated()) {
           next()
       }else {
           res.status(400).send("you need to login first")
       }
    }
}