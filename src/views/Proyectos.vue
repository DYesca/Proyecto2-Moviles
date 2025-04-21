<template lang="html">
    <ion-page>

        <!-- Proyecto ligado a x usuario en especifico -->
        <ion-header>
            <ion-toolbar>
                <ion-icon aria-hidden="true" :icon="bookOutline"></ion-icon>
                <ion-title>Proyecto name </ion-title>
            </ion-toolbar>
        </ion-header>


        <!-- Esta es la vista del proyecto a el que el usuario entre -->
         <!-- Es decir dentro de aquí el usuario va a poder manejar el crud de las tareas de un proyecto y eliminar o agregar un usuario a este proyecto -->
        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item v-for="(proyecto, index) in proyectos" :key="index">
                    <ion-label>{{ proyecto }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { bookOutline } from 'ionicons/icons';

</script>