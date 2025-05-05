<template>
  <q-page class="q-pa-md flex flex-center" style="background: linear-gradient(#8274C5, #5A4A9F);">
    <q-card class="q-pa-lg shadow-10" style="max-width: 700px; width: 100%;">
      <q-card-section class="bg-green-7 text-white">
        <div class="text-h5">Inicio de Sesión</div>
      </q-card-section>

      <q-form @submit.prevent="inicioSesion" class="q-gutter-md q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-12">
            <q-input filled v-model="login.USUARIO" label="Usuario" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="login.CONTRA" label="Contraseña" />
          </div>
        <div class="q-pt-md">
          <q-btn
            label="Entrar"
            color="green-4"
            unelevated
            class="full-width text-white"
            type="submit"
          />
        </div>
        </div>
      </q-form>
      <q-card-section class="text-center q-mt-sm">
        <q-btn flat label="Haz Click aqui para registrarte" to="/registro" class="text-grey-6" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
data() {
  return {
    login: {
      USUARIO: '',
      CONTRA: ''
    }
  };
},
methods: {
  async iniciarSesion() {
    try {
        const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.login)
        });
      if (res.ok) {
        this.$q.notify({ type: 'positive', message: 'Inicio Sesión con Exito' });
        this.resetForm();
      } else {
        this.$q.notify({ type: 'negative', message: 'Error al Iniciar Sesión' });
      }
    } catch (err) {
      this.$q.notify({ type: 'negative', message: 'Error de Conexión' });
    }
  },
  resetForm() {
    this.login = {
      USUARIO: '',
      CONTRA: '',
    };
  }
}
};
</script>