import { defineStore } from "pinia";
import { FLEAS_DATA } from "../utils/fleasData";

const useFleasDetails = defineStore("fleaDetailsStore", () => {
  const file = ref<File | null | undefined>();
  const fileContext = ref<Record<string, Record<string, unknown>> | null>();

  const fleasStatus = ref(Object.fromEntries(Object.keys(FLEAS_DATA).map((key) => [key, false])));

  watch(fileContext, () => {
    if (fileContext.value?.playerData) {
      Object.entries(fileContext.value.playerData).forEach(([key, value]) => {
        fleasStatus.value[key] = value as boolean;
      });
    }
  });

  return { fleasStatus, file, fileContext };
});

export { useFleasDetails };
