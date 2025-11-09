<template>
  <div class="field">
    <div v-if="field.type === 'checkbox'" class="checkbox-wrapper">
      <BaseCheckbox
        :id="field.model"
        :model-value="value"
        :has-error="!!error"
        @update:model-value="handleUpdate($event)"
        @blur="handleBlur"
      />
      <label :for="field.model" class="checkbox-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>
    </div>

    <div v-else-if="isTextField">
      <label :for="field.model" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>
      <BaseInput
        :id="field.model"
        :type="field.type"
        :model-value="value"
        :has-error="!!error"
        :placeholder="field.placeholder"
        @update:model-value="handleUpdate($event)"
        @blur="handleBlur"
      />
    </div>

    <div v-else-if="field.type === 'select'">
      <label :for="field.model" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>
      <BaseSelect
        :id="field.model"
        :model-value="value"
        :options="field.options"
        :has-error="!!error"
        @update:model-value="handleUpdate($event)"
        @blur="handleBlur"
      />
    </div>

    <div class="error-container">
      <transition name="fade-error">
        <div v-if="error" class="error-message">{{ error }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/ui/BaseInput.vue";
import BaseSelect from "@/ui/BaseSelect.vue";
import BaseCheckbox from "@/ui/BaseCheckbox.vue";
import { computed } from "vue";

const props = defineProps({
  field: { type: Object, required: true },
  value: [String, Number, Boolean],
  error: String,
});

const emit = defineEmits(["update", "blur"]);

const isTextField = computed(() =>
  ["text", "email", "password"].includes(props.field.type)
);

function handleUpdate(value) {
  emit("update", props.field.model, value);
}

function handleBlur() {
  emit("blur", props.field);
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 20px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  .checkbox-label {
    font-weight: 500;
    color: vars.$color-black;
    font-size: 14px;
    margin: 0;
    cursor: pointer;
  }
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: vars.$color-black;
  font-size: 14px;
  cursor: pointer;
  .required {
    color: vars.$color-red;
    margin-left: 2px;
  }
}

.error-container {
  height: 5px;
  margin-top: 4px;
  position: relative;
  .error-message {
    color: vars.$color-red;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
