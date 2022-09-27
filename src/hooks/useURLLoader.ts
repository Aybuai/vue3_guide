import { reactive, toRefs } from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
  const loader = reactive({
    loading: true,
    loaded: false,
    result: <T | null>null,
    error: <T | null>null,
  });

  axios
    .get(url)
    .then((rawData) => {
      loader.loading = false;
      loader.loaded = true;
      loader.result = rawData.data;
    })
    .catch((e) => {
      loader.error = e;
      loader.loading = false;
    });

  return toRefs(loader);
}

export default useURLLoader;
