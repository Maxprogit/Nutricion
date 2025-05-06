<template>
  <div class="q-pa-md">
    <q-table
      title="Grupos Alimenticios"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      grid
      hide-header
      :rows-per-page-options="[0]"
    >
      <!-- Buscador -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Tarjeta por ítem -->
      <template v-slot:item="props">
        <q-card class="q-ma-sm full-width" style="max-width: 400px;" flat bordered>
          <q-responsive :ratio="16/9">
            <q-img class="full-width" :src="props.row.image" height="150px" fit="cover" />
          </q-responsive>
          <q-card-section>
            <div class="text-h6">{{ props.row.name }}</div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn color="green-5" label="Ver detalles" @click="abrirDialog(props.row)" />
          </q-card-actions>
        </q-card>
      </template>
    </q-table>

    <!-- QDialog maximizable -->
    <q-dialog
      v-model="dialogVisible"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-teal text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-black">{{ selectedRow.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md bg-white text-black">            
            <q-table
              flat
              bordered
              :rows="detalleItems"
              :columns="detalleColumns"
              row-key="name"
              hide-bottom
              separator="cell"
              :rows-per-page-options="[0]"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import alimentosData from '../assets/data/alimentos.json'

const filter = ref('')
// Cargar categorías desde JSON
const rows = alimentosData.map(cat => ({ name: cat.name, image: cat.image }))
const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' }
]

// Columnas para la tabla de detalles
const detalleColumns = [
  { name: 'name', label: 'Alimento', field: 'name', align: 'left' },
  { name: 'portion', label: 'Porción', field: 'portion', align: 'left' }
]
const detalleItems = ref([])

const dialogVisible = ref(false)
const maximizedToggle = ref(true)
const selectedRow = ref({})

function abrirDialog(row) {
  selectedRow.value = row
  // Buscar la categoría en JSON y cargar su lista de alimentos
  const categoria = alimentosData.find(cat => cat.name === row.name)
  detalleItems.value = categoria?.food || []
  dialogVisible.value = true
}
</script>
