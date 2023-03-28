<template>
  <nav
    class="w-full flex flex-wrap gap-6 justify-center md:justify-between items-center border-blue-600 shadow-md border bg-blue-400 rounded"
  >
    <img
      class="w-4/5 pt-4 md:pt-0 md:w-24 md:ml-4"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
      alt=""
    />
    <div class="flex h-auto items-stretch">
      <router-link
        id="pokedexLink"
        to="/pokedex"
        active-class="bg-red-600"
        class="text-white border-transparent hover:bg-red-600 font-medium text-md px-5 py-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >Pokedex</router-link
      >
      <router-link
        id="favoritesLink"
        to="/favorites"
        active-class="bg-orange-600"
        class="text-white border-transparent hover:bg-orange-600 font-medium text-md px-5 py-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >Favorites</router-link
      >
      <router-link
        to="/"
        id="logout"
        @click="logout"
        class="text-white rounded-r-sm border-transparent hover:bg-white hover:text-red-500 font-medium text-md px-5 py-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >Logout</router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { useUser } from '../composables/useUser'

const { logout } = useUser()
</script>

<style lang="scss" scoped></style>
