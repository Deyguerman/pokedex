<template>
  <div class="w-full flex-1 overflow-y-auto rounded-md p-4 shadow-md" @scroll="scrollHandler">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['nextPage'])

const isEnd = ref(false)

const scrollHandler = (e) => {
  if (isEnd.value) return
  const { offsetHeight, scrollTop, scrollHeight } = e.target

  if (offsetHeight + scrollTop >= scrollHeight - 20) {
    emit('nextPage')
  }
}

const endScroll = () => {
  isEnd.value = true
}


defineExpose({
  endScroll
})
</script>

<style lang="scss" scoped></style>
