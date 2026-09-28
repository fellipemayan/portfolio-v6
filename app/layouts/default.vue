<script setup lang="ts">
import HeaderComponent from '~/components/Header/headerComponent.vue';
</script>

<template>
  <div>
    <HeaderComponent />
    <main>
      <slot />
    </main>
  </div>
</template>