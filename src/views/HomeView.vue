<script>
import Card from "../components/Card.vue";
import API_CONFIG from "../api";
import { reactive, toRefs, computed, ref } from "vue";
export default {
  name: "HomeView",
  setup() {
    const URL = API_CONFIG.pokeListURL(0, 898);
    const state = reactive({
      pokemons: [],
      searchQuery: "",
      limit: 30,
      filteredPokemons: computed(() => handleSearch()),
      limitedPokemons: computed(() => state.pokemons.slice(0, state.limit)),
    });
    const pending = ref(true);
    const error = ref(null);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        state.pokemons = data.results;
      });

    function handleSearch() {
      const query = state.searchQuery;
      if (query) {
        return state.pokemons.filter((pokemon) => pokemon.name.includes(query));
      }
    }
    const handleLimit = function () {
      state.limit += 30;
      return;
    };
    return {
      ...toRefs(state),
      handleLimit,
      pending,
      error,
    };
  },
  components: {
    Card,
  },
};
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div class="container" v-else-if="pokemons.length > 0">
    <div class="wrapper">
      <div class="search__wrap">
        <input
          class="search"
          type="text"
          v-model="searchQuery"
          placeholder="Search some Pokemon..."
        />
      </div>
    </div>
    <div class="wrapper" v-if="searchQuery">
      <div class="col" v-for="pokemon in filteredPokemons" :key="pokemon.name">
        <Card :name="pokemon.name" :URL="pokemon.url" />
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="col" v-for="pokemon in limitedPokemons" :key="pokemon.name">
        <Card :name="pokemon.name" :URL="pokemon.url" />
      </div>
    </div>
    <div class="wrapper">
      <div class="col-full">
        <button class="btn" @click="handleLimit">Load More</button>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading</div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 50px auto;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.col {
  --width: 50%;
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

.search__wrap {
  max-width: 500px;
  width: 100%;
  margin: 0 15px;
}

.search {
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 30px;
  outline: none;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 50px;
  font-size: 16px;
}

.btn {
  cursor: pointer;
  height: 40px;
  padding: 6px 15px;
  margin: 80px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff4d4f;
}
.btn:hover {
  background-color: #ff7875;
}
.btn:active {
  background-color: #d9363e;
}

@media (min-width: 768px) {
  .col {
    --width: 33.33%;
    --offset: 10px;
  }
}

@media (min-width: 960px) {
  .col {
    --width: 25%;
    --offset: 10px;
  }
}

@media (min-width: 1200px) {
  .col {
    --width: 16.66%;
    --offset: 10px;
  }
}
</style>
