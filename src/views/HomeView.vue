<script setup>
import { computed, ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { useStore } from "vuex";
import Card from "@/components/Card/Card.vue";
import Loading from "@/components/Loading.vue";
import API_CONFIG from "@/api";
import useFetchAPI from "@/composable/fetchAPI";

const store = useStore();
const { data, pending, fetchData } = useFetchAPI();
const pokemons = computed(() => store.getters.pokeList.slice(0, limit.value));
const searchQuery = ref(store.state.q);
const URL = API_CONFIG.pokeListURL(0, 898);
const limit = ref(36);

fetchData(URL, store.state.pokemons.length).then(() => {
  if (data.value) store.dispatch("setPokemons", data.value.results);
});

watchDebounced(
  searchQuery,
  () => {
    store.dispatch("searchPokemon", searchQuery);
  },
  { debounce: 500, maxWait: 500 }
);

const handleLimit = function () {
  limit.value += limit.value;
  return;
};
</script>

<template>
  <Loading v-if="pending" />
  <div class="container" v-if="!pending">
    <div class="wrapper header-wrap">
      <div class="heading">
        <h2>Pokemon API</h2>
      </div>
      <div class="search__wrap">
        <input
          class="search"
          type="text"
          v-model="searchQuery"
          placeholder="Search some Pokemon..."
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="no-result" v-if="!pokemons.length">
        No pokemon matched with "<span>{{ searchQuery }}</span
        >"
      </div>
      <template v-else>
        <div class="col" v-for="pokemon in pokemons" :key="pokemon.name">
          <Card :name="pokemon.name" :URL="pokemon.url" />
        </div>
      </template>
    </div>
    <div class="wrapper" v-if="!searchQuery && pokemons.length !== 0">
      <div class="col-full">
        <button class="btn" @click="handleLimit">Load More</button>
      </div>
    </div>
  </div>
</template>

<style>
.no-result {
  font-size: 24px;
}
.no-result span {
  font-weight: 700;
}
.container {
  max-width: 1200px;
  margin: 50px auto;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.col {
  --width: 50%;
  --offset: 10px;
  max-width: calc(var(--width) - calc(var(--offset)));
  flex-basis: calc(var(--width) - calc(var(--offset)));
  margin: 0 calc(var(--offset) / 2);
  margin-bottom: var(--offset);
  border-radius: 15px;
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

.header-wrap {
  flex-direction: column;
  align-items: center;
}
.heading {
  font-size: 25px;
  margin-bottom: 50px;
}
.search__wrap {
  max-width: 500px;
  width: 100%;
  margin: 0 15px;
  margin-bottom: 50px;
}

.search {
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 30px;
  outline: 1px solid #00000036;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-size: 16px;
  transition: all 0.2s ease;
}
.search:focus {
  outline: 1px solid #000000;
}

.col-full {
  padding-top: 50px;
  width: 100%;
  text-align: center;
}
.btn {
  cursor: pointer;
  padding: 20px 25px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff4d4f;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  -webkit-transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
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
