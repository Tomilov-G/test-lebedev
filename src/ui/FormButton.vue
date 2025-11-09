<template>
  <button
    type="submit"
    class="submit-button"
    :class="{
      'submit-button--disabled': disabled,
      'submit-button--loading': loading,
    }"
    :disabled="disabled || loading"
  >
    <BaseSpinner v-if="loading" size="small" />
    <span v-else class="submit-button__text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup>
import BaseSpinner from "./BaseSpinner.vue";

defineProps({
  text: {
    type: String,
    default: "Отправить",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.submit-button {
  width: 100%;
  background: linear-gradient(135deg, vars.$color-blue 0%, #4361ee 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(58, 134, 255, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &--disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none !important;

    &:hover {
      box-shadow: none !important;
    }
  }

  &--loading {
    cursor: wait;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active:not(:disabled)::after {
    width: 300px;
    height: 300px;
  }

  &__text {
    display: block;
  }
}

.submit-button--small {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 40px;
}

.submit-button--large {
  padding: 16px 32px;
  font-size: 18px;
  min-height: 56px;
}

.submit-button--secondary {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
}

.submit-button--success {
  background: linear-gradient(135deg, #28a745 0%, #218838 100%);
}

.submit-button--danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}
</style>
