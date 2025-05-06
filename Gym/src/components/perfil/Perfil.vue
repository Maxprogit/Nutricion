<!-- src/pages/ProfilePage.vue -->
<template>
    <q-page padding>
  
      <!-- Encabezado -->
      <div class="row items-center q-mb-lg">
        <div class="col">
          <div class="text-h5">Perfil de Usuario</div>
        </div>
        <div class="col-auto">
          <q-btn icon="edit" label="Editar Perfil" color="primary" flat @click="goToEdit"/>
        </div>
      </div>
  
      <div class="row q-col-gutter-md">
        <!-- Tarjeta de datos personales -->
        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar size="80px">
                <img :src="user.avatar || 'https://cdn.quasar.dev/img/avatar.png'"/>
              </q-avatar>
              <div class="column q-ml-md">
                <div class="text-h6">{{ user.name }}</div>
                <div class="text-subtitle2">{{ user.email }}</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item>
                <q-item-section>Edad</q-item-section>
                <q-item-section side>{{ user.age }} años</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Género</q-item-section>
                <q-item-section side>{{ user.gender }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Altura</q-item-section>
                <q-item-section side>{{ measurements.height }} cm</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Peso</q-item-section>
                <q-item-section side>{{ measurements.weight }} kg</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
  
        <!-- Tarjeta de IMC y Objetivos -->
        <div class="col-12 col-md-8">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="text-h6">Índice de Masa Corporal (IMC)</div>
              <div class="text-h4 text-primary q-mt-sm">{{ bmi.toFixed(1) }}</div>
              <div class="text-caption q-mt-xs">
                {{ bmiCategory }}
              </div>
            </q-card-section>
          </q-card>
  
          <q-card>
            <q-card-section>
              <div class="text-h6">Objetivos Nutricionales</div>
              <q-list dense bordered>
                <q-item v-for="(obj, i) in user.goals" :key="i">
                  <q-item-section>{{ obj }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
  
      <!-- Planes de Dieta -->
      <div class="row q-col-gutter-md q-mt-lg">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <div class="text-h6">Planes de Dieta Asignados</div>
            </q-card-section>
  
            <q-table
              :columns="dietColumns"
              :data="diets"
              row-key="id"
              flat
              dense
            >
              <template v-slot:body-cell-actions="props">
                <q-td align="right">
                  <q-btn flat round dense icon="visibility" @click="viewDiet(props.row.id)" />
                </q-td>
              </template>
            </q-table>
          </q-card>
        </div>
      </div>
  
    </q-page>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'ProfilePage',
    data() {
      return {
        user: {
          name: '',
          email: '',
          age: null,
          gender: '',
          avatar: null,
          goals: []
        },
        measurements: {
          height: 0,
          weight: 0
        },
        diets: [],
        dietColumns: [
          { name: 'name', label: 'Nombre', field: 'name' },
          { name: 'type', label: 'Tipo', field: 'type' },
          { name: 'start', label: 'Inicio', field: 'startDate', format: val => new Date(val).toLocaleDateString() },
          { name: 'actions', label: '', field: 'actions', sortable: false }
        ]
      }
    },
    computed: {
      bmi() {
        const h = this.measurements.height / 100
        return this.measurements.weight && h > 0
          ? this.measurements.weight / (h * h)
          : 0
      },
      bmiCategory() {
        const v = this.bmi
        if (v < 18.5) return 'Bajo peso'
        if (v < 25)   return 'Normal'
        if (v < 30)   return 'Sobrepeso'
        return 'Obesidad'
      }
    },
    created() {
      this.fetchProfile()
      this.fetchDiets()
    },
    methods: {
      fetchProfile() {
        axios.get('/api/user/profile')
          .then(({ data }) => {
            this.user = data.user
            this.measurements = data.measurements
          })
      },
      fetchDiets() {
        axios.get('/api/user/diets')
          .then(({ data }) => {
            this.diets = data
          })
      },
      viewDiet(id) {
        this.$router.push(`/dietas/${id}`)
      },
      goToEdit() {
        this.$router.push('/profile/edit')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Si quieres ajustar algún espaciado o breakpoint específico */
  </style>
  