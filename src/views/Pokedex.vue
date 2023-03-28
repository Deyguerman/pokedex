<template>
  <div class="flex flex-col gap-4 h-screen p-4 bg-gray-100">
    <NavigationToolbar />
    <div class="flex flex-col items-center justify-between py-4 w-full">
      <h2 class="text-4xl font-bold">Pokedex</h2>
      <div class="w-1/3 my-4 flex border-gray-300 border-2 rounded-md shadow">
        <svg
          aria-hidden="true"
          class="w-10 py-2 px-2 h-full bg-white text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <vue3-simple-typeahead
          class="w-full py-2 outline-none capitalize"
          id="typeahead_id"
          placeholder="Search Pokemon by Name"
          :items="pokemonList"
          :minInputLength="1"
          :itemProjection="(item) => item.name"
          @selectItem="selectItemEventHandler"
          @onInput="onInputEventHandler"
          ref="typehead"
        >
          <template #list-item-text="slot">
            <span v-html="slot.boldMatchText(slot.itemProjection(slot.item))" />
          </template>
        </vue3-simple-typeahead>
        <button @click="clearSearch">
          <svg
            aria-hidden="true"
            class="w-10 py-2 px-2 h-full bg-white text-gray-500 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <CardPanel class="flex-1 h-fit" :pokemonList="pokemons" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import NavigationToolbar from '../components/NavigationToolbar.vue'
import CardPanel from '../components/CardPanel.vue'

import { usePokemons } from '../composables/usePokemons'

const { getAllPokemons, setFilteredPokemons, getPokedex, pokemonList } = usePokemons()
const typehead = ref(null)
const pokemons = ref([])

const pokedex = computed(() => {
  return getPokedex()
})

watch(
  pokedex,
  () => {
    pokemons.value = pokedex.value
  },
  {
    immediate: true
  }
)

const onInputEventHandler = ({ items }) => {
  setFilteredPokemons(items)
}

const selectItemEventHandler = (item) => {
  setFilteredPokemons([item])
}

const clearSearch = () => {
  typehead.value.clearInput()
  setFilteredPokemons()
}

onMounted(async () => {
  await getAllPokemons()
  clearSearch()
})
</script>

<style scoped>
#card-panel-container::-webkit-scrollbar-track {
  background: transparent !important;
}
</style>
