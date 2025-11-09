import { ref, computed, onUnmounted, watch } from "vue";

export function useFormAnimation(errors) {
  const isTyping = ref(false);
  const typingTimeout = ref(null);

  const hasErrors = computed(() => {
    return (
      errors && Object.values(errors).some((error) => error && error !== "")
    );
  });

  function handleInput() {
    isTyping.value = true;

    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value);
    }

    typingTimeout.value = setTimeout(() => {
      isTyping.value = false;
    }, 1000);
  }

  const formClasses = computed(() => {
    const classes = ["form"];

    if (hasErrors.value) {
      classes.push("form--error");
    } else if (isTyping.value) {
      classes.push("form--typing");
    } else {
      classes.push("form--idle");
    }

    return classes;
  });

  onUnmounted(() => {
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value);
    }
  });

  watch(
    () => errors,
    () => {
      if (hasErrors.value) {
        isTyping.value = false;
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value);
        }
      }
    },
    { deep: true }
  );

  return {
    isTyping,
    formClasses,
    hasErrors,
    handleInput,
  };
}
