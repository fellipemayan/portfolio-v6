<script setup lang="ts">
import { useI18n } from '#imports'
import MotionSlideUp from '~/components/MotionSlideUp/motionSlideUp.vue';

const { t } = useI18n()

const mockProjects = [
  {
    id: 'molic',
    title: 'MoLIC.dg',
    category: 'Front-end & UX',
    description: 'Ferramenta web para diagramação de interações computacionais usando notação MoLIC.',
    isComingSoon: false
  },
  {
    id: 'vagabuilder',
    title: 'VagaBuilder',
    category: 'Fullstack & Game Design',
    description: 'Gerenciador de personagens responsivo com wizard passo-a-passo para o sistema Vagabond.',
    isComingSoon: false
  },
  {
    id: 'caixotim',
    title: 'Caixotim',
    category: 'Product Design',
    description: 'Indexador e organizador de fontes com sistema de tags customizadas.',
    isComingSoon: true
  }
]
</script>

<template>
  <main class="home-page">
    <section class="hero-section">
      <MotionSlideUp>
        <h1>
          Designer <span class="highlight">fullstack</span> que planeja, 
          projeta, desenvolve e refina produtos digitais
        </h1>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.1">
        <p class="subtitle">Arquitetura da Informação | UX/UI | Gráfico & Editorial | Front-end</p>
      </MotionSlideUp>
      
      <MotionSlideUp :delay="0.2">
        <div class="hero-actions">
          <button class="btn primary-btn">{{ t('nav.contact') }}</button>
          <button class="btn secondary-btn">Currículo</button>
        </div>
      </MotionSlideUp>
    </section>

    <section class="projects-section">
      <MotionSlideUp v-for="(project, index) in mockProjects" :key="project.id" :delay="index * 0.15">
        <article class="project-card">
          <div class="card-image-placeholder">
            <span v-if="project.isComingSoon" class="badge-soon">Em breve</span>
          </div>
          <div class="card-content">
            <span class="category">{{ project.category }}</span>
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
          </div>
        </article>
      </MotionSlideUp>
    </section>

    <CtaBanner
      title="Sua busca por um designer fullstack termina aqui"
      description="Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!"
      :primary-action="{ label: 'Entrar em contato', path: '/contato' }"
      :secondary-action="{ label: 'Ver projetos', path: '/projetos' }"
    />

  </main>
</template>