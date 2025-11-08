<script setup>
import HeaderName from "@/components/Header/HeaderName/HeaderName.vue";
import Logo from "@/components/Header/Logo/Logo.vue";
</script>
<template>
  <header class="header">
    <div class="header__inner">
      <HeaderName />
      <Logo />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: vars.$color-blue;
  &__inner {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
