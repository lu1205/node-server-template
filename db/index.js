import mysql2 from "mysql2/promise";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import dotenv from 'dotenv';
const argv = yargs(hideBin(process.argv)).parse()
dotenv.config({ path: argv.envFile || './.env' });

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
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
