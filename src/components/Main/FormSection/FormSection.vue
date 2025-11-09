<script setup>
import { useFormDemo } from "@/hooks/useFormDemo";
import FormGenerator from "./FormGenerator/FormGenerator.vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";
import SuccessMessage from "./FormGenerator/SuccessMessage/SuccessMessage.vue";

const {
  formSchema,
  formData,
  errors,
  loading,
  error,
  isSubmitting,
  isSubmitted,
  countdown,
  updateField,
  validateField,
  handleSubmit,
} = useFormDemo();
</script>

<template>
  <div class="form-section">
    <BaseSpinner v-if="loading" size="large" text="Загрузка формы" />

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <SuccessMessage v-else-if="isSubmitted" :countdown="countdown" />

    <FormGenerator
      v-else
      :schema="formSchema"
      :model-value="formData"
      :errors="errors"
      :is-submitting="isSubmitting"
      @update:field="updateField"
      @blur:field="validateField"
      @submit="handleSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-section {
  max-width: 500px;
  width: 100%;
  font-family: "ALSArtemiusSans";

  &__title {
    text-align: center;
    color: vars.$color-black;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: 600;
  }
}

.error-message {
  text-align: center;
  color: vars.$color-red;
  padding: 40px;
  border-radius: 8px;
}
</style>
