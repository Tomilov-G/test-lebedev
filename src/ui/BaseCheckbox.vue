<template>
  <input
    :id="id"
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    @blur="$emit('blur')"
    :class="{ error: hasError }"
    class="base-checkbox"
  />
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    id: String,
    modelValue: Boolean,
    hasError: Boolean,
  },
  emits: ["update:modelValue", "blur"],
};
</script>

<style scoped>
.base-checkbox {
  margin: 0;
}
</style>
