
import { nanoid } from "nanoid";
import svgCaptcha from "svg-captcha";
import { captchaMap } from '../src/react/RedisMock.js'

svgCaptcha.options.width = 80;
svgCaptcha.options.height = 36;
svgCaptcha.options.fontSize = 44;

// 生成验证码
export const genCaptcha = () => {
    const uuid = nanoid()
    const captchaData = svgCaptcha.create()
    return { uuid, captchaData }
}

// 验证码失效时间间隔（1分钟）
export const expiresIn = 60*60 * 1000

let captchaInterval = null

captchaInterval && clearInterval(captchaInterval);

captchaInterval = setInterval(() => {
    // console.log(captchaMap.size);

    const now = Date.now();
    captchaMap.forEach((value, key) => {
        if (now - value.timestamp > expiresIn) {
            console.log("删除", key, captchaMap);
            captchaMap.delete(key);
        }
    });
}, expiresIn);

// 校验验证码
export const verifyCaptcha = (uuid, captcha) => {
    const captchaInfo = captchaMap.get(uuid);
    // 验证码失效（不存在或1分钟）
    if (
      !captchaInfo ||
      Date.now() - captchaInfo.timestamp > expiresIn
    ) {
      return {
        flag: false,
        msg: "验证码已失效，请重新获取验证码",
      };
    }
  
    if (!captcha) {
      return {
        flag: false,
        msg: "请输入验证码",
      };
    }
  
    if (captchaInfo.text === captcha) {
      return {
        flag: true,
        msg: "验证码正确",
      };
    }
    return {
      flag: false,
      msg: "验证码错误",
    };
  };