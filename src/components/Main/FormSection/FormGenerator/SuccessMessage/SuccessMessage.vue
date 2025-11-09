<template>
  <div class="success-message">
    <div class="success-icon">✅</div>
    <h2 class="success-title">Форма успешно отправлена</h2>
    <p class="success-text">
      Вы вернетесь на главную страницу через {{ countdown }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  countdown: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.success-message {
  font-family: "ALSArtemiusSans";
  text-align: center;
  padding: 40px;
  border: 2px solid vars.$color-green;
  border-radius: 12px;
  animation: successAppear 0.5s ease-out;
  .success-icon {
    font-size: 64px;
    margin-bottom: 20px;
    animation: bounce 1s ease-in-out;
  }
  .success-title {
    color: vars.$color-green;
    margin: 0 0 16px 0;
    font-size: 24px;
    font-weight: 600;
  }
  .success-text {
    color: vars.$color-green;
    font-size: 18px;
    margin: 0;
  }
}

@keyframes successAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
