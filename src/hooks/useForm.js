import { ref } from "vue";

export function useForm(initialData = {}) {
  const formData = ref({ ...initialData });

  const initializeFormData = (schema) => {
    if (!schema || !Array.isArray(schema.fields)) {
      console.warn("Invalid schema:", schema);
      return;
    }

    schema.fields.forEach((field) => {
      if (formData.value[field.model] === undefined) {
        if (field.type === "checkbox") {
          formData.value[field.model] = false;
        } else {
          formData.value[field.model] = "";
        }
      }
    });
  };

  const updateField = (fieldName, value) => {
    formData.value[fieldName] = value;
  };

  const resetForm = () => {
    Object.keys(formData.value).forEach((key) => {
      if (typeof formData.value[key] === "boolean") {
        formData.value[key] = false;
      } else {
        formData.value[key] = "";
      }
    });
  };

  const getFormData = () => {
    return { ...formData.value };
  };

  return {
    formData,
    initializeFormData,
    updateField,
    resetForm,
    getFormData,
  };
}
