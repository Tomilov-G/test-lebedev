<script setup>
import FormSection from "./FormSection/FormSection.vue";
</script>

<template>
  <main class="main">
    <FormSection />
  </main>
</template>

<style lang="scss" scoped>
.main {
  flex: 1;
  background-color: vars.$color-white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
</style>
