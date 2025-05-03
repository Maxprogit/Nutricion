<template>
    <q-page class="q-pa-md flex flex-center" style="background: linear-gradient(#8274C5, #5A4A9F);">
      <q-card class="q-pa-lg shadow-10" style="max-width: 700px; width: 100%;">
        <q-card-section class="bg-deep-purple-7 text-white">
          <div class="text-h5">Registro de Paciente</div>
        </q-card-section>
  
        <q-form @submit.prevent="registrarPaciente" class="q-gutter-md q-mt-md">
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.NOMBRE" label="Nombre" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.NOMBRE2" label="Segundo Nombre" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.APELLIDO_PATERNO" label="Apellido Paterno" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.APELLIDO_MATERNO" label="Apellido Materno" />
            </div>
            <div class="col-md-6 col-12">
              <q-select
                filled
                v-model="paciente.SEXO"
                label="Sexo"
                :options="['Masculino', 'Femenino', 'Otro']"
              />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.EDAD" label="Edad" type="number" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.CORREO" label="Correo" type="email" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.DIRECCION" label="Dirección" />
            </div>
            <div class="col-md-6 col-12">
              <q-input filled v-model="paciente.TELEFONO" label="Teléfono" />
            </div>
          </div>
          <div class="q-pt-md">
            <q-btn
              label="Registrar"
              color="purple-4"
              unelevated
              class="full-width text-white"
              type="submit"
            />
          </div>
        </q-form>
        <q-card-section class="text-center q-mt-sm">
          <q-btn flat label="Volver al login" to="/registro" class="text-grey-6" />
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paciente: {
          NOMBRE: '',
          NOMBRE2: '',
          APELLIDO_PATERNO: '',
          APELLIDO_MATERNO: '',
          SEXO: '',
          EDAD: '',
          CORREO: '',
          DIRECCION: '',
          TELEFONO: '',
          usuario_id: 1
        }
      };
    },
    methods: {
      async registrarPaciente() {
        try {
            const res = await fetch('http://localhost:3000/pacientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.paciente)
            });
          if (res.ok) {
            this.$q.notify({ type: 'positive', message: 'Paciente registrado con éxito' });
            this.resetForm();
          } else {
            this.$q.notify({ type: 'negative', message: 'Error al registrar' });
          }
        } catch (err) {
          this.$q.notify({ type: 'negative', message: 'Error de conexión' });
        }
      },
      resetForm() {
        this.paciente = {
          NOMBRE: '',
          NOMBRE2: '',
          APELLIDO_PATERNO: '',
          APELLIDO_MATERNO: '',
          SEXO: '',
          EDAD: '',
          CORREO: '',
          DIRECCION: '',
          TELEFONO: '',
          usuario_id: 1
        };
      }
    }
  };
  </script>
