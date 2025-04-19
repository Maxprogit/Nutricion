<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-teal text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.png">
          </q-avatar>
          Nutriólogo Julián Sánchez
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list padding>
        <q-item clickable v-ripple to='/hello'>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            Inicio
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="image" />
          </q-item-section>

          <q-item-section>
            Mis Fotos
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/welcome">
          <q-item-section avatar>
            <q-icon name="monitor_weight" />
          </q-item-section>

          <q-item-section>
            Mediciones
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>

          <q-item-section>
            Mis Dietas
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_basket" />
          </q-item-section>

          <q-item-section>
            Lista de súper
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="directions_run" />
          </q-item-section>

          <q-item-section>
            Actividad Física
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="flag" />
          </q-item-section>

          <q-item-section>
            Metas
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>

          <q-item-section>
            Subir Foto
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied_alt" />
          </q-item-section>

          <q-item-section>
            ¿Cómo te sientes?
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="face_retouching_natural" />
          </q-item-section>

          <q-item-section>
            ¿Estás motivado?
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>

          <q-item-section>
            Mis Cuestionarios
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>

          <q-item-section>
            Próxima cita
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="thumbs_up_down" />
          </q-item-section>

          <q-item-section>
            Recomendaciones
          </q-item-section>
        </q-item>

        <q-card-section>
          <div class="text-h6">Entrenamiento</div>
        </q-card-section>

        <q-separator inset />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="sensors" />
          </q-item-section>

          <q-item-section>
            En vivo
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="theaters" />
          </q-item-section>

          <q-item-section>
            Sesiones grabadas
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fitness_center" />
          </q-item-section>

          <q-item-section>
            Rutinas
          </q-item-section>
        </q-item>

        <q-card-section>
          <div class="text-h6">Psicología</div>
        </q-card-section>

        <q-separator inset />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="accessibility_new" />
          </q-item-section>

          <q-item-section>
            Taller de motivación
          </q-item-section>
        </q-item>

        <q-card-section>
          <div class="text-h6">Ajustes</div>
        </q-card-section>

        <q-separator inset />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            Iniciar Sesión
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <!-- EN ESTA PARTE VA A IR EL PERFIL DE USUARIO CUANDO INICIE SESIÓN -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>
