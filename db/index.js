import mysql2 from "mysql2/promise";

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "Bingtanghulu",
  port: 3306,
  database: "node_server",
  // 设置是否等待连接
  waitForConnections: true,
  // 设置最大连接数
  connectionLimit: 10,
  // 设置最大队列连接数
  queueLimit: 0,
  // 设置连接超时时间，单位为毫秒
  connectTimeout: 30000, // 30秒
  // 设置空闲连接超时时间，单位为毫秒
  idleTimeout: 60000, // 60秒
  // 设置最大空闲连接数
  maxIdle: 10
}

const sql = await mysql2.createPool(connectionConfig);

export default sql;
