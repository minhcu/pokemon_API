<script>
import Card from "../components/Card.vue";

export default {
  computed: {
    pokemons() {
      return this.$store.getters.pokeLIST;
    },
    pkmIMG() {
      return this.$store.getters.pkmIMG;
    },
  },
  components: {
    Card,
  },
};
</script>

<template>
  <div class="container" v-if="pokemons.length !== 0">
    <div class="wrapper">
      <div class="col" v-for="pokemon in pokemons" :key="pokemon.name">
        <Card
          :name="pokemon.name"
          :image="pkmIMG(pokemon.id)"
          :types="pokemon.types"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  width: 1200px;
  margin: 50px auto;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.col {
  --width: 16.66%;
  --offset: 10px;
  max-width: calc(var(--width) - var(--offset));
  flex-basis: calc(var(--width) - var(--offset));
  border-radius: 15px;
  margin-bottom: var(--offset);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  -webkit-transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.col:hover {
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: box-shadow 0.4s ease-out;
  transition: box-shadow 0.4s ease-out;
}
</style>
