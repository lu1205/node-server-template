import express from "express";
import { decodeJWT } from "../../../utils/index.js";
import { nanoid } from "nanoid";
import {
  addLog,
  addSuccessResult,
  addErrorResult,
} from "../../../utils/logUtil.js";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 获取文件内容(返回文件流)
router.get("/getFileStream", async (req, res) => {
  const logId = nanoid();
  try {
    const jwtInfo = decodeJWT(req.headers.authorization);
    await addLog({
      id: logId,
      module: "其他模块",
      type: "获取文件内容",
      username: jwtInfo.username,
      req,
    });
    // const fileName = "Navicat16-注册机.zip";
    const fileName = "jdk1.8.exe";
    const pathDir = path.join(process.cwd(), "public", fileName);
    // 设置响应头
    res.setHeader("Content-Type", "application/octet-stream");
    // 返回文件名, 解决下载文件名中文乱码问题
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`);
    res.setHeader("Content-Length", fs.statSync(pathDir).size);

    // 读取文件流
    const stream = fs.createReadStream(pathDir);
    stream.pipe(res);
  } catch (err) {
    addErrorResult({ id: logId, result: JSON.stringify(err) });
    res.send({ code: 500, data: null, message: "fail" });
  }
});

export default router;
