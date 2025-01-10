import express from "express";

const reactRouter = express.Router();

import userRouter from './user/index.js'
import roleRouter from './role/index.js'
import menuRouter from './menu/index.js'
import logsRouter from './logs/index.js'

reactRouter.use('/user',userRouter)
reactRouter.use('/role',roleRouter)
reactRouter.use('/menu',menuRouter)
reactRouter.use('/logs',logsRouter)

export default reactRouter
