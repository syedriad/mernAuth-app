import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../Models/User-model.js'



const signupController = async (req,res)=>{   // async because database actions are asynchronous
    try {
        const {name, email, password} = req.body   // extract name, email, password from request body
        const user = await userModel.findOne({email})  // check if a user already exists with that email

        if(user){  // if user exists, stop here
            return res.status(409)  // 409 = conflict
            .json({message: "User already exist, you can login", success: false })
        }

        const newUserModel =  new userModel({name, email, password})  // create new user object
        newUserModel.password = await bcrypt.hash(password, 10)   // hash password with saltRounds = 10
        await newUserModel.save()   // save the new user to MongoDB

        res.status(201)   // 201 = created
        .json({
            message: "SignUp Success",
            success: true
        })

    } catch (error) {    // if anything fails (DB error, hashing error, etc.)
            res.status(500)   // 500 = server error
        .json({
            message: "Internal Server Error",
            success: false     // typo fixed (you wrote flase)
        })
    }
}



const loginController = async (req,res)=>{
    try {
        const {email, password} = req.body   // get email & password from user request
        const user = await userModel.findOne({email})  // find user in DB by email
        const errorMsg = "Authentication failed - wrong email or password"

        if(!user){   // if user not found
            return res.status(403)   // 403 = forbidden
            .json({message: errorMsg, success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password)  
        // compare entered password with stored (hashed) password

        if(!isPassEqual){   // if password doesn't match
            return res.status(403)
            .json({message: errorMsg, success: false })
        }

        // if password is correct, create JWT token
        const jwtToken = jwt.sign(
                {email:user.email, _id: user._id},  // payload (data inside token)
                process.env.JWT_SECRET,             // secret key (stored in .env file)
                {expiresIn: '24h'}                  // token expiration
        )

        res.status(200)
        .json({
            message: "Login Success",   // small correction (you had "SignUp Success" here 😅)
            success: true,
            jwtToken,   // send back token so frontend can use it for authentication
            email,
            name: user.name
        })

    } catch (error) {
            res.status(500)
        .json({
            message: "Internal Server Error",
            success: false
        })
    }
}


export { signupController, loginController }