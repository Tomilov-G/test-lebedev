<template>
  <div class="base-spinner" :class="sizeClass">
    <div class="spinner"></div>
    <span v-if="text" class="spinner-text">{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  text: {
    type: String,
    default: "",
  },
});

const sizeClass = `spinner--${props.size}`;
</script>

<style lang="scss" scoped>
.base-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid vars.$color-blue;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  .spinner--small & {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  .spinner--medium & {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }

  .spinner--large & {
    width: 60px;
    height: 60px;
    border-width: 4px;
  }
}

.spinner-text {
  color: #666;
  font-size: 14px;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
