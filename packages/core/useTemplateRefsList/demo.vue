<script setup lang="ts">
import { useTemplateRefsList } from '@vueuse/core'
import { nextTick, shallowRef, watch } from 'vue'

const count = shallowRef(5)
const refs = useTemplateRefsList<HTMLDivElement>()

watch(refs, async () => {
  await nextTick()
  console.log([...refs.value])
}, {
  deep: true,
  flush: 'post',
})
</script>

<template>
  <span v-for="i of count" :key="i" :ref="refs.set" class="mr-2">
    {{ i }}
  </span>
  <br>
  <button @click="count += 1">
    Inc
  </button>
  <button :disabled="count <= 0" @click="count -= 1">
    Dec
  </button>
  <note>Open the console to see the output</note>
</template>
