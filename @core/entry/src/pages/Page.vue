<template lang="pug">
a-layout.application(has-sider)
  a-layout-sider(theme="light" v-model:collapsed="collapsed" collapsible) Sider
  a-layout
    a-layout-header(theme="light") Header
    a-layout-content Content
</template>

<script lang="ts" setup>
const collapsed = ref<boolean>(false);
</script>
