<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="row items-center q-mt-md">
          <q-avatar>
            <i class="bi bi-cart4"></i>
          </q-avatar>
          <h3 class="m-0">My Quasar CRUD Test Example</h3>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/products" label="Products" />
        <q-route-tab to="/page2" label="Page Two" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
      <img class="homeImg" src="../assets/2593065.jpg" alt="">
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
  
<script>
export default {
  data() {
    return {
    }
  }
}
</script>