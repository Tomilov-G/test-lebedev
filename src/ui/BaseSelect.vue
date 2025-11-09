<template>
  <select
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    :class="{ error: hasError }"
    class="base-select"
  >
    <option value="" disabled>Выберите вариант</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    id: String,
    modelValue: [String, Number],
    options: {
      type: Array,
      default: () => [],
    },
    hasError: Boolean,
  },
  emits: ["update:modelValue", "blur"],
};
</script>

<style lang="scss" scoped>
.base-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  cursor: pointer;
}

.base-select.error {
  border-color: #ff4444;
}
</style>
