import BaseAxios from "../base_axios";
import ResHelper from "../ResHelper";

// 查询所有角色
export function getAllRole() {
  return BaseAxios({
    url: `/role`,
    method: "get",
  }).then(ResHelper);
}
