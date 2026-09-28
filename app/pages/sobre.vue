<script setup lang="ts">
import { ref } from 'vue'

const currentEndeavors = [
  'Aprofundando em Vue/Nuxt e padrões de acessibilidade',
  'Escrevendo artigos sobre IHC e Comunicabilidade',
  '(Ainda) lendo Memórias de um Sargento de Milícias',
  'Explorando Fiarlongo em Silksong'
]

const experiences = ref([
  {
    title: { pt: 'Product Designer' },
    company: { pt: 'Empresa Fictícia' },
    startYear: '2022',
    endYear: '',
    isPresent: true,
    type: { pt: 'Tempo Integral' },
    location: { pt: 'Remoto' },
    description: { pt: 'Atuação em design system, arquitetura da informação e refatoração de interfaces complexas.' }
  }
])

const education = ref([
  {
    title: { pt: 'Pós-graduação em UX Design' },
    institution: { pt: 'PUCRS' },
    startYear: '2023',
    endYear: '2024',
    isPresent: false,
    description: { pt: 'Especialização focada em pesquisa, usabilidade e testes.' }
  },
  {
    title: { pt: 'Bacharelado em Design Digital' },
    institution: { pt: 'UFC - Campus Quixadá' },
    startYear: '2018',
    endYear: '2022',
    isPresent: false,
    description: { pt: 'Formação base abordando IHC, comunicabilidade e desenvolvimento front-end.' }
  }
])

const research = ref([
  {
    title: { pt: 'Avaliação de Comunicabilidade no Zotero' },
    event: { pt: 'TCC - UFC' },
    location: { pt: 'Quixadá, CE' },
    publishingYear: '2022',
    description: { pt: 'Análise da interface usando o Método de Inspeção Semiótica (MIS).' }
  }
])

const clients = ref([{name: 'bordAI'}]) 
</script>

<template>
  <main class="about-page">
    <section class="intro-section" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h1>Designer, desenvolvedor, pesquisador e artista nas horas vagas</h1>
      </MotionSlideUp>
      
      <MotionSlideUp :delay="0.1">
        <p>
          Há pouco mais de <span data-cursor-text="!">6 anos</span> atuando com
          design, pondero profundamente a integração entre pessoas, sistemas e
          empresas. Atualmente, foco em alinhar conhecimentos de programação
          para documentar processos e projetar sistemas de informação que
          sobrevivam ao tempo e à escala.
        </p>
      </MotionSlideUp>

      <MotionSlideUp :delay="0.2">
        <p>Além de design e programação, estou:</p>
      </MotionSlideUp>

      <ul class="endeavors-list">
        <MotionSlideUp 
          v-for="(endeavor, index) in currentEndeavors" 
          :key="index" 
          :delay="0.3 + (index * 0.1)"
        >
          <li>{{ endeavor }}</li>
        </MotionSlideUp>
      </ul>
    </section>

    <!-- SEÇÃO 2: EXPERIÊNCIA -->
    <section class="experience-section" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h2>Experiência</h2>
      </MotionSlideUp>
      
      <ul class="resume-list">
        <!-- O Vue resolve a cadeia opcional (.?) maravilhosamente bem no template -->
        <MotionSlideUp 
          v-for="(exp, index) in experiences" 
          :key="index" 
          :delay="0.1 + (index * 0.15)"
        >
          <li>
            <div class="item-header">
              <h3>{{ exp.title?.pt || exp.title }}</h3>
              <p class="metadata-duration">
                {{ exp.startYear }} - {{ exp.isPresent ? 'Presente' : exp.endYear }}
              </p>
            </div>
            <div class="info">
              <p class="metadata">
                <span>{{ exp.company?.pt || exp.company }}</span>
                <span>{{ exp.type?.pt || exp.type }}</span>
                <span>{{ exp.location?.pt || exp.location }}</span>
              </p>
              <p class="description">
                {{ exp.description?.pt || exp.description }}
              </p>
            </div>
          </li>
        </MotionSlideUp>
      </ul>
    </section>

    <!-- SEÇÃO 3: EDUCAÇÃO -->
    <section class="education-section" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h2>Educação</h2>
      </MotionSlideUp>
      
      <ul class="resume-list">
        <MotionSlideUp 
          v-for="(edu, index) in education" 
          :key="index" 
          :delay="0.1 + (index * 0.15)"
        >
          <li>
            <div class="item-header">
              <h3>{{ edu.title?.pt || edu.title }}</h3>
              <p class="metadata-duration">
                {{ edu.startYear }} - {{ edu.isPresent ? 'Presente' : edu.endYear }}
              </p>
            </div>
            <div class="info">
              <p class="metadata">
                <span>{{ edu.institution?.pt || edu.institution }}</span>
              </p>
              <p class="description">
                {{ edu.description?.pt || edu.description }}
              </p>
            </div>
          </li>
        </MotionSlideUp>
      </ul>
    </section>

    <!-- SEÇÃO 4: PESQUISA -->
    <section class="research-section" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h2>Pesquisa</h2>
      </MotionSlideUp>
      
      <ul class="resume-list">
        <MotionSlideUp 
          v-for="(item, index) in research" 
          :key="index" 
          :delay="0.1 + (index * 0.15)"
        >
          <li>
            <h3>{{ item.title?.pt || item.title }}</h3>
            <div class="info">
              <p class="metadata">
                <span class="first-item">{{ item.event?.pt || item.event }}</span>
                <span>{{ item.location?.pt || item.location }}</span>
                <span>{{ item.publishingYear }}</span>
              </p>
              <p class="description">
                {{ item.description?.pt || item.description }}
              </p>
            </div>
          </li>
        </MotionSlideUp>
      </ul>
    </section>

    <!-- SEÇÃO 5: CLIENTES (Renderização Condicional) -->
    <section v-if="clients && clients.length > 0" id="client-section" class="full-width" style="margin-bottom: 4rem;">
      <MotionSlideUp>
        <h2>Clientes</h2>
      </MotionSlideUp>
      <ul>
        <MotionSlideUp 
          v-for="(client, index) in clients" 
          :key="index" 
          :delay="0.1 + (index * 0.1)"
        >
          <li>{{ client.name }}</li>
        </MotionSlideUp>
      </ul>
    </section>

    <!-- SEÇÃO 6: CTA BANNER (Substituindo o HTML bruto do React) -->
    <CtaBanner
      title="Em busca de design que conversa com código?"
      description="Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de colaboração. Sinta-se à vontade para me enviar uma mensagem!"
      :primary-action="{ label: 'Entrar em contato', path: '/contato' }"
      :secondary-action="{ label: 'Ver projetos', path: '/projetos' }"
    />

  </main>
</template>