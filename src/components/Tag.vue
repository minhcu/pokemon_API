<template>
  <div class="tag">
    <div class="tag__label" :class="statName(label)">
      {{ statName(label) }}
    </div>
    <div class="tag__detail">
      {{ detail }}
    </div>
    <router-link class="btn" to="/">&lt; Back</router-link>
  </div>
</template>

<script>
export default {
  name: "TagVue",
  methods: {
    statName(statName) {
      switch (statName) {
        case "hp":
          return "HP";
        case "attack":
          return "ATK";
        case "defense":
          return "DEF";
        case "special-attack":
          return "SpA";
        case "special-defense":
          return "SpD";
        case "speed":
          return "SPD";
        case "tdt":
          return "TDT";
        default:
          return null;
      }
    },
  },
  props: {
    label: String,
    detail: Number,
  },
  computed: {},
};
</script>

<style scoped>
.tag {
  margin: 5px;
  padding: 5px;
  background-color: #f6f8fc;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.tag__label {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
}
.tag__detail {
  text-align: center;
}
.btn {
  position: fixed;
  top: 5%;
  left: 10%;
  border-radius: 30px;
  padding: 5px 10px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 6px 0px;
}
.HP {
  background-color: #df2140;
}
.ATK {
  background-color: #ff994d;
}
.DEF {
  background-color: #eecd3d;
}
.SpA {
  background-color: #85ddff;
}
.SpD {
  background-color: #96da83;
}
.SPD {
  background-color: #fb94a8;
}
</style>
