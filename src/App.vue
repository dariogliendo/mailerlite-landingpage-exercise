<script setup lang="ts">
import { onMounted, ref } from "vue";
import draggable from "vuedraggable";
import ContentConfig from "./components/ContentConfig.vue";
import ContentDisplay from "./components/ContentDisplay.vue";
import Snackbar from "./components/Snackbar.vue";
import type { Content } from "./commons/types";

interface ContentOption {
  type: string;
}

const items: ContentOption[] = [{ type: "text" }, { type: "image" }];

const content = ref<Content[]>([]);
const snackMessage = ref<string>("");
const snackColor = ref<string>("");

onMounted(() => {
  const savedContent = localStorage.getItem("content");
  if (savedContent) {
    const parsed = JSON.parse(savedContent);
    content.value = parsed
      .filter((f: Content) => f.src || f.text)
      .map((c: Content) => ({ ...c, pendingConfiguration: false }));
  }
});

const saveStatus = () => {
  localStorage.setItem("content", JSON.stringify(content.value));
  showSnackbar("Content saved succesfully", "green");
};

const cloneContent = (cloned: ContentOption) => {
  return {
    type: cloned.type,
    id: Date.now(),
    pendingConfiguration: true,
  };
};

const showSnackbar = (message: string, color: string) => {
  snackMessage.value = message;
  snackColor.value = color;
};

const cancelContentConfig = (id: number) => {
  const activeContent = content.value.find((c) => c.id === id);
  if (!activeContent) return;

  if (!activeContent.text && !activeContent.src)
    content.value = content.value.filter((c) => c.id !== id);

  activeContent.pendingConfiguration = false;
};

const updateConfig = (updated: Content) => {
  content.value = content.value.map((c) => {
    if (c.id === updated.id) {
      return updated;
    }
    return c;
  });
};

const clearContent = () => {
  content.value = [];
  localStorage.removeItem("content");
  showSnackbar("Content cleared", "green");
};

const onChange = (event: any) => {
  if (event.added) {
    content.value = content.value
      .filter((f) => f.id === event.added.element?.id || f.src || f.text)
      .map((c) => {
        if (c.id === event.added.element?.id) {
          return c;
        } else {
          return { ...c, pendingConfiguration: false };
        }
      });
  }
};

const remove = (id: number) => {
  content.value = content.value.filter((c) => c.id !== id);
  showSnackbar("Content removed", "red");
};

const edit = (id: number) => {
  content.value = content.value.map((c) => {
    if (c.id === id) {
      return { ...c, pendingConfiguration: true };
    }
    return { ...c, pendingConfiguration: false };
  });
};

const addElement = (type: string) => {
  content.value.push({ type, id: Date.now(), pendingConfiguration: true });
};
</script>

<template>
  <div class="flex flex-col h-full gap-10">
    <h1 class="text-4xl flex-0">Landing Page Builder</h1>
    <div
      class="container gap-4 h-full flex md:flex-row flex-col-reverse overflow-hidden"
    >
      <div class="h-full flex flex-col gap-4 flex-1 overflow-hidden">
        <h1 class="text-3xl flex-0">Page content</h1>
        <div
          class="border p-2 w-full h-full bg-gray-800 border-gray-500 rounded flex-1 overflow-auto"
        >
          <draggable
            class="draggable-list h-full flex flex-col gap-4"
            :group="{ group: 'blocks', pull: false, put: true }"
            :sort="true"
            :list="content"
            itemKey="type"
            @change="onChange"
          >
            <template #item="{ element }">
              <div>
                <div v-if="element.pendingConfiguration" class="w-full">
                  <content-config
                    :config="element"
                    @cancel="cancelContentConfig"
                    @update:config="updateConfig"
                  />
                </div>
                <div v-else>
                  <content-display
                    :config="element"
                    @edit="edit"
                    @remove="remove"
                  />
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div>
          <button
            class="border border-green-600 text-white py-2 px-4 rounded hover:bg-green-600 bg-green-700 transition w-full"
            @click="saveStatus"
          >
            Save
          </button>
        </div>
      </div>
      <div class="md:flex-1 flex-0 flex flex-col" ref="container">
        <div class="flex flex-col gap-4 flex-1">
          <h1 class="text-3xl">Content blocks</h1>
          <draggable
            class="draggable-list flex flex-col gap-4"
            :list="items"
            :group="{ name: 'blocks', pull: 'clone' }"
            itemKey="id"
            :clone="cloneContent"
          >
            <template #item="{ element }">
              <div
                class="bg-gray-800 p-2 rounded cursor-pointer"
                @dblclick="() => addElement(element.type)"
              >
                <span v-if="element.type === 'text'">Text block</span>
                <span v-if="element.type === 'image'">Image</span>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <button
      class="md:fixed bottom-8 right-8 border border-gray-500 text-gray-500 py-2 px-4 rounded hover:bg-gray-700 md:bg-transparent bg-opacity-90 bg-gray-900 hover:text-white transition z-20"
      @click="clearContent"
    >
      Clear
    </button>
  </div>
  <snackbar
    :message="snackMessage"
    :duration="3500"
    :color="snackColor"
    @finished="
      () => {
        snackMessage = '';
        snackColor = '';
      }
    "
  />
</template>
