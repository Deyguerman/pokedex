<template>
  <div
    @click="showDetail"
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#" class="flex items-center justify-center">
      <img
        class="p-8 rounded-t-lg"
        :src="props.item.thumbnailImg"
        alt="product image"
        width="250"
        height="250"
      />
    </a>
    <div class="px-5 pb-5">
      <div class="flex items-center justify-between mt-2.5 mb-5">
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
          >Nº {{ props.item.id }}</span
        >
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white capitalize">{{
          props.item.name
        }}</span>
        <button
          class="p-4 like-btn"
          :class="[props.item.favorite ? 'bg-red-500' : 'bg-gray-200']"
          @click.stop="$emit('like', item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePokemons } from '../composables/usePokemons'

const { getPokemon } = usePokemons()
const router = useRouter()
const props = defineProps({
  item: Object
})

const showDetail = async () => {
  await getPokemon(props.item.id)
  router.push({ path: `/pokedex/:${props.item.id}` })
}
</script>

<style>
.like-btn {
  mask: url(@/assets/icons/like.svg) no-repeat;
}
</style>
