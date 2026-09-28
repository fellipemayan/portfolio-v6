<script setup lang="ts">
import { useLocalePath } from '#imports'

// Definimos o formato exato das propriedades que o componente aceita
interface ActionButton {
  label: string;
  path: string;
}

defineProps<{
  title: string;
  description: string;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton; // Opcional, caso a página precise só de um botão
}>()

const localePath = useLocalePath()
</script>

<template>
  <section class="cta-banner" style="padding: 4rem 0; text-align: left;">
    
    <MotionSlideUp>
      <h2 style="font-size: 2rem; margin-bottom: 1rem;">
        {{ title }}
      </h2>
    </MotionSlideUp>

    <MotionSlideUp :delay="0.1">
      <p style="margin-bottom: 2rem; max-width: 600px;">
        {{ description }}
      </p>
    </MotionSlideUp>

    <MotionSlideUp :delay="0.2">
      <div class="cta-actions" style="display: flex; gap: 1rem;">
        
        <NuxtLink 
          :to="localePath(primaryAction.path)" 
          class="btn primary-btn"
        >
          {{ primaryAction.label }}
        </NuxtLink>

        <NuxtLink 
          v-if="secondaryAction"
          :to="localePath(secondaryAction.path)" 
          class="btn secondary-btn"
        >
          {{ secondaryAction.label }}
        </NuxtLink>

      </div>
    </MotionSlideUp>
    
  </section>
</template>