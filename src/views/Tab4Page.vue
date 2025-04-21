<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Account</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Login Form -->
      <div v-if="!isRegistering">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Login</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input v-model="loginData.email" type="email" placeholder="Enter your email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input v-model="loginData.password" type="password" placeholder="Enter your password"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="handleLogin">Login</ion-button>
            <ion-button expand="block" fill="clear" @click="toggleRegister">Don't have an account? Register</ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Register Form -->
      <div v-else>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Register</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input v-model="registerData.name" type="text" placeholder="Enter your name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input v-model="registerData.email" type="email" placeholder="Enter your email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input v-model="registerData.password" type="password" placeholder="Enter your password"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="handleRegister">Register</ion-button>
            <ion-button expand="block" fill="clear" @click="toggleRegister">Already have an account? Login</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import User from "@/user"; // ajusta la ruta si es necesario


// Variables para el login y register forms
const loginData = ref({
  email: '',
  password: ''
});

const registerData = ref({
  name: '',
  email: '',
  password: ''
});

// Estado para cambiar entre login y register forms
const isRegistering = ref(false);

// Function to handle login
const handleLogin = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData.value)
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    console.log('Login successful:', data);
    alert('Login successful!');
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please check your credentials.');
  }
};

// Function to handle register
const handleRegister = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData.value)
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    console.log('Registration successful:', data);
    alert('Registration successful! You can now log in.');
    toggleRegister(); // Switch back to login form
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed. Please try again.');
  }
};

// Function to toggle between login and register forms
const toggleRegister = () => {
  isRegistering.value = !isRegistering.value;
};
</script>
