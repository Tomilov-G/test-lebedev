<template>
  <div ref="container" class="animation-wrapper"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import lottie from "lottie-web";
import animationData from "@/assets/animations/robot_regarde.json";

const container = ref(null);

onMounted(() => {
  lottie.loadAnimation({
    container: container.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      clearCanvas: true,
      className: "lottie-svg",
    },
  });
});
</script>

<style scoped>
.animation-wrapper {
  width: 100px;
  height: 100px;
}
</style>
