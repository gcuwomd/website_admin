/*
 * @Author: lzp
 * @Date: 2023-01-25 09:38:41
 * @LastEditors: lzp
 * @LastEditTime: 2023-02-26 08:04:48
 * @Description: 配置文件
 */
// Axios 配置
export let BASE_URL = "http://43.139.117.216:3001/";
// 需要特殊处理的白名单 例如:这个 Api 的返回值是 Blob
export const resHelperWhitelist: [String] = ["/Excel"];
// 环境判定
switch (import.meta.env.MODE) {
  // 开发环境
  case "development":
    BASE_URL = "http://43.139.117.216:3001/";
    break;
  // 生产环境
  case "production":
    BASE_URL = "http://43.139.117.216:3001/";
    break;
}

// 404 页配置
// 重定向定时 (单位:秒)
export const NOT_FOUND_COUNT_DOWN_TIME: number = 3;

export const NOT_TOKEN_URL = ["/user/login"];
export const TOKEN_NAME = "Authorization";
export const TOKEN_PREFIX = "Bearer ";
