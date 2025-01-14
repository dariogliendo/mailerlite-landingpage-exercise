<template>
  <div class="image-config w-full bg-gray-700">
    <div class="flex flex-row gap-4 p-4">
      <div
        v-for="image of options"
        class="flex-1 basis-1/4"
        :alt="image.alt"
        :class="{ 'border-4 border-blue-500': selectedImage === image.src }"
        @click="() => selectImage(image.src)"
      >
        <img :src="image.src" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  url: string | undefined;
}>();
const selectedImage = ref<string>(props.url || "");

const options = [
  {
    src: "https://fakeimg.pl/300x200?text=Image+1",
    alt: "Image 1",
  },
  {
    src: "https://fakeimg.pl/300x200?text=Image+2",
    alt: "Image 2",
  },
  {
    src: "https://fakeimg.pl/300x200?text=Image+3",
    alt: "Image 3",
  },
  {
    src: "https://fakeimg.pl/300x200?text=Image+4",
    alt: "Image 4",
  },
];

const emit = defineEmits(["update:image", "cancel"]);
const selectImage = (image: string) => {
  selectedImage.value = image;
  emit("update:image", selectedImage.value);
};
</script>

<style scoped></style>
