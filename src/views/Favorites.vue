<template>
  <div class="flex flex-col gap-4 h-screen p-4 bg-gray-100">
    <NavigationToolbar />
    <div class="flex flex-col items-center justify-between py-4 w-full">
      <h2 class="text-4xl font-bold">Favorites</h2>
    </div>
    <CardPanel class="flex-1" v-if="favorites.length" :pokemon-list="favorites" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NavigationToolbar from '../components/NavigationToolbar.vue'
import CardPanel from '../components/CardPanel.vue'
import { useUser } from '../composables/useUser'

const { getFavorites } = useUser()

const favorites = computed(() => {
  return getFavorites()
})
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
#card-panel-container {
  scrollbar-width: auto;
  scrollbar-color: theme('colors.blue.800') #ffffff;
}

/* Chrome, Edge, and Safari */
#card-panel-container::-webkit-scrollbar {
  width: 8px;
}

#card-panel-container::-webkit-scrollbar-track {
  background: transparent;
}

#card-panel-container::-webkit-scrollbar-thumb {
  background-color: theme('colors.blue.800');
  border-radius: 10px;
  border: 2px solid theme('colors.white');
}
</style>
