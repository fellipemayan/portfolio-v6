<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  delay?: number
}>()
</script>

<template>
  <Motion
    is="div"
    :initial="{ y: 40, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ 
      duration: 0.4, 
      delay: delay || 0, 
      ease: [0.33, 1, 0.68, 1] 
    }"
  >
    <slot />
  </Motion>
</template>