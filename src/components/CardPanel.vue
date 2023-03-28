<template>
  <VirtualScroll id="card-panel-container" @nextPage="nextPageHandler">
    <div
      class="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 h-fit"
    >
      <Card v-for="item in list" :item="item" :key="item.id" @like="like" />
    </div>
  </VirtualScroll>
</template>

<script setup>
import { ref, watch } from 'vue'
import VirtualScroll from '../components/VirtualScroll.vue'

import Card from './Card.vue'
import { useUser } from '../composables/useUser'

const { setFavorites } = useUser()
const pageSize = 20

const props = defineProps({
  pokemonList: {
    default: () => [],
    type: Array
  }
})

watch(
  () => props.pokemonList,
  () => {
    list.value = props.pokemonList.slice(0, 20)
  }
)

let list = ref([...props.pokemonList].slice(0, pageSize))

const like = (pokemon) => {
  pokemon.favorite = !pokemon.favorite
  setFavorites(pokemon)
}

const nextPageHandler = () => {
  const start = list.value.length
  const end = start + pageSize
  list.value = [...list.value, ...props.pokemonList.slice(start, end)]
}
</script>
