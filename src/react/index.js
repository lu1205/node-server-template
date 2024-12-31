import express from "express";

const reactRouter = express.Router();

import userRouter from './user/index.js'
import menuRouter from './menu/index.js'

reactRouter.use('/user',userRouter)
reactRouter.use('/menu',menuRouter)

export default reactRouter
