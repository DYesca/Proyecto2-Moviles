<template>
  <ion-page>
    <ion-header :trasnslucent="true">
      <ion-toolbar>
        <ion-title>Gestión de Proyectos</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- Esta vista es una lista de proyectos ligados a usuarios -->
      <ion-list>
        <!--mostrar proyectos 
        <ion-item v-for="project in projects" :key="project.id">
          <IonLabel>{{ project.id }}</IonLabel>
          <ion-label>{{ project.name }}</ion-label>
        </ion-item>
        --->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { ref, onMounted } from 'vue';
import { bookOutline } from 'ionicons/icons';

// Variable reactiva para almacenar los proyectos
const projects = ref([]);

// Función para obtener los proyectos desde el API
const fetchProjects = async () => {
  
};

// Llama a la función fetchProjects cuando el componente se monta
onMounted(() => {
  fetchProjects();
});
</script>
