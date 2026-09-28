<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from '#imports'
import { ArrowUpIcon } from '@heroicons/vue/16/solid'

defineProps<{
  socialLinks?: Array<{ name: string; url: string }>
}>()

const { t, locale, locales, setLocale } = useI18n()

const currentTime = ref('')
const isNight = ref(false)
let timer: ReturnType<typeof setInterval>

const updateTime = () => {
  const now = new Date()
  const timeZone = 'America/Fortaleza'
  
  currentTime.value = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    timeStyle: 'short',
  }).format(now)

  const currentHour = parseInt(new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  }).format(now), 10)
  
  isNight.value = currentHour >= 18 || currentHour < 6
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60000) 
})

onUnmounted(() => {
  clearInterval(timer)
})

const currentWeather = ref({
  data: { description: 'nublado', temp: 32 }
})

const weatherIcon = computed(() => {
  if (!currentWeather.value?.data) return ''
  const desc = currentWeather.value.data.description.toLowerCase()
  if (desc.includes('chuva') || desc.includes('garoa') || desc.includes('tempestade')) return 'cloud'
  if (desc.includes('nublado') || desc.includes('nuven') || desc.includes('nuvem')) return 'cloud'
  return isNight.value ? 'moon' : 'sun'
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reduceMotion = ref(false)
</script>

<template>
  <footer class="full-width footer">
    <div class="footer-grid">
      <MotionSlideUp class="left">
        <button class="btn primary-btn" @click="scrollToTop">
          <ArrowUpIcon class="icon-md" /> Topo
        </button>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.1" class="middle-left">
        <ul>
          <li v-for="link in socialLinks" :key="link.name">
            <a 
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="external-link"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.2" class="middle-right">
        <p class="footer-location">Quixadá&ndash;CE</p>
        <p>No momento são {{ currentTime }}</p>
        <p v-if="currentWeather.data">
          O clima está 
          <span 
            id="weather-description"
            :data-cursor-icon="weatherIcon"
            data-cursor-icon-pos="only"
          >
            {{ currentWeather.data.description }}
          </span>, e fazem {{ currentWeather.data.temp }}°C
        </p>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.3" class="copy-right">
        <p>&copy; {{ new Date().getFullYear() }} Fellipe Mayan.</p>
        <p>Copyright & Afins.</p>
        
        <div class="footer-settings" style="margin-top: 1rem; display: flex; gap: 1rem; flex-direction: column;">
          <label>
            Idioma:
            <select v-model="locale" @change="setLocale(locale)" class="footer-select">
              <option v-for="l in locales" :key="l.code" :value="l.code">
                {{ l.name }}
              </option>
            </select>
          </label>
          
          <label>
            Animações:
            <select v-model="reduceMotion" class="footer-select">
              <option :value="false">Padrão</option>
              <option :value="true">Reduzidas</option>
            </select>
          </label>
        </div>
      </MotionSlideUp>
    </div>

    <MotionSlideUp :delay="0.4" class="colophon" style="margin-top: 4rem; text-transform: uppercase; font-size: 0.8rem; text-align: center;">
      <p>
        Este portfólio foi criado usando <a href="https://nuxt.com" target="_blank">Nuxt.js</a> com Vue e CSS.
      </p>
      <p>
        Os ícones usados são da biblioteca <a href="https://heroicons.com" target="_blank">Heroicons</a>. As animações são foram implementadas com <a href="https://motion.dev" target="_blank">Motion.dev</a>. O código-fonte está disponível no <a href="#" target="_blank">Github</a>.
      </p>
      <p>
        Os tipos utilizados nesse projeto foram <a href="#">Zalando Sans</a> (&copy; 2025 The Zalando Sans Project Authors) e <a href="#">NKDuy</a> (&copy; 2022 NKDuy).
      </p>
      <p style="margin-top: 2rem;">
        6.0.0 | Última atualização em {{ new Date().toLocaleDateString('pt-BR') }} | <a href="#">Changelog</a> :)
      </p>
    </MotionSlideUp>
  </footer>
</template>

<style scoped>
.footer-select {
  background: transparent;
  border: 1px solid currentColor;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: inherit;
  color: inherit;
}
</style>