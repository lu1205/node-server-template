import express from "express";
import sql from "../../../db/index.js";
import { decodeJWT } from "../../../utils/index.js";
// 导入jwt
import jwt from "jsonwebtoken";
// 导入 加密盐
import config from "../../../config.js";
import { nanoid } from "nanoid";
import { addLog, addSuccessResult, addErrorResult } from "../../../utils/logUtil.js";
import { loginUserList } from "../loginUsers.js";

const router = express.Router();

// 登录
router.post("/login", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "用户模块", type: '登录', username: req.body.username, req })

        const { body: { username, password } } = req
        const [data] = await sql.query(
            "select * from vue_user where username = ? and password = ? and is_delete = 0",
            [username, password]
        );
        if (data.length === 0) {
            addErrorResult({ id: logId, result: '用户名或密码错误' })
            return res.send({ code: 500, data: null, message: "用户名或密码错误" });
        }
        const userInfo = data[0];
        if (userInfo.status === 1) {
            addErrorResult({ id: logId, result: '账号已停用，请联系管理员启用' })
            return res.send({ code: 500, data: null, message: "账号已停用，请联系管理员启用" });
        }
        const token =
            "Bearer " +
            jwt.sign(userInfo, config.secretKey, { expiresIn: config.expiresIn });
        loginUserList.set(userInfo.id, token)
        addSuccessResult({ id: logId })
        res.send({ code: 200, data: { token }, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 退出登录
router.get("/logout", async (req, res) => {
    const logId = nanoid()
    try {
        const auth = req.auth
        
        loginUserList.delete(auth.id)
        await addLog({ id: logId, module: "用户模块", type: '退出登录', username: auth.username, req })

        addSuccessResult({ id: logId })
        res.send({ code: 200, data: null, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 登录用户信息
router.get("/userInfo", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        const id = jwtInfo.id || ""

        await addLog({ id: logId, module: "用户模块", type: '登录用户信息', username: jwtInfo.username, req })

        if (!id) {
            addErrorResult({ id: logId, result: '用户未登录' })
            return res.send({ code: 500, data: null, message: "fail" });
        }

        const [data] = await sql.query(
            "select id, nickname, username, email, remark, status from vue_user where id = ? and is_delete = 0",
            [id]
        );

        if (data.length !== 0) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: data[0], message: "success" });
        } else {
            addErrorResult({ id: logId, result: '操作失败' })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 查询登录用户权限
router.get("/userPermission", async (req, res) => {
    const logId = nanoid()
    try {
        // 1. 解析 token
        const jwtInfo = decodeJWT(req.headers.authorization);

        await addLog({ id: logId, module: "用户模块", type: '查询登录用户权限', username: jwtInfo.username, req })

        let sqlStr = ''

        // 超级管理员
        if (Number(jwtInfo['is_admin']) === 1) {
            sqlStr = "select id, pid, fullname, path, icon, component, type, status, keep_alive from vue_menu where is_delete = 0"
        } else {
            // 普通用户
            // 获取 用户ID 和 用户角色ID
            const id = jwtInfo.id || ""
            if (!id) {
                addResult({ id: logId, result: '未登录' })
                return res.send({ code: 500, data: null, message: "fail" });
            }
            const userRoleArr = jwtInfo.rules?.split(',')
            if (!userRoleArr.length) {
                // 无角色权限
                addErrorResult({ id: logId, result: '角色权限' })
                return res.send({ code: 500, data: null, message: "fail" });
            }

            // 2. 通过 角色ID 查询 菜单权限ID
            const [permissionData] = await sql.query('select permissions from vue_role where id in (?)', [userRoleArr])
            if (!permissionData.length) {
                // 无菜单权限
                addErrorResult({ id: logId, result: '无菜单权限' })
                return res.send({ code: 500, data: null, message: "fail" });
            }
            // 3. 通过菜单ID, 查询用户菜单
            sqlStr = `select id, pid, fullname, path, icon, component, type, status, keep_alive from vue_menu where is_delete = 0 and id in (${permissionData})`
        }

        const [data] = await sql.query(sqlStr);

        const list = data?.map(v => {
            v.keepAlive = v.keep_alive
            delete v.keep_alive
            return v
        })
        addSuccessResult({ id: logId })
        res.send({ code: 200, data: list, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 查询用户列表
router.post("/list", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);

        await addLog({ id: logId, module: "用户模块", type: '查询用户列表', username: jwtInfo.username, req })

        const { query: { pageNum, pageSize }, body: { username, nickname } } = req

        let totalSql = "select count(id) as total from vue_user where is_delete = 0 and is_admin = 0"
        let sqlStr = "select id, nickname, username, email, remark, status from vue_user where is_delete = 0 and is_admin = 0"

        if (Number(jwtInfo['is_admin']) === 1) {
            totalSql = "select count(id) as total from vue_user where is_delete = 0"
            sqlStr = "select id, nickname, username, email, remark, status from vue_user where is_delete = 0"
        }

        if (username) {
            totalSql += ` and username like '%${username}%'`
            sqlStr += ` and username like '%${username}%'`
        }
        if (nickname) {
            totalSql += ` and nickname like '%${nickname}%'`
            sqlStr += ` and nickname like '%${nickname}%'`
        }

        const [totalData] = await sql.query(totalSql);
        const total = totalData[0].total

        sqlStr += ` limit ${(pageNum * 1 - 1) * pageSize},${pageSize * 1}`

        const [data] = await sql.query(sqlStr);

        // 分页
        // const list = data.slice((pageNum * 1 - 1) * pageSize, pageSize * 1)
        const list = data

        addSuccessResult({ id: logId })
        res.send({ code: 200, data: { total, list }, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 新增用户
router.post("/add", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);

        await addLog({ id: logId, module: "用户模块", type: '新增用户', username: jwtInfo.username, req })

        const { body: { nickname, username, password, email, remark, status } } = req

        // 查询用户名是否存在
        const [user] = await sql.query(
            "select id from vue_user where username = ? and is_delete = 0",
            [username]
        );
        if (user.length !== 0) {
            addErrorResult({ id: logId, result: '用户名已存在' })
            return res.send({ code: 500, data: null, message: "用户名已存在" });
        }
        const [data] = await sql.query(
            "insert into vue_user (nickname, username, password, email, remark, status) values (?,?,?,?,?,?)",
            [nickname, username, password, email, remark, status]
        );
        if (data.affectedRows === 1) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 查询用户详情
router.get("/detail", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '查询用户详情', username: jwtInfo.username, req })

        const { query: { id } } = req

        const [data] = await sql.query(
            "select id, nickname, username, email, remark, status from vue_user where id = ? and is_delete = 0",
            [id]
        );

        if (data.length !== 0) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: data[0], message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 修改用户详情
router.post("/edit", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '修改用户详情', username: jwtInfo.username, req })

        const { body: { id, nickname, username, email, remark, status } } = req

        // 查询是否为 超级管理员
        let [data] = await sql.query(
            "select id, is_admin from vue_user where id = ? and is_delete = 0 and is_admin = 1",
            [id]
        );
        if (data.length) {
            addErrorResult({ id: logId, result: "无权限" })
            return res.send({ code: 500, data: null, message: "无权限" });
        }

        [data] = await sql.query(
            "select id from vue_user where username = ? and id != ? and is_delete = 0",
            [username, id]
        );
        if (data.length !== 0) {
            addErrorResult({ id: logId, result: "用户名已存在" })
            return res.send({ code: 500, data: null, message: "用户名已存在" });
        }
        [data] = await sql.query(
            "update vue_user set nickname = ?, username = ?, email = ?, remark = ?, status = ? where id = ? and is_delete = 0 and is_admin = 0",
            [nickname, username, email, remark, status, id]
        );
        if (data.affectedRows === 1) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 启用 / 停用用户
router.post("/status", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '启用/停用用户', username: jwtInfo.username, req })

        const { body: { id, status } } = req

        // 查询是否为 超级管理员
        let [data] = await sql.query(
            "select id, is_admin from vue_user where id = ? and is_delete = 0 and is_admin = 1",
            [id]
        );
        if (data.length) {
            addErrorResult({ id: logId, result: "无权限" })
            return res.send({ code: 500, data: null, message: "无权限" });
        }

        [data] = await sql.query(
            "update vue_user set status = ? where id = ? and is_delete = 0",
            [status, id]
        );
        if (data.affectedRows === 1) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 删除用户
router.post("/delete", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '删除用户', username: jwtInfo.username, req })

        const { body: { id } } = req
        // 查询是否为 超级管理员
        let [data] = await sql.query(
            "select id, is_admin from vue_user where id = ? and is_delete = 0 and is_admin = 1",
            [id]
        );
        if (data.length) {
            addErrorResult({ id: logId, result: "无权限" })
            return res.send({ code: 500, data: null, message: "无权限" });
        }

        [data] = await sql.query(
            "update vue_user set is_delete = 1 where id = ? and is_admin = 0",
            [id]
        );

        if (data.affectedRows !== 0) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 批量删除用户
router.post("/batchDelete", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '批量删除用户', username: jwtInfo.username, req })

        const { body } = req

        // 查询是否为 超级管理员
        let [data] = await sql.query(
            "select id, is_admin from vue_user where id in (?) and is_delete = 0 and is_admin = 1",
            [body]
        );
        if (data.length) {
            addErrorResult({ id: logId, result: "无权限" })
            return res.send({ code: 500, data: null, message: "无权限" });
        }

        [data] = await sql.query(
            "update vue_user set is_delete = 1 where id in (?) and id != 1 and is_admin = 0",
            [body]
        );

        if (data.affectedRows !== 0) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 设置用户角色
router.post("/editRole", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "用户模块", type: '设置用户角色', username: jwtInfo.username, req })

        const { body: { id, roles } } = req

        // 查询是否为 超级管理员
        let [data] = await sql.query(
            "select id, is_admin from vue_user where id = ? and is_delete = 0 and is_admin = 1",
            [id]
        );
        if (data.length) {
            addErrorResult({ id: logId, result: "无权限" })
            return res.send({ code: 500, data: null, message: "无权限" });
        }

        [data] = await sql.query(
            "update vue_user set roles = ? where id = ? and is_admin = 0",
            [roles === '' ? null : roles?.join(','), id]
        );

        if (data.affectedRows === 1) {
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: null, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

export default router;
