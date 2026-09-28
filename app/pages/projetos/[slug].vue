<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n, useLocalePath } from '#imports'
import { PortableText } from '@portabletext/vue'
import { ArrowLeftIcon, ArrowRightIcon, ListBulletIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { h } from 'vue'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const slug = route.params.slug as string

// ==========================================
// FUNÇÃO DE TRADUÇÃO NÍVEL-DE-CAMPO
// ==========================================
const getLocaleString = (val: any) => {
  if (!val) return ''
  if (typeof val === 'string') return val
  // Puxa o idioma ativo do i18n, com fallback para 'pt'
  if (val[locale.value]) return val[locale.value]
  if (val.pt) return val.pt
  if (val.en) return val.en
  return ''
}

// ==========================================
// MOCK DO PROJETO (Estrutura idêntica à sua query GROQ)
// ==========================================
// No futuro, isso será substituído por:
// const { data: project } = await useSanityQuery(`*[_type == "project" && slug.current == $slug][0]{...}`, { slug })
const project = ref({
  title: { pt: 'VagaBuilder', en: 'VagaBuilder' },
  description: { pt: 'Gerenciador de personagens responsivo com wizard passo-a-passo.', en: 'Responsive character manager...' },
  year: '2023',
  duration: { pt: '3 meses' },
  role: ['Front-end', 'UI/UX'],
  tags: [{ _id: '1', title: { pt: 'Desenvolvimento' } }],
  toolsAndskills: [{ _id: '1', title: { pt: 'Vue.js' } }, { _id: '2', title: { pt: 'Figma' } }],
  externalLinks: [{ label: 'Ver código', url: 'https://github.com/fellipemayan' }],
  isComingSoon: false,
  thumbnailImage: {
    horizontal: { asset: { url: 'https://placehold.co/1200x675/333/FFF?text=Hero+Image' } },
    vertical: undefined as { asset?: { url?: string } } | undefined,
    alt: { pt: 'Interface Principal' }
  },
  content: {
    pt: [
      { _type: 'block', _key: 'b1', style: 'h2', children: [{ _type: 'span', text: 'O Desafio' }] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', text: 'Criar um sistema acessível para jogadores de RPG.' }] }
    ]
  },
  gallery: []
})

// Mock para o fallback de "Em breve" e "Próximo Projeto"
const nextProjectSlug = ref('caixotim')
const randomProject = ref({ title: 'MoLIC.dg', slug: 'molic', thumbnailImage: { asset: { url: 'https://placehold.co/400x225/111/FFF?text=Random' } } })

// ==========================================
// CONFIGURAÇÃO DO PORTABLE TEXT (VUE)
// ==========================================
const portableTextComponents = {
  block: {
    normal: (_: any, { slots }: any) => h('p', slots.default?.()),
    h2: (props: any, { slots }: any) => h('h2', { id: `pt-block-${props.value._key}` }, slots.default?.()),
    h3: (_: any, { slots }: any) => h('h3', slots.default?.())
  },
  marks: {
    link: (props: any, { slots }: any) => h('a', { href: props.value.href, target: '_blank', class: 'external-link' }, slots.default?.())
  },
  types: {
    image: (props: any) => {
      const src = props.value.asset?.url
      if (!src) return null
      const alt = getLocaleString(props.value.alt)
      const caption = getLocaleString(props.value.caption)
      return h('figure', [
        h('img', { src, alt, width: 600, height: 300, class: 'gallery-image', loading: 'lazy' }),
        caption ? h('figcaption', caption) : null
      ])
    }
  }
}
</script>

<template>
  <main class="project-page">

    <!-- ESTADO: EM BREVE -->
    <section v-if="project.isComingSoon" class="coming-soon-project-page">
      <MotionSlideUp class="coming-soon-message">
        <h1>Projeto em breve!</h1>
        <p>Este projeto ainda não está disponível para visualização. Volte em breve para mais novidades.</p>
      </MotionSlideUp>
      
      <MotionSlideUp v-if="randomProject" :delay="0.1" >
        <h2>Veja outro projeto:</h2>
        <div class="random-project-suggestion">
          <NuxtLink :to="localePath(`/projetos/${randomProject.slug}`)" class="random-project-link">
            <div class="random-project-thumb">
              <img :src="randomProject.thumbnailImage.asset.url" alt="Projeto Sugerido" style="width: 400px; height: 225px; object-fit: cover;"/>
            </div>
            <span>{{ randomProject.title }}</span>
          </NuxtLink>
        </div>
      </MotionSlideUp>
    </section>

    <!-- ESTADO: PROJETO DISPONÍVEL -->
    <template v-else>
      
      <!-- HEADER DO PROJETO COM POPOVER MENU -->
      <div class="contianer-grid full-width project-header" style="display: flex; justify-content: space-between; margin-bottom: 2rem;">
        <NuxtLink :to="localePath('/projetos')" class="btn ghost-btn back-link icon-only">
          <ArrowLeftIcon class="icon-md" /> Voltar
        </NuxtLink>
        <button popovertarget="project-menu" class="menu-btn btn secondary-btn icon-only">
          <ListBulletIcon class="icon-md" />
        </button>
      </div>

      <!-- POPOVER MENU (TOC) -->
      <div id="project-menu" popover="auto" class="project-menu">
        <nav class="content-summary">
          <!-- Você pode construir os links de navegação extraindo os H2 do Portable Text aqui -->
          <p>Sumário do Projeto (Mock)</p>
        </nav>
        <span aria-hidden="true" class="highlight-text">//////////////</span>
        <button popovertarget="project-menu" popovertargetaction="hide" class="btn secondary-btn close-btn right icon-only">
          <XMarkIcon class="icon-md" />
        </button>
      </div>

      <!-- VISÃO GERAL -->
      <section id="project-overview" style="margin-bottom: 4rem;">
        <MotionSlideUp>
          <h1>{{ getLocaleString(project.title) }}</h1>
        </MotionSlideUp>
        
        <MotionSlideUp :delay="0.1">
          <ul v-if="project.tags?.length" class="tag-list">
            <li v-for="tag in project.tags" :key="tag._id" class="tag">
              {{ getLocaleString(tag.title) }}
            </li>
          </ul>
        </MotionSlideUp>
        
        <MotionSlideUp :delay="0.2">
          <p class="project-subtitle">{{ getLocaleString(project.description) }}</p>
        </MotionSlideUp>
      </section>

      <!-- IMAGEM PRINCIPAL HERO -->
      <section class="breakout" style="margin-bottom: 4rem;">
        <MotionSlideUp>
          <picture v-if="project.thumbnailImage?.horizontal?.asset?.url || project.thumbnailImage?.vertical?.asset?.url">
            <source v-if="project.thumbnailImage.vertical?.asset?.url" media="(max-width: 767px)" :srcset="project.thumbnailImage.vertical.asset.url" />
            <source v-if="project.thumbnailImage.horizontal?.asset?.url" media="(min-width: 768px)" :srcset="project.thumbnailImage.horizontal.asset.url" />
            <img 
              :src="project.thumbnailImage.horizontal?.asset?.url || project.thumbnailImage.vertical?.asset?.url" 
              :alt="getLocaleString(project.thumbnailImage.alt) || getLocaleString(project.title)"
              class="breakout project-image"
              loading="eager"
              style="width: 100%; height: auto;"
            />
          </picture>
        </MotionSlideUp>
      </section>

      <!-- METADADOS E CONTEÚDO PRINCIPAL -->
      <section class="full-width project-body-grid" style="display: grid; grid-template-columns: 1fr 3fr; gap: 2rem; margin-bottom: 4rem;">
        
        <!-- Sidebar Esquerda (Metadados) -->
        <aside id="projet-metadata" class="right">
          <MotionSlideUp>
            <div class="meta-group">
              <h2>Ano</h2>
              <ul class="metadata-list"><li class="metadata-period">{{ project.year || '—' }}</li></ul>
            </div>
          </MotionSlideUp>

          <MotionSlideUp :delay="0.1">
            <div class="meta-group">
              <h2>Duração</h2>
              <ul class="metadata-list"><li class="metadata-period">{{ getLocaleString(project.duration) || '—' }}</li></ul>
            </div>
          </MotionSlideUp>

          <MotionSlideUp v-if="project.role?.length" :delay="0.2" >
            <div class="meta-group">
              <h2>Papel</h2>
              <ul class="metadata-list">
                <li v-for="role in project.role" :key="role" class="tag">{{ role }}</li>
              </ul>
            </div>
          </MotionSlideUp>

          <MotionSlideUp :delay="0.3">
            <div class="meta-group">
              <h2>Ferramentas</h2>
              <ul class="metadata-list">
                <li v-for="tool in project.toolsAndskills" :key="tool._id" class="tag">{{ getLocaleString(tool.title) }}</li>
              </ul>
            </div>
          </MotionSlideUp>

          <MotionSlideUp v-if="project.externalLinks?.length" :delay="0.4">
            <div class="meta-group">
              <h2>Veja o projeto</h2>
              <ul class="metadata-list">
                <li v-for="link in project.externalLinks" :key="link.url">
                  <a :href="link.url" target="_blank" rel="noopener noreferrer" class="external-link">{{ link.label }}</a>
                </li>
              </ul>
            </div>
          </MotionSlideUp>
        </aside>

        <!-- Coluna Direita (Rich Text) -->
        <div class="content content-blocks">
          <MotionSlideUp v-for="(block, idx) in project.content?.pt" :key="block._key || idx" :delay="0.1 * (idx % 5)">
            <PortableText :value="[block]" :components="portableTextComponents" />
          </MotionSlideUp>
        </div>
      </section>

      <!-- GALERIA DE IMAGENS -->
      <section v-if="project.gallery?.length" id="gallery" class="breakout" style="margin-bottom: 4rem;">
        <MotionSlideUp v-for="(img, idx) in project.gallery" :key="idx" :delay="0.1 * idx">
           <!-- Sua lógica de picture para a galeria vai aqui (similar à do Hero) -->
        </MotionSlideUp>
      </section>

      <!-- CTA BANNER DINÂMICO -->
      <CtaBanner
        title="Gostou do projeto?"
        description="Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!"
        :primary-action="{ label: 'Enviar mensagem', path: '/contato' }"
        :secondary-action="{ label: 'Próximo Projeto ➔', path: `/projetos/${nextProjectSlug}` }"
      />

    </template>
  </main>
</template>

<style scoped>
/* Adicione aqui media queries para colapsar o grid da sidebar em mobile */
@media (max-width: 768px) {
  .project-body-grid {
    grid-template-columns: 1fr !important;
  }
}
.meta-group {
  margin-bottom: 2rem;
}
</style>