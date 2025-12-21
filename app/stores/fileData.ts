import { defineStore } from "pinia";
import { FILE_DATA } from "../utils/fileData";

function getInitialStatus() {
  const status: Record<string, boolean> = {};

  Object.values(FILE_DATA).forEach((categoryItems) => {
    Object.keys(categoryItems).forEach((key) => {
      status[key] = false;
    });
  });

  return status;
}

const useFileData = defineStore("fleaDetailsStore", () => {
  const file = ref<File | null | undefined>();
  const fileContext = ref<Record<string, Record<string, unknown>> | null>();

  const fileDataStatus = ref(getInitialStatus());

  watch(fileContext, () => {
    if (fileContext.value?.playerData) {
      Object.entries(fileContext.value.playerData).forEach(([key, value]) => {
        if (key in fileDataStatus.value) {
          fileDataStatus.value[key] = value as boolean;
        }
      });
    }
  });

  return { fileDataStatus, file, fileContext };
});

export { useFileData };
