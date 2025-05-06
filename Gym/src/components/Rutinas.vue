<template>
    <q-page padding>
      <!-- Card Plantillas -->
      <q-card flat bordered class="shadow-2 rounded-lg q-mb-lg">
        <q-card-section class="flex items-center justify-between">
          <div class="text-h6">Plantillas de Rutinas</div>
          <q-btn color="primary" icon="add" label="Nueva Plantilla" @click="openTemplateDialog()" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-expansion-item
            v-for="tpl in plantillas"
            :key="tpl.id"
            :label="tpl.nombre"
            expand-icon="keyboard_arrow_down"
            dense
            class="rounded-borders"
          >
            <q-list bordered>
              <q-item v-for="(d,i) in tpl.dias" :key="i">
                <q-item-section>
                  <q-chip outline small class="q-mr-sm">{{ d.dia }}</q-chip>
                  <q-chip dense color="secondary" text-color="white" small>{{ d.categoria }}</q-chip>
                  <span class="q-ml-sm">{{ d.ejercicio }} ({{ d.series }}×{{ d.reps }} @ {{ d.peso }}kg)</span>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="row justify-end q-mt-sm">
              <q-btn flat icon="edit" label="Editar" @click="openTemplateDialog(tpl)" />
              <q-btn flat icon="delete" color="negative" label="Eliminar" @click="deleteTemplate(tpl.id)" />
            </div>
          </q-expansion-item>
        </q-card-section>
      </q-card>
  
      <!-- Card Asignaciones -->
      <q-card flat bordered class="shadow-2 rounded-lg">
        <q-card-section class="flex items-center justify-between">
          <div class="text-h6">Asignaciones de Rutinas</div>
          <q-btn color="secondary" icon="assignment_ind" label="Asignar Rutina" @click="openAssignDialog()" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-table
            :rows="asignaciones"
            :columns="assignColumns"
            row-key="id"
            flat
            bordered
            dense
            separator="cell"
            row-class="row-hover"
          >
            <template v-slot:body-cell-fecha="props">
              <q-td>
                <q-chip color="primary" text-color="white" small>{{ props.row.fecha }}</q-chip>
              </q-td>
            </template>
            <template v-slot:body-cell-acciones="props">
              <q-td align="center">
                <q-btn flat round dense icon="edit" @click="openAssignDialog(props.row)" />
                <q-btn flat round dense icon="delete" color="negative" @click="removeAssign(props.row.id)" />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
  
      <!-- Dialog Crear/Editar Plantilla -->
      <q-dialog v-model="dialogTemplate" persistent>
        <q-card class="rounded-lg shadow-3">
          <q-card-section>
            <div class="text-h6">{{ currentTpl.id ? 'Editar Plantilla' : 'Nueva Plantilla' }}</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="saveTemplate">
              <q-input v-model="currentTpl.nombre" label="Nombre" outlined dense required />
              <div class="q-mt-md row items-end q-mb-sm" v-for="(d,i) in currentTpl.dias" :key="i">
                <q-select v-model="d.dia" :options="diasSemana" label="Día" outlined dense class="col-3" required />
                <q-select v-model="d.categoria" :options="categorias" label="Categoría" outlined dense class="col-3 q-ml-sm" required />
                <q-input v-model="d.ejercicio" label="Ejercicio" outlined dense class="col-4 q-ml-sm" required />
                <q-input v-model.number="d.series" type="number" label="Series" outlined dense class="col-1 q-ml-sm" required />
                <q-input v-model.number="d.reps" type="number" label="Reps" outlined dense class="col-1 q-ml-sm" required />
                <q-input v-model.number="d.peso" type="number" label="Peso" outlined dense class="col-1 q-ml-sm" required />
                <q-btn flat icon="remove_circle" round dense class="q-ml-sm" @click="removeDay(i)" />
              </div>
              <q-btn flat icon="add_circle" label="Agregar Día" @click="addDay" dense class="q-mt-sm" />
              <div class="row justify-end q-mt-lg">
                <q-btn flat label="Cancelar" v-close-popup dense />
                <q-btn color="primary" label="Guardar" type="submit" class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
  
      <!-- Dialog Asignar Rutina -->
      <q-dialog v-model="dialogAssign" persistent>
        <q-card class="rounded-lg shadow-3" style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">Asignar Rutina</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="confirmAssign">
              <q-select v-model="assignData.templateId" :options="plantillas.map(p=>({label:p.nombre,value:p.id}))" label="Plantilla" outlined dense required />
              <q-select v-model="assignData.paciente" :options="pacientes" label="Paciente" option-label="label" option-value="value" outlined dense required />
              <q-input v-model="assignData.fecha" mask="####-##-##" label="Fecha" outlined dense required />
              <div class="row justify-end q-mt-md">
                <q-btn flat label="Cancelar" v-close-popup dense />
                <q-btn color="secondary" label="Asignar" type="submit" class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  
  const $q = useQuasar()
  const diasSemana = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
  const categorias = ['Pecho','Espalda','Pierna','Hombros','Bíceps','Tríceps','Core']
  
  // Plantillas
  const plantillas = ref([])
  const dialogTemplate = ref(false)
  const currentTpl = ref({ id: null, nombre: '', dias: [] })
  
  function openTemplateDialog(tpl) {
    currentTpl.value = tpl ? JSON.parse(JSON.stringify(tpl)) : { id: null, nombre: '', dias: [] }
    dialogTemplate.value = true
  }
  function addDay() { currentTpl.value.dias.push({ dia: '', categoria: '', ejercicio: '', series: 3, reps: 10, peso: 0 }) }
  function removeDay(i) { currentTpl.value.dias.splice(i,1) }
  function saveTemplate() {
    if (!currentTpl.value.id) {
      currentTpl.value.id = Date.now()
      plantillas.value.push({...currentTpl.value})
      $q.notify({ color:'primary', message:'Plantilla creada', icon:'add' })
    } else {
      const i = plantillas.value.findIndex(p=>p.id===currentTpl.value.id)
      plantillas.value[i] = {...currentTpl.value}
      $q.notify({ color:'secondary', message:'Plantilla actualizada', icon:'edit' })
    }
    dialogTemplate.value = false
  }
  function deleteTemplate(id) { plantillas.value = plantillas.value.filter(p=>p.id!==id); $q.notify({ color:'negative', message:'Plantilla eliminada', icon:'delete' }) }
  
  // Asignaciones
  const asignaciones = ref([])
  const assignColumns = [
    { name:'paciente', label:'Paciente', field:'paciente', align:'left' },
    { name:'plantilla', label:'Rutina', field:'plantilla', align:'left' },
    { name:'fecha', label:'Fecha', field:'fecha', align:'center' },
    { name:'acciones', label:'Acciones', field:'acciones', sortable:false, align:'center' }
  ]
  const dialogAssign = ref(false)
  const assignData = ref({ id:null, templateId:null, paciente:null, fecha:'' })
  const pacientes = ref([{ label:'Cliente A', value:1 },{ label:'Cliente B', value:2 }])
  
  function openAssignDialog(item) {
    assignData.value = item ? {...item} : { id:null, templateId:null, paciente:null, fecha:'' }
    dialogAssign.value = true
  }
  function confirmAssign() {
    const tpl = plantillas.value.find(p=>p.id===assignData.value.templateId)
    const pacienteLabel = pacientes.value.find(p=>p.value===assignData.value.paciente)?.label
    if (!assignData.value.id) {
      assignData.value.id = Date.now()
      asignaciones.value.push({ id:assignData.value.id, paciente:pacienteLabel, plantilla:tpl?.nombre||'', fecha:assignData.value.fecha })
    } else {
      const i = asignaciones.value.findIndex(a=>a.id===assignData.value.id)
      asignaciones.value[i].fecha = assignData.value.fecha
    }
    $q.notify({ color:'positive', message:'Rutina asignada', icon:'check' })
    dialogAssign.value = false
  }
  function removeAssign(id) { asignaciones.value = asignaciones.value.filter(a=>a.id!==id); $q.notify({ color:'negative', message:'Asignación eliminada', icon:'delete' }) }
  </script>
  
  <style>
  .row-hover:hover { background-color: #f5f5f5; }
  </style>
  