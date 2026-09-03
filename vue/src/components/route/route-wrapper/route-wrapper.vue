<template src="./route-wrapper.html"></template>
<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useRouteWrapper } from "./route-wrapper.composable";
import { useRouter, useRoute } from "vue-router";
import { RouteProvider } from "../route-provider";
import { ROUTE_WRAPPER_DEFAULT_PROPS, type RouteWrapperProps } from "@/core";
// Component setup (props, emits, injects)
// ----------------------------------------------------------------------------
const props = withDefaults(defineProps<RouteWrapperProps>(), {
  ...ROUTE_WRAPPER_DEFAULT_PROPS,
});
const { updateRoutes, stack } = useRouteWrapper();
const route = useRoute();
const router = useRouter();

// Lifecycle
// ----------------------------------------------------------------------------
watch(
  () => route.fullPath,
  () => {
    updateRoutes(route.matched, route.fullPath);
  }
);

onMounted(() => {
  // Add home route to stack
  const homeName = props.homeRouteName;

  if (route.name === homeName) {
    updateRoutes(route.matched, route.fullPath);
  } else {
    const homeLocation = router.resolve({ name: homeName });
    if (homeLocation.matched.length > 0) {
      updateRoutes(homeLocation.matched, homeLocation.fullPath);
    }

    // Apply current route to stack
    setTimeout(() => {
      updateRoutes(route.matched, route.fullPath);
    }, 50);
  }
});
</script>
