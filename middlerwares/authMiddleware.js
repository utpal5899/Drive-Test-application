const UserData = require('../modules/UserData')
module.exports = (req, res, next) => {
UserData.findById(req.session.userId, (error, user ) =>{
if(error || !user )
return res.redirect('/')
next()
})
}