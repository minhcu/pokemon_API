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
  padding: 3px 4px;
  border-radius: 5px;
  margin: 0 3px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.normal {
  background-color: #a8a77a;
}
.fighting {
  background-color: #c22e28;
}
.flying {
  background-color: #a98ff3;
}
.poison {
  background-color: #a33ea1;
}
.ground {
  background-color: #e2bf65;
}
.rock {
  background-color: #b6a136;
}
.bug {
  background-color: #a6b91a;
}
.ghost {
  background-color: #735797;
}
.steel {
  background-color: #b7b7ce;
}
.fire {
  background-color: #ff421c;
}
.water {
  background-color: #6390f0;
}
.grass {
  background-color: #78cd54;
}
.electric {
  background-color: #f7d02c;
}
.psychic {
  background-color: #f95587;
}
.ice {
  background-color: #96d9d6;
}
.dragon {
  background-color: #6f35fc;
}
.dark {
  background-color: #705746;
}
.fairy {
  background-color: #d685ad;
}
.unknow {
  background-color: #68a090;
}
.shadow {
  background-color: #735797;
}
</style>
