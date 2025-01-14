<template>
  <div class="content-config w-full">
    <text-config v-if="props.config.type === 'text'" :text="props.config.text" @update:text="updateTextConfig" @cancel="emit('cancel', props.config.id)"></text-config>
    <image-config v-if="props.config.type === 'image'" :url="props.config.src" @update:image="updateImageConfig"/>
  </div>
</template>

<script setup lang="ts">
import type { Content } from '../commons/types';
import TextConfig from './TextConfig.vue';
import ImageConfig from './ImageConfig.vue';

const props = defineProps<{
  config: Content
}>();

const emit = defineEmits(['update:config', 'cancel'])

const updateTextConfig = (text: string) => {
  emit('update:config', { ...props.config, text, pendingConfiguration: false })
}

const updateImageConfig = (src: string) => {
  emit('update:config', { ...props.config, src, pendingConfiguration: false })
}
</script>

<style scoped>
</style>