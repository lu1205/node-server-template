import mysql2 from "mysql2/promise";

const connectionConfig = {
  user: "root",
  password: "Bingtanghulu",
  port: 3306,
  database: "node_server"
}

const sql = await mysql2.createConnection(connectionConfig);

export default sql;
