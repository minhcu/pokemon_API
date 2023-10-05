<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a class="pokemon-skeleton" href="#">
    <div class="id-skeleton">
      <span></span>
    </div>
    <div class="image-skeleton"></div>
    <h3 class="title-skeleton"></h3>
    <div class="labels-skeleton">
      <div class="label-skeleton"></div>
      <div class="label-skeleton"></div>
    </div>
  </a>
</template>

<style scoped>
.pokemon-skeleton {
  cursor: pointer;
  display: block;
  padding: 10px 5px;
}
.pokemon-skeleton .id-skeleton {
  text-align: center;
  max-height: 24px;
}
.id-skeleton span {
  display: inline-block;
  min-width: 30px;
  min-height: 24px;
  animation: pulse-bg 2s infinite;
  border-radius: 15px;
}
.image-skeleton {
  padding-top: 100%;
  background-size: contain;
  background-image: url("@/assets/no-pokemon-selected-image.png");
  background-repeat: no-repeat;
  background-position: center center;
}
.title-skeleton {
  min-height: 22px;
  margin: 4px 0;
  animation: pulse-bg 2s infinite;
  border-radius: 15px;
}
.labels-skeleton {
  display: flex;
  justify-content: center;
}
.label-skeleton {
  margin: 0 3px;
  min-height: 27px;
  min-width: 50px;
  animation: pulse-bg 2s infinite;
  border-radius: 15px;
}
</style>
