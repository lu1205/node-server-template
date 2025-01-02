import express from "express";
import useragent from 'express-useragent'
const app = express();

// 配置 useragent 中间件
app.use(useragent.express())

// 配置解析JSON数据的中间件
app.use(express.json());

// 配置解析 token 的中间件  -- 在路由之前
import { expressjwt } from "express-jwt";
import config from "./config.js";
app.use(
  expressjwt({ secret: config.secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/(vue|react)\/user\/(login)/],
  })
);

// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 身份认证失败
  if (err.name === "UnauthorizedError")
    return res.send({ code: 403, message: "身份认证失败" });
  // 未知的错误
  return res.send({ code: 500, message: JSON.stringify(err) });
  // next()
});

// 使用全局前缀
const vuePrefix = '/vue';
const reactPrefix = "/react"
import vueRouter from "./src/vue/index.js";
import reactRouter from "./src/react/index.js";
app.use(vuePrefix, vueRouter);
app.use(reactPrefix, reactRouter);

app.listen(3007, () => {
  console.log("http://127.0.0.1:3007");
});