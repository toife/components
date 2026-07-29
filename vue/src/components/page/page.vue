<template src="./page.html"></template>
<style lang="scss" src="@/core/features/page/page.scss" scoped></style>
<script lang="ts" setup>
import { getPageAttrs } from "@/core";
// Top-level page surface inside the app shell
const pageAttrs = getPageAttrs();
</script>
