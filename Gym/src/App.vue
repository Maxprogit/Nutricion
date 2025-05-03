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
        <q-card-section>
          <div class="text-h6" aria-hidden="true">Menu</div>
        </q-card-section>
        
        <q-separator inset />

        <q-item clickable v-ripple to="/dietas">
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>
          <q-item-section>
            Dietas
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

        <q-item clickable v-ripple>

          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            Pacientes
          </q-item-section>
        </q-item>


        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>


          <q-item-section>
            Iniciar Sesión
          </q-item-section>
        </q-item>


        <q-item clickable v-ripple to="/registro">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>


          <q-item-section>
            Registro
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
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>