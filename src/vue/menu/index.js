import express from "express";
import sql from "../../../db/index.js";
const router = express.Router();
import { nanoid } from "nanoid";
import { addLog, addSuccessResult, addErrorResult } from "../../../utils/logUtil.js";

// 菜单列表
router.get("/list", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "菜单模块", type: '获取菜单列表', username: req.auth.username, req })

        const sqlStr = "select id, pid, fullname, path, sort, icon, component, type, status, keep_alive, permission_code from vue_menu where is_delete = 0"

        const [data] = await sql.query(sqlStr);
    
        const list = data?.map(v => {
            v.keepAlive = v.keep_alive
            v.permissionCode = v.permission_code
            delete v.keep_alive
            delete v.permission_code
            return v
        }).sort((a, b) => a.sort - b.sort)
        addSuccessResult({ id: logId })
        res.send({ code: 200, data: list, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 新增菜单
router.post("/add", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "菜单模块", type: '新增菜单', username: req.auth.username, req })

        const { body: { pid, fullname, path, sort, icon, component, type, status, keepAlive, permissionCode } } = req

        const [data] = await sql.query(
            "insert into vue_menu (pid, fullname, path, sort, icon, component, type, status, keep_alive, permission_code) values (?,?,?,?,?,?,?,?,?,?)",
            [pid, fullname, path, sort, icon, component, type, status, keepAlive, permissionCode]
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

// 菜单详情
router.get("/detail", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "菜单模块", type: '获取菜单详情', username: req.auth.username, req })

        const { query: { id } } = req

        const [data] = await sql.query(
            "select id, pid, fullname, path, sort, icon, component, type, status, keep_alive, permission_code from vue_menu where id = ? and is_delete = 0",
            [id]
        );
    
        if (data.length !== 0) {
            const list = data[0]
            list.keepAlive = list.keep_alive
            list.permissionCode = list.permission_code
            delete list.keep_alive
            delete list.permission_code
            addSuccessResult({ id: logId })
            res.send({ code: 200, data: list, message: "success" });
        } else {
            addErrorResult({ id: logId, result: "操作失败" })
            res.send({ code: 500, data: null, message: "fail" });
        }
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 修改菜单
router.post("/edit", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "菜单模块", type: '修改菜单', username: req.auth.username, req })

        const { body: { id, pid, fullname, path, sort, icon, component, type, status, keepAlive, permissionCode } } = req

        const [data] = await sql.query(
            "update vue_menu set pid = ?, fullname = ?, path = ?, sort = ?, icon = ?, component = ?, type = ?, status = ?, keep_alive = ?, permission_code = ? where id = ? and is_delete = 0",
            [pid, fullname, path, sort, icon, component, type, status, keepAlive, permissionCode, id]
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

// 删除菜单
router.post("/delete", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "菜单模块", type: '删除菜单', username: req.auth.username, req })

        const { body: { id } } = req

        const [data] = await sql.query(
            "update vue_menu set is_delete = 1 where id = ? or pid = ?",
            [id, id]
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

export default router;
