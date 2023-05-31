<script setup lang="ts">
import { ref } from "vue";
const addFormRef = ref();
const initValue = { account: "", password: "", name: "", role_id: 0 };
const addMemberForm = ref({ ...initValue });
const options = ref<{ label: string; value: number }[]>([]);
const rules = {
  account: {
    required: true,
    message: "请输入账号",
    trigger: ["blur", "input"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["blur", "input"],
  },
  name: { required: true, message: "请输入姓名", trigger: ["blur", "input"] },
  role_id: {
    type: "number",
    required: true,
    message: "请选择角色",
    trigger: ["blur", "change"],
  },
};

getAllRole().then((res) => {
  options.value = res.data.map((item: { id: number; name: string }) => {
    return { label: item.name, value: item.id };
  });
  addMemberForm.value.role_id = options.value[0].value;
  initValue.role_id = options.value[0].value;
});
const message = useMessage();
const emit = defineEmits<{
  (e: "finish"): void;
}>();
const props = defineProps<{
  mode: Boolean;
  data: {
    name: string;
    account: string;
    password: string;
    role_name: string;
    role_id: number;
  };
}>();
if (!props.mode) {
  const { role_name, ...data } = props.data;
  addMemberForm.value = data;
}
function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  addFormRef.value?.validate((errors: any) => {
    if (!errors) {
      if (props.mode) {
        // 添加
        addMember(addMemberForm.value).then((res) => {
          if (res.code === 200) {
            message.success("成功添加部员");
            addMemberForm.value = initValue;
            emit("finish");
          } else {
            message.error("发生错误" + res);
          }
        });
      } else {
        // 修改
        updateMember({
          ...addMemberForm.value,
          target: props.data.account,
        }).then((res) => {
          if (res.code === 200) {
            message.success("成功修改部员信息");
            addMemberForm.value = initValue;
            emit("finish");
          } else {
            message.error("发生错误" + res);
          }
        });
      }
    } else {
      console.log(errors);
      message.error("验证失败,请认真填写！");
    }
  });
}
</script>
<template>
  <n-form ref="addFormRef" :model="addMemberForm" :rules="rules">
    <n-form-item path="account" label="账号">
      <n-input v-model:value="addMemberForm.account" placeholder="请输入账号" />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <n-input
        v-model:value="addMemberForm.password"
        type="password"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-form-item path="name" label="姓名">
      <n-input v-model:value="addMemberForm.name" placeholder="请输入姓名" />
    </n-form-item>
    <n-form-item path="role_id" label="角色">
      <n-select
        v-model:value="addMemberForm.role_id"
        placeholder="请选择角色"
        :options="options"
      />
    </n-form-item>
  </n-form>

  <n-button
    type="primary"
    @click="handleValidateButtonClick"
    style="width: 100%"
    >确认</n-button
  >
</template>
