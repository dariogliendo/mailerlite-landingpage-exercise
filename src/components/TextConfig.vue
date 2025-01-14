<template>
  <div class="bg-gray-700 border-gray-100 p-0 m-0 relative w-full">
    <textarea
      v-model="value"
      class="bg-transparent w-full h-full border-transparent p-4"
      placeholder="Compose your text..."
      ref="textarea"
      @focusout="onFocousOut"
    ></textarea>
    <i
      class="fa-solid fa-ban absolute bottom-1 right-8 text-red-600 text-lg cursor-pointer"
      @click="() => emit('cancel')"
    ></i>
    <i
      class="fa-solid fa-check-circle absolute bottom-1 right-1 text-green-600 text-lg cursor-pointer"
      @click="() => emit('update:text', value)"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  text: string | undefined;
}>();
const value = ref<string>(props.text || "");
const textarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  if (textarea.value) {
    textarea.value.focus();
  }
});

const onFocousOut = () => {
  if (value.value.trim() === "") {
    emit("cancel");
  }
};

const emit = defineEmits<{
  (e: "update:text", value: string): void;
  (e: "cancel"): void;
}>();
</script>

<style scoped lang="less">
textarea {
  color: white;
  border: none;
  resize: none;
  background-color: transparent;
  font-size: 1.5rem;

  &:focus-visible {
    outline: 0px;
  }
}
</style>
