<template>
  <AnimatedForm
    :form-classes="formClasses"
    :show-typing-animation="showTypingAnimation"
    :show-error-animation="showErrorAnimation"
    @submit="handleSubmit"
  >
    <BaseSpinner v-if="!schema" text="Подготовка формы" />

    <template v-else>
      <FormField
        v-for="field in schema.fields"
        :key="field.model"
        :field="field"
        :value="modelValue[field.model]"
        :error="errors[field.model]"
        @update="updateField"
        @blur="handleFieldBlur"
      />

      <FormButton
        :disabled="!isFormValid"
        :loading="isSubmitting"
        text="Зарегистрироваться"
      />
    </template>
  </AnimatedForm>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useFormAnimation } from "@/hooks/useFormAnimation";
import FormField from "./FormField/FormField.vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";
import FormButton from "@/ui/FormButton.vue";
import AnimatedForm from "./AnimatedForm/AnimatedForm.vue";

const props = defineProps({
  schema: Object,
  modelValue: Object,
  errors: Object,
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:field", "blur:field", "submit"]);

const { formClasses, handleInput, isTyping } = useFormAnimation(props.errors);

const hasErrors = computed(() => {
  if (!props.errors) return false;
  return Object.values(props.errors).some((e) => e && e !== "");
});

const showErrorAnimation = ref(false);
const showTypingAnimation = ref(false);

watch(hasErrors, (val) => {
  showErrorAnimation.value = !!val;
  if (val) showTypingAnimation.value = false;
});

watch(isTyping, (val) => {
  showTypingAnimation.value = !!val && !hasErrors.value;
});

function updateField(fieldName, value) {
  handleInput();
  emit("update:field", fieldName, value);
}

function handleFieldBlur(field) {
  emit("blur:field", field.model);
}

function handleSubmit() {
  emit("submit", props.modelValue);
}

const isFormValid = computed(() => {
  if (!props.schema?.fields) return false;

  const hasValidationErrors =
    props.errors &&
    Object.values(props.errors).some((error) => error && error !== "");

  if (hasValidationErrors) return false;

  return props.schema.fields.every((field) => {
    if (!field.required) return true;
    const value = props.modelValue[field.model];
    if (field.type === "checkbox") return !!value;
    return (
      value !== undefined && value !== null && value.toString().trim() !== ""
    );
  });
});
</script>
