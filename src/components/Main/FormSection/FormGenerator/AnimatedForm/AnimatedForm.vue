<template>
  <div class="form-wrapper">
    <form
      @submit.prevent="$emit('submit')"
      :class="formClasses"
      class="form-container"
    >
      <slot />
    </form>
    <div class="global-animations" aria-hidden="true">
      <div
        v-if="showTypingAnimation"
        class="global-animation typing-animation"
        :class="{ 'global-animation--visible': showTypingAnimation }"
      >
        <img
          src="@/assets/images/lebedevSearch.webp"
          alt="Печатание"
          class="global-animation__image"
        />
      </div>

      <div
        v-if="showErrorAnimation"
        class="global-animation error-animation"
        :class="{ 'global-animation--visible': showErrorAnimation }"
      >
        <img
          src="@/assets/images/Lebedevangry.webp"
          alt="Ошибка"
          class="global-animation__image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  formClasses: {
    type: Array,
    default: () => ["form"],
  },
  showTypingAnimation: {
    type: Boolean,
    default: false,
  },
  showErrorAnimation: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["submit"]);
</script>

<style lang="scss" scoped>
.form-container {
  position: relative;
  z-index: 10001;
  padding: 30px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form {
  &--idle {
    border: 2px solid vars.$color-blue;
    box-shadow: 0 2px 15px rgba(58, 134, 255, 0.15);
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  }

  &--typing {
    border: 2px solid vars.$color-blue;
    box-shadow: 0 2px 15px rgba(58, 134, 255, 0.15);
  }

  &--error {
    border: 2px solid vars.$color-red;
    box-shadow: 0 2px 15px rgba(255, 56, 96, 0.18);
    background: linear-gradient(135deg, #ffffff 0%, #fff5f7 100%);
    animation: errorPulse 2s ease-in-out infinite;
  }
}
.global-animations {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
}

.global-animation {
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%) translateX(70%);
  z-index: 1000;
  transition: transform 900ms cubic-bezier(0.22, 0.9, 0.25, 1),
    opacity 700ms ease;
  opacity: 0;
  pointer-events: none;
}

.global-animation--visible {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
}

.global-animation__image {
  width: auto;
  height: auto;
  max-width: 220px;
  max-height: 220px;
  display: block;
  will-change: transform, opacity;
}

.typing-animation .global-animation__image {
  max-width: 200px;
  animation: rock 2200ms ease-in-out infinite;
  transform-origin: 50% 50%;
}

.error-animation .global-animation__image {
  max-width: 180px;
  animation: tiny-bounce 1100ms ease-in-out infinite;
  transform-origin: 50% 80%;
}

@keyframes rock {
  0% {
    transform: rotate(-3deg) translateY(0);
  }
  25% {
    transform: rotate(2deg) translateY(-2px);
  }
  50% {
    transform: rotate(-1deg) translateY(0);
  }
  75% {
    transform: rotate(1.5deg) translateY(-1px);
  }
  100% {
    transform: rotate(-3deg) translateY(0);
  }
}

@keyframes tiny-bounce {
  0% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-10px) scale(1.02);
  }
  70% {
    transform: translateY(-4px) scale(1.01);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes riverFlow {
  0% {
    background-position: 0% 50%;
    opacity: 1;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.8;
  }
  100% {
    background-position: 0% 50%;
    opacity: 1;
  }
}

@keyframes errorPulse {
  0%,
  100% {
    box-shadow: 0 2px 15px rgba(255, 56, 96, 0.3);
  }
  50% {
    box-shadow: 0 4px 25px rgba(255, 56, 96, 0.5);
  }
}
</style>
