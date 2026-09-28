<script setup lang="ts">
import { ref, reactive } from 'vue'
// import { animate } from 'motion'

// Configurações e Estado
const formspreeId = process.env.NUXT_PUBLIC_FORMSPREE_ID || 'SEU_ID_AQUI'
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const shake = ref(false)
const isPulverizing = ref(false)
const pulverizeScale = ref(0) // Valor reativo para o SVG

// Estrutura inspirada no Otherwhere Creative
const formData = reactive({
  name: '',
  email: '',
  services: [] as string[],
  budget: '',
  timeline: '',
  message: ''
})

const servicesOptions = ['UI/UX Design', 'Front-end', 'Design Gráfico', 'Consultoria / Outro']
const budgetOptions = ['Menos de R$ 3.000', 'R$ 3.000 - R$ 8.000', 'R$ 8.000 - R$ 15.000', 'Mais de R$ 15.000']
const timelineOptions = ['O quanto antes', '1 a 2 meses', '3 a 6 meses', 'Sem pressa']

// Mock das redes sociais (depois virá do Sanity)
const socialLinks = ref([
  { name: 'LinkedIn', url: 'https://linkedin.com/in/fellipemayan', isVisible: true },
  { name: 'Behance', url: 'https://behance.net/fellipemayan', isVisible: true },
  { name: 'GitHub', url: 'https://github.com/fellipemayan', isVisible: true }
])

// Ações e Animações
const copyEmailToClipboard = async () => {
  await navigator.clipboard.writeText('fmayan999@gmail.com')
  alert('E-mail copiado para a área de transferência!')
}

const handleNameBlur = () => {
  const firstName = formData.name.trim().split(' ')[0]
  if (firstName) {
    // TODO: Disparar action do Pinia aqui para atualizar o cursor global:
    // cursorStore.setDynamicText(`Oi, ${firstName} :)`)
  }
}

const triggerError = () => {
  status.value = 'error'
  shake.value = true
  setTimeout(() => (shake.value = false), 500)
  setTimeout(() => (status.value = 'idle'), 3000)
}

const submitForm = async (e: Event) => {
  e.preventDefault()
  
  if (!formData.email.includes('@')) {
    triggerError()
    return
  }

  status.value = 'loading'

  try {
    // Comunicação direta com a API do Formspree
    await $fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    
    status.value = 'success'

    // Reset do formulário
    setTimeout(() => {
      status.value = 'idle'
      isPulverizing.value = false
      pulverizeScale.value = 0
      Object.assign(formData, { name: '', email: '', services: [], budget: '', timeline: '', message: '' })
    }, 2600)

  } catch (err) {
    triggerError()
  }
}
</script>

<template>
  <main class="contact-page">
    
    <!-- SEÇÃO HERO -->
    <section id="hero" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h1>Toda boa ideia começa com uma boa história</h1>
      </MotionSlideUp>
      
      <MotionSlideUp :delay="0.1">
        <p>
          O contato pode ser feito via 
          <button class="copy" @click="copyEmailToClipboard">e-mail</button>, 
          pelas minhas redes sociais ou através do formulário abaixo.
        </p>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.2">
        <ul class="contact-info horizontal">
          <li v-for="contact in socialLinks.filter(l => l.isVisible)" :key="contact.name">
            <a :href="contact.url" target="_blank" rel="noopener noreferrer" class="external-link">
              {{ contact.name }}
            </a>
          </li>
        </ul>
      </MotionSlideUp>
    </section>

    <!-- SEÇÃO DO FORMULÁRIO (Estilo Otherwhere) -->
    <section id="form-section" class="full-width">
      <MotionSlideUp :delay="0.3">
        
        <form 
          class="contact-form" 
          :class="{ 'pulverizing': isPulverizing, 'shake-animation': shake }" 
          @submit="submitForm"
        >
          <!-- 1. Informações Básicas -->
          <div class="form-group">
            <label for="name">Como você se chama?</label>
            <input id="name" v-model="formData.name" type="text"  required  placeholder="Seu nome" @blur="handleNameBlur"/>
          </div>

          <div class="form-group">
            <label for="email">E-mail para contato</label>
            <input id="email" v-model="formData.email" type="email"  required placeholder="seu@email.com" />
          </div>

          <!-- 2. Escopo do Projeto (Novo) -->
          <div class="form-group checkboxes">
            <label>O que você está buscando?</label>
            <div class="checkbox-grid">
              <label v-for="service in servicesOptions" :key="service" class="checkbox-label">
                <input v-model="formData.services" type="checkbox" :value="service" />
                {{ service }}
              </label>
            </div>
          </div>

          <div class="form-group grid-2">
            <div>
              <label for="budget">Orçamento estimado</label>
              <select id="budget" v-model="formData.budget" required>
                <option value="" disabled>Selecione uma faixa...</option>
                <option v-for="budget in budgetOptions" :key="budget" :value="budget">{{ budget }}</option>
              </select>
            </div>
            <div>
              <label for="timeline">Prazo ideal</label>
              <select id="timeline" v-model="formData.timeline" required>
                <option value="" disabled>Selecione um prazo...</option>
                <option v-for="time in timelineOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>
          </div>

          <!-- 3. Mensagem -->
          <div class="form-group">
            <label for="message">Detalhes do projeto</label>
            <textarea id="message" v-model="formData.message" rows="4" required placeholder="Descreva brevemente a ideia que gostaria de discutir..."></textarea>
          </div>

          <!-- Botão de Envio com Estado Dinâmico -->
          <button 
            type="submit" 
            class="btn submit-btn" 
            :class="status"
            :disabled="status === 'loading' || status === 'success'"
          >
            <transition name="fade" mode="out-in">
              <span :key="status">
                {{ 
                  status === 'loading' ? 'Enviando...' : 
                  status === 'success' ? 'Enviado!' : 
                  status === 'error' ? 'Verifique os campos' : 
                  'Enviar mensagem' 
                }}
              </span>
            </transition>
          </button>
        </form>

      </MotionSlideUp>
    </section>

  </main>
</template>

<style scoped>
/* Transição nativa do Vue para o texto do botão (substitui o AnimatePresence do React) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
  filter: blur(4px);
}

/* Animação de Shake CSS (Mais leve que recriar via JS no submit) */
.shake-animation {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

/* Base do CSS das opções de escopo */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 600px) {
  .grid-2 { grid-template-columns: 1fr; }
}
</style>