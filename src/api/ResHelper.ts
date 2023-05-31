/*
 * @Author: lzp
 * @Date: 2023-01-25 09:38:41
 * @LastEditors: lzp
 * @LastEditTime: 2023-01-26 16:02:02
 * @Description: 结果处理
 */
import { AxiosResponse } from "axios";
import { resHelperWhitelist } from "./../const";
export default (res: AxiosResponse) => {  
  // 特殊处理返回值为 Blob 的 Api eg:config.url:/test
  if (res.config.url && resHelperWhitelist.includes(res.config.url)) {
    return res.data;
  }
  // 按照你自己后端的字段来
  if (res.data.code === 400) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
