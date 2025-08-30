
import express from 'express'
const router = express.Router()
import {signupController} from '../Controllers/AuthController.js'
import {loginController} from '../Controllers/AuthController.js'

import {signupValidation} from '../Middlewares/AuthValidation.js'
import { loginValidation } from '../Middlewares/AuthValidation.js'

router.post('/login', loginValidation, loginController )

router.post('/signup', signupValidation  ,signupController)


export default router