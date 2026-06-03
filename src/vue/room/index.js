import express from "express";
import sql from "../../../db/index.js";
import { decodeJWT } from "../../../utils/index.js";
import { nanoid } from "nanoid";
import { addLog, addSuccessResult, addErrorResult } from "../../../utils/logUtil.js";

const router = express.Router();

// 查询房间列表
router.post("/list", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);

        await addLog({ id: logId, module: "房间模块", type: '查询房间列表', username: jwtInfo.username, req })

        const { query: { pageNum, pageSize }, body: { name } } = req

        let totalSql = "select count(id) as total from vue_room where is_delete = 0"
        let sqlStr = "select id, name, seats, seat_rows as seatRows, seat_cols as seatCols, remark from vue_room where is_delete = 0"

        if (name) {
            totalSql += ` and name like '%${name}%'`
            sqlStr += ` and name like '%${name}%'`
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

// 新增房间
router.post("/add", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);

        await addLog({ id: logId, module: "房间模块", type: '新增房间', username: jwtInfo.username, req })

        const { body: { name, remark } } = req

        // 查询房间名是否存在
        const [room] = await sql.query(
            "select id from vue_room where name = ? and is_delete = 0",
            [name]
        );
        if (room.length !== 0) {
            addErrorResult({ id: logId, result: '房间名已存在' })
            return res.send({ code: 500, data: null, message: "房间名已存在" });
        }
        const [data] = await sql.query(
            "insert into vue_room (name, remark) values (?,?)",
            [name, remark]
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

// 查询房间详情
router.get("/detail", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '查询房间详情', username: jwtInfo.username, req })

        const { query: { id } } = req

        const [data] = await sql.query(
            "select id, name, remark from vue_room where id = ? and is_delete = 0",
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

// 修改房间详情
router.post("/edit", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '修改房间详情', username: jwtInfo.username, req })

        const { body: { id, name, remark } } = req
        
        let [data] = await sql.query(
            "select id from vue_room where name = ? and id != ? and is_delete = 0",
            [name, id]
        );
        if (data.length !== 0) {
            addErrorResult({ id: logId, result: "房间名已存在" })
            return res.send({ code: 500, data: null, message: "房间名已存在" });
        }
        [data] = await sql.query(
            "update vue_room set name = ?, remark = ? where id = ? and is_delete = 0",
            [name, remark, id]
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

// 删除房间
router.post("/delete", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '删除房间', username: jwtInfo.username, req })

        const { body: { id } } = req

        let  [data] = await sql.query(
            "update vue_room set is_delete = 1 where id = ?",
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

// 批量删除房间
router.post("/batchDelete", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '批量删除房间', username: jwtInfo.username, req })

        const { body } = req

        let [data] = await sql.query(
            "update vue_room set is_delete = 1 where id in (?)",
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

// 添加座位图
router.post("/addSeatMap", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '添加座位图', username: jwtInfo.username, req })

        const { body: { id, seats, seatRows, seatCols, seatMap } } = req

        let [data] = await sql.query(
            "update vue_room set seats = ?, seat_rows = ?, seat_cols = ?, seat_map = ? where id = ? and is_delete = 0",
            [seats, seatRows, seatCols, seatMap, id]
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
})

// 获取座位图
router.get("/getSeatMap", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '获取座位图', username: jwtInfo.username, req })
        const { id } = req.query

        let [data] = await sql.query(
            "select id, name, seats, seat_rows as seatRows, seat_cols as seatCols, seat_map as seatMap from vue_room where id = ? and is_delete = 0",
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
})

// 更新座位图
router.post("/updateSeatMap", async (req, res) => {
    const logId = nanoid()
    try {
        const jwtInfo = decodeJWT(req.headers.authorization);
        await addLog({ id: logId, module: "房间模块", type: '更新座位图', username: jwtInfo.username, req })
        const { body: { id, seats, seatRows, seatCols, seatMap } } = req

        let [data] = await sql.query(
            "update vue_room set seats = ?, seat_rows = ?, seat_cols = ?, seat_map = ? where id = ? and is_delete = 0",
            [seats, seatRows, seatCols, seatMap, id]
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
})


export default router;
