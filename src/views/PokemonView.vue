<script>
import LabelVue from "../components/Label.vue";
export default {
  computed: {
    pokemonName() {
      return this.$route.params.id;
    },
    pokemon() {
      return this.$store.getters.pokemonDetail(this.pokemonName);
    },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
  },
  components: { LabelVue },
};
</script>

<template>
  <div class="container" v-if="pokemon">
    <div class="wrapper">
      <div class="col-full">
        <div
          class="image"
          :style="`background-image:url('${pkmIMG(pokemon.id)}')`"
        ></div>
        <h2 class="name">
          {{ pokemon.name }}
        </h2>
        <div class="labels">
          <LabelVue
            v-for="typeItem in pokemon.types"
            :key="typeItem.type.name"
            :type="typeItem.type.name"
          />
        </div>
        <div class="detail__wrap">
          <div class="ibm__item">
            <h3 class="label">Height</h3>
            <div>{{ pokemon.height }}</div>
          </div>
          <div class="label">
            <h3 class="label">Weight</h3>
            <div>{{ pokemon.weight }}</div>
          </div>
        </div>
        <div class="">
          <h3 class="label">Abilities</h3>
          <div class="detail__wrap">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
            >
              <div>
                {{ ability.ability.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="stats">
          <h3 class="label">Stats</h3>
          <div class="detail__wrap">
            <div v-for="stat in pokemon.stats" :key="stat.base_stat">
              {{ stat.base_stat }}
            </div>
          </div>
        </div>
        <div class="evolution">
          <h3 class="label">Evolution</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-full {
  width: 500px;
}
.col-full > * {
  width: 100%;
}
.image {
  width: 100px;
  height: 100px;
  margin: auto;
  background-size: cover;
}
.name {
  text-align: center;
  text-transform: capitalize;
}
.labels {
  display: flex;
  justify-content: center;
}
.detail__wrap {
  display: flex;
  justify-content: space-evenly;
}
.ibm__item {
  text-align: center;
}
.label {
  font-weight: 600;
  text-align: center;
}
</style>
