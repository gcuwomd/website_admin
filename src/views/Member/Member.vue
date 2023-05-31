<script lang="tsx" setup>
import { updataTask } from "../../api/user";
import {getAllMember} from "../../api/user"
const showModal = ref(false);
const message = useMessage();
const columns = [
  {
    title: "账号",
    key: "account",
  },
  {
    title: "密码",
    key: "password",
  },
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "角色",
    key: "role_name",
  },
  {
    title: "操作",
    key: "action",
    render(row: any) {
      return (
        <div class="space-x-2">
          <n-button type="info" dashed onClick={() => editMember(row)}>
            编辑
          </n-button>
          <n-button
            type="error"
            dashed
            onClick={() => removeMember(row.account)}
          >
            删除
          </n-button>
        </div>
      );
    },
  },
];
const mode = ref(true);
const title=ref("添加部员")
const data = ref([
  {
    account: "无",
    password: "无",
    name: "无",
    role_name: "无",
  },
]);

function refreshData() {
  getAllMember().then((res) => {
    data.value = res.data;
    console.log(res.dashed);
    
    
  });
}
refreshData();
function removeMember(account: string) {
  deleteMember(account).then((res: any) => {
    if (res.data.code === 200) {
      message.success("删除成功");
      refreshData();
    } else {
      message.error("删除失败");
    }
  });
}
const editValue = ref<any>({});
function editMember(data: any) {
  title.value="编辑信息"
  showModal.value = true;
  mode.value = false;
  editValue.value = data;
}
function addMember(){
  title.value="添加部员"
  showModal.value = !showModal.value;
              mode.value = true;
}
function finish() {
  showModal.value = !showModal.value;
  refreshData();
}
const updataAllocation = ()=>{
  updataTask().then((res)=>{
    
    
    message.success("任务更新成功")
    
  })
}
</script>
<template>
  <div class="p-32px">
    <n-space vertical class="space-y-xl">
      <n-space  justify="space-between">
        <n-button type="primary"  @click="updataAllocation">更新任务分配</n-button>
        <n-button
          circle
          type="success"
          @click="addMember"
        >
          <template #icon>
            <div class="i-material-symbols:add"></div>
          </template>
        </n-button>
      </n-space>
      <n-data-table :columns="columns" :data="data"  :remote="true" :max-height="550" />
      <!-- <n-spac justify="end">
        <n-button type="primary">更新网站</n-button>
      </n-spac> -->
    </n-space>
  </div>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <AddMenber :mode="mode" :data="editValue" @finish="finish"></AddMenber>
    </n-card>
  </n-modal>
</template>
<style lang="scss" scoped></style>
