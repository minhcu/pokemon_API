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
    isArray() {
      return this.chain.constructor.name === "Array" ? true : false;
    },
    hasChild() {
      return this.chain.evolves_to.length > 0 ? true : false;
    },
    ID() {
      if (this.isArray) {
        return this.chain.map(
          (form) => this.removeHttp(form.species.url).split("/")[4]
        );
      } else {
        const URL = this.chain.species.url;
        return this.removeHttp(URL).split("/")[4];
      }
    },
  },
};
</script>

<template>
  <!-- Multiple Evolution -->
  <div v-if="isArray">
    <div
      class="form divider"
      v-for="(chain, index) in chain"
      :key="chain.species.name"
    >
      <h4 class="name">{{ chain.species.name }}</h4>
      <img :src="pkmIMG(this.ID[index])" :alt="chain.species.name" />
    </div>
    <!-- <Evolution v-if="hasChild" :chain="chain.evolves_to" /> -->
  </div>
  <!-- Single Evolution -->
  <div class="evolution" v-else>
    <div class="form divider">
      <h4 class="name">{{ chain.species.name }}</h4>
      <img :src="pkmIMG(this.ID)" :alt="chain.species.name" />
    </div>
    <div class="divider">-></div>
    <Evolution v-if="hasChild" :chain="chain.evolves_to" />
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
}
.name {
  text-align: center;
  text-transform: capitalize;
}
</style>
