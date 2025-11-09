<script setup>
import RoboAnimation from "@/components/Header/HeaderName/RoboAnimation/RoboAnimation.vue";
import Name from "@/components/Header/HeaderName/Name/Name.vue"
</script>

<template>
  <div class="header__inner__name">
    <RoboAnimation />
    <Name />
  </div>
</template>

<style lang="scss" scoped>
.header__inner__name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
