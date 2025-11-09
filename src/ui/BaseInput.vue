<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="$emit('blur')"
    :class="{ error: hasError }"
    class="base-input"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: String,
    type: {
      type: String,
      default: "text",
    },
    modelValue: [String, Number],
    hasError: Boolean,
    placeholder: String,
  },
  emits: ["update:modelValue", "blur", "input"],
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("input");
    },
  },
};
</script>

<style scoped>
.base-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
  }

  &.error {
    border-color: #ff3860;
    box-shadow: 0 0 0 3px rgba(255, 56, 96, 0.1);
  }
}
</style>
