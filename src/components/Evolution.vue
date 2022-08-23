<script>
export default {
  name: "EvolutionVue",
  props: {
    chain: Object,
  },
  methods: {
    removeHttp: (url) => {
      return url.replace(/^https?:\/\//, "");
    },
    pkmIMG(ID) {
      return this.$store.getters.pkmIMG(ID);
    },
  },
  computed: {
    hasChild() {
      const { evolves_to } = this.chain;
      return evolves_to.length > 0;
    },
    ID() {
      const URL = this.chain.species.url;
      return this.removeHttp(URL).split("/")[4];
    },
  },
};
</script>

<template>
  <!-- Single Evolution -->
  <div class="evolution">
    <div class="form divider">
      <h4 class="name">{{ chain.species.name }}</h4>
      <img :src="pkmIMG(this.ID)" :alt="chain.species.name" />
    </div>
    <div class="divider" v-if="hasChild">></div>
    <div v-if="hasChild">
      <Evolution
        v-for="chain in chain.evolves_to"
        :key="chain"
        :chain="chain"
      />
    </div>
  </div>
</template>

<style scoped>
.evolution,
.divider {
  display: flex;
  justify-content: space-around;
}
.divider {
  align-items: center;
  font-weight: 700;
  margin-right: 5px;
}
.name {
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
}
</style>
