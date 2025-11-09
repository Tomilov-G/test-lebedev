import { ref, computed } from "vue";

export function useValidation() {
  const errors = ref({});
  const hasErrors = computed(() => Object.keys(errors.value).length > 0);

  function validateField(fieldOrName, value) {
    let model;
    let rules = null;

    if (!fieldOrName) return { valid: true };

    if (typeof fieldOrName === "string") {
      model = fieldOrName;
    } else if (typeof fieldOrName === "object" && fieldOrName.model) {
      model = fieldOrName.model;
      rules = fieldOrName;
    } else {
      return { valid: true };
    }

    if (!rules) {
      errors.value[model] = "";
      if (errors.value[model] === "") delete errors.value[model];
      return { model, valid: true, error: "" };
    }

    let err = "";

    if (rules.required) {
      if (rules.type === "checkbox") {
        if (!value) err = "Обязательное поле";
      } else {
        if (value === "" || value === null || value === undefined)
          err = "Обязательное поле";
      }
    }

    if (!err && rules.minLength && typeof value === "string") {
      if (value.length < rules.minLength) {
        err = `Минимум ${rules.minLength} символ(ов)`;
      }
    }

    if (!err && rules.pattern && typeof value === "string" && value !== "") {
      try {
        const re =
          rules.pattern instanceof RegExp
            ? rules.pattern
            : new RegExp(rules.pattern);
        if (!re.test(value)) {
          err = "Неверный формат";
        }
      } catch (e) {
        console.warn(
          "Invalid pattern in schema for field",
          model,
          rules.pattern
        );
      }
    }

    if (err) {
      errors.value[model] = err;
    } else {
      if (errors.value[model]) delete errors.value[model];
    }

    return { model, valid: !err, error: err };
  }

  function validateForm(schema, data = {}) {
    errors.value = {};

    if (!schema || !Array.isArray(schema.fields)) {
      return { isValid: true, errors: {} };
    }

    let isValid = true;

    schema.fields.forEach((field) => {
      const model = field.model;
      const value = data ? data[model] : undefined;
      const res = validateField(field, value);
      if (!res.valid) isValid = false;
    });

    return { isValid, errors: { ...errors.value } };
  }

  const clearErrors = () => {
    errors.value = {};
  };

  const getErrors = () => {
    return { ...errors.value };
  };

  return {
    errors,
    validateField,
    validateForm,
    hasErrors,
    clearErrors,
    getErrors,
  };
}
