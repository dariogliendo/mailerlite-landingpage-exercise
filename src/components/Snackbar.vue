<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="snackbar fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white py-3 px-6 rounded-t-lg shadow-black shadow-md transition-opacity duration-300 ease-in-out z-20"
      :class="{
        'opacity-100 visible': visible,
        'opacity-0 invisible': !visible,
        [`bg-${color}-700`]: color,
        'bg-gray-700': !color,
      }"
    >
      <div class="flex flex-row gap-8 justify-center items-center">
        <span>{{ message }}</span>
        <button
          v-if="props.undo"
          class="text-white border-white border py-1 px-2 rounded hover:bg-white hover:text-black transition"
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
  </Teleport>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

const props = defineProps<{
  message: string;
  duration: number;
  color?: string;
  undo?: boolean;
}>();

const { message, color } = toRefs(props);

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
