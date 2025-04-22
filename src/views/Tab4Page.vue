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

      <!-- Logged In View -->
      <div v-if="isLoggedIn" class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Bienvenido, {{ userName }}! 🎉</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Ahora estas logueado exitosamente!</p>
            <ion-button expand="block" color="danger" @click="logout">Logout</ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Login Form -->
      <div v-else-if="!isRegistering" class="ion-padding">
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
      <div v-else class="ion-padding">
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

      <!-- Alert -->
      <ion-alert
        :is-open="showAlert"
        :header="alertHeader"
        :message="alertMessage"
        :buttons="['OK']"
        @didDismiss="showAlert = false"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, IonAlert
} from '@ionic/vue';
import { Preferences } from '@capacitor/preferences'; // Capacitor Storage


// Estados reactivos
const isRegistering = ref(false);
const isLoggedIn = ref(false);
const userName = ref('');
const showAlert = ref(false);
const alertHeader = ref('');
const alertMessage = ref('');

const loginData = ref({ email: '', password: '' });
const registerData = ref({ name: '', email: '', password: '' });

// Alternar entre login y registro
const toggleRegister = () => {
  isRegistering.value = !isRegistering.value;
};

// Mostrar alert
const showIonicAlert = (header: string, message: string) => {
  alertHeader.value = header;
  alertMessage.value = message;
  showAlert.value = true;
};

// Login
const handleLogin = async () => {
  try {
    const response = await fetch('https://po02projectmanagerapi-production.up.railway.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData.value)
    });

    const data = await response.json();

    if (!response.ok || !data.token) throw new Error('Login failed');

    // Esto guarda el token en almacenamiento local
    await Preferences.set({
      key: 'user_token',
      value: data.token,
    });

    if (data.name) {
      await Preferences.set({
        key: 'user_name',
        value: data.name,
      });
    }

    userName.value = data.name || 'User';
    isLoggedIn.value = true;

    console.log('Login successful:', data);
    showIonicAlert('Success 🎉', 'You have been logged in successfully!');
  } catch (error) {
    console.error('Login error:', error);
    showIonicAlert('Login Failed', 'Please check your email and password.');
  }
};


// Registro
const handleRegister = async () => {
  try {
    const response = await fetch('https://po02projectmanagerapi-production.up.railway.app/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData.value)
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    showIonicAlert('Registro Completado ✅', 'Ahora puedes iniciar sesión.');
    toggleRegister();
  } catch (error) {
    showIonicAlert('Registro Fallido', 'Por favor intenta de nuevo.');
  }
};

// Logout
const logout = () => {
  isLoggedIn.value = false;
  userName.value = '';
  loginData.value = { email: '', password: '' };
  showIonicAlert('Adiós  👋', 'Haz salido de tu cuenta exitosamente.');
};
</script>

<style scoped>
p {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
