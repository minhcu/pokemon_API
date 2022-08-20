<template>
  <div class="label" :class="type">
    {{ type }}
  </div>
</template>

<script>
export default {
  name: "TheLabel",
  props: {
    type: String,
  },
};
</script>

<style scoped>
.label {
  padding: 4px 8px;
}
.fire {
  color: red;
}
</style>
