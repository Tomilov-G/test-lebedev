<script setup>
import RoboAnimation from "@/components/Header/HeaderName/RoboAnimation/RoboAnimation.vue";
</script>

<template>
  <div class="header__inner__name">
    <RoboAnimation />
    <p class="name">
      <span class="left_word">AUTO</span><span class="right_word">FORM</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.header__inner__name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-family: "ALSArtemiusSans" sans-serif;
    font-size: 30px;
    color: vars.$color-white;
    letter-spacing: 3px;
    font-weight: 400;
    background-color: vars.$color-black;
    padding: 10px;
    border-radius: 10px;
    .right_word {
      color: vars.$color-light-grey;
    }
  }
}
</style>
