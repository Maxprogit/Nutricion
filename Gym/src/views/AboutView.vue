<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6">Pacientes</div>
      </q-card-section>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-right">Nombre</th>
            <th class="text-right">Segundo Nombre</th>
            <th class="text-right">Apellido Paterno</th>
            <th class="text-right">Apellido Materno</th>
            <th class="text-right">Sexo</th>
            <th class="text-right">Edad</th>
            <th class="text-right">Correo</th>
            <th class="text-right">Dirección</th>
            <th class="text-right">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paciente in pacientes" :key="paciente.id">
            <td class="text-left">{{ paciente.id }}</td>
            <td class="text-right">{{ paciente.NOMBRE }}</td>
            <td class="text-right">{{ paciente.NOMBRE2 }}</td>
            <td class="text-right">{{ paciente.APELLIDO_PATERNO }}</td>
            <td class="text-right">{{ paciente.APELLIDO_MATERNO }}</td>
            <td class="text-right">{{ paciente.SEXO }}</td>
            <td class="text-right">{{ paciente.EDAD }}</td>
            <td class="text-right">{{ paciente.CORREO }}</td>
            <td class="text-right">{{ paciente.DIRECCION }}</td>
            <td class="text-right">{{ paciente.TELEFONO }}</td>
            <td class="text-right">{{ paciente.usuario_id }}</td>
            <td class="text-right">
              <q-btn @click="openEditModal(paciente)" label="Editar" color="primary" size="sm" />
              <q-btn @click="deletePaciente(paciente.id)" label="Borrar" color="negative" size="sm" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>

  <!-- Modal para editar paciente -->
  <q-dialog v-model="isEditModalOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Paciente</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="editedPaciente.NOMBRE" label="Nombre" />
        <q-input v-model="editedPaciente.NOMBRE2" label="Segundo Nombre" />
        <q-input v-model="editedPaciente.APELLIDO_PATERNO" label="Apellido Paterno" />
        <q-input v-model="editedPaciente.APELLIDO_MATERNO" label="Apellido Materno" />
        <q-input v-model="editedPaciente.SEXO" label="Sexo" />
        <q-input v-model="editedPaciente.EDAD" label="Edad" type="number" />
        <q-input v-model="editedPaciente.CORREO" label="Correo" />
        <q-input v-model="editedPaciente.DIRECCION" label="Dirección" />
        <q-input v-model="editedPaciente.TELEFONO" label="Teléfono" />
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Cancelar" @click="closeEditModal" />
        <q-btn flat label="Guardar" color="primary" @click="saveChanges" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pacientes = ref([])
const isEditModalOpen = ref(false)
const editedPaciente = ref({})

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/pacientes') // tu backend
    pacientes.value = res.data
  } catch (err) {
    console.error('Error al cargar pacientes:', err)
  }
})

// Función para abrir el modal con los datos del paciente
const openEditModal = (paciente) => {
  editedPaciente.value = { ...paciente }
  isEditModalOpen.value = true
}

// Función para cerrar el modal sin guardar cambios
const closeEditModal = () => {
  isEditModalOpen.value = false
}

// Función para guardar los cambios de un paciente
const saveChanges = async () => {
  try {
    const res = await axios.put(`http://localhost:3000/pacientes/${editedPaciente.value.id}`, editedPaciente.value)
    console.log('Paciente actualizado:', res.data)
    const index = pacientes.value.findIndex(p => p.id === editedPaciente.value.id)
    if (index !== -1) {
      pacientes.value[index] = res.data
    }
    closeEditModal()
  } catch (err) {
    console.error('Error al actualizar paciente:', err)
  }
}

// Función para borrar paciente
const deletePaciente = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/pacientes/${id}`)
    pacientes.value = pacientes.value.filter(paciente => paciente.id !== id)
  } catch (err) {
    console.error('Error al borrar paciente:', err)
  }
}
</script>
