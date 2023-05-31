<script lang="ts" setup>
import { useRouter } from "vue-router";
import { loginApi } from "../api/user/index";
import { rules } from "../const/loginRules.const";
import { useMessage } from "naive-ui";
const message = useMessage();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const form = ref({
    account: "",
    password: "",
});
function onSubmit(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate((errors) => {
        if (!errors) {
            loginApi(form.value.account, form.value.password).then((res) => {
                if (res.code === 400) {
                    message.error(res.error);
                } else if (res.code === 200) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("account", form.value.account);
                    router.push({ name: "Index" });
                    message.success("登陆成功");
                }
            }).catch(err=>{
                message.error(err)
                
            });
        } else {
            message.error("请按要求填写");
        }
    });
}
</script>
<template>
    <div class="h-screen w-screen flex justify-center items-center">
        <n-card title="登录" size="medium" class="w-[400px] rounded-[15px]">
            <n-form :model="form" ref="formRef" :rules="rules">
                <n-form-item label="账号" path="account">
                    <n-input v-model:value="form.account" placeholder="账号" />
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input
                        type="password"
                        placeholder="密码"
                        v-model:value="form.password"
                    >
                    </n-input>
                </n-form-item>
                <n-button type="primary" @click="onSubmit" class="w-full"
                    >登录
                </n-button>
            </n-form>
        </n-card>
    </div>
</template>
<style lang="scss" scoped></style>
