import mysql2 from "mysql2/promise";

const connectionConfig = {
  user: "root",
  password: "Bingtanghulu",
  port: 3306,
  database: "node_server",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 设置连接超时时间，单位为毫秒
  connectTimeout: 30000, // 30秒
  // 设置查询超时时间，单位为毫秒
  acquireTimeout: 30000, // 30秒
  // 设置空闲连接超时时间，单位为毫秒
  idleTimeout: 60000 // 60秒
}

const sql = await mysql2.createPool(connectionConfig);

export default sql;
