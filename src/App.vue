<script setup>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import Main from "./components/Main/Main.vue";
</script>

<template>
  <div class="app-container">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
