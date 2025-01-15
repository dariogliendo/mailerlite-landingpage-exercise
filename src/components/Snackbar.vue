<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="snackbar fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white py-3 px-6 rounded-t-lg shadow-black shadow-md transition-opacity duration-300 ease-in-out z-20"
      :class="{
        'opacity-100 visible': visible,
        'opacity-0 invisible': !visible,
        [`bg-${color}-700`]: color,
        'bg-grey-700': !color,
      }"
    >
      {{ message }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

const props = defineProps<{
  message: string;
  duration: number;
  color?: string;
}>();

const { message, color } = toRefs(props);

const visible = ref(false);

const emit = defineEmits(["finished"]);

watch(message, (newMessage) => {
  if (newMessage) {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
      emit("finished", "");
    }, props.duration || 3000); // Duración predeterminada de 3 segundos
  }
});
</script>

<style scoped></style>
