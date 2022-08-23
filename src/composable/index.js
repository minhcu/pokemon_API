import { ref } from "vue";

const callAPI = async (url) => {
  const pending = ref(true);
  const error = ref(null);
  const data = ref(null);
  const getData = async () => {
    try {
      pending.value = true;
      const response = await fetch(url);
      const result = await response.json();
      data.value = result;
    } catch (e) {
      error.value = e;
    } finally {
      pending.value = false;
    }
  };
  await getData();
  return {
    pending,
    error,
    data,
    getData,
  };
};

export default callAPI;
