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


import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { alertController } from '@ionic/vue';


// Variable reactiva para almacenar los proyectos
const projects = ref([]);
const router = useRouter();
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
// Función para agregar un nuevo proyecto 
const addNewProject = async () => {
  const alert = await alertController.create({
    header: 'Nuevo Proyecto',
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Nombre del Proyecto'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Crear',
        handler: async (data) => {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/project/list', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: data.name })
            });
            if (!response.ok) {
              throw new Error('Error al crear el proyecto');
            }
            const newProject = await response.json();
            projects.value.push(newProject); // Agrega el nuevo proyecto a la lista
            console.log('Proyecto creado:', newProject);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
    ]
  });
  await alert.present();
};
// Función para mostrar la alerta de confirmación antes de eliminar un proyecto
const showDeleteAlert = async (index: number) => {
  const alert = await alertController.create({
    header: 'Eliminar Proyecto',
    message: '¿Estás seguro de que deseas eliminar este proyecto?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/project/list/${projects.value[index].id}`, {
              method: 'DELETE'
            });
            if (!response.ok) {
              throw new Error('Error al eliminar el proyecto');
            }
            projects.value.splice(index, 1); // Elimina el proyecto de la lista
            console.log('Proyecto eliminado:', projects.value[index]);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
    ]
  });
  await alert.present();
};
// Función para navegar a la página de edición de tareas
const editTask = (index: number) => {
  router.push({ path: `/edit/${index}` });
};
</script>
