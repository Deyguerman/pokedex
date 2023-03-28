<template>
  <div class="flex flex-col gap-4 h-fit lg:h-screen p-4 bg-gray-100">
    <NavigationToolbar />

    <Transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-show="showDetail"
        class="w-full flex flex-wrap flex-row gap-4 p-4 rounded bg-blue-400/70 h-fit lg:h-full"
      >
        <div class="flex flex-col w-full">
          <img
            @click="router.go(-1)"
            src="../assets/icons/arrow_back.svg"
            alt=""
            width="40"
            class="cursor-pointer hover:bg-gray-300 rounded"
          />
          <h4 class="text-4xl font-bold pb-2 text-white self-center capitalize">
            {{ pokemon.name }}
          </h4>
        </div>
        <div class="flex flex-col lg:flex-row w-full gap-4">
          <div class="bg-white rounded shadow w-full lg:w-1/3 grid justify-center">
            <img width="200" :src="pokemon.picture" />
          </div>
          <div class="grid gap-2 text-center w-full lg:w-1/3">
            <div class="grid bg-white rounded px-4">
              <span class="text-lg font-bold">Height</span>
              <span>{{ pokemon.height }} m</span>
            </div>
            <div class="grid bg-white rounded px-4">
              <span class="text-lg font-bold">Weight</span>
              <span>{{ pokemon.weight }} kg</span>
            </div>
            <div class="grid bg-white rounded px-4">
              <span class="text-lg font-bold">Gender</span>
              <span>{{ pokemon.gender }}</span>
            </div>
          </div>
          <div class="grid gap-2 text-center w-full lg:w-1/3">
            <div class="grid bg-white rounded px-4">
              <span class="text-lg font-bold">Types</span>
              <span class="capitalize">{{ pokemon.types.join(', ') }}</span>
            </div>
            <div class="grid bg-white rounded px-4">
              <span class="text-lg font-bold">Weaknesses</span>
              <span class="capitalize">{{ pokemon.weaknesses?.join(', ') }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row w-full gap-4">
          <div class="grid gap-2 w-full lg:w-1/2">
            <div class="grid grid-cols-3 text-center bg-white rounded p-4">
              <span class="text-lg font-bold col-span-3">Stats</span>
              <p class="grid" v-for="(stat, index) in pokemon.stats" :key="stat.name + index">
                <span class="font-bold capitalize">{{ stat.name }}</span>
                {{ stat.value }} / 250
              </p>
            </div>
          </div>
          <div class="grid gap-2 w-full lg:w-1/2">
            <div class="grid grid-cols-3 text-center bg-white rounded p-4">
              <span class="text-lg font-bold col-span-3">Abilities</span>
              <p
                class="grid"
                v-for="(item, index) in pokemon.abilities"
                :key="item.ability.name + index"
              >
                <span class="font-bold capitalize">{{ item.ability.name }}</span>
                {{ item.is_hidden ? 'Hidden Ability' : '' }}
              </p>
            </div>
          </div>
        </div>
        <h4 class="w-full self-center text-center text-2xl text-white font-bold">Evolutions</h4>
        <div class="flex flex-col lg:flex-row w-full justify-center items-center gap-4">
          <template v-for="(item, index) in pokemon.evolutions" :key="evolution + item.id">
            <div class="bg-white rounded shadow h-fit md:h-full grid justify-center items-center">
              <img width="200" :src="item.thumbnailImg" />
              <span class="text-center text-lg font-bold capitalize">{{ item.name }}</span>
            </div>
            <img
              v-if="index < pokemon.evolutions.length - 1"
              src="../assets/icons/arrow_back.svg"
              alt=""
              width="50"
              class="-rotate-90 lg:rotate-180"
            />
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavigationToolbar from './NavigationToolbar.vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { usePokemons } from '../composables/usePokemons'

const { pokemon } = usePokemons()
const router = useRouter()
const showDetail = ref(false)

onMounted(() => {
  setTimeout(() => {
    showDetail.value = true
  }, 100)
})

onBeforeRouteLeave((to, from, next) => {
  showDetail.value = false
  setTimeout(() => {
    next()
  }, 100)
})
</script>

<style lang="scss" scoped></style>
