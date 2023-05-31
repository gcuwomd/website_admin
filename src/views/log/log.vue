<script setup lang="ts">
import { get } from "@vueuse/core";
import { getLogMessage } from "../../api/log";
const page = ref();
const columns = [
    {
        title: "时间",
        key: "time",
    },
    {
        title: "帐号",
        key: "name",
    },
    {
        title: "网址",
        key: "url",
    },
    {
        title: "状态",
        key: "statusName",
    },
    {
        title: "信息",
        key: "message",
    },
];
const total = ref();
onMounted(async () => {
    await getLogMessage(1).then((res) => {
        data.value=[]
        data.value = res.data;
        pagination.itemCount=res.total
    });
});
const data = ref([]);
const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
    itemCount: 1,
    prefix({ itemCount }: any) {
        return `total is ${itemCount}`;
    },
});
function updataPageIndex(currentpage:number){
    getLogMessage(currentpage)
    .then((res)=>{
        data.value = res.data
        pagination.itemCount=res.total
        pagination.page=currentpage
        
    })
}
function updatePagSize(){

}
</script>
<template>
    <div class="p-30px">
        <n-data-table
            :remote="true"
            :columns="columns"
            :data="data"
            max-height="550"
            :pagination="pagination"
            :total-item="total"
            @update:page="updataPageIndex"
            @updata:page-size="updatePagSize"
        />
        <!-- <n-pagination  :item-count="total"/> -->
    </div>
</template>
<style scoped></style>
