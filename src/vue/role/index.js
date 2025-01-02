import express from "express";
import sql from "../../../db/index.js";
const router = express.Router();
import { nanoid } from "nanoid";
import { addLog, addSuccessResult, addErrorResult } from "../../../utils/logUtil.js";

// 获取所有角色
router.get("/all", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '获取所有角色', username: req.auth.username, req })

        const sqlStr = "select id, fullname from vue_role where is_delete = 0 and status = 0"
        const [data] = await sql.query(sqlStr);
        addSuccessResult({ id: logId })
        res.send({ code: 200, data, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 获取角色列表
router.post("/list", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '获取角色列表', username: req.auth.username, req })

        const { query: { pageNum, pageSize }, body: { fullname } } = req

        // let sqlStr = "select id, fullname, remark, permissions, status from vue_role where is_delete = 0"
        let sqlStr = `SELECT r.id, r.fullname, r.remark, r.permissions, r.status, GROUP_CONCAT(m.fullname SEPARATOR ',') AS permissionsName 
        FROM vue_role r 
        LEFT JOIN vue_menu m ON
        FIND_IN_SET(m.id, r.permissions) 
        AND m.type != 'B'
        WHERE r.is_delete = 0`

        if (fullname) {
            sqlStr += ` AND r.fullname LIKE '%${fullname}%'`
        }
        sqlStr += " GROUP BY id"

        const [data] = await sql.query(sqlStr);

        const total = data.length
        // 分页
        const list = data.splice((pageNum * 1 - 1) * pageSize, pageSize * 1)

        addSuccessResult({ id: logId })

        res.send({ code: 200, data: { total, list }, message: "success" });
    } catch (err) {
        addErrorResult({ id: logId, result: JSON.stringify(err) })
    }
});

// 新增角色
router.post("/add", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '新增角色', username: req.auth.username, req })

        const { body: { fullname, remark, status } } = req

        const [data] = await sql.query(
            "insert into vue_role (fullname,remark,status) values (?,?,?)",
            [fullname, remark, status]
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

// 角色详情
router.get("/detail", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '获取角色详情', username: req.auth.username, req })

        const { query: { id } } = req

        const [data] = await sql.query(
            "select id, fullname, remark, permissions, status from vue_role where id = ? and is_delete = 0",
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

// 权限详情
router.get("/permissionDetail", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '获取权限详情', username: req.auth.username, req })

        const { query: { id } } = req

        const [data] = await sql.query(
            "select id, permissions from vue_role where id = ? and is_delete = 0",
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

// 修改角色
router.post("/edit", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '修改角色', username: req.auth.username, req })

        const { body: { id, fullname, remark, status } } = req

        const [data] = await sql.query(
            "update vue_role set fullname = ?, remark = ?, status = ? where id = ? and is_delete = 0",
            [fullname, remark, status, id]
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

// 启用 / 停用
router.post("/status", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '切换角色状态', username: req.auth.username, req })

        const { body: { id, status } } = req

        const [data] = await sql.query(
            "update vue_role set status = ? where id = ? and is_delete = 0",
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

// 删除角色
router.post("/delete", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '删除角色', username: req.auth.username, req })

        const { body: { id } } = req

        const [data] = await sql.query(
            "update vue_role set is_delete = 1 where id = ?",
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

// 批量删除
router.post("/batchDelete", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '批量删除', username: req.auth.username, req })

        const { body } = req

        const [data] = await sql.query(
            "update vue_role set is_delete = 1 where id in (?)",
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

// 设置角色权限
router.post("/editPermissions", async (req, res) => {
    const logId = nanoid()
    try {
        await addLog({ id: logId, module: "角色模块", type: '设置角色权限', username: req.auth.username, req })

        const { body: { id, permissions } } = req

        const [data] = await sql.query(
            "update vue_role set permissions = ? where id = ?",
            [permissions === '' ? null : permissions?.join(','), id]
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
