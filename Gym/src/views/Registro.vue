<template>
  <q-page class="q-pa-md flex flex-center" style="background: linear-gradient(#8274C5, #5A4A9F);">
    <q-card class="q-pa-lg shadow-10" style="max-width: 700px; width: 100%;">
      <q-card-section class="bg-green-7 text-white">
        <div class="text-h5 text-center">Registro de Paciente</div>
      </q-card-section>

      <q-form @submit.prevent="registrarPaciente" class="q-gutter-md q-mt-md" ref="formRef">
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.NOMBRE" label="Nombre" :rules="[rules.requerido]" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.NOMBRE2" label="Segundo Nombre" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.APELLIDO_PATERNO" label="Apellido Paterno" :rules="[rules.requerido]" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.APELLIDO_MATERNO" label="Apellido Materno" :rules="[rules.requerido]" />
          </div>
          <div class="col-md-6 col-12">
            <q-select
              filled
              v-model="paciente.SEXO"
              label="Sexo"
              :options="['Masculino', 'Femenino', 'Otro']"
              :rules="[rules.requerido]"
            />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.EDAD" label="Edad" type="number" :rules="[rules.requerido, rules.edadValida]" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.CORREO" label="Correo" type="email" :rules="[rules.requerido, rules.correo]" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.DIRECCION" label="Dirección" :rules="[rules.requerido]" />
          </div>
          <div class="col-md-6 col-12">
            <q-input filled v-model="paciente.TELEFONO" label="Teléfono" :rules="[rules.requerido, rules.telefonoValido]" />
          </div>
        </div>

        <div class="q-pt-md">
          <q-btn
            label="Registrar"
            color="green-4"
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
        TELEFONO: ''
      },
      rules: {
        requerido: val => !!val || 'Este campo es obligatorio',
        correo: val => /^\S+@\S+\.\S+$/.test(val) || 'Correo no válido',
        edadValida: val => val > 0 || 'Edad debe ser mayor a 0',
        telefonoValido: val => /^\d{10,}$/.test(val) || 'Teléfono inválido'
      }
    };
  },
  methods: {
    async registrarPaciente() {
      const valido = await this.$refs.formRef.validate();
      if (!valido) return;

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
        TELEFONO: ''
      };
      this.$refs.formRef.resetValidation();
    }
  }
};
</script>
