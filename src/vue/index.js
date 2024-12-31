import express from "express";

const vueRouter = express.Router();

import userRouter from './user/index.js'
import roleRouter from './role/index.js'
import menuRouter from './menu/index.js'
import logsRouter from './logs/index.js'

// 用户鉴权中间件（校验用户是否登录）
import { loginUserList as VueLoginUserList } from './loginUsers.js'
const NotAuthUrlList = ['/vue/user/login']
const AuthMiddleWare = ((req, res, next) => {
    if (!NotAuthUrlList.includes(req.originalUrl)) {
        if (!VueLoginUserList.has(req.auth.id)) {
            return res.send({ code: 403, message: "身份认证失败" });
        }
    }
    next()
});

vueRouter.use('/user', AuthMiddleWare, userRouter)
vueRouter.use('/role', AuthMiddleWare, roleRouter)
vueRouter.use('/menu', AuthMiddleWare, menuRouter)
vueRouter.use('/logs', AuthMiddleWare, logsRouter)

export default vueRouter
