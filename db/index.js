import mysql2 from "mysql2/promise";
import fs from "node:fs";
import jsyaml from "js-yaml";
const yaml = fs.readFileSync("db/db.config.yaml", "utf8");
const config = jsyaml.load(yaml);

const sql = await mysql2.createConnection({
  ...config.db,
});

export default sql;
