import { ref, shallowRef } from "vue";

export default function useFetchAPI() {
  const pending = ref(false);
  const error = ref(null);
  const data = shallowRef(null);

  const fetchData = async (url, fetched) => {
    pending.value = true;
    try {
      if (fetched) return;
      else {
        const response = await fetch(url);
        const json = await response.json();
        data.value = json;
      }
    } catch (err) {
      error.value = err;
    } finally {
      pending.value = false;
    }
  };

  return { pending, error, data, fetchData };
}
