const expressjwt = require('express-jwt')

function authjwt(){
    const secret = process.env.secret
   return expressjwt({
       secret,
       algorithms:['HS256']
   })
}
module.exports = authjwt;