import BaseAxios from "../base_axios";
import ResHelper from "../ResHelper";

// 添加部员
export function addMember(form: {
  account: string;
  password: string;
  name: string;
  role_id: number;
}) {
  return BaseAxios({
    url: `/user`,
    method: "post",
    data: {
      ...form,
    },
  }).then(ResHelper);
}

// 查询所有部员
export function getAllMember() {
  return BaseAxios({
    url: `/user`,
    method: "get",
  }).then(ResHelper);
}

// 删除成员
export function deleteMember(account: string) {
  return BaseAxios({
    url: `/user`,
    method: "delete",
    params: {
      account: account,
    },
  });
}

// 修改成员
export function updateMember(form: {
  account: string;
  password: string;
  name: string;
  role_id: number;
  target: string;
}) {
  return BaseAxios({
    url: `/user`,
    method: "put",
    data: {
      ...form,
    },
  }).then(ResHelper);
}

export function loginApi(account: string, password: string) {
  return BaseAxios({
      url: `/user/loginAdmin`,
      method: "get",
      params: {
          account,
          password,
      },
  }).then(ResHelper);
}
export function updataTask(){
  return BaseAxios({
    url: `/assigning/updateAssinging`,
    method: "get",
  }).then(ResHelper)
}