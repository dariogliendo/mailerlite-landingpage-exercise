<template>
  <div class="container relative">
    <div
      class="w-full border-gray-700 border p-4 hover:bg-gray-600"
      v-if="props.config.type === 'text'"
    >
      <p class="whitespace-break-spaces text-left">{{ props.config.text }}</p>
    </div>
    <div
      class="w-full border-gray-700 border p-4 flex hover:bg-gray-600 flex-row align-middle justify-center"
      v-if="props.config.type === 'image'"
    >
      <img :src="props.config.src" :alt="props.config.alt" />
    </div>
    <div class="actions absolute bottom-3 right-3 flex gap-2 flex-row">
      <div
        class="text-gray-800 bg-slate-700 z-10 w-8 h-8 rounded-full cursor-pointer hover:bg-slate-600 grid place-content-center"
        @click="() => emit('remove', props.config.id)"
      >
        <i class="fa-solid fa-trash"></i>
      </div>
      <div
        class="text-gray-800 bg-slate-700 z-10 w-8 h-8 rounded-full cursor-pointer hover:bg-slate-600 grid place-content-center"
        @click="() => emit('edit', props.config.id)"
      >
        <i class="fa-solid fa-pen"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Content } from "../commons/types";

const props = defineProps<{
  config: Content;
}>();

const emit = defineEmits(["edit", "remove"]);
</script>

<style scoped lang="less"></style>
