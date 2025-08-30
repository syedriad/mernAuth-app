import jwt from 'jsonwebtoken'


const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.status(403)
            .json("Msg unauthorized, JWT token is required")
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401)
            .json({MSG: "Msg unauthorized, JWT token is required"})
    }
}

export default ensureAuthenticated