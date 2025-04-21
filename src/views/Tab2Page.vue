<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>¡Crea tu proyecto!</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Lista de proyectos y botones para agregar o eliminar o editar un proyecto -->
      <ion-list>
        <ion-item v-for="project in projects" :key="project.id">
          <ion-label>{{ project.name }}</ion-label>

          <!-- Botón para ir a Editar Tarea-->
          <ion-button :router-link="'/edit/' + index" color="medium" fill="clear">Editar</ion-button>

          <!-- Botón para eliminar la tarea -->
          <ion-button @click="showDeleteAlert(index)" fill="solid" color="danger">Borrar</ion-button>
        </ion-item>
      </ion-list>

      <ion-item>
        <ion-button @click="addNewProject" color="primary" fill="solid">Agregar</ion-button>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { list } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
