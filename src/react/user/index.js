import express from "express";
import sql from "../../../db/index.js";
import { decodeJWT } from "../../../utils/index.js";
// 导入jwt
import jwt from "jsonwebtoken";
// 导入 加密盐
import config from "../../../config.js";

const router = express.Router();

// 登录
router.post("/login", async (req, res) => {
    const { body: { username, password } } = req
    const [data] = await sql.query(
        "select id from react_user where username = ? and password = ? and is_delete = 0",
        [username, password]
    );
    if (data.length === 0) {
        res.send({ code: 500, data: null, message: "用户名或密码错误" });
        return;
    }
    const userInfo = data[0];
    const token =
        "Bearer " +
        jwt.sign(userInfo, config.secretKey, { expiresIn: config.expiresIn });
    res.send({ code: 200, data: { token }, message: "success" });
});


export default router;
