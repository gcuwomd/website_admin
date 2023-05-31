<script lang="tsx" setup>
import { RouterLink } from "vue-router";

const menuOptions: MenuOption[] = [
  {
    label: "网站检查系统后台",
    key: "a-wild-sheep-chase",
    disabled: true,
  },
  {
    label: "管理面板",
    key: "administrative_panel",
    children: [
      {
        type: "group",
        label: "成员管理",
        key: "people",
        children: [
          {
            label: () => (
              <RouterLink to={{ name: "Member" }}>成员面板</RouterLink>
            ),
            key: "add_member",
          },
        ],
      },
      {
        type: "group",
        label: "日志",
        key: "log",
        children: [
          {
            label: () =>(
              <RouterLink to = {{name: "checkLog"}}>检查日志</RouterLink>
            ),
            key: "check_log",
          },
          {
            label: () =>(
              <RouterLink to = {{name: "checkNoLog"}}>无检查日志</RouterLink>
            ),
            key: "check_nolog",
          },
        ],
      },
    ],
  },
];
</script>
<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 24px;" bordered class="h-screen">
      <n-menu default-expand-all :options="menuOptions" />
    </n-layout-sider>
    <n-layout> <router-view></router-view></n-layout>
  </n-layout>
</template>
<style lang="scss" scoped></style>
