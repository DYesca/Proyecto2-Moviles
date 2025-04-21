<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gestión de Proyectos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <!-- Lista de proyectos ligados a usuarios -->

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Gestión de Proyectos</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <!--mostrar proyectos -->
        <ion-item v-for="project in projects" :key="project.id">
          <IonLabel>{{ project.id }}</IonLabel>
          <ion-label>{{ project.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { ref, onMounted } from 'vue';

// Variable reactiva para almacenar los proyectos
const projects = ref([]);

// Función para obtener los proyectos desde el API
const fetchProjects = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/project/list');
    if (!response.ok) {
      throw new Error('Error al obtener los proyectos');
    }
    const data = await response.json();
    projects.value = data; // Asigna los datos a la variable reactiva
  } catch (error) {
    console.error('Error:', error);
  }
};

// Llama a la función fetchProjects cuando el componente se monta
onMounted(() => {
  fetchProjects();
});
</script>
