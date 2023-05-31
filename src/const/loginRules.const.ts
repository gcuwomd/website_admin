export const rules = {
    account: {
        required: true,
        message: "请输入账号",
        trigger: "blur",
    },

    password: {
        required: true,
        message: "请输入密码",
        trigger: ["blur"],
    },
};
