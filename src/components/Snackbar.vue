<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-transform ease-out duration-500"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform ease-in duration-500"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="visible"
        class="snackbar fixed bottom-0 left-1/2 transform duration-200 -translate-x-1/2 text-white py-3 px-6 rounded-t-lg shadow-black shadow-md z-20 min-w-80 md:w-auto"
        :class="{
          'opacity-100 visible': visible,
          'opacity-0 invisible': !visible,
          'bg-green-700 hover:bg-green-600': props.color === 'green',
          'bg-red-700 hover:bg-red-600': props.color === 'red',
        }"
      >
        <div class="flex flex-row gap-8 justify-between items-center">
          <span>{{ message }}</span>
          <button
            v-if="props.undo"
            class="text-white border-white border py-1 px-2 rounded hover:bg-white hover:text-black Transition"
            @click="
              () => {
                emit('undo');
                visible = false;
              }
            "
          >
            Undo
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import type { DynamicColorOptions } from "../commons/types";

const props = defineProps<{
  message: string;
  duration: number;
  color?: DynamicColorOptions | undefined;
  undo?: boolean;
}>();

const { message } = toRefs(props);

const visible = ref(false);
let timeout: number | null = null;

const emit = defineEmits(["finished", "undo"]);

watch(message, (newMessage) => {
  if (timeout) {
    clearTimeout(timeout);
    visible.value = false;
  }
  if (newMessage) {
    visible.value = true;
    timeout = setTimeout(() => {
      visible.value = false;
      emit("finished", "");
    }, props.duration || 3000); // Duración predeterminada de 3 segundos
  }
});
</script>

<style scoped></style>
