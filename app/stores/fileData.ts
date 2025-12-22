import { defineStore } from "pinia";
import { FILE_DATA } from "../utils/fileData";
import type { TFileContext } from "~/schemes/fileData";

function getInitialStatus() {
  const status: Partial<Record<keyof typeof FILE_DATA, Record<string, boolean>>> = {};

  Object.entries(FILE_DATA).forEach(([category, categoryItems]) => {
    if (Object.hasOwn(FILE_DATA, category)) {
      status[category as keyof typeof FILE_DATA] = Object.fromEntries(
        Object.keys(categoryItems).map((key) => [key, false])
      );
    }
  });

  return status as Record<keyof typeof FILE_DATA, Record<string, boolean>>;
}

const useFileData = defineStore("fleaDetailsStore", () => {
  const file = ref<File | null | undefined>();
  const fileContext = shallowRef<TFileContext | null>();

  const fileDataStatus = ref(getInitialStatus());

  return { fileDataStatus, file, fileContext };
});

export { useFileData };
