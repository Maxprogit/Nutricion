<!-- src/pages/LoginPage.vue -->
<template>
    <q-page padding class="flex flex-center">
      <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Iniciar Sesión</div>
        </q-card-section>
  
        <q-form
          ref="loginForm"
          @submit.prevent="onSubmit"
          class="q-gutter-md"
        >
          <q-card-section>
            <q-input
              v-model="email"
              label="Correo electrónico"
              type="email"
              :rules="[val => !!val || 'El correo es requerido', val => /^\S+@\S+\.\S+$/.test(val) || 'Email inválido']"
              outlined
              dense
              clearable
            />
          </q-card-section>
  
          <q-card-section>
            <q-input
              v-model="password"
              label="Contraseña"
              type="password"
              :rules="[val => !!val || 'La contraseña es requerida', val => val.length >= 6 || 'Mínimo 6 caracteres']"
              outlined
              dense
              clearable
            />
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn
              label="¿Olvidaste tu contraseña?"
              flat
              dense
              @click="onForgot"
            />
            <q-btn
              label="Ingresar"
              type="submit"
              color="primary"
              unelevated
            />
          </q-card-actions>
        </q-form>
  
        <q-separator spaced />
  
        <!-- <q-card-section class="text-center">
          <div>
            ¿No tienes cuenta?
            <q-btn
              flat
              color="primary"
              label="Regístrate"
              @click="$router.push('/registro')"
            />
          </div>
        </q-card-section> -->
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit() {
        this.$refs.loginForm.validate().then(valid => {
          if (valid) {
            // Aquí iría tu llamada al API/login (por ejemplo con Axios)
            // axios.post('/api/auth/login', { email: this.email, password: this.password })
            //   .then(() => { ... })
            //   .catch(err => { ... })
            console.log('Login válido, implementa tu lógica aquí')
          }
        })
      },
      onForgot() {
        // Redirige o abre un diálogo para recuperación de contraseña
        this.$router.push('/recuperar-password')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajustes opcionales */
  </style>
  