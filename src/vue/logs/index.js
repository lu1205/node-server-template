import express from "express";
import sql from "../../../db/index.js";

const router = express.Router();

// 查询日志列表
router.post("/list", async (req, res) => {
    const auth = req.auth

    const { query: { pageNum, pageSize }, body: { module } } = req

    let totalSql = `select count(id) as total from vue_logs where username = ${auth.username}`
    let sqlStr = `select ip, uuid, module, type, username, method, path, query, params, body, result_type, result, browser, os, create_time, update_time from vue_logs where username = ${auth.username}`

    if (Number(auth['is_admin']) === 1) {
        totalSql = 'select count(id) as total from vue_logs where 1 = 1'
        sqlStr = "select ip, uuid, module, type, username, method, path, query, params, body, result_type, result, browser, os, create_time, update_time from vue_logs where 1 = 1"
    }

    if (module) {
        totalSql += ` and module like '%${module}%'`
        sqlStr += ` and module like '%${module}%'`
    }

    sqlStr += ` order by create_time desc limit ${(pageNum * 1 - 1) * pageSize},${pageSize * 1}`

    const [totalData] = await sql.query(totalSql);

    const total = totalData[0].total

    const [data] = await sql.query(sqlStr);

    const list = data?.map(v => {
        v.resultType = v.result_type
        v.createTime = v.create_time
        v.updateTime = v.update_time
        delete v.result_type
        delete v.create_time
        delete v.update_time
        return v
    })

    res.send({ code: 200, data: { total, list }, message: "success" });
});


// 查询日志详情
router.get("/detail", async (req, res) => {
    const { query: { uuid } } = req

    const [data] = await sql.query(
        "select ip, uuid, module, type, username, method, path, query, params, body, result_type, result, browser, os, create_time, update_time from vue_logs where uuid = ?",
        [uuid]
    );

    const log = data?.map(v => {
        v.resultType = v.result_type
        v.createTime = v.create_time
        v.updateTime = v.update_time
        delete v.result_type
        delete v.create_time
        delete v.update_time
        return v
    })[0]

    if (data.length !== 0) {
        res.send({ code: 200, data: log, message: "success" });
    } else {
        res.send({ code: 500, data: null, message: "fail" });
    }
});

export default router;
