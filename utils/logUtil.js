import dayjs from "dayjs";
import sql from "../db/index.js";

export const addLog = async (data) => {
    // console.log('123', data.req.originalUrl,data.req.baseUrl,data.req.path,data.req.method,data.req.route,data.req.auth);
  
    try {
      const createDate = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")
      let { id, module, type, username, req: { originalUrl, baseUrl, path, method, query, params, body } } = data
  
      if (typeof query === 'object') {
        query = query ? JSON.stringify(query) : ''
      }
      if (typeof params === 'object') {
        params = params ? JSON.stringify(params) : ''
      }
      if (typeof body === 'object') {
        body = body ? JSON.stringify(body) : ''
      }
      await sql.query(
        'insert into vue_logs (uuid, module, type, username, method, path, query, params, body, create_time) values (?,?,?,?,?,?,?,?,?,?)',
        [id, module, type, username, method, originalUrl, query, params, body, createDate]
      )
    } catch (e) {
      console.log(e);
    }
  }
  
  export const addSuccessResult = async (data) => {
    try {
      const { id, result = '' } = data
      const updateDate = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")
      await sql.query("update vue_logs set result = ?, update_time = ?, result_type = 1 where uuid = ?", [result, updateDate, id])
    } catch (e) {
      console.log(e);
    }
  }
  
  export const addErrorResult = async (data) => {
    try {
      const { id, result = '操作失败' } = data
      const updateDate = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")
      await sql.query("update vue_logs set result = ?, update_time = ?, result_type = 0 where uuid = ?", [result, updateDate, id])
    } catch (e) {
      console.log(e);
    }
  }