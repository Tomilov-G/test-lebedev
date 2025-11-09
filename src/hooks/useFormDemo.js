import { ref, onMounted, onUnmounted } from "vue";
import { useForm } from "./useForm";
import { useValidation } from "./useValidation";

export function useFormDemo() {
  const schema = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const countdown = ref(3);

  let countdownInterval = null;

  const { formData, initializeFormData, updateField, resetForm } = useForm();
  const { errors, validateField, validateForm, clearErrors } = useValidation();

  const startCountdown = () => {
    isSubmitted.value = true;
    countdown.value = 3;

    countdownInterval = setInterval(() => {
      countdown.value--;

      if (countdown.value <= 0) {
        clearInterval(countdownInterval);
        resetAll();
      }
    }, 1000);
  };

  const resetAll = () => {
    resetForm();
    clearErrors();
    isSubmitted.value = false;
    countdown.value = 3;
  };

  onUnmounted(() => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  });

  onMounted(async () => {
    loading.value = true;
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}form-schema.json`);
      if (!res.ok) throw new Error("Failed to load form schema");

      const data = await res.json();

      if (!data || !Array.isArray(data.fields)) {
        throw new Error("Invalid schema format");
      }

      schema.value = data;
      initializeFormData(schema.value);
    } catch (err) {
      error.value =
        "Кажется, что-то пошло не так. Попробуйте вернуться на страницу позже.";
      console.error("Form loading error:", err);
    } finally {
      loading.value = false;
    }
  });

  const handleSubmit = async () => {
    if (schema.value && validateForm(schema.value, formData.value)) {
      isSubmitting.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        startCountdown();
      } catch (err) {
        console.error("Submit error:", err);
        alert("Ошибка отправки формы");
      } finally {
        isSubmitting.value = false;
      }
    }
  };

  const handleFieldValidation = (fieldName) => {
    if (!schema.value) return;

    const field = schema.value.fields.find((f) => f.model === fieldName);
    if (field) validateField(field, formData.value[fieldName]);
  };

  return {
    formSchema: schema,
    formData,
    errors,
    loading,
    error,
    isSubmitting,
    isSubmitted,
    countdown,
    updateField,
    validateField: handleFieldValidation,
    handleSubmit,
    resetAll,
  };
}
